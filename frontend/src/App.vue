<template>
  <div class="d-flex flex-column min-vh-100">
    <NavBar />
    <main class="flex-grow-1  mt-3">
      <div class= "container-lg">
        <router-view />
      </div>
    </main>
    <Footer />
  </div>
</template>

<script setup>
import NavBar from "./components/NavBar.vue";
import Footer from "./components/Footer.vue";
</script>

<style scoped>
@media (max-width: 768px) {
  body {
    background: lightgray;
  }
}
</style>
