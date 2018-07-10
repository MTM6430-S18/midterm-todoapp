<template>
  <header class="the-header">
    <h1 class="app-title">
      <img class="logo" src="@/assets/logo.png" alt="V">ue Todo
    </h1>
    <p class="current-date">{{ (new Date()).toDateString() }}</p>
  </header>
</template>

<script>

export default {
  name: 'the-header'
}
</script>

<style lang="scss">
.the-header {
  text-align: center;

  .app-title {
    align-items: center;
    display: flex;
    justify-content: center;
    background-color: rgb(102, 97, 97);
    color: #fff;
    height: 3em;
    width: 100%;

    .logo {
      height: 3rem;
      width: auto;
    }
  }

a{
  text-decoration: none;
  color: #232323;
  transition: color 0.3s ease;
}

a:hover{
  color: tomato;
}

.current-date {
    font-size: 1.1em;
  }
}
</style>
