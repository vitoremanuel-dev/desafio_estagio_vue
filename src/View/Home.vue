<script setup>
import { onMounted, reactive, ref, computed, watchEffect } from "vue";
import ListaPokemons from "../components/ListaPokemons.vue";
import CardPokemonSelecionado from "../components/CardPokemonSelecionado.vue";


let urlBaseImagem = ref(
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/"
);
let pokemons = reactive(ref());
let buscarPokemon = ref("");
let pokemonSelecionado = reactive(ref());
let loading = ref(false);
let tipoSelecionado = ref(null);

const selecionarTipo = (tipoId) => {
  tipoSelecionado.value = tipoId;
};
const toggleTipo = (tipoId) => {
  if (tipoSelecionado.value === tipoId) {
    tipoSelecionado.value = null;
  } else {
    tipoSelecionado.value = tipoId;
  }
};

const fetchPokemonsByType = async (tipoId) => {
  loading.value = true;
  try {
    if (tipoId === null) {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=10000&offset=0"
      );
      const data = await response.json();
      pokemons.value = data.results;
    } else {
      const response = await fetch(`https://pokeapi.co/api/v2/type/${tipoId}/`);
      const data = await response.json();
      pokemons.value = data.pokemon.map((p) => p.pokemon);
    }
  } catch (error) {
    console.error(error);
    alert("Erro ao buscar os pokémons por tipo.");
  } finally {
    loading.value = false;
  }
};

watchEffect(() => {
  fetchPokemonsByType(tipoSelecionado.value);
});

onMounted(async () => {
  fetch(`https://pokeapi.co/api/v2/pokemon?limit=10000&offset=0`)
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
fetch(https://pokeapi.co/api/v2/pokemon-species/1)
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
fetch(https://pokeapi.co/api/v2/move/1)
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

// https://pokeapi.co/api/v2/type
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
          <div class="card card-list fundo-lista">
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
                <div class="btn-toolbar" role="toolbar" aria-label="TiposDePokemon">
                  <button
                    @click="toggleTipo(1)"
                    class="btn btn-primary mt-3"
                    :class="{ active: tipoSelecionado === 1 }"
                  >
                    Normal
                  </button>
                  <button
                    @click="toggleTipo(2)"
                    class="btn btn-primary mt-3"
                    :class="{ active: tipoSelecionado === 2 }"
                  >
                    Fighting
                  </button>
                  <button
                    @click="toggleTipo(3)"
                    class="btn btn-primary mt-3"
                    :class="{ active: tipoSelecionado === 3 }"
                  >
                    Flying
                  </button>
                  <button
                    @click="toggleTipo(4)"
                    class="btn btn-primary mt-3"
                    :class="{ active: tipoSelecionado === 4 }"
                  >
                    Poison
                  </button>
                  <button
                    @click="toggleTipo(5)"
                    class="btn btn-primary mt-3"
                    :class="{ active: tipoSelecionado === 5 }"
                  >
                    Ground
                  </button>
                  <button
                    @click="toggleTipo(6)"
                    class="btn btn-primary mt-3"
                    :class="{ active: tipoSelecionado === 6 }"
                  >
                    Rock
                  </button>
                  <button
                    @click="toggleTipo(7)"
                    class="btn btn-primary mt-3"
                    :class="{ active: tipoSelecionado === 7 }"
                  >
                    Bug
                  </button>
                  <button
                    @click="toggleTipo(8)"
                    class="btn btn-primary mt-3"
                    :class="{ active: tipoSelecionado === 8 }"
                  >
                    Ghost
                  </button>
                  <button
                    @click="toggleTipo(9)"
                    class="btn btn-primary mt-3"
                    :class="{ active: tipoSelecionado === 9 }"
                  >
                    Steel
                  </button>
                  <button
                    @click="toggleTipo(10)"
                    class="btn btn-primary mt-3"
                    :class="{ active: tipoSelecionado === 10 }"
                  >
                    Fire
                  </button>
                  <button
                    @click="toggleTipo(11)"
                    class="btn btn-primary mt-3"
                    :class="{ active: tipoSelecionado === 11 }"
                  >
                    Water
                  </button>
                  <button
                    @click="toggleTipo(12)"
                    class="btn btn-primary mt-3"
                    :class="{ active: tipoSelecionado === 12 }"
                  >
                    Grass
                  </button>
                  <button
                    @click="toggleTipo(13)"
                    class="btn btn-primary mt-3"
                    :class="{ active: tipoSelecionado === 13 }"
                  >
                    Electric
                  </button>
                  <button
                    @click="toggleTipo(14)"
                    class="btn btn-primary mt-3"
                    :class="{ active: tipoSelecionado === 14 }"
                  >
                    Psychic
                  </button>
                  <button
                    @click="toggleTipo(15)"
                    class="btn btn-primary mt-3"
                    :class="{ active: tipoSelecionado === 15 }"
                  >
                    Ice
                  </button>
                  <button
                    @click="toggleTipo(16)"
                    class="btn btn-primary mt-3"
                    :class="{ active: tipoSelecionado === 16 }"
                  >
                    Dragon
                  </button>
                  <button
                    @click="toggleTipo(17)"
                    class="btn btn-primary mt-3"
                    :class="{ active: tipoSelecionado === 17 }"
                  >
                    Dark
                  </button>
                  <button
                    @click="toggleTipo(18)"
                    class="btn btn-primary mt-3"
                    :class="{ active: tipoSelecionado === 18 }"
                  >
                    Fairy
                  </button>
                  <button
                    @click="toggleTipo(19)"
                    class="btn btn-primary mt-3"
                    :class="{ active: tipoSelecionado === 19 }"
                  >
                    Unknow
                  </button>
                  <button
                    @click="toggleTipo(20)"
                    class="btn btn-primary mt-3"
                    :class="{ active: tipoSelecionado === 20 }"
                  >
                    Shadow
                  </button>
                </div>
              </div>

              <div class="lista-pokemons" v-in>

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
.fundo-lista {
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
