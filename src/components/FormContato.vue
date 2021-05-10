<template>
  <div class="container">
    <b-overlay :show="loading" rounded="sm">
      <b-card class="mt-3" :header="title + 'usuários'">
        <b-form class="row" @submit="onSubmit" @reset="onReset">
          <b-form-group
            class="col-4 col-md-4"
            id="contato-group-nome"
            label="Nome do contato:"
            label-for="contato-nome"
          >
            <b-form-input
              id="contato-nome"
              type="text"
              v-model="contato.nome"
              placeholder="Informe o nome"
              required
            ></b-form-input>
          </b-form-group>
          
          <b-form-group
            class="col-4 col-md-4"
            id="contato-group-email"
            label="Email do contato:"
            label-for="contato-email"
          >
            <b-form-input
              id="contato-email"
              type="email"
              v-model="contato.email"
              placeholder="Informe o email"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            class="col-4 col-md-4"
            id="contato-group-telefone"
            label="Telefone do contato:"
            label-for="contato-telefone"
          >
            <b-form-input
              id="contato-telefone"
              type="text"
              v-model="contato.telefone"
              v-mask="'#####-####'"
              placeholder="Informe o telefone"
              required
            ></b-form-input>
          </b-form-group>

          <span class="col-12 col-md-12">
            <b-button type="submit" variant="primary">Salvar</b-button>
            <b-button type="reset" variant="danger">Cancelar</b-button>
          </span>
        </b-form>
      </b-card>
    </b-overlay>
  </div>
</template>

<script>
  import Contatos from "../services/contatos"

  export default {
    props: {
      'id': {
        type: String,
        default: null,
        required: false
      },
    },
    data() {
      return {
        title: this.id ? 'Atualizar ' : 'Cadastro  de ',
        contato: {
          id: this.id,
          nome: '',
          telefone: '',
          email: ''
        },
        loading: true,
        errors: []
      }
    },
    mounted() {
      this.loading = false;

      if (this.contato.id) {
        this.getContato();
      }
      
    },
    methods: {
      async getContato() {
        let {data: contato} = await Contatos.find(this.contato.id);
        this.contato = contato;
      },
      onSubmit(event) {
        event.preventDefault()
        this.loading = true;

        if (!this.contato.id) {
          Contatos.salva(contato)
            .then(({data}) => {
              alert('Salvo com sucesso')
              this.loading = false;          
              return this.$router.push({ path: '/' });
            })
            .catch(({response}) => {
              this.loading = false;
              this.errors = response.errors;
              return this.$router.push({ path: '/' });
            });
          return;
        }

        Contatos.atualizar(this.contato)
          .then(({data}) => {
            alert('Atualizado com sucesso')
            this.loading = false;          
            return this.$router.push({ path: '/' });
          })
          .catch(({response}) => {
            this.loading = false;
            this.errors = response.errors;
            return this.$router.push({ path: '/' });
          });
      },
      onReset(event) {
        event.preventDefault()
        this.contato = {};
        return this.$router.push({ path: '/' })
      },
    },
  }
</script>