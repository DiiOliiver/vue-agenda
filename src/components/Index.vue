<template>
  <div>
    <contatos-table/>
  </div>
</template>

<script>
import ContatosTable from "./ContatosTable";

export default {
  data () {
    return {
      
    }
  },
  components: {
    'contatos-table': ContatosTable
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
