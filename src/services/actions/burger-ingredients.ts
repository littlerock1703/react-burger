import { endpoints, request } from '../../utils/api'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { IIngredientsResponse } from '../../utils/custom'


export const getIngredients = createAsyncThunk(
  'burgerIngredients/getIngredients',
  async () => {
    const data = await request<IIngredientsResponse>(endpoints.ingredients)
    return data
  },
)
