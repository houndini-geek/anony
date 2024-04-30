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
      <RouterLink to="session">Sign in anonymously</RouterLink>
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
export default {}
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
}

section h3 {
  font-size: 3.5vw;
  font-weight: 800;
  padding: 0.2em 0;
}

section p {
  font-weight: 700;
  font-size: 1.7vw;
  padding: 0 14em;
  margin: 1.5em 0;
  text-align: center;
}

section a {
  font-weight: 500;
  text-transform: capitalize;
  text-decoration: none;
  background-color: var(--vt-c-black);
  color: var(--vt-c-white);
  display: inline-block;
  padding: 0.7em 1.7em;
  border-radius: 0.5em;
}

@media (max-width: 600px) {
  section h3 {
    padding: 0;
    font-size: 7vw;
  }
}

@media (max-width: 600px) {
  section p {
    padding: 0;
    font-size: 3.5vw;
  }
}
</style>
