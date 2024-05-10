<template>
  <main>
    <header>
      <div class="room_details">
        <h1>Houndini's room</h1>
        <button class="shareBtn" v-if="isRoomOpen" @click="shareRoomLink">share room link</button>
        <div class="connected_client">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="#000000"
            viewBox="0 0 256 256"
          >
            <path d="M156,128a28,28,0,1,1-28-28A28,28,0,0,1,156,128Z"></path>
          </svg>
          <span>0</span>
        </div>
      </div>
      <button title="Open new room" @click="openRoom" v-if="isUser">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          fill="#000000"
          viewBox="0 0 256 256"
        >
          <path
            d="M124,128V48a4,4,0,0,1,8,0v80a4,4,0,0,1-8,0Zm54.18-75.35a4,4,0,1,0-4.36,6.7C198.08,75.17,212,100.2,212,128a84,84,0,0,1-168,0c0-27.8,13.92-52.83,38.18-68.65a4,4,0,0,0-4.36-6.7C51.24,70,36,97.44,36,128a92,92,0,0,0,184,0C220,97.44,204.76,70,178.18,52.65Z"
          ></path>
        </svg>
      </button>
    </header>

    <mediaUploaderComponent @sendCaptionValue="sendMedia" v-if="uploadRequest" :fileUrl="fileUrl" />

    <div class="chats_container">
      <div
        class="chat"
        :class="{
          sent: message.socketId === currentUser,
          received: message.socketId !== currentUser
        }"
        v-for="message in messages"
        :key="message.socketId"
      >
        <h5>{{ message.socketId === currentUser ? 'me' : 'anonymous' }}</h5>
        <div class="media" v-if="message.media">
          <img :src="message.media" alt="" />
        </div>
        <p v-if="message.message">{{ message.message }}</p>
      </div>
    </div>

    <form @submit.prevent="submitMssg" v-if="isRoomOpen">
      <input type="text" placeholder="Type your message..." v-model="mssg" required />
      <button type="submit">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="#000000"
          viewBox="0 0 256 256"
        >
          <path
            d="M225.88,30.12a13.83,13.83,0,0,0-13.7-3.58l-.11,0L20.14,84.77A14,14,0,0,0,18,110.85l85.56,41.64L145.12,238a13.87,13.87,0,0,0,12.61,8c.4,0,.81,0,1.21-.05a13.9,13.9,0,0,0,12.29-10.09l58.2-191.93,0-.11A13.83,13.83,0,0,0,225.88,30.12Zm-8,10.4L159.73,232.43l0,.11a2,2,0,0,1-3.76.26l-40.68-83.58,49-49a6,6,0,1,0-8.49-8.49l-49,49L23.15,100a2,2,0,0,1,.31-3.74l.11,0L215.48,38.08a1.94,1.94,0,0,1,1.92.52A2,2,0,0,1,217.92,40.52Z"
          ></path>
        </svg>
      </button>
      <button type="button" title="Send image" @click="createUploadMedia">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="#000000"
          viewBox="0 0 256 256"
        >
          <path
            d="M208,36H48A12,12,0,0,0,36,48V208a12,12,0,0,0,12,12H208a12,12,0,0,0,12-12V48A12,12,0,0,0,208,36ZM44,208V48a4,4,0,0,1,4-4H208a4,4,0,0,1,4,4v87l-31.51-31.52a12,12,0,0,0-17,0L55,212H48A4,4,0,0,1,44,208Zm164,4H66.34L169.17,109.17a4,4,0,0,1,5.66,0L212,146.34V208A4,4,0,0,1,208,212ZM96,116A20,20,0,1,0,76,96,20,20,0,0,0,96,116Zm0-32A12,12,0,1,1,84,96,12,12,0,0,1,96,84Z"
          ></path>
        </svg>
      </button>
    </form>
  </main>
</template>

<script>
import { io } from 'socket.io-client'
import { onMounted, ref } from 'vue'

