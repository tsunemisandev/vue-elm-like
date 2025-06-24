<template>
  <AppLayout title="顧客管理">
    <CustomerForm @add="addCustomer" />
    <GenericGridView :model="model" :dispatch="dispatch" class="mt-6" />
  </AppLayout>
</template>

<script setup lang="ts">
import { setupGenericGrid } from '@/composables/setupGenericGrid'
import GenericGridView from './GenericGridView.vue'
import CustomerForm from './CustomerForm.vue'
import type { RowData } from '@/stores/genericGridStore'
import AppLayout from '@/layouts/AppLayout.vue'

const schema = [
  { name: 'name', label: '氏名', editable: true },
  { name: 'email', label: 'メールアドレス', editable: true },
  { name: 'tel', label: '電話番号', editable: true },
]

const initialRows = []

const { model, dispatch } = setupGenericGrid(schema, initialRows)

function addCustomer(row: RowData) {
  model.rows.push(row)
}
</script>
