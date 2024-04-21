<script setup>
import { defineProps, ref } from "vue";

const props = defineProps({
  tipoSelecionado: Number,
  toggleTipo: Function,
});

const tipos = ref([
  { id: 1, name: "Normal" },
  { id: 2, name: "Fighting" },
  { id: 3, name: "Flying" },
  { id: 4, name: "Poison" },
  { id: 5, name: "Ground" },
  { id: 6, name: "Rock" },
  { id: 7, name: "Bug" },
  { id: 8, name: "Ghost" },
  { id: 9, name: "Steel" },
  { id: 10, name: "Fire" },
  { id: 11, name: "Water" },
  { id: 12, name: "Grass" },
  { id: 13, name: "Electric" },
  { id: 14, name: "Psychic" },
  { id: 15, name: "Ice" },
  { id: 16, name: "Dragon" },
  { id: 17, name: "Dark" },
  { id: 18, name: "Fairy" },
]);

const toggleTipo = (tipoId) => {
  props.toggleTipo(tipoId);
};
</script>

<template>
  <div class="" role="group" aria-label="TiposDePokemon">
    <button
      v-for="tipo in tipos"
      :key="tipo.id"
      @click="toggleTipo(tipo.id)"
      class="btn btn-primary mt-3 tipo-pokemon"
      :class="{ active: tipoSelecionado === tipo.id }"
    >
      {{ tipo.name }}
    </button>
  </div>
</template>

<style scoped>
.tipo-pokemon {
  margin: 2px;
  background: rgb(0, 91, 140);
}

.tipo-pokemon:hover {
  background: rgba(120, 102, 188, 1);
}

.tipo-pokemon.active {
    background: rgb(96, 69, 192);
}
</style>