import { checkUser } from '../composables/userParams.min.js'
import mediaUploaderComponent from '../components/MediaUploaderComponent.vue'
export default {
  components: { mediaUploaderComponent },
  setup() {
   const socket = io('https://anony-server.onrender.com');
    const roomUrl = ref('')
    const mssg = ref('')
    const messages = ref([])
    const currentUser = ref('')
    const uploadRequest = ref(false)
    const fileUrl = ref('')
    const isRoomOpen = ref(false)
    const urlParams = new URLSearchParams(window.location.search)
    const roomId = urlParams.get('room_id');
    const isUser = ref(false)

const handleUserState = async () => {
  const user = await checkUser()
  isUser.value = user.value
}

onMounted(() => {
  handleUserState();
})
    socket.on('connect', () => {
      console.log('connected')
    })

    socket.on('socketId', (socket) => {
      console.log(socket)
      currentUser.value = socket
    })

    const openRoom = () => {
      socket.emit('openRoom')
    }

    const shareRoomLink = () => {
      // copie room link to clipboard
      navigator.clipboard
       .writeText(roomUrl.value)
       .then(() => {
          alert('Room link copied to clipboard')
        })
       .catch((err) => {
          console.log(err);
          alert(err)
        });
    }
    socket.on('roomOpenned', (roomID) => {
      const link = `${location.origin}/room/?room_id=${roomID}`
      roomUrl.value = link
      console.log(roomUrl.value)
      isRoomOpen.value = true
    })

    const submitMssg = () => {
      if (!mssg.value.trim()) {
        return alert('Message cannot be empty')
      }

      if (roomId) {
        const data = {
          roomId,
          socketId: currentUser.value,
          message: mssg.value
        }
        socket.emit('Sendmessage', data)
        mssg.value = ''

        scrollDiv()
      } else {
        alert('Please open a room first')
      }
    }

    const scrollDiv = () => {
      const messageContainer = document.querySelector('.chats_container')
      const lastMessage = messageContainer.lastElementChild
      if (lastMessage) {
        // Wait for the layout to be updated before scrolling
        setTimeout(() => {
          lastMessage.scrollIntoView({ behavior: 'smooth', block: 'end' })
        }, 0)
      }
    }

    const createUploadMedia = () => {
      const inputFile = document.createElement('input')
      inputFile.setAttribute('type', 'file')
      // only accept image file
      inputFile.setAttribute('accept', 'image/*')
      inputFile.click()
      inputFile.onchange = () => {
        const file = inputFile.files[0]
        const fileReader = new FileReader()

        fileReader.onload = () => {
          const blob = new Blob([fileReader.result], { type: file.type })
          uploadRequest.value = true
          // Set the file URL to display the uploaded image
          fileUrl.value = URL.createObjectURL(blob)
        }

        // Read the file as data URL
        fileReader.readAsArrayBuffer(file)
      }
    }

    socket.on('receiveMessage', (mssg) => {
      messages.value.push(mssg)
      scrollDiv()
    })

    const sendMedia = (caption) => {
      const data = {
        roomId,
        socketId: currentUser.value,
        message: caption,
        media: fileUrl.value
      }
      socket.emit('Sendmessage', data)
      scrollDiv()
      fileUrl.value = ''
      uploadRequest.value = false
    }

    if (roomId) {
      isRoomOpen.value = true
      joinRoom(roomId) // Join the room if the room ID is provided
    }

    function joinRoom(roomId) {
      socket.emit('joinRoom', roomId)
    }

    socket.on('roomNotFound', (error) => {
      console.log(error)
      alert(error)
      isRoomOpen.value = false
    })
    socket.on('disconnect', () => {
      console.log('disconnected')
    })

    return {
      openRoom,
      roomUrl,
      submitMssg,
      mssg,
      messages,
      currentUser,
      uploadRequest,
      fileUrl,
      isRoomOpen,
      isUser,
      handleUserState,
      shareRoomLink,
      createUploadMedia,
      sendMedia,
      scrollDiv
    }
  }
}
</script>

<style scoped>
main {
  margin: 0 auto 0;
  width: min(100%, 60rem);
  min-height: 100vh;
}
header {
  position: fixed;
  width: min(100%, 60rem);
  top: 0;
  z-index: 5;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--color-background);
}

.room_details {
  text-align: center;
}

.room_details h1 {
  font-weight: 800;
}

.room_details .shareBtn {
  background-color: transparent;
  outline: none;
  font-weight: 700;
}

.connected_client {
  display: flex;
  align-items: center;
  justify-content: center;
  align-items: center;
}
.connected_client svg {
  fill: rgb(2, 163, 226);
}
header > button {
  background-color: var(--vt-c-black);
  border-radius: 0.5em;
  width: 2em;
  height: 2em;
  display: flex;
  justify-content: center;
  position: absolute;
  right: 10%;
  top: 10%;
}

header > button svg {
  fill: var(--vt-c-white);
}

.chats_container {
  width: min(100%, 60rem);
  max-height: 450px;
  overflow-y: auto;
  margin: 10% auto 0;
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: flex-start;
  gap: 1em;
  padding: 1.3em;
  /* padding-bottom: 15rem;  */
}

::-webkit-scrollbar {
  width: 0.6em;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px rgba(78, 180, 193, 0.5);
  border-radius: 9999px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: rgb(78, 180, 193);
  border-radius: 9999px;
}

.chat {
  /* width: min(100%,40rem); */
  width: fit-content;
  background-color: rgba(183, 185, 190, 0.2);
  border: 1px outset rgba(78, 180, 193, 0.4);
  padding: 1em;
  border-radius: 0.7em;
}

.chat .media {
  width: 20rem;
  height: 20rem;
  padding: 0.4em;
  overflow: hidden;
  border-radius: 0.7em;
}

.chat .media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.chat h5 {
  font-weight: 500;
  font-size: 1.1rem;
  color: var(--text-color);
  text-transform: capitalize;
  padding: 0.4em;
}

.chat p {
  font-size: 1rem;
  color: var(--text-color);
  font-weight: 400;
  padding: 0.6em 0;
  /* background-color: rgba(3,3,3,0.3); */
  background: rgb(78, 180, 193);
  background: linear-gradient(90deg, rgba(78, 180, 193, 1) 0%, rgba(255, 6, 228, 1) 100%);
  padding: 0.7em;
  border-radius: 0.5em;
}

.chat.sent {
  margin-left: auto;
}
.chat.sent p {
  text-align: right;
  text-align-last: left;
}
.chat.sent h5 {
  text-align: right;
}

.chat.received {
  text-align: left;
  margin-right: auto;
}

form {
  position: fixed;
  width: min(100%, 60rem);
  bottom: 0;
  z-index: 1;
  left: 50%;
  transform: translateX(-50%);
  padding: 1em;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.3em;
}

form input {
  padding: 1em;
  height: 4.6em;
  border-radius: 0.4em;
  flex-grow: 1;
}

form button {
  outline: none;
  height: 2.7em;
  width: 2.7em;
  display: flex;
  place-items: center;
  /* padding: 0 1em; */
  border-radius: 0.4em;
  background-color: var(--vt-c-black);
}

form button svg {
  fill: var(--vt-c-white);
}
</style>
