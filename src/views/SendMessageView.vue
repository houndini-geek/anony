<template>
  <header>
    <h1>anony</h1>
  </header>

  <div class="container">
    <div class="container-header">
      <h2 v-if="usernameRef">Send an anonymous message to {{ usernameRef }}</h2>
      <h4 v-else>User not found.</h4>
      <span class="feedback"> {{ feedback }}</span>
    </div>
    <form @submit.prevent="submitMssg">
      <textarea
        placeholder="Type your anonymous message"
        v-model="messageRef"
        maxlength="250"
        required
        rows="4"
        cols="50"
        @input="InputMssges"
        autofocus
      ></textarea>
      <button type="submit" :disabled="!canSendMssg">
        send
      </button>
    </form>

    <div class="requestToCreate">
      <h5>Your turn to Create your Anony link</h5>
      <RouterLink :to="{name: 'session'}">Create Anony link</RouterLink>
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { sendAnonyMssg, getReceiverName } from '../composables/userParams.min.js'
import { ref } from 'vue'

export default {
  props: ['id'],
  setup() {
    const route = useRoute()
    const userId = route.params.id
    const usernameRef = ref('');
    const messageRef = ref('');
    const feedback = ref('');
    const canSendMssg = ref(false);

    const InputMssges = () => {
      if (messageRef.value.length > 0) {
        canSendMssg.value = true
      } else {
        canSendMssg.value = false
      }
      if (messageRef.value.length > 250) {
        canSendMssg.value = false
      }
      
    }
    const handleAnonyMssg = async () => {
      const username = await getReceiverName(userId)
      usernameRef.value = username.value
    }
    handleAnonyMssg()

    const submitMssg = async () => {
      if (!messageRef.value) {
        feedback.value = 'Message cannot be empty'
        setTimeout(() => {
          feedback.value = ''
        },2000);
        return
      }
      if (messageRef.value.length > 250) {
        return (feedback.value = 'Message cannot be more than 250 chars long.')
      }

      feedback.value = 'Sending...'

      try {
        const mssg = await sendAnonyMssg(userId, messageRef) // Call sendAnonyMssg function
        console.log(mssg)
        feedback.value = mssg.success // Display success message
      } catch (error) {
        console.error(error) // Log the error to console
        if (error.error) {
          feedback.value = error.error // Display the error message
        } else {
          feedback.value = 'An error occurred while sending the message'
        }
      }

      messageRef.value = ''
    }

    return {
      usernameRef,
      messageRef,
      feedback,
      canSendMssg,
      InputMssges,
      submitMssg
    }
  }
}
</script>

<style scoped>
header {
  position: fixed;
  top: 0;
  width: min(100%, 1300px);
  transform: translateX(-50%);
  left: 50%;
  z-index: 5;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1em;
  background: var(--color-background);
}

header h1 {
  text-transform: capitalize;
  font-weight: 900;
  font-size: 2em;
  color: var(--text-color);
}

header a {
  font-weight: 800;
  text-transform: capitalize;
  text-decoration: none;
  background-color: var(--vt-c-black);
  color: var(--vt-c-white);
  display: inline-block;
  padding: 0.7em 1.7em;
  border-radius: 0.5em;
}

.container {
  margin: 10% auto 0;
  width: min(98%, 40rem);
  background: rgb(108, 174, 182);
  background: radial-gradient(
    circle,
    rgba(108, 174, 182, 1) 0%,
    rgba(123, 166, 204, 1) 0%,
    rgba(215, 90, 238, 1) 100%,
    rgba(231, 6, 255, 1) 100%
  );
  text-align: center;
  padding: 0.4em;
  border-radius: 1em;
}

@media (max-width: 800px) {
  .container {
    margin: 15% auto 0;
  }
}

@media (max-width: 500px) {
  .container {
    margin: 20% auto 0;
  }
}
.container-header {
  width: 100%;
}

.container-header h2 {
  font-size: 2em;
  font-weight: 900;
  padding: 1em;
}

.container form {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.container .feedback {
  color: #a80000;
}

.container form textarea {
  outline: none;
  width: min(100%, 30rem);
  min-height: 15rem;
  padding: 1.7em;
  font-weight: 800;
  resize: none;
  background-color: transparent;
  border-radius: 0.6em;
  border: none;
  text-align: left;
  color: var(--vt-c-black);
  font-family: var(--font-family);
}

.container form textarea::placeholder {

  text-align: center;
}

form button {
  width: min(100%, 30rem);
  padding: 0.7em 0;
  background-color: var(--vt-c-black);
  margin: 1em 0;
  outline: none;
  border-radius: 0.4em;
  color: #F1F1F1;
  font-weight: 700;
  font-size: 1.3em;
  text-transform: capitalize;
}

form button:disabled {
  background-color: rgb(211, 208, 208);
  color: #2222;
}

.requestToCreate {
  width: 100%;
  text-align: center;
}

.requestToCreate h5 {

  font-weight: 700;
  font-size: 1.2em;
}

.requestToCreate a {

  text-decoration: none;
  outline: none;
  display: block;
  font-weight: 700;
  margin-top: 0.7em;
  color: var(--vt-c-white);
}
/* 
form button svg {
  fill: var(--vt-c-white);
} */
</style>
