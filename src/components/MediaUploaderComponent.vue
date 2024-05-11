<template>
  <div class="backdrop">
    <form @submit.prevent="$emit('sendCaptionValue', captionValue)">
      <div class="media">
        <img :src="fileUrl" />
      </div>
      <input type="text" v-model="captionValue" id="" placeholder="Add media description." />
      <div class="actions">
        <button type="button" @click="$emit('closeMedia')">cancel</button>
        <button type="submit">upload</button>
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'MediaUploaderComponent',
  props: ['fileUrl'],
  setup() {
    const captionValue = ref('')

    return {
      captionValue
    }
  }
}
</script>

<style scoped>
.backdrop {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(3, 3, 3, 0.8);
  z-index: 5;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: fit-content;
  gap: 0.7em;
}

.media {
  width: 20rem;
  height: 20rem;
  border-radius: 0.3em;
  overflow: hidden;
}

.media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

form input {
  outline: none;
  width: 100%;
  height: 4em;
  padding: 0.3em;
  border-radius: 0.3em;
}

form .actions {
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 1em;
}

form .actions button {
  text-transform: capitalize;
  font-size: 1.3em;
  padding: 0.4em 1em;
  border-radius: 0.3em;
  background-color: transparent;
  color: var(--vt-c-white);
}

.actions button[type='submit'] {
  background-color: rgba(78, 180, 193, 1);
}
</style>
