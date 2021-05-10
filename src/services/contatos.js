import { http } from "./config"

export default {
    listar: () => {
        return http.get('contatos')
    },
    salva: (contato) => {
        return http.post('contato', contato)
    },
    find: (contatoId) => {
        return http.get(`contato/${contatoId}`)
    },
    atualizar: (contato) => {
        return http.put('contato', contato)
    },
    deletar: (contatoId) => {
        return http.delete(`contato/${contatoId}`)
    }
}
