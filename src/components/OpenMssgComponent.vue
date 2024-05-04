<template>
  <div class="backdrop" @click.self="$emit('closeCard')">
    <div class="card">
      <div class="head">
        <h2>anonymous message</h2>
      </div>
      <p>
        {{ mssg }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OpenMssgComponent',
  props: ['mssg']
}
</script>

<style scoped>
.backdrop {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 7;
  background-color: rgba(3, 3, 3, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
}

.card {
  width: min(80%, 20rem);
  height: fit-content;
  background-color: var(--vt-c-white);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 1em;
  overflow: hidden;
  padding-bottom: 1em;
}

.card .head {
  width: 100%;
  text-align: center;
  background: rgb(78, 180, 193);
  background: linear-gradient(90deg, rgba(78, 180, 193, 1) 0%, rgba(255, 6, 228, 1) 100%);
  border-top-left-radius: 0.3em;
  border-top-right-radius: 0.3em;
}

.head h2 {
  text-transform: capitalize;
  padding: 0.7em;
  font-weight: 600;
}

.card p {
  padding: 0.9em;
  text-align: center;
  font-weight: 500;
}
</style>
