<template>
  <div class="container">
    <b-overlay :show="show" rounded="sm">
      <b-table :busy.sync="isBusy" responsive striped hover :items="items" :fields="fields">
        <template #cell(id)="data">
          <b-dropdown id="dropdown-1" variant="light" text="Ações" class="m-md-2">
            <b-dropdown-item
              @click="editContato(data.item.id)"
            >
              <span class="material-icons">edit</span>Editar contato
            </b-dropdown-item>

            <b-dropdown-item
              @click="confirmarExclusao(data.item.id)"
            >
              <span class="material-icons">delete</span>
              Deletar contato
            </b-dropdown-item>
          </b-dropdown>
        </template>
      </b-table>
    </b-overlay>
  </div>
</template>

<script>
  import Contatos from "../services/contatos"

  export default {
    data() {
      return {
        fields: [
          { key: 'id', label: 'Ações', thStyle: 'width: 10%; text-align: center' },
          { key: 'nome', label: 'Nome', thStyle: 'width: 40%; text-align: left' },
          { key: 'email', label: 'Email', thStyle: 'width: 40%; text-align: left' },
          { key: 'telefone', label: 'Telefone', thStyle: 'width: 10%; text-align: left' },
        ],
        items: [],
        show: true,
        isBusy: false
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
        this.setConfirmationDelete(contatoId);        
      },
      deleteContato(contatoId) {        
        this.isBusy = true;
        Contatos.deletar(contatoId).then(() => {
          this.show = false;
          this.isBusy = false;
          this.setSuccess('Contato deletado!')
          this.getContatos()
        });
      },
      setSuccess(descricao) {
        this.$toast.success(descricao, 'Sucesso', {
          position: 'topRight'
        });
      },
      setError(titulo = 'Erro inesperado!', descricao = null) {
        descricao = descricao ? descricao : 'Ocorre um erro inesperado ao tentar realizar a ação.';

        this.$toast.error(descricao, titulo, {
          position: 'topRight'
        });
      },
      setConfirmationDelete(contatoId) {
        this.$toast.question('Você deseja realmente deletar este contato?', 'Atenção', {
          timeout: 20000,
          close: false,
          overlay: true,
          displayMode: 'once',
          id: 'question',
          zindex: 999,
          position: 'center',
          buttons: [
              ['<button><b>Sim</b></button>', (instance, toast) => {
                this.show = false;
                this.deleteContato(contatoId)
                instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');      
              }, true],
              ['<button>Não</button>', (instance, toast) => {
                  instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');      
              }],
          ],
        });
      }
    }
  }
</script>