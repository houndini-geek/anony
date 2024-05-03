<template>
  <div class="banner">
    <div class="emoji">
      <span>😎</span>
      <span>🤪</span>
    </div>
    <h2>send anonymous messages with your friends</h2>
    <div class="emoji">
      <span>👻</span>
      <span>🧐</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BannerComponent'
}
</script>

<style scoped>
.banner {
  width: min(98%, 240rem);
  height: 65vh;
  height: auto;
  margin: 10% auto 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* background-color: #cdcdcd; */
  background: rgb(238, 174, 202);
  background: radial-gradient(circle, rgba(238, 174, 202, 1) 0%, rgba(148, 187, 233, 1) 100%);
  border-radius: 0.7em;
}

.banner h2 {
  text-transform: capitalize;
  text-align: center;
  line-height: 1.7;
  font-weight: 900;
  font-size: 5vw;
  padding: 0 4em;
}

.emoji {
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.emoji span {
  font-size: 3.8em;
  opacity: 0.7;
}

@media (max-width: 900px) {
  .emoji {
    gap: 25rem;
  }

  .banner {
    margin: 25% auto 0;
  }
}

@media (max-width: 600px) {
  .banner h2 {
    font-size: 10vw;
    width: 100%;
    padding: 0;
  }
  .emoji {
    gap: 10rem;
  }
  .emoji span {
    font-size: 2.2em;
  }
}
</style>
