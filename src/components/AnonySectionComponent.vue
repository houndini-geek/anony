<template>
  <main>
    <section id="about">
      <h3>What's Anony 🤔</h3>
      <p>
        Anony is a platform that helps you send and receive anonymous messages with your friends.
        It's a creative way to learn what your friends think and discover the untold truth.
      </p>
    </section>

    <section id="howitswork">
      <h3>How Anony works 🔍</h3>
      <p>
        To use Anony and receive anonymous messages from your friends, you simply need to create an
        Anony account without using any third-party providers such as Google or Facebook. Just sign
        in anonymously.
      </p>
      <RouterLink to="session" v-if="!user">Sign in anonymously</RouterLink>
    </section>

    <section id="safety">
      <h3>Safety 🔐</h3>
      <p>
        Yes, it's safe to use Anony. We don't sell your personal data or use third-party cookies to
        track your online activities. Anonymous messages from your friends are secured, and you
        don't need to provide any personal information to use Anony.
      </p>
    </section>
  </main>
</template>

<script>
export default {
  props: ['user']
}
</script>

<style scoped>
main {
  width: 100%;
  margin: 10% auto 0;
  text-align: center;
}

main section {
  width: 100%;
  margin: 8em 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1em;
}

section h3 {
  font-size: 2em;
  font-weight: 800;
  
}

section p {
  font-weight: 500;
  font-size: 1.1em;
  width: min(98%,35rem);
  text-align: center;
}

section a {
  font-weight: 500;
  text-transform: capitalize;
  text-decoration: none;
  background: rgb(255, 95, 165);
  background: linear-gradient(
    90deg,
    rgba(255, 95, 165, 1) 0%,
    rgba(206, 107, 187, 1) 0%,
    rgba(177, 114, 200, 1) 0%,
    rgba(177, 114, 200, 1) 0%,
    rgba(221, 103, 180, 1) 40%,
    rgba(137, 124, 218, 1) 100%,
    rgba(231, 101, 176, 1) 100%,
    rgba(51, 145, 255, 1) 100%
  );
  color: var(--vt-c-white);
  display: inline-block;
  padding: 0.7em 1.7em;
  border-radius: 0.5em;
}


</style>
