import { endpoints } from '../../utils/api'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { IIngredientsResponse } from '../../utils/custom'


export const getIngredients = createAsyncThunk(
  'burgerIngredients/getIngredients',
  async () => {
    const response = await fetch(endpoints.ingredients)
    if (!response.ok) throw new Error(`Ошибка ${response.status}`)
    const data: IIngredientsResponse = await response.json()
    if (!data.success) throw new Error(data.message || 'Ошибка запроса')
    return data
  },
)
