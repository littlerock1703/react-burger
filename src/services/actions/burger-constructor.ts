import { createAsyncThunk } from '@reduxjs/toolkit'
import { endpoints, request } from '../../utils/api'
import type { IOrderState, IOrderNumberResponse } from '../../utils/custom'

export const createOrder = createAsyncThunk(
  'burgerConstructor/createOrder',
  async (_, { getState }) => {
    const { order: { bun, ingredients } } = getState() as { order: IOrderState }
    const ids = bun ? [bun._id, ...ingredients.map(i => i._id), bun._id] : ingredients.map(i => i._id)

    const options: RequestInit = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ingredients: ids }),
    }

    const data = await request<IOrderNumberResponse>(endpoints.orders, options)

    return data.order.number
  }
)
