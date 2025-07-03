import { ref, computed } from 'vue'
import type { RowData } from '@/stores/genericGridStore'

export function useEditCustomer(rows: () => RowData[]) {
    const index = ref<number | null>(null)

    const mode = computed(() => (index.value === null ? 'new' : 'edit'))
    const data = computed(() => (index.value !== null ? rows()[index.value] : null))

    function startEdit(i: number) {
        index.value = i
    }

    function cancelEdit() {
        index.value = null
    }

    function finishEdit() {
        index.value = null
    }

    return {
        mode,
        initialData: data,
        editingIndex: index,
        startEdit,
        cancelEdit,
        finishEdit,
    }
}
