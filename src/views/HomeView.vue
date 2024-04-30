<template>
  <HeaderComponentVue />
  <BannerComponentVue />
  <anonySectionComponentVue />
  <FaQComponentVue />
</template>

<script>
import FaQComponentVue from '../components/FaQComponent.vue'
import AnonySectionComponentVue from '../components/AnonySectionComponent.vue'
import BannerComponentVue from '../components/BannerComponent.vue'
import HeaderComponentVue from '../components/HeaderComponent.vue'

export default {
  components: { HeaderComponentVue, BannerComponentVue, AnonySectionComponentVue, FaQComponentVue }
}
</script>

<style></style>
