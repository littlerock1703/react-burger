import { getIngredients } from '../actions/burger-ingredients'
//import { createSelector } from 'reselect'
import { createSlice } from '@reduxjs/toolkit'
import { IIngredientsState } from '../../utils/custom'

export const initialState: IIngredientsState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: null,
}

export const burgerIngredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    selectIngredients: state => state,
  },
  extraReducers: builder => {
    builder
      .addCase(getIngredients.pending, state => {
        state.ingredientsRequest = true
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.ingredients = action.payload.data
        state.ingredientsRequest = false
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.ingredientsRequest = false
        state.ingredientsFailed = action.error.message || 'ERROR: Bad request burger-ingredients'
      })
  },
})

export const { selectIngredients } = burgerIngredientsSlice.selectors
