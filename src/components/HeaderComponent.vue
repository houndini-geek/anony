<template>
  <header>
    <h1>anony</h1>
    <nav>
      <RouterLink to="#about">What's Anony</RouterLink>
      <RouterLink to="#howitswork">How its work</RouterLink>
      <RouterLink to="#safety">Safety</RouterLink>
      <RouterLink to="suport">Support</RouterLink>
    </nav>
    <RouterLink to="session">sign in</RouterLink>
  </header>
</template>

<script>
export default {
  name: 'HeaderComponent'
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

header > a {
  font-weight: 800;
  text-transform: capitalize;
  text-decoration: none;
  background-color: var(--vt-c-black);
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
