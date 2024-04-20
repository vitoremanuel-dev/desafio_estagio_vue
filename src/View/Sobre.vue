<script setup>
import FotoPerfil from "../assets/foto-perfil.jpg";
</script>

<template>
  <div class="container mt-4">
    <div class="card">
      <div class="card-perfil">
        <div class="row">
          <img :src="FotoPerfil" alt="Foto de perfil" class="m-5 foto-perfil" />
          <div class="col">
            <div class="text">
              <h1>Vítor Emanuel Pacehco de Sousa</h1>
              <hr />
              <p>
                Oi, me chamo Vítor Emanuel, sou piauiense de Teresina, bacharel
                em Direito e atualmente curso Análise e Desenvolvimento de
                Sistemas
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.text {
  background-color: rgba(255, 255, 255, 0.236);
  border-radius: 20px;
  margin: 50px;
  padding: 20px;
  height: 60vh;
  text-align: center;
}

.card-perfil {
  box-shadow: 1px 1px 20px 1px black;
  background: rgb(253, 240, 213);
  background: radial-gradient(
    circle,
    rgb(250, 240, 221) 0%,
    rgb(124, 50, 50) 100%
  );
}

.foto-perfil {
  width: 50vh;
  border-radius: 20px;
}
</style>
