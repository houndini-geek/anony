import { createRouter, createWebHistory } from 'vue-router'
 import HomeView from '../views/HomeView.vue'
 import SessionView from '../views/SessionView.vue'
 import InboxView from '../views/InboxView.vue'
 import RoomView from '../views/RoomView.vue'
import SendMessageView from '../views/SendMessageView.vue'

// const InboxView = () => import('../views/InboxView.vue')
// const SendMessageView = () => import('../views/SendMessageView.vue')
// const SessionView = () => import('../views/SessionView.vue')
//const HomeView = () => import('../views/HomeView.vue')
// const RoomView = () => import('../views/RoomView.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/session',
      name: 'session',
      component: SessionView
    },
    {
      path: '/inbox',
      name: 'Inbox',
      component: InboxView,
      props: true
    },
    {
      path: '/send/:id',
      name: 'SendMessage',
      component: SendMessageView,
      props: true
    },
    {
      path: '/room',
      name: 'Room',
      component: RoomView,
      props: true
    }
  ]
})

export default router
