<template>
  <HeaderComponentVue  :user="isUser"/>
  <BannerComponentVue :user="isUser"/>
  <anonySectionComponentVue />
  <FaQComponentVue />
</template>

<script>
import FaQComponentVue from '../components/FaQComponent.vue'
import AnonySectionComponentVue from '../components/AnonySectionComponent.vue'
import BannerComponentVue from '../components/BannerComponent.vue'
import HeaderComponentVue from '../components/HeaderComponent.vue'

import { checkUser } from '../composables/userParams.js'
import { ref } from 'vue'


export default {
  components: { HeaderComponentVue, BannerComponentVue, AnonySectionComponentVue, FaQComponentVue },

  setup(){

    const isUser = ref(false)
    const handleUserState = async () => {
      const user = await checkUser()
      isUser.value = user.value
      
    }
    handleUserState()
    return {
      isUser
    }
  }
}
</script>

<style></style>
