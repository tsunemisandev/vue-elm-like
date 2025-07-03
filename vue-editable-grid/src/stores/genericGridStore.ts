import { reactive } from 'vue'

export type RowData = Record<string, string>

export type Msg =
    | { type: 'EditCell'; rowIndex: number; field: string; value: string }
    | { type: 'ToggleRowEdit'; rowIndex: number }
    | { type: 'AddRow'; row: RowData }
    | { type: 'UpdateRow'; rowIndex: number; row: RowData }
    | { type: 'DeleteRow'; rowIndex: number }

export const useGenericGridStore = () => {
  const state = reactive({
    rows: [] as RowData[],
    editing: {} as Record<number, boolean>,
    history: [] as Msg[],
  })

  function dispatch(msg: Msg) {
    state.history.push(msg)

    switch (msg.type) {
      case 'EditCell':
        state.rows[msg.rowIndex][msg.field] = msg.value
        break
      case 'ToggleRowEdit':
        state.editing[msg.rowIndex] = !state.editing[msg.rowIndex]
        break
      case 'AddRow':
        state.rows.push(msg.row)
        break
      case 'UpdateRow':
        state.rows[msg.rowIndex] = msg.row
        break
      case 'DeleteRow':
        state.rows.splice(msg.rowIndex, 1)
        break
    }
  }

  return { state, dispatch }
}
