<template>
 <header>
    <h1>anony</h1>
    <RouterLink to="/session">Sign in</RouterLink>
 </header>

 <div class="container">
    <div class="container-header">
        <h2 v-if="usernameRef">
            Send an anonymous message to {{ usernameRef || '......'}}
        </h2>
        <h4 v-else>
            User not found.
        </h4>
        <span class="feedback"> {{ feedback }}</span>
    </div>
    <form @submit.prevent="submitMssg">
        <textarea placeholder="Type your anonymous message" v-model="messageRef" maxlength="250"></textarea>
        <button type="submit">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M224.47,31.52a11.87,11.87,0,0,0-11.82-3L20.74,86.67a12,12,0,0,0-1.91,22.38L105,151l41.92,86.15A11.88,11.88,0,0,0,157.74,244c.34,0,.69,0,1,0a11.89,11.89,0,0,0,10.52-8.63l58.21-192,0-.08A11.85,11.85,0,0,0,224.47,31.52Zm-4.62,9.54-58.23,192a4,4,0,0,1-7.48.59l-41.3-84.86,50-50a4,4,0,1,0-5.66-5.66l-50,50-84.9-41.31a3.88,3.88,0,0,1-2.27-4,3.93,3.93,0,0,1,3-3.54L214.9,36.16A3.93,3.93,0,0,1,216,36a4,4,0,0,1,2.79,1.19A3.93,3.93,0,0,1,219.85,41.06Z"></path></svg>
        </button>
    </form>
 </div>
</template>

<script>

import { useRoute } from 'vue-router';
import { sendAnonyMssg, getReceiverName } from '../composables/userParams.js'
import { ref } from 'vue';


export default {
    props: ['id'],
    setup() {

    const route = useRoute()
    const userId = route.params.id
    const usernameRef = ref('');
    const messageRef = ref('');
    const feedback = ref('');
   
    const handleAnonyMssg = async () => {
       const username = await getReceiverName(userId);
       usernameRef.value = username.value
      
    }
    handleAnonyMssg();

    const submitMssg = async () => {
  if (!messageRef.value) {
    feedback.value = 'Message cannot be empty';
    return;
  }
  if(messageRef.value.length > 250) {
    return feedback.value = 'Message cannot be more than 250 chars long.'
  }
  
  feedback.value = 'Sending...';
  
  try {
    const mssg = await sendAnonyMssg(userId, messageRef); // Call sendAnonyMssg function
    console.log(mssg);
    feedback.value = mssg.success; // Display success message
  } catch (error) {
    console.error(error); // Log the error to console
    if (error.error) {
      feedback.value = error.error; // Display the error message
    } else {
      feedback.value = 'An error occurred while sending the message';
    }
  }
  
  messageRef.value = '';
};


        return {
            usernameRef,
            messageRef,
            feedback,
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
    width: min(98%,40rem);
    background: rgb(108,174,182);
    background: radial-gradient(circle, rgba(108,174,182,1) 0%, rgba(123,166,204,1) 0%, rgba(215,90,238,1) 100%, rgba(231,6,255,1) 100%);
    text-align: center;
    padding: 0.4em;
    border-radius: 1em;
}

@media (max-width: 800px) {
  .container {
    margin:15% auto 0 ;
  }
}

@media (max-width: 500px) {

  .container {
    margin: 20% auto 0
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
    width: min(100%,30rem);
    min-height: 15rem;
    padding: 0.7em;
    font-weight: 500;
    resize: none;
    background-color: transparent;
    border-radius: 0.6em;
    border: none;
    text-align: center;
    color: var(--vt-c-black);
   
}

form button {
    width: min(100%,30rem);
    padding: 0.4em 0;
    background-color: var(--vt-c-black);
    margin: 1em 0;
    outline: none;
    border-radius: 0.4em;
}

form button svg {

    fill: var(--vt-c-white);
}
</style>