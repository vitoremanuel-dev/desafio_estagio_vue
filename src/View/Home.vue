<script setup>
import { onMounted, reactive, ref, computed, watchEffect } from "vue";
import ListaPokemons from "../components/ListaPokemons.vue";
import CardPokemonSelecionado from "../components/CardPokemonSelecionado.vue";
import FiltroEspecie from "../components/FiltroEspecie.vue";

let urlBaseImagem = ref(
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/"
);
let pokemons = reactive(ref());
let buscarPokemon = ref("");
let pokemonSelecionado = reactive(ref());
let loading = ref(false);
let tipoSelecionado = ref(null);
let idioma = ref("en");

// Exibir pokémons somente pelo tipo marcado
const toggleTipo = (tipoId) => {
  if (tipoSelecionado.value === tipoId) {
    tipoSelecionado.value = null;
  } else {
    tipoSelecionado.value = tipoId;
  }
};

// Buscar pokémons somente com base no tipo selecionado
const fetchPokemonsByType = async (tipoId) => {
  loading.value = true;
  try {
    if (tipoId === null) {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=10000&offset=0`
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

// Requisição à API
onMounted(async () => {
  fetch(`https://pokeapi.co/api/v2/pokemon?limit=10000&offset=0`)
    .then((res) => res.json())
    .then((res) => (pokemons.value = res.results));
});

// Flitrar pokémons com base no nome ou ID
const pokemonsFiltrados = computed(() => {
  if (pokemons.value && buscarPokemon.value) {
    const pokemonPesquisado = buscarPokemon.value.toLowerCase();
    return pokemons.value.filter((pokemon) => {
      const pokemonId = getPokemonId(pokemon.url);
      return (
        (!isNaN(pokemonPesquisado) &&
          pokemonId.toString() === pokemonPesquisado) ||
        (isNaN(pokemonPesquisado) &&
          pokemon.name.toLowerCase().includes(pokemonPesquisado))
      );
    });
  }
  return pokemons.value;
});

// Obter ID do pokémon
const getPokemonId = (url) => {
  const parts = url.split("/");
  return parts[parts.length - 2];
};

// Função para exibir detalhes do Pokémon
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
      types: data.types.map((item) => item.type.name),
    };

    const speciesResponse = await fetch(data.species.url);
    const speciesData = await speciesResponse.json();

    const typesUrls = data.types.map((type) => type.type.url);
    const typesResponses = await Promise.all(
      typesUrls.map((url) => fetch(url))
    );
    const typesData = await Promise.all(
      typesResponses.map((response) => response.json())
    );
    const evolutionChainUrl = speciesData.evolution_chain.url;

    const evolutionChainResponse = await fetch(evolutionChainUrl);
    const evolutionChainData = await evolutionChainResponse.json();

    const evolutions = analisarEvolucoes(evolutionChainData.chain);

    pokemonSelecionado.value.evolutions = evolutions.map(
      (evolution) => evolution.name
    );

    pokemonSelecionado.value.evolutions =
      pokemonSelecionado.value.evolutions.join(", ");

    pokemonSelecionado.value.abilities = await Promise.all(
      data.abilities.map(async (item) => {
        const response = await fetch(item.ability.url);
        const abilityData = await response.json();
        return abilityData.names.find(
          (name) => name.language.name === idioma.value
        )?.name;
      })
    );

    pokemonSelecionado.value.abilities = pokemonSelecionado.value.abilities
      .filter(Boolean)
      .join(", ");

    pokemonSelecionado.value.game_indices = data.game_indices
      .filter((item) => item.version.name)
      .map((item) => item.version.name)
      .filter(Boolean)
      .join(", ");

    pokemonSelecionado.value.types = typesData
      .map(
        (type) =>
          type.names.find((name) => name.language.name === idioma.value)?.name
      )
      .filter(Boolean)
      .join(", ");
  } catch (error) {
    console.error(error);
    alert(error.message || "Erro ao carregar o Pokémon.");
  } finally {
    loading.value = false;
  }
};

// Exibir cadeia de evolução do Pokémon
const analisarEvolucoes = (chain) => {
  const evolutions = [];

  const adicionarEvolucoes = (stage) => {
    evolutions.push({ name: stage.species.name });

    if (stage.evolves_to.length > 0) {
      stage.evolves_to.forEach((evolution) => {
        adicionarEvolucoes(evolution);
      });
    }
  };

  if (chain && chain.species) {
    adicionarEvolucoes(chain);
  }

  return evolutions.slice(1);
};

function changeLanguage(atualizarIdioma) {
  idioma.value = atualizarIdioma;
}
</script>

<template>
  <main>
    <div class="container">
      <div class="row mt-4">
        <div class="col-sm-12 col-md-5">
          <div class="idiomaCard">
            <img
              src="https://static.mundoeducacao.uol.com.br/mundoeducacao/2022/05/bandeira-estados-unidos.jpg"
              alt="Bandeira dos Estados Unidos"
              @click="changeLanguage('en')"
              class="idioma"
            />
            <span class="separador"> | </span>
            <img
              src="https://static.mundoeducacao.uol.com.br/mundoeducacao/2022/01/bandeira-da-espanha.jpg"
              alt="Bandeira da Espanha"
              @click="changeLanguage('es')"
              class="idioma"
            />
          </div>
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
            <div class="card-body row infinit">
              <div class="mb-3">
                <label hidden for="buscarPokemon" class="form-label"
                  >Pesquisar</label
                >

                <input
                  v-model="buscarPokemon"
                  type="text"
                  class="form-control"
                  id="buscarPokemon"
                  :placeholder="$t('listaPokemons.pesquisa')"
                />

                <FiltroEspecie
                  :tipoSelecionado="tipoSelecionado"
                  :toggleTipo="toggleTipo"
                />
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
.idiomaCard{
margin-bottom: 4px;
cursor: pointer;
}

.separador {
  margin: 0 10px;
}

.buttons {
  margin-left: 160px;
}
.selectLanguage {
  margin: 2px;
  background: rgb(0, 91, 140);
}
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
