<template>
  
  <header>
    <h1>anony</h1>
    <button>
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M128,84a44,44,0,1,0,44,44A44.05,44.05,0,0,0,128,84Zm0,80a36,36,0,1,1,36-36A36,36,0,0,1,128,164Zm83.93-32.49q.13-3.51,0-7l15.83-19.79a4,4,0,0,0,.75-3.53A103.64,103.64,0,0,0,218,75.9a4,4,0,0,0-3-2l-25.19-2.8c-1.58-1.71-3.24-3.37-4.95-4.95L182.07,41a4,4,0,0,0-2-3A104,104,0,0,0,154.82,27.5a4,4,0,0,0-3.53.74L131.51,44.07q-3.51-.14-7,0L104.7,28.24a4,4,0,0,0-3.53-.75A103.64,103.64,0,0,0,75.9,38a4,4,0,0,0-2,3l-2.8,25.19c-1.71,1.58-3.37,3.24-4.95,4.95L41,73.93a4,4,0,0,0-3,2A104,104,0,0,0,27.5,101.18a4,4,0,0,0,.74,3.53l15.83,19.78q-.14,3.51,0,7L28.24,151.3a4,4,0,0,0-.75,3.53A103.64,103.64,0,0,0,38,180.1a4,4,0,0,0,3,2l25.19,2.8c1.58,1.71,3.24,3.37,4.95,4.95l2.8,25.2a4,4,0,0,0,2,3,104,104,0,0,0,25.28,10.46,4,4,0,0,0,3.53-.74l19.78-15.83q3.51.13,7,0l19.79,15.83a4,4,0,0,0,2.5.88,4,4,0,0,0,1-.13A103.64,103.64,0,0,0,180.1,218a4,4,0,0,0,2-3l2.8-25.19c1.71-1.58,3.37-3.24,4.95-4.95l25.2-2.8a4,4,0,0,0,3-2,104,104,0,0,0,10.46-25.28,4,4,0,0,0-.74-3.53Zm.17,42.83-24.67,2.74a4,4,0,0,0-2.55,1.32,76.2,76.2,0,0,1-6.48,6.48,4,4,0,0,0-1.32,2.55l-2.74,24.66a95.45,95.45,0,0,1-19.64,8.15l-19.38-15.51a4,4,0,0,0-2.5-.87h-.24a73.67,73.67,0,0,1-9.16,0,4,4,0,0,0-2.74.87l-19.37,15.5a95.33,95.33,0,0,1-19.65-8.13l-2.74-24.67a4,4,0,0,0-1.32-2.55,76.2,76.2,0,0,1-6.48-6.48,4,4,0,0,0-2.55-1.32l-24.66-2.74a95.45,95.45,0,0,1-8.15-19.64l15.51-19.38a4,4,0,0,0,.87-2.74,77.76,77.76,0,0,1,0-9.16,4,4,0,0,0-.87-2.74l-15.5-19.37A95.33,95.33,0,0,1,43.9,81.66l24.67-2.74a4,4,0,0,0,2.55-1.32,76.2,76.2,0,0,1,6.48-6.48,4,4,0,0,0,1.32-2.55l2.74-24.66a95.45,95.45,0,0,1,19.64-8.15l19.38,15.51a4,4,0,0,0,2.74.87,73.67,73.67,0,0,1,9.16,0,4,4,0,0,0,2.74-.87l19.37-15.5a95.33,95.33,0,0,1,19.65,8.13l2.74,24.67a4,4,0,0,0,1.32,2.55,76.2,76.2,0,0,1,6.48,6.48,4,4,0,0,0,2.55,1.32l24.66,2.74a95.45,95.45,0,0,1,8.15,19.64l-15.51,19.38a4,4,0,0,0-.87,2.74,77.76,77.76,0,0,1,0,9.16,4,4,0,0,0,.87,2.74l15.5,19.37A95.33,95.33,0,0,1,212.1,174.34Z"></path></svg>
    </button>
  </header>
  <div class="banner">
    <h5 v-if="!usernameRef">Fetching username...</h5>
    <h2 v-else> Hello, {{ usernameRef }}</h2>
    <button @click="shareLink"> {{ userURL  || 'Loading shareable link...'}}</button>
  </div>

  <nav>
    <RouterLink :to="{ name : 'Inbox'}" class="active">Messages</RouterLink>
      <RouterLink to="/room">Room</RouterLink>
  </nav>

  <div class="messages">
    <div v-if="!messagesRef.length">
      <h5>You do not have anonymous messages, Copy the Link and share it with your friends</h5>
    </div>

    <div class="message" v-for="message in messagesRef" :key="message.id">
      <div class="message-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M136,128a8,8,0,1,1-8-8A8,8,0,0,1,136,128Zm-52-8a8,8,0,1,0,8,8A8,8,0,0,0,84,120Zm88,0a8,8,0,1,0,8,8A8,8,0,0,0,172,120Zm56,8A100,100,0,0,1,79.5,215.47l-35.69,11.9a12,12,0,0,1-15.18-15.18l11.9-35.69A100,100,0,1,1,228,128Zm-8,0A92,92,0,1,0,48.35,174.07a4,4,0,0,1,.33,3.27L36.22,214.72a4,4,0,0,0,5.06,5.06l37.38-12.46a3.93,3.93,0,0,1,1.27-.21,4.05,4.05,0,0,1,2,.54A92,92,0,0,0,220,128Z"></path></svg>
      </div>
      <div class="message-content">
        <h5>{{ message.date }}</h5>
        <div class="message-data">
          <p>
            {{ message.message }}
          </p>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import { getUserData } from '../composables/userParams.js';

