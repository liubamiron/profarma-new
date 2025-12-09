<template>
  <!-- Accessibility Bar -->
  <div class="bg-green-pharma py-10 flex flex-col">
    <UContainer class="text-center text-white mt-6 px-4 md:px-6">
      ProFarma Express strives to be accessible to all, including those with disabilities.
      If you are having difficulty accessing this website or ordering prescriptions,
      please call +1 (855) 770-1077 or email info@profarmaexpress.com
    </UContainer>
  </div>

  <!-- Main Footer -->
  <UContainer class="bg-blue-pharma text-white py-8 px-6 mt-0 md:-mt-55">
    <div class="flex flex-col md:grid md:grid-cols-3 gap-8">

      <!-- Copyright -->
      <div class="flex order-3 md:order-1 justify-center  items-center mt-6 md:mt-0 text-center ">
        © 2021 ProFarmaExpress, Inc.
      </div>

      <!-- Logo + Social Icons -->
      <div class="flex order-1 md:order-2 flex-col items-center justify-center gap-1">
        <NuxtLink to="/" class="flex items-center justify-center gap-6">
          <img
            src="/img/common/logo_desk_futer.png"
            class="h-auto w-[220px]"
            alt="ProfarmaExpress"
          />
        </NuxtLink>

        <div class="flex items-center justify-center gap-4 mt-4 md:mt-2">
          <UIcon name="i-mdi-facebook" class="text-white w-6 h-6 hover:text-blue-600 transition" />
          <UIcon name="i-mdi-instagram" class="text-white w-6 h-6 hover:text-pink-500 transition" />
          <UIcon name="i-mdi-twitter" class="text-white w-6 h-6 hover:text-blue-400 transition" />
        </div>
      </div>

      <!-- Links -->
      <div class="flex order-2 md:order-3 justify-center md:justify-start mt-6 md:mt-0">
        <ul class="flex flex-col md:flex-row flex-wrap items-center gap-2 text-center md:text-left">

          <li class="flex items-center md:after:content-[''] md:after:border-r md:after:border-gray-400 md:after:h-4 md:after:mx-2">
            <NuxtLink to="/page/terms" class="hover:text-green-300 transition m-1">
              Terms of Use
            </NuxtLink>
          </li>

          <li class="flex items-center md:after:content-[''] md:after:border-r md:after:border-gray-400 md:after:h-4 md:after:mx-2">
            <NuxtLink to="/page/policy" class="hover:text-green-300 transition m-1">
              Privacy Policy
            </NuxtLink>
          </li>

          <li>
            <NuxtLink to="/page/disclaimer" class="hover:text-green-300 transition m-1">
              Disclaimer
            </NuxtLink>
          </li>

        </ul>
      </div>


    </div>
  </UContainer>
</template>

<script setup lang="ts">
</script>
