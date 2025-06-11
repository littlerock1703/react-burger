import { createAsyncThunk } from '@reduxjs/toolkit'
import { endpoints, request } from '../../utils/api'
import type { IOrderState, IOrderRequest, IOrderNumberResponse } from '../../utils/custom'

export const createOrder = createAsyncThunk(
  'burgerConstructor/createOrder',
  async (_, { getState }) => {
    const { order: { bun, ingredients } } = getState() as { order: IOrderState }
    const ids = bun ? [bun._id, ...ingredients.map(i => i._id), bun._id] : ingredients.map(i => i._id)

    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('accessToken') || ''
       },
      body: JSON.stringify({ ingredients: ids }),
    }

    const data = await request<IOrderNumberResponse>(endpoints.orders, options)

    return data.order.number
  }
)

export const requestOrder = createAsyncThunk(
  'burgerConstructor/requestOrder',
  async (orderNumber: number) => {
    const response = await request<IOrderRequest>( `${endpoints.orders}/${orderNumber}`)

    return response.orders[0] ?? null
  },
)