export default {

  setup() {

    const usernameRef = ref('');
    const messagesRef = ref([]);
    const userURL = ref('');
    const handleUserData = async () => {

      const data = await getUserData();
      //console.log(data)
      usernameRef.value = data.username;
      messagesRef.value = data.messages;
      userURL.value = location.origin + "/send/" + data.uid
  
    }


    const shareLink = () => {
  const username = usernameRef.value;
  const url = userURL.value;

  const message = `I'm on Anony as ${username}. Send me an anonymous message here: ${url}`;

  if (navigator.canShare) {
    navigator.share({
      title: 'Send me an anonymous message',
      text: `Send an anonymous message to ${username}`,
      url: url
    }).catch(() => {
      fallbackCopyToClipboard(message);
    });
  } else {
    fallbackCopyToClipboard(message);
  }
};


const fallbackCopyToClipboard = (text) => {
  alert("Your browser doesn't support sharing. Link copied to clipboard.");
  navigator.clipboard.writeText(text).then(() => {
    console.log('Link copied to clipboard:', text);
  }).catch((err) => {
    console.error('Failed to copy link to clipboard: ', err);
  });
};


    onMounted(async () => {
     await handleUserData();
    
    })
    return {
      usernameRef,
      messagesRef,
      userURL,
      shareLink
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

header button {

  background-color: var(--vt-c-black);
  border-radius: 0.4em;
  display: grid;
  align-items: center;
}

header button svg {
  width: 2em;
  height: 2em;
  fill: var(--vt-c-white);
}

.banner {

  margin: 10% auto 0 ;
  width: 100%;
  text-align: center;
}

.banner h2 {
  text-transform: capitalize;
  text-align: center;
  line-height: 1.7;
  font-weight: 900;
  font-size: 5vw;
  padding: 0 4em;
}

.banner button {

  background-color: transparent;
  color: var(--text-color);
  width: min(80%,30rem);
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}




@media (max-width: 900px) {

  .banner {
    margin: 18% auto 0;
  }
}

@media (max-width: 600px) {
  .banner h2 {
    font-size: 10vw;
    width: 100%;
    padding: 0;
  }
}








nav {

  width: 100%;
  margin: 5% auto 0;
  text-align: center;
}

nav a {

  text-decoration: none;
  outline: none;
  margin: 0 1em;
  background-color: #C8C8C8;
  color: var(--vt-c-black);
  padding: 0.7em 1.5em;
  border-radius: 0.3em;
}
nav a.router-link-exact-active {

  background-color: var(--vt-c-black);
  color: var(--vt-c-white);
}

.messages {

  width: 100%;
  margin: 15% auto 0;
  text-align: center;
  display: grid;
  grid-gap: 0.7em;
  justify-content: center;
  grid-template-columns: repeat(auto-fit,minmax(20rem,15rem));
}

.message {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 1em;
}

.message .message-content {

  width: 100%;
  text-align: left;
}

.message-content h5 {

  font-weight: 600;
  font-size: 0.7em;
}

.message-data {

  width: 100%;
  padding: 0.4em 0;
}

.message-data p {
  width: 100%;
  word-break: break-all;
  font-weight: 500;
  color: var(--text-color);
}

</style>