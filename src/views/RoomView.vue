<template>
  <main>
    <header v-if="isRoomOpen">
      <div class="room_details">
        <h1>{{ hostRef || 'Anony' }}'s room</h1>
        <button class="closeRoom" title="Close room" @click="openRoom">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="#000000"
            viewBox="0 0 256 256"
          >
            <path
              d="M128,24A104,104,0,1,0,232,128,104,104,0,0,0,128,24Zm-8,40a8,8,0,0,1,16,0v64a8,8,0,0,1-16,0Zm8,144A80,80,0,0,1,83.55,61.48a8,8,0,1,1,8.9,13.29,64,64,0,1,0,71.1,0,8,8,0,1,1,8.9-13.29A80,80,0,0,1,128,208Z"
            ></path>
          </svg>
        </button>
        <button class="shareBtn" v-if="isRoomOpen" @click="shareRoomLink">share room link</button> |
        <span>{{ usersRef || 0 }}</span>
      </div>
    </header>
    <div class="noRoomOpenedContainer" v-if="!isRoomOpen">
      <h2>No rooms open, click to create a new room</h2>
      <button @click="openRoom">{{ createRoomSnapRef || 'create new room' }}</button>
    </div>

    <mediaUploaderComponent
      @sendCaptionValue="sendMedia"
      v-if="uploadRequest"
      :fileUrl="fileUrl"
      @closeMedia="closeMedia"
    />

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
import { ref } from 'vue'

import { createRoom } from '../composables/userParams.js'
import mediaUploaderComponent from '../components/MediaUploaderComponent.vue'
export default {
  components: { mediaUploaderComponent },
  setup() {
    const socket = io('http://localhost:3000')
    const roomUrl = ref('')
    const mssg = ref('')
    const messages = ref([])
    const currentUser = ref('')
    const uploadRequest = ref(false)
    const fileUrl = ref('')
    const isRoomOpen = ref(false)
    const hostRef = ref('')
    const usersRef = ref('')
    const createRoomSnapRef = ref('')
    const urlParams = new URLSearchParams(window.location.search)
    const roomId = urlParams.get('room_id')
    const host = urlParams.get('host')
    hostRef.value = host

    socket.on('connect', () => {
      console.log('connected')
    })

    socket.on('socketId', (socket) => {
      currentUser.value = socket
    })

    const openRoom = async () => {
      try {
        const data = await createRoom()
        createRoomSnapRef.value = 'creating room...'
        if (isRoomOpen.value) {
          // Send close room event
          isRoomOpen.value = false
          // console.log(roomId, data.hostId);
          const room = {
            roomId,
            hostId: data.hostId
          }
          socket.emit('closeRoom', room)
          return
        } else {
          socket.emit('openRoom', data)
          isRoomOpen.value = true
          //console.log(data)
        }
      } catch {
        console.log('error')
      }
    }

    socket.on('actionDenied', (mssg) => {
      alert(mssg)
      isRoomOpen.value = true
    })
    const shareRoomLink = () => {
      // copie room link to clipboard
      navigator.clipboard
        .writeText(location.href)
        .then(() => {
          alert('Room link copied to clipboard')
        })
        .catch((err) => {
          console.log(err)
          alert(err)
        })
    }
    socket.on('roomOpenned', (roomData) => {
      const link = `${location.origin}/room/?host=${roomData.host.toLowerCase()}&room_id=${roomData.roomId}`
      roomUrl.value = link
      // console.log(roomUrl.value)
      window.location.href = link
      //console.log(roomData)
      isRoomOpen.value = true
      createRoomSnapRef.value = 'room created'
    })

    socket.on('roomJoined', (numConnectedUsers) => {
      usersRef.value = `${numConnectedUsers} user(s) connected`
    })

    socket.on('roomHost', (hostName) => {
      hostRef.value = hostName
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
          uploadRequest.value = true
          // Set the file URL to display the uploaded image
          fileUrl.value = fileReader.result
        }

        // Read the file as data URL
        fileReader.readAsDataURL(file)
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

    const closeMedia = () => {
      uploadRequest.value = false
      fileUrl.value = ''
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
    // Client-side code
    socket.on('connectionLost', () => {
      // Display a message to prompt the user to refresh the browser
      alert('Connection lost! Please refresh the page.')
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
      hostRef,
      usersRef,
      createRoomSnapRef,
      closeMedia,
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
  /* min-height: 100vh; */
  position: relative;
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
  text-transform: capitalize;
}

.room_details .shareBtn {
  background-color: transparent;
  outline: none;
  font-weight: 700;
  text-transform: capitalize;
}

.closeRoom {
  position: absolute;
  top: 0;
  right: 25%;
  background-color: transparent;
  border: none;
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

.noRoomOpenedContainer {
  width: min(80%, 20rem);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3em;
  width: fit-content;
}
.noRoomOpenedContainer h2 {
  color: var(--text-color);
  text-align: center;
}

.noRoomOpenedContainer button {
  text-transform: capitalize;
  background-color: rgba(78, 180, 193, 1);
  padding: 0.8em 1.7em;
  border-radius: 0.4em;
  font-weight: 500;
  font-size: 1.2em;
  color: var(--text-color);
}

.chats_container {
  width: min(100%, 60rem);
  max-height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  margin: 10% auto 0;
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: flex-start;
  gap: 1em;
  padding: 7em 0.7em 7em 0.7em;
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
  background-color: var(--color-background);
}

form input {
  padding: 1em;
  height: 4.6em;
  border-radius: 0.4em;
  flex-grow: 1;
  font-size: 1em;
  font-weight: 600;
}

form button {
  outline: none;
  height: 3.7em;
  display: flex;
  place-items: center;
  border-radius: 0.4em;
  background: rgb(78, 180, 193);
  background: linear-gradient(90deg, rgba(78, 180, 193, 1) 0%, rgba(255, 6, 228, 1) 100%);
}

form button svg {
  fill: var(--vt-c-white);
}
</style>
