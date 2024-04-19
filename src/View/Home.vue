<script setup>
import { onMounted, reactive, ref, computed } from "vue";
import ListaPokemons from "../components/ListaPokemons.vue";
import CardPokemonSelecionado from "../components/CardPokemonSelecionado.vue";

let urlBaseImagem = ref(
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/"
);
let pokemons = reactive(ref());
let buscarPokemon = ref("");
let pokemonSelecionado = reactive(ref());
let loading = ref(false);

onMounted(() => {
  fetch(`https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`)
    .then((res) => res.json())
    .then((res) => (pokemons.value = res.results));
});

const pokemonsFiltrados = computed(() => {
  if (pokemons.value && buscarPokemon.value) {
    const searchTerm = buscarPokemon.value.toLowerCase();
    return pokemons.value.filter((pokemon) => {
      const pokemonId = getPokemonId(pokemon.url);
      return (
        (!isNaN(searchTerm) && pokemonId.toString() === searchTerm) ||
        (isNaN(searchTerm) && pokemon.name.toLowerCase().includes(searchTerm))
      );
    });
  }
  return pokemons.value;
});

const getPokemonId = (url) => {
  const parts = url.split("/");
  return parts[parts.length - 2];
};

const selecionarPokemon = async (pokemon) => {
  loading.value = true;
  try {
    const response = await fetch(pokemon.url);
    const data = await response.json();

    pokemonSelecionado.value = {
      id: data.id,
      name: data.name,
      height: data.height,
      sprites: data.sprites,
      types: data.types,
    };

    const speciesResponse = await fetch(data.species.url);
    const speciesData = await speciesResponse.json();

    const evolutionChainUrl = speciesData.evolution_chain.url;

    const evolutionChainResponse = await fetch(evolutionChainUrl);
    const evolutionChainData = await evolutionChainResponse.json();

    const evolutions = parseEvolutions(evolutionChainData.chain);

    pokemonSelecionado.value.evolutions = evolutions.map(
      (evolution) => evolution.name
    );

    pokemonSelecionado.value.evolutions =
      pokemonSelecionado.value.evolutions.join(", ");

    pokemonSelecionado.value.abilities = data.abilities
      .map((item) => item.ability.name)
      .filter(Boolean)
      .join(", ");

    pokemonSelecionado.value.game_indices = data.game_indices
      .filter((item) => item.version.name)
      .map((item) => item.version.name)
      .filter(Boolean)
      .join(", ");

    pokemonSelecionado.value.types = data.types
      .map((item) => item.type.name)
      .filter(Boolean)
      .join(", ");
  } catch (error) {
    console.error(error);
    alert(error.message || "Erro ao carregar o Pokémon.");
  } finally {
    loading.value = false;
  }
};

const parseEvolutions = (chain) => {
  const evolutions = [];

  const addEvolutionsRecursive = (stage) => {
    evolutions.push({ name: stage.species.name });

    if (stage.evolves_to.length > 0) {
      stage.evolves_to.forEach((evolution) => {
        addEvolutionsRecursive(evolution);
      });
    }
  };

  if (chain && chain.species) {
    addEvolutionsRecursive(chain);
  }

  return evolutions.slice(1);
};

/* 
fetch(`https://pokeapi.co/api/v2/pokemon-species/1`)
  .then((response) => response.json())
  .then((data) => {
    const nameTranslate = data.names.map((entry) => entry.name);
    const typesTranslate = data.genera.map((entry) => entry.genus);

    console.log(
      "Nomes:",
      nameTranslate,
      typesTranslate
    );
  })
  .catch((error) => {
    console.error("Ocorreu um erro ao processar a solicitação:", error);
  });
*/

/* 
fetch(`https://pokeapi.co/api/v2/move/1`)
  .then((response) => response.json())
  .then((data) => {
    const movesTranslate = data.names.map((entry) => entry.name);

    console.log(
      "Nomes:",
      movesTranslate,
     
    );
  })
  .catch((error) => {
    console.error("Ocorreu um erro ao processar a solicitação:", error);
  });
*/

</script>

<template>
  <main>
    <div class="container">
      <div class="row mt-4">
        <div class="col-sm-12 col-md-4">
          <CardPokemonSelecionado
            :name="pokemonSelecionado?.name"
            :id="pokemonSelecionado?.id"
            :imgBackDefault="pokemonSelecionado?.sprites?.back_default"
            :imgBackFemale="pokemonSelecionado?.sprites?.back_female"
            :imgBackShiny="pokemonSelecionado?.sprites?.back_shiny"
            :imgBackShiny_female="
              pokemonSelecionado?.sprites?.back_shiny_female
            "
            :imgFrontDefault="pokemonSelecionado?.sprites?.front_default"
            :imgFrontFemale="pokemonSelecionado?.sprites?.front_female"
            :imgFrontShiny="pokemonSelecionado?.sprites?.front_shiny"
            :imgFrontShiny_female="
              pokemonSelecionado?.sprites?.front_shiny_female
            "
            :loading="loading"
            :abilities="pokemonSelecionado?.abilities"
            :indices="pokemonSelecionado?.game_indices"
            :tipos="pokemonSelecionado?.types"
            :evolucoes="pokemonSelecionado?.evolutions"
          />
        </div>

        <div class="col-sm-12 col-md-7">
          <div class="card card-list teste">
            <div class="card-body row">
              <div class="mb-3">
                <label hidden for="buscarPokemon" class="form-label"
                  >Pesquisar</label
                >
                <div class="input-group">
                  <input
                    v-model="buscarPokemon"
                    type="text"
                    class="form-control"
                    id="buscarPokemon"
                    placeholder="Pesquisar por nome ou ID"
                  />
                </div>
              </div>

              <ListaPokemons
                v-for="pokemon in pokemonsFiltrados"
                :key="pokemon.name"
                :name="pokemon.name"
                :urlBaseImagem="
                  urlBaseImagem + pokemon.url.split('/')[6] + '.png'
                "
                @click="selecionarPokemon(pokemon)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.teste {
  background: rgb(0, 48, 73);
}
.card-list {
  max-height: 80vh;
  overflow-y: scroll;
  overflow-x: hidden;
}

@media (max-width: 768px) {
  .card-list {
    max-height: 50vh;
  }
}
</style>
