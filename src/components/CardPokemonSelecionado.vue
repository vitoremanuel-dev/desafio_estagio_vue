<script setup>
import "animate.css";

const pokemon = defineProps([
  "name",
  "id",
  "imgBackDefault",
  "imgBackFemale",
  "imgBackShiny",
  "imgBackShiny_female",
  "imgFrontDefault",
  "imgFrontFemale",
  "imgFrontShiny",
  "imgFrontShiny_female",
  "loading",
  "abilities",
  "indices",
  "evolucoes",
  "tipos",
]);

const pokemonImages = [
  pokemon.imgFrontDefault,
  pokemon.imgBackDefault,
  pokemon.imgFrontFemale,
  pokemon.imgBackFemale,
  pokemon.imgFrontShiny,
  pokemon.imgBackShiny,
  pokemon.imgFrontShiny_female,
  pokemon.imgBackShiny_female,
];

</script>

<template>
  <div
    class="card cardPokemonSelecionado p-2"
  >
    <div
      id="carouselExampleIndicators"
      class="carousel slide"
      v-if="pokemon.name"
    >
      <div class="carousel-indicators">
        <button
          v-for="(_, index) in pokemonImages"
          :key="index"
          type="button"
          :data-bs-target="'#carouselExampleIndicators'"
          :data-bs-slide-to="index"
          :class="{ active: index === 0 }"
          :aria-current="index === 0 ? 'true' : null"
          :aria-label="'Slide ' + (index + 1)"
        ></button>
      </div>
      <div class="carousel-inner">
        <div class="carousel-item active" v-if="pokemon.imgFrontDefault">
          <img
            :src="pokemon.imgFrontDefault"
            class="d-block w-100 pb-5"
            alt="Front Default"
          />
        </div>
        <div class="carousel-item" v-if="pokemon.imgBackDefault">
          <img
            :src="pokemon.imgBackDefault"
            class="d-block w-100"
            alt="Back Default"
          />
        </div>
        <div class="carousel-item" v-if="pokemon.imgFrontFemale">
          <img
            :src="pokemon.imgFrontFemale"
            class="d-block w-100"
            alt="Front Female"
          />
        </div>
        <div class="carousel-item" v-if="pokemon.imgBackFemale">
          <img
            :src="pokemon.imgBackFemale"
            class="d-block w-100"
            alt="Back Female"
          />
        </div>
        <div class="carousel-item" v-if="pokemon.imgFrontShiny">
          <img
            :src="pokemon.imgFrontShiny"
            class="d-block w-100"
            alt="Front Shiny"
          />
        </div>
        <div class="carousel-item" v-if="pokemon.imgBackShiny">
          <img
            :src="pokemon.imgBackShiny"
            class="d-block w-100"
            alt="Back Shiny"
          />
        </div>
        <div class="carousel-item" v-if="pokemon.imgFrontShiny_female">
          <img
            :src="pokemon.imgFrontShiny_female"
            class="d-block w-100"
            alt="Front Shiny Female"
          />
        </div>
        <div class="carousel-item" v-if="pokemon.imgBackShiny_female">
          <img
            :src="pokemon.imgBackShiny_female"
            class="d-block w-100"
            alt="Back Shiny Female"
          />
        </div>
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>

    <img v-else src="../assets/egg.svg" class="card-img-top pt-2" alt="..." />

    <div class="card-body">
      <h5 class="card-title text-center">
        {{ pokemon.name ? pokemon.name.toUpperCase() : $t('cardSelecionado.selecionar') }}
      </h5>
      <p class="text-center tipos">{{ pokemon.tipos }}</p>
      <hr />
      <div class="row text-center">
        <div class="d-none d-md-block">
          <div class="row text-center info" v-if="pokemon.name">
            <section class="row mt-2">
              <strong>{{ $t('cardSelecionado.ataques') }}</strong>
              <span>{{ pokemon.abilities }}</span>
            </section>
            <section class="row mt-2">
              <strong>{{ $t('cardSelecionado.gameIndices') }}</strong>
              <span>{{ pokemon.indices ? pokemon.indices : "Não possui" }}</span>
            </section>
            <section class="row mt-2 mb-2">
              <strong>{{ $t('cardSelecionado.evolutions') }}</strong>
              <span>{{ pokemon.evolucoes ? pokemon.evolucoes : "Não possui"}}</span>
            </section>
          </div>
        </div>
      </div>
    </div>
    <span class="id pb-4" v-if="pokemon.name">{{ '#' + pokemon.id  }}</span>
  </div>
</template>

<style scoped>
.cardPokemonSelecionado {
  box-shadow: 1px 1px 20px 1px black;
  height: 80vh;
  background: rgb(253, 240, 213);
  background: radial-gradient(
    circle,
    rgb(250, 240, 221) 0%,
    rgb(124, 50, 50) 100%
  );
}

.cardPokemonSelecionado img {
  height: 250px; /* Aqui tava em 250px*/ 
}

.info {
  background-color: rgba(255, 255, 255, 0.236);
  border-radius: 10px;
}
.id {
  text-align: center;
  color: rgba(73, 18, 18, 0.6);
}

@media (max-width: 768px) {
  .cardPokemonSelecionado {
    height: 40vh;
    width: 40%;
    margin: 0 auto 10px auto;
  }

  .cardPokemonSelecionado img {
    height: 150px;
  }
}

@media (max-width: 992px) {
  .cardPokemonSelecionado {
    height: 80h;
    margin: 0 auto 10px auto;
  }

  .cardPokemonSelecionado img {
    height: 150px;
  }
}

@media (max-width: 1200px) {
  .cardPokemonSelecionado {
    height: 80h;
    margin: 0 auto 10px auto;
  }

  .cardPokemonSelecionado img {
    height: 200px;
  }
}
</style>
