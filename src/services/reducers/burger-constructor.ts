import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'
import { createOrder } from '../actions/burger-constructor'
import { IOrderState, IConstructorBurgerIngredient, IBurgerIngredient } from '../../utils/custom'

export const initialState: IOrderState = {
  bun: null,
  ingredients: [],
  orderNumber: null,
  orderCreateRequest: false,
  orderCreateFailed: null,
}

export const burgerConstructorSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    cleanOrder: state => {
      state.orderNumber = initialState.orderNumber
      state.ingredients = initialState.ingredients
      state.bun = initialState.bun
    },
    setBun: (state, action) => {
      state.bun = action.payload
    },
    setIngredients: (state, action) => {
      state.ingredients = action.payload
    },
    addIngredient: {
      reducer: (state, action: PayloadAction<IConstructorBurgerIngredient>) => {
        const ingredient = action.payload
        state.ingredients.push({ ...ingredient })
      },
      prepare: (ingredient: IBurgerIngredient) => {
        return { payload: { ...ingredient, uuid: nanoid() } }
      },
    },
    moveIngredient(state, action) {
      const { dragedIndex, hoveredIndex } = action.payload
      const dragItem = state.ingredients[dragedIndex]
      const newItemsOrder = [...state.ingredients]
      newItemsOrder.splice(dragedIndex, 1)
      newItemsOrder.splice(hoveredIndex, 0, dragItem)
      state.ingredients = newItemsOrder
    },
    removeIngredient: (state, action) => {
      const uuid = action.payload
      state.ingredients = state.ingredients.filter(
        ingredient => ingredient.uuid !== uuid,
      )
    }
  },
  extraReducers: builder => {
    builder
      .addCase(createOrder.pending, state => {
        state.orderCreateRequest = true
        state.orderCreateFailed = null
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orderNumber = action.payload
        state.orderCreateRequest = false
        state.orderCreateFailed = null
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.orderCreateRequest = false
        state.orderCreateFailed = action.error.message || null
      })
  }
})

export const { setBun, addIngredient, setIngredients, removeIngredient, moveIngredient, cleanOrder } = burgerConstructorSlice.actions
