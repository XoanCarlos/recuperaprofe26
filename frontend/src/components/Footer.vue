<template>
  <!-- Footer section starts here -->
  <footer class="bg-primary text-light py-3 mt-auto d-none d-md-flex">
    <div class="container-lg d-flex justify-content-center align-items-center">
      <!-- Display the current year and company name -->
      <span class="me-3">&copy; {{ new Date().getFullYear() }} EmpresaTeis</span>
      <ul class="list-inline mb-0">
        <!-- Link to legal notice -->
        <li class="list-inline-item"><router-link to="/avisolegal" class="text-light text-decoration-none">Aviso Legal</router-link></li>
        <!-- Link to privacy policy -->
        <li class="list-inline-item"><router-link to="/politicaprivacidad" class="text-light text-decoration-none">Política de Cookies</router-link></li>
        <!-- Link to contact page -->
        <li class="list-inline-item"><a href="#" class="text-light text-decoration-none">Contacto</a></li>
      </ul>
    </div>
  </footer>
  <!-- Footer section ends here -->
</template>

<script setup>
// No additional script logic is required for the footer
</script>

<style scoped>
/* Hide the footer on mobile devices (small screens) */
@media (max-width: 768px) {
  footer {
    display: none;
  }
}
</style>