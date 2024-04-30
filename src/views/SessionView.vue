<template>
  <form>
    <h1>Create your Anony account</h1>
    <label for="username">
      <h4>Choose your Anony username</h4>
      <input
        type="text"
        required
        maxlength="10"
        minlength="5"
        id="username"
        v-model="username"
        placeholder="Your Anony username"
      />
    </label>
    <button type="submit">create</button>
  </form>
</template>

<script>

import { ref } from "vue";
import { signIn } from "../composables/userParams.js"

export default {

    setup(){

      const username = ref('');

      const handleSignIn = () => {

        if (!username.value) {
          return feedback.value = 'Please choose your Anony username'
        }


      }


      return {
        username,
        handleSignIn 

      }
    }



}
</script>

<style scoped>
form {
  margin: 15% auto 0;
  width: min(100%, 30rem);
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

form h1 {
  font-weight: 800;
  padding: 1em;
}

form label {
  width: 100%;
  text-align: center;
}

label h4 {
  font-weight: 500;
  padding: 1em;
}

label input {
  outline: none;
  border: none;
  padding: 1em 4em;
  background-color: rgb(209, 209, 209);
  color: var(--text-color);
}

form button {
  width: 50%;
  text-align: center;
  height: 3em;
  display: block;
  text-transform: capitalize;
  font-weight: 700;
  font-size: 1.1em;
  letter-spacing: 0.2em;
  color: var(--vt-c-white);
  background-color: var(--vt-c-black);
  border-radius: 0.5em;
  margin: 5% 0;
}
</style>
