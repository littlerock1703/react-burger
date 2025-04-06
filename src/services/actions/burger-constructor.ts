import { createAsyncThunk } from '@reduxjs/toolkit'
import { endpoints } from '../../utils/api'
import type { IOrderState } from '../../utils/custom'

export const createOrder = createAsyncThunk(
  'burgerConstructor/createOrder',
  async (_, { getState }) => {
    const { order: { bun, ingredients } } = getState() as { order: IOrderState }
    const ids = bun ? [bun._id, ...ingredients.map(i => i._id), bun._id] : ingredients.map(i => i._id)

    const response = await fetch(endpoints.orders, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ingredients: ids }),
    })

    if (!response.ok) throw new Error(`Ошибка ${response.status}`)
    const data = await response.json()
    if (!data.success) throw new Error(data.message || 'Ошибка запроса')

    return data.order.number
  }
)
