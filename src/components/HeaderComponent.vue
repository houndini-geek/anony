<template>
  <header>
    <h1>anony</h1>
    <nav>
      <RouterLink to="#about">What's Anony</RouterLink>
      <RouterLink to="#howitswork">How its work</RouterLink>
      <RouterLink to="#safety">Safety</RouterLink>
      <RouterLink to="#faq">FAQ</RouterLink>
    </nav>
    <div class="userBtn">
      <RouterLink to="/session"  v-if="!user">sign in</RouterLink>
      <RouterLink to="inbox"     v-else>inbox</RouterLink>
    </div>

    
  </header>
</template>

<script>
export default {
  name: 'HeaderComponent',
  props: ['user'],
  setup() {

    return {

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

nav a {
  text-decoration: none;
  color: var(--text-color);
  font-weight: 600;
  margin: 0 1em;
}

header .userBtn a {
  font-weight: 800;
  text-transform: capitalize;
  text-decoration: none;
  background: rgb(255,95,165);
  background: linear-gradient(90deg, rgba(255,95,165,1) 0%, rgba(177,114,200,1) 91%, rgba(177,114,200,1) 97%, rgba(137,124,218,1) 100%, rgba(231,101,176,1) 100%, rgba(51,145,255,1) 100%);
  color: var(--vt-c-white);
  display: inline-block;
  padding: 0.7em 1.7em;
  border-radius: 0.5em;
}

@media (max-width: 700px) {
  header nav {
    display: none;
  }
}
</style>
