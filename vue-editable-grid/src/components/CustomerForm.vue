<template>
  <form @submit.prevent="onSubmit" class="space-y-4 p-4 bg-white rounded shadow">
    <div>
      <label class="block text-sm font-medium text-gray-700">氏名</label>
      <input
        v-model="name"
        class="mt-1 block w-full border border-gray-300 rounded px-3 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
        required
      />
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-700">メールアドレス</label>
      <input
        v-model="email"
        type="email"
        class="mt-1 block w-full border border-gray-300 rounded px-3 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
        required
      />
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-700">電話番号</label>
      <input
        v-model="tel"
        class="mt-1 block w-full border border-gray-300 rounded px-3 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
        required
      />
    </div>
    <button
      type="submit"
      class="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
    >
      追加
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { RowData } from '@/stores/genericGridStore'

const emit = defineEmits<{ (e: 'add', row: RowData): void }>()

const name = ref('')
const email = ref('')
const tel = ref('')

function onSubmit() {
  emit('add', { name: name.value, email: email.value, tel: tel.value })
  name.value = ''
  email.value = ''
  tel.value = ''
}
</script>
