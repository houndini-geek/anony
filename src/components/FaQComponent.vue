<template>
  <section id="faq">
    <h3>FAQ 🤓</h3>
    <div>
      <h4>Is Anony free to use?</h4>
      <p>Yes Anony is free to use, Just have fun with friends.</p>
    </div>
    <div>
      <h4>Can i create multiple Anony account?</h4>
      <p>
        No, you can't create multiple Anony accounts. If you sign in with another browser, you'll
        have a new account and a new Anony link
      </p>
    </div>
    <div>
      <h4>Can i delete my Anony account?</h4>
      <p>
        Yes, you can delete your Anony account. Once your Anony account is deleted, you lose all
        your messages, so please be certain.
      </p>
    </div>
    <div>
      <h4>Can i recover my Anony account?</h4>
      <p>
        No, a deleted Anony account can't be recovered once deleted. Simply create a new Anony
        account, and you're ready to go
      </p>
    </div>
  </section>
</template>

<script>
export default {}
</script>

<style scoped>
section {
  width: min(98%, 40rem);
  margin: 10% auto 3%;
  text-align: center;
  background: rgb(133, 183, 189);
  background: linear-gradient(90deg, rgba(133, 183, 189, 1) 0%, rgba(244, 130, 231, 1) 100%);
  border-radius: 0.7em;
  padding: 2em;
}

section h3 {
  font-weight: 900;
  font-size: 2.4em;
  text-transform: capitalize;
  padding: 1em;
}

section div {
  width: 100%;
  text-align: left;
  margin: 1em 0;
  /* padding: 2em; */
}

section div h4 {
  font-weight: 700;
  font-size: 1.4em;
  text-transform: capitalize;
  padding: 0.6em 0;
}

section div p {
  font-weight: 400;
  font-size: 1.1em;
  text-align-last: left;
  word-wrap: wrap;
}
</style>
