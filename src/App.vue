<template>
  <div id="app">
    <b-navbar type="dark" class="row" variant="dark">
      <div class="col-4 col-md-4" style="line-height: 1.5;">
        <a href="https://www.linkedin.com/in/diioliiver/">Linkedin</a><br>
        <a href="https://github.com/DiiOliiver">Github</a>
      </div>

      <span class="col-4 col-md-4">
        <b-navbar-brand to="/">
          <span class="material-icons left-icon-home" title="Página inicial">home</span>
        </b-navbar-brand>
      </span>

      <router-link class="col-4 col-md-4" to="/create">
        <b-button>
          <span class="material-icons" title="Adicionar novo contato">add</span>
        </b-button>
      </router-link>
    </b-navbar>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  .left-icon-home {
    right: auto;
    left: 0;
  }
</style>
