<template>
  <footer class="bg-white mt-8 py-10 border-t border-gray-200">
    <UContainer>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Brand Info -->
        <div>
          <h6 class="mb-2 font-bold">Profarma Express</h6>
          <div  class="text-gray-500">
            Fast pharmacy delivery service.
          </div>
        </div>

        <!-- Links -->
        <div>
          <h6 class="mb-2 font-bold">Links</h6>
          <ul class="space-y-2">
            <li>
              <NuxtLink to="/catalog" class="hover:text-green-600 transition">Catalog</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/articles" class="hover:text-green-600 transition">Articles</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/contact" class="hover:text-green-600 transition">Contact</NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Social -->
        <div>
          <h6 class=" mb-2 font-bold" > Follow us</h6>
          <div class="flex items-center gap-4 mt-2">
            <UIcon name="i-mdi-facebook" class="text-gray-600 hover:text-blue-600 transition" />
            <UIcon name="i-mdi-instagram" class="text-gray-600 hover:text-pink-500 transition" />
            <UIcon name="i-mdi-telegram" class="text-gray-600 hover:text-blue-400 transition" />
          </div>
        </div>
      </div>
    </UContainer>
  </footer>
</template>
