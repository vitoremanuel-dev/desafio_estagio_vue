<script>
export default {
  methods: {
    setLocale(locale) {
      this.$i18n.locale = locale;
    },
  },
};
</script>

<template>
  <div class="selecionarIdioma">
    <img
      src="https://s1.static.brasilescola.uol.com.br/be/conteudo/images/2-bandeira-do-brasil.jpg"
      alt="Bandeira do Brasil"
      @click="setLocale('pt_BR')"
      class="idioma"
    />
    <span class="separador"> | </span>
    <img
      src="https://static.mundoeducacao.uol.com.br/mundoeducacao/2022/05/bandeira-estados-unidos.jpg"
      alt="Bandeira dos Estados Unidos"
      @click="setLocale('en')"
      class="idioma"
    />
    <span class="separador"> | </span>
    <img
      src="https://static.mundoeducacao.uol.com.br/mundoeducacao/2022/01/bandeira-da-espanha.jpg"
      alt="Bandeira da Espanha"
      @click="setLocale('es')"
      class="idioma"
    />
  </div>
</template>

<style>
.idioma {
  width: 30px;
}

.selecionarIdioma {
  background: rgb(0, 91, 140);
  color: white;
  border-radius: 10px;
  display: flex;
  margin-right: 20px;
  padding: 5px;
  cursor: pointer;
}

.idioma:hover {
  color: rgb(0, 67, 104);
}

.separador {
  margin: 0 5px;
}
</style>
