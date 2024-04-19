<script setup>

</script>

<template>
  <!-- Navbar -->
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
            <router-link class="nav-link" aria-current="page" to="/"
              >Home</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/sobre">Sobre</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <!-- Conteúdo-->
  <div class="main">
    <router-view></router-view>
  </div>

  <footer class="footer-custom">
    &copy Desafio Estágio Frontend - Vítor Emanuel Pacheco de Sousa
  </footer>
  
</template>

<style>
body {
  height: 100vh;
  background: url("https://getwallpapers.com/wallpaper/full/0/8/2/53557.jpg");
  background-color: rgba(0, 47, 73, 0.356);
  background-blend-mode: darken;
}

.custom-navbar {
  background-color: rgb(0, 48, 73);
}
.footer-custom {
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
