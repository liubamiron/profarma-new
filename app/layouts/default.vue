<><!-- /layouts/default.vue -->
<template>
  <div>
    <Header/>

    <UMain>
      <NuxtPage />
    </UMain>

    <Footer/>
  </div>
</template>

<script setup lang="ts">


</script>

<style scoped>
/* Apply Montserrat globally for this layout */
div {
  font-family: 'Montserrat', sans-serif;
}
</style>
