import { reactive } from 'vue'

export type FieldMeta = {
  name: string
  label: string
  editable: boolean
}

export type RowData = Record<string, string>

export type Msg =
  | { type: 'EditCell'; rowIndex: number; field: string; value: string }
  | { type: 'ToggleRowEdit'; rowIndex: number }
  | { type: 'AddRow' }
  | { type: 'DeleteRow'; rowIndex: number }

