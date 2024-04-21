<script setup>
import SelecionarIdioma from "./components/SelecionarIdioma.vue";
</script>

<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark custom-navbar">
      <div class="container-fluid">
        <router-link class="navbar-brand" to="/">
          <img
            src="https://cdn-icons-png.flaticon.com/128/362/362001.png"
            alt="PokeMainô"
            width="30"
            height="24"
          />
          PokeMainô
        </router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link class="nav-link" aria-current="page" to="/">{{
                $t("navbar.home")
              }}</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/sobre">{{
                $t("navbar.sobre")
              }}</router-link>
            </li>
          </ul>
        </div>
      </div>
      <SelecionarIdioma />
    </nav>

    <div class="main">
      <router-view></router-view>
    </div>

    <footer>
      &copy; Desafio Estágio Frontend - Vítor Emanuel Pacheco de Sousa
    </footer>
  </div>
</template>

<style>
body {
  height: 100vh;
  background: url("https://getwallpapers.com/wallpaper/full/0/8/2/53557.jpg");
  background-color: rgba(0, 47, 73, 0.356);
  background-blend-mode: darken;
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

.custom-navbar {
  background-color: rgb(0, 48, 73);
}
footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 56px;
  background-color: rgb(0, 48, 73);
  font-weight: bold;
  color: white;
}
</style>

<script>
export default {
  methods: {
    setLocale(locale) {
      this.$i18n.locale = locale;
    },
  },
};
</script>
