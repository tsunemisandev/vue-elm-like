<!-- src/layouts/AppLayout.vue -->
<template>
  <div class="max-w-5xl mx-auto px-4 py-6">
    <header class="mb-6">
      <h1 class="text-2xl font-bold text-gray-800">{{ title }}</h1>
    </header>
    <main>
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
defineProps<{ title: string }>()
</script>
