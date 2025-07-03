<template>
  <AppLayout title="顧客管理">
    <CustomerForm
        :mode="edit.mode.value"
        :editingIndex="edit.editingIndex.value"
        :initialData="edit.initialData.value"
        @submit="onSubmit"
    />

    <div v-if="edit.editingIndex.value !== null" class="mt-2 text-right">
      <button
          @click="edit.cancelEdit()"
          class="text-sm text-gray-600 hover:underline"
      >キャンセル</button>
    </div>

    <GenericGridView
        :schema="schema"
        :model="model"
        :dispatch="dispatchProxy"
        class="mt-6"
        :editingIndex="edit.editingIndex.value"
    />
  </AppLayout>
</template>

<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue'
import CustomerForm from './CustomerForm.vue'
import GenericGridView from './GenericGridView.vue'
import { useGenericGridStore } from '@/stores/genericGridStore'
import { useEditCustomer } from '@/composables/useEditCustomer'
import { computed } from 'vue'
import type { FieldMeta, RowData, Msg } from '@/types/gridTypes'

const { state, dispatch } = useGenericGridStore()
const model = computed(() => state)

const edit = useEditCustomer(() => model.value.rows)

const schema: FieldMeta[] = [
  { name: 'name', label: '氏名', editable: true },
  { name: 'email', label: 'メールアドレス', editable: true },
  { name: 'tel', label: '電話番号', editable: true },
]

function onSubmit(row: RowData, index?: number) {
  if (index === null || index === undefined) {
    dispatch({ type: 'AddRow', row })
  } else {
    dispatch({ type: 'UpdateRow', rowIndex: index, row })
    edit.finishEdit()
  }
}

function dispatchProxy(msg: Msg) {
  if (msg.type === 'ToggleRowEdit') {
    edit.startEdit(msg.rowIndex)
  } else {
    dispatch(msg)
  }
}
</script>
