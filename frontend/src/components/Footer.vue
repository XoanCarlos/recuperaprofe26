<template>
  <footer class="bg-primary text-light py-3 mt-auto">
    <div class="container-lg d-flex justify-content-between">
      <span>&copy; {{ new Date().getFullYear() }} EmpresaTeis</span>
      <ul class="list-inline mb-0">
        <li class="list-inline-item"><router-link to="/avisolegal" class="text-light text-decoration-none">Aviso Legal</router-link></li>
        <li class="list-inline-item"><router-link to="/politicaprivacidad" class="text-light text-decoration-none">Política de Cookies</router-link></li>
        <li class="list-inline-item"><a href="#" class="text-light text-decoration-none">Contacto</a></li>
      </ul>
    </div>
  </footer>
</template>

<script setup></script>