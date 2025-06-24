<template>
  <div class="overflow-x-auto bg-white rounded shadow mt-4">
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
        <tr>
          <th
            v-for="col in model.schema"
            :key="col.name"
            class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            {{ col.label }}
          </th>
          <th class="px-4 py-2 text-xs font-medium text-gray-500 uppercase">操作</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200">
        <tr
          v-for="(row, rowIndex) in model.rows"
          :key="rowIndex"
          class="hover:bg-gray-50"
        >
          <td
            v-for="col in model.schema"
            :key="col.name"
            class="px-4 py-2 text-sm text-gray-700"
          >
            <input
              v-if="model.editing[rowIndex] && col.editable"
              :value="row[col.name]"
              @input="e => dispatch({ type: 'EditCell', rowIndex, field: col.name, value: e.target.value })"
              class="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
            <span v-else>{{ row[col.name] }}</span>
          </td>
          <td class="px-4 py-2 text-sm">
            <button
              @click="() => dispatch({ type: 'ToggleRowEdit', rowIndex })"
              class="text-blue-600 hover:underline mr-2"
            >
              {{ model.editing[rowIndex] ? '保存' : '編集' }}
            </button>
            <button
              @click="() => dispatch({ type: 'DeleteRow', rowIndex })"
              class="text-red-600 hover:underline"
            >
              🗑
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import type { FieldMeta, Msg, RowData } from '@/stores/genericGridStore'

const props = defineProps<{
  model: {
    schema: FieldMeta[]
    rows: RowData[]
    editing: Record<number, boolean>
    history: Msg[]
  }
  dispatch: (msg: Msg) => void
}>()
</script>
