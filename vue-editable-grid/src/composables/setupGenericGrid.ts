// src/composables/setupGenericGrid.ts
import { reactive } from 'vue'
import type { FieldMeta, Msg, RowData } from '../stores/genericGridStore'

export const setupGenericGrid = (schema: FieldMeta[], initialRows: RowData[]) => {
  const model = reactive({
    schema,
    rows: [...initialRows],
    editing: {} as Record<number, boolean>,
    history: [] as Msg[],
  })

  function dispatch(msg: Msg) {
    model.history.push(msg)

    switch (msg.type) {
      case 'EditCell':
        model.rows[msg.rowIndex][msg.field] = msg.value
        break
      case 'ToggleRowEdit':
        model.editing[msg.rowIndex] = !model.editing[msg.rowIndex]
        break
      case 'AddRow':
        const newRow = Object.fromEntries(model.schema.map(f => [f.name, '']))
        model.rows.push(newRow)
        break
      case 'DeleteRow':
        model.rows.splice(msg.rowIndex, 1)
        break
    }
  }

  return { model, dispatch }
}