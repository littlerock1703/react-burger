import { configureStore } from "@reduxjs/toolkit"
import { getIngredients } from '../services/actions/burger-ingredients'
import { burgerIngredientsSlice } from '../services/reducers/burger-ingredients'

import * as api from '../utils/api'
import { generateMockIngredient } from "./mocker"

const ingredientsReducer = burgerIngredientsSlice.reducer;

const mockedFetchResponse = {
  data: [generateMockIngredient()]
}

describe('burger ingredients reducer', () => {
  let store

  beforeEach(() => {
    store = configureStore({
      reducer: { ingredients: ingredientsReducer}
    })
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('execute reducer getIngredients.pending', () => {
    jest.spyOn(api, 'request').mockResolvedValue(mockedFetchResponse)
    store.dispatch(getIngredients())

    const { ingredients, ingredientsRequest, ingredientsFailed } = store.getState().ingredients

    expect(ingredients).toEqual([])
    expect(ingredientsRequest).toBe(true)
    expect(ingredientsFailed).toBeNull()
  })

  it('execute reducer getIngredients.fulfilled', async () => {
    jest.spyOn(api, 'request').mockResolvedValue(mockedFetchResponse)
    await store.dispatch(getIngredients())

    const { ingredients, ingredientsWithId, ingredientsRequest, ingredientsFailed } = store.getState().ingredients

    expect(ingredientsWithId).toHaveProperty(mockedFetchResponse.data[0]._id)
    expect(ingredients).toEqual(mockedFetchResponse.data)
    expect(ingredientsRequest).toBe(false)
    expect(ingredientsFailed).toBeNull()
  })

  it('execute reducer getIngredients.rejected', async () => {
    jest.spyOn(api, 'request').mockRejectedValue(new Error('Mocked error'))

    await store.dispatch(getIngredients())

    const { ingredients, ingredientsRequest, ingredientsFailed } = store.getState().ingredients

    expect(ingredients).toEqual([])
    expect(ingredientsRequest).toBe(false)
    expect(ingredientsFailed).toEqual('Mocked error')
  })
})
