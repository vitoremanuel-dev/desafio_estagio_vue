<script setup>
const pokemon = defineProps(["name", "urlBaseImagem"]);
</script>

<template>
  <div class="col-4 col-md-6 col-xl-3">
    <div class="card p-2 mb-3 cardListaPokemon">
      <p class="text-center">{{ pokemon.name }}</p>
      <img :src="urlBaseImagem" class="card-img-top" alt="..." height="80" />
    </div>
  </div>
</template>

<style scoped>
.cardListaPokemon {
  background: rgb(120, 102, 188);
  background: radial-gradient(
    circle,
    rgba(120, 102, 188, 1) 0%,
    rgba(102, 155, 188, 1) 100%
  );
  cursor: pointer;
  box-shadow: 1px 1px 3px 1px black;
}
.cardListaPokemon:hover {
  background: rgb(120, 102, 188);
  background: radial-gradient(
    circle,
    rgb(90, 63, 187) 0%,
    rgb(77, 139, 178) 100%
  );
  cursor: pointer;
}

.cardListaPokemon img:hover {
  padding: 0.1rem;
}
</style>
