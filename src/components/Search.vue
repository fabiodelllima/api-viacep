<template>
  <div class="search-container">
    <section class="search-box">
      <label class="search-label">Pesquisar endereço</label>
      <input
        class="search-form"
        v-maska="'#####-###'"
        v-model="cepToSearch"
        placeholder="Digite o CEP"
      />
      <button class="search-button" @click="cepSubmited">Pesquisar</button>
      <span class="cep-submit-notification" v-if="cepIsSubmited">
        {{ cepSubmitNotification }}
      </span>
    </section>
    <section class="via-cep-box" v-if="cepTableActived">
      <hr>
      <table>
        <thead>
          <tr>
            <th>Rua</th>
            <th>CEP</th>
            <th>Cidade</th>
            <th>Estado</th>
            <th>Complemento</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="cep-details">{{ cepStreet }}</td>
            <td class="cep-details">{{ cepNumber }}</td>
            <td class="cep-details">{{ cepCity }}</td>
            <td class="cep-details">{{ cepState }}</td>
            <td class="cep-details">{{ cepComplement }}</td>
            <td>
              <button class="action-button" @click="toDeleteCep">
                Deletar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="cep-delete-notification-box" v-if="cepIsDeleted">
        <div class="cep-delete-notification">
          <div id="item-one">{{ cepDeletedNotification }}</div>
          <div id="item-two">
            <button id="item-two-button" @click="toUndoDeletedCep">
              Desfazer
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { maska } from 'maska'
import axios from 'axios'
export default {
  directives: { maska },
  data () {
    return {
      cepToSearch: '',
      cepSubmitNotification: 'Endereço adicionado com sucesso.',
      cepDeletedNotification: '',
      cepIsSubmited: false,
      cepIsDeleted: false,
      cepTableActived: false,
      cepStreet: '',
      cepNumber: '',
      cepCity: '',
      cepState: '',
      cepComplement: ''
    }
  },
  methods: {
    searchCep:
      function searchCep () {
        axios
          .get(`https://viacep.com.br/ws/${this.cepToSearch}/json/`)
          .then((response) => {
            this.cepStreet = response.data.logradouro
            this.cepNumber = response.data.cep
            this.cepCity = response.data.localidade
            this.cepState = response.data.uf
            this.cepComplement = response.data.complemento
          })
          .catch(function (error) {
            console.log(error)
          })
      },
    cepSubmited () {
      console.log('=> ENDEREÇO ADICIONADO')
      this.cepIsSubmited = true
      this.cepTableActived = true
      setTimeout(() => {
        this.cepIsSubmited = false
      }, 2000)
      this.searchCep()
    },
    toDeleteCep () {
      this.cepStreet = ''
      this.cepNumber = ''
      this.cepCity = ''
      this.cepState = ''
      this.cepComplement = ''
      this.cepIsDeleted = true
      this.cepDeletedNotification = `O CEP '${this.cepToSearch}' foi removido com sucesso.`
      console.log('=> DADOS EXCLUÍDOS')
    },
    toUndoDeletedCep () {
      this.searchCep()
      this.cepIsDeleted = false
      console.log('=> DADOS RECUPERADOS')
    }
  }
}
</script>

<style scoped lang="scss">
.search-container {
  padding: 0 0 20px 0;
}
.search-box {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  background-color: var(--search-box-primary);
  border: 1px solid var(--search-box-secondary);
  border-radius: 8px;
  margin: 20px 20px 0 20px;
  padding: 30px 20px 30px 20px;
  z-index: 2;
}
.search-label {
  font-size: 1.1em;
  font-weight: bold;
  color: var(--search-label-text);
  margin: 3px 5px 0 0;
  padding: 0 0 0 0;
}
.search-form {
  border: 1px solid var(--search-form-border);
  border-radius: 5px;
  margin: 0 5px 0 0;
  padding: 0 0 0 5px;
  font-size: 0.9em;
}
.search-form::placeholder {
  font-size: 1.2em;
  color: var(--search-form-placeholder);
}
button {
  text-decoration: none;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.search-button {
  background-color: var(--search-button-primary);
  color: var(--search-button-text);
  padding: 5px 10px;
  font-size: 1em;
  margin: 0 10px 0 0;
}
.search-button:hover {
  background-color: var(--search-button-secondary);
}
.cep-submit-notification {
  font-size: 0.9em;
  color: var(--cep-submit-notification);
  margin: 7px 0 0 0;
}
hr {
  margin: 20px;
  border: 0;
  height: 1px;
  background: var(--hr-primary);
  background-image: var(--hr-secondary);
}
.via-cep-box {
  background-color: var(--via-cep-box-primary);
  border: 1px solid var(--via-cep-box-secondary);
  border-bottom-right-radius: 8px;
  border-bottom-left-radius: 8px;
  border-top: none;
  margin: -30px 20px 0 20px;
  padding: 0 0 40px 0;
  overflow-x: auto;
  z-index: 1;
}
table {
  table-layout: auto;
  border-collapse: collapse;
  margin: 0 20px 30px 20px;
  padding: 20px 0 0 0;
  font-size: 0.9em;
  text-align: left;
}
table th,
table td {
  table-layout: auto;
  color: var(--table-text-color-primary);
  padding: 8px;
  width: 20%;
}
.cep-details {
  color: var(--table-text-color-secondary);
}
.action-button {
  background-color: var(--action-button-primary);
  padding: 5px 10px;
}
.action-button:hover {
  background-color: var(--action-button-secondary);
}
.cep-delete-notification-box {
  display: flex;
  justify-content: center;
  padding: 10px;
}
.cep-delete-notification {
  display: flex;
  justify-content: space-between;
  width: 500px;
  padding: 10px;
  background-color: var(--cep-delete-notification-primary);
  border: 1px solid var(--cep-delete-notification-secondary);
  color: var(--cep-delete-notification-text);
  border-radius: 8px;
}
#item-one {
  align-self: center;
}
#item-two-button {
  padding: 10px;
  color: var(--cep-delete-notification-text);
  background-color: var(--cep-delete-notification-primary);
}
#item-two-button:hover {
  background-color: var(--cep-delete-notification-tertiary);
}
</style>
