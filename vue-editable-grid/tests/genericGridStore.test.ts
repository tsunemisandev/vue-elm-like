import { describe, it, expect } from 'vitest'
import { useGenericGridStore } from '../src/stores/genericGridStore'

describe('GenericGridStore', () => {
  it('can add and edit a row', () => {
    const { model, dispatch } = useGenericGridStore()
    dispatch({ type: 'AddRow' })
    expect(model.rows.length).toBe(3)
    dispatch({ type: 'EditCell', rowIndex: 2, field: 'product', value: 'バナナ' })
    expect(model.rows[2].product).toBe('バナナ')
  })
})
