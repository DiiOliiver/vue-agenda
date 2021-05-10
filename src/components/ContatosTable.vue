<template>
  <div class="container">
    <b-overlay :show="show" rounded="sm">
      <b-table responsive striped hover :items="items" :fields="fields">
        <template #cell(id)="data">
          <b-button type="button" class="btn-sm" @click="editContato(data.item.id)" variant="info">
            <span class="material-icons">edit</span>
          </b-button>
          <b-button type="button" class="btn-sm" @click="confirmarExclusao(data.item.id)" variant="danger">
            <span class="material-icons">delete</span>
          </b-button>
        </template>
      </b-table>
    </b-overlay>
  </div>
</template>

<script>
  import Contatos from "../services/contatos"
  import iziToast from "vue-izitoast"

  export default {
    data() {
      return {
        fields: [
          { key: 'id', label: 'Ações' },
          { key: 'nome', label: 'Nome' },
          { key: 'email', label: 'Email' },
          { key: 'telefone', label: 'Telefone' },
        ],
        items: null,
        show: true
      }
    },
    mounted() {
        this.getContatos()
    },
    methods: {
      async getContatos() {
        const { data: contatos } = await Contatos.listar();
        this.items = contatos;
        this.show = false;
      },
      editContato(contatoId) {  
        return this.$router.push({ path: `/edit/${contatoId}` })
      },
      confirmarExclusao(contatoId) {
        this.show = true;
        this.deleteContato(contatoId)
      },
      deleteContato(contatoId) {
        Contatos.deletar(contatoId);
        this.show = false;
        alert('Deletado com sucesso');
        window.location.reload();
      }
    }
  }
</script>