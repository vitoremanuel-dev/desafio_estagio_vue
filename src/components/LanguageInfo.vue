<!-- LanguageInfo.vue -->
<template>
    <div>
      <h2>Informações sobre Idioma</h2>
      <div v-if="language">
        <p><strong>Nome:</strong> {{ language.name }}</p>
        <p><strong>Oficial:</strong> {{ language.official }}</p>
        <!-- Adicione mais campos conforme necessário -->
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        language: null
      };
    },
    mounted() {
      this.fetchLanguageData();
    },
    methods: {
      async fetchLanguageData() {
        try {
          const response = await fetch('https://pokeapi.co/api/v2/language/ja');
          const data = await response.json();
          this.language = data;
        } catch (error) {
          console.error('Erro ao buscar dados do idioma:', error);
        }
      }
    }
  }
  </script>
  
  <style scoped>
  /* Estilos específicos para este componente */
  </style>
  