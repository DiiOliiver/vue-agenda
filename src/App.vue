<template>
  <div id="app">
    <b-navbar type="dark" class="row" variant="dark">
      <div class="col-2 col-md-2">      
        <b-avatar src="https://github.com/DiiOliiver.png" class="mr-3 right"></b-avatar>
      </div>
      <div class="col-2 col-md-2" style="line-height: 1.5;">
        <a href="https://www.linkedin.com/in/diioliiver/" target="_blanck" class="left">Linkedin</a><br>
        <a href="https://github.com/DiiOliiver" target="_blanck" class="left">Github</a>
      </div>

      <span class="col-4 col-md-4">
        <b-iconstack font-scale="3" class="mt-4">
          <b-navbar-brand to="/" v-b-tooltip.hover title="Página inicial">
              <b-icon stacked icon="circle-fill" variant="secondary"></b-icon>
              <b-icon stacked icon="house-door" scale="0.5" variant="white"></b-icon>
              <b-icon stacked icon="circle" variant="white"></b-icon>
          </b-navbar-brand>
        </b-iconstack>
      </span>

      <router-link class="col-4 col-md-4" to="/create">
        <b-button>
          <span class="material-icons" v-b-tooltip.hover title="Adicionar novo contato">add</span>
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
