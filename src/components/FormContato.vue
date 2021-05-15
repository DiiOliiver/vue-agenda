<template>
  <div class="container">
    <b-overlay :show="loading" rounded="sm">
      <b-card class="mt-3" :header="title + 'usuários'">
        <b-form class="row" @submit="onSubmit" @reset="onReset">
          <b-form-group
            class="col-12 col-md-4"
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
            class="col-12 col-md-4"
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
            class="col-12 col-md-4"
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
            <b-button class="right" style="margin-left: 4px" type="submit" variant="primary">Salvar</b-button>
            <b-button class="right" type="reset" variant="danger">Cancelar</b-button>
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
          Contatos.salva(this.contato)
            .then(({data}) => {
              this.setSuccess('Contato foi cadastrado.');
              this.loading = false;          
              return this.$router.push({ path: '/' });
            })
            .catch(({response}) => {
              this.loading = false;
              this.setError('Cadastrar contato!');
              return this.$router.push({ path: '/' });
            });
          return;
        }

        Contatos.atualizar(this.contato)
          .then(({data}) => {
            this.setSuccess('Contato foi atualizado.');
            this.loading = false;
            return this.$router.push({ path: '/' });
          })
          .catch(({response}) => {
            this.loading = false;
            this.setError('Atualizar contato!');
            return this.$router.push({ path: '/' });
          });
      },
      onReset(event) {
        event.preventDefault()
        this.contato = {};
        return this.$router.push({ path: '/' })
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
      }
    },
  }
</script>