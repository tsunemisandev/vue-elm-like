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
      {{ props.mode === 'edit' ? '保存' : '追加' }}
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { RowData } from '@/stores/genericGridStore'

const props = defineProps<{
  mode: 'new' | 'edit'
  editingIndex?: number | null
  initialData?: RowData | null
}>()
const emit = defineEmits<{ (e: 'submit', row: RowData, index?: number): void }>()

const name = ref('')
const email = ref('')
const tel = ref('')

watch(
    () => props.initialData,
    (data) => {
      if (data) {
        name.value = data.name || ''
        email.value = data.email || ''
        tel.value = data.tel || ''
      } else {
        name.value = ''
        email.value = ''
        tel.value = ''
      }
    },
    { immediate: true }
)

function onSubmit() {
  emit('submit', { name: name.value, email: email.value, tel: tel.value }, props.editingIndex!)
  if (props.mode === 'new') {
    name.value = ''
    email.value = ''
    tel.value = ''
  }
}
</script>
