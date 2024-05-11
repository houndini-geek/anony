// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js'

import {
  getAuth,
  signInAnonymously,
  onAuthStateChanged
} from 'https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js'

import {
  getFirestore,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc
} from 'https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js'

import { v4 as uuidv4 } from 'https://jspm.dev/uuid'

import { ref } from 'vue'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCRPxwRZezkFcsPuojLK_258hTY1s2BfKk',
  authDomain: 'listify-5fd65.firebaseapp.com',
  projectId: 'listify-5fd65',
  storageBucket: 'listify-5fd65.appspot.com',
  messagingSenderId: '54858603391',
  appId: '1:54858603391:web:52d177eb7648cf684f584a',
  measurementId: 'G-B4C45TZBWC'
}

initializeApp(firebaseConfig)
const auth = getAuth()
const db = getFirestore()

async function signIn(username) {
  const anonyName = username.value
  const mssg = ref('')
  if (!anonyName) return

  await signInAnonymously(auth)
    .then(() => {
      createUser(anonyName)
    })
    .catch((error) => {
      console.log(error.message)
      mssg.value = 'Failed to create Anony account' + ' ' + error.message
    })

  return { mssg }
}

async function createUser(user) {
  //Get current user Id
  const uid = auth.currentUser.uid
  const username = user

  if (!username) {
    return alert('Anony username required')
  }

  if (!uid) {
    return
  }

  try {
    const colRef = collection(db, 'users')
    const docRef = doc(colRef, uid)
    const snapRef = await getDoc(docRef)
    if (snapRef.exists()) {
      console.log('User already exists')
      alert('User already exists')
      return
    }
    await setDoc(docRef, {
      username: username,
      uid: uid,
      messages: []
    })
    console.log('User created successfully')
    alert('User created successfully')

    setTimeout(() => {
      location.href = '/inbox'
    }, 2000)
    return
  } catch (error) {
    console.log(error.message)
    alert('Failed to create user' + ': ' + error.message)
  }
}

async function getUserData() {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, async (userState) => {
      if (userState) {
        const uid = userState.uid
        const colRef = collection(db, 'users')
        const docRef = doc(colRef, uid)
        const snapshot = await getDoc(docRef)

        if (snapshot.exists()) {
          const userData = snapshot.data()
          resolve(userData)
        } else {
          console.log('Doc not found.')
          alert('Error occured while triying to retrive your data, Create a new Anony acccount')
          reject('Doc not found')
          //Redirect to session page
          location.href = '/session'
          return
        }
      } else {
        console.log('User does not exist')
        alert('User does not exist')
        reject('User does not exist')
        location.href = '/session'
        return
      }
    })
  })
}

async function deleteMssg(mssgId) {
  const uid = auth.currentUser.uid
  if (!uid) {
    return alert('An error occurred. Please try refreshing the page.')
  }

  return new Promise((resolve, reject) => {
    const colRef = collection(db, 'users')
    const docRef = doc(colRef, uid)

    getDoc(docRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data()
          const messages = data.messages

          if (!messages) {
            reject({ error: 'No messages found.' })
            return alert('No messages found.')
          }

          const newMessages = messages.filter((mssg) => mssg.id !== mssgId)

          if (newMessages.length < messages.length) {
            updateDoc(docRef, { messages: newMessages })
              .then(() => {
                resolve({ success: 'Message deleted successfully.' })
                alert('Message deleted successfully!')
              })
              .catch((error) => {
                reject({ error: 'An error occurred while deleting the message.' + error })
                alert('An error occurred while deleting the message.')
              })
          } else {
            reject({ error: 'Message not found.' })
            alert('Message not found.')
          }
        } else {
          reject({ error: 'User document not found.' })
          alert('An error occurred. Please try refreshing the page.')
        }
      })
      .catch((error) => {
        reject({ error: 'An error occurred while fetching user data.' + error })
        alert('An error occurred while fetching user data.')
      })
  })
}

async function getReceiverName(uid) {
  const receiverId = uid
  const usernameRef = ref('')
  if (!receiverId) {
    return alert('Anony user not found')
  }

  return new Promise((resolve, reject) => {
    const colRef = collection(db, 'users')
    const docRef = doc(colRef, receiverId)

    getDoc(docRef).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data().username
        usernameRef.value = data
        resolve(usernameRef)
      } else {
        reject('Cannot find the user doc')
      }
    })
  })
}

function getCurrentDate() {
  const options = {
    weekday: 'short',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  }
  return new Date().toLocaleDateString('en-US', options)
}

async function sendAnonyMssg(uid, mssg) {
  const receiverId = uid
  const message = mssg.value
  if (!receiverId || !message) {
    return
  }

  return new Promise((resolve, reject) => {
    const colRef = collection(db, 'users')
    const docRef = doc(colRef, receiverId)
    getDoc(docRef).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data()
        const messages = data.messages || []
        messages.push({ message, id: uuidv4(), date: getCurrentDate() })
        updateDoc(docRef, {
          messages: messages
        })
          .then(() => {
            resolve({ success: 'Your Anonymous message has been sent succesfuly' })
            console.log('sent')
          })
          .catch((error) => {
            reject(error.message)
            console.log(error.message)
          })
      } else {
        reject({ error: 'An error occurred while sending the message' })
      }
    })
  })
}

async function checkUser() {
  return new Promise((resolve) => {
    const isUser = ref(false)

    onAuthStateChanged(auth, (user) => {
      if (user) {
        isUser.value = true
        resolve(isUser)
      } else {
        console.log('User not authenticated');
        alert('User not authenticated.')
      }
    })
  })
}

async function createRoom() {
  const uid = auth.currentUser.uid
  if (!uid) return

  return new Promise((resolve, reject) => {
    const colRef = collection(db, 'users')
    const docRef = doc(colRef, uid)
    getDoc(docRef).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data()
        const { uid, username } = data
        resolve({ hostId: uid, host: username })
      } else {
        reject('Cannot get user doc!')
      }
    })
  })
}

export {
  signIn,
  createUser,
  getUserData,
  getReceiverName,
  sendAnonyMssg,
  checkUser,
  deleteMssg,
  createRoom
}
