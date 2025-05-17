import { burgerIngredientsSlice } from './burger-ingredients'
import { burgerConstructorSlice } from './burger-constructor'
import { userSlice } from './user'
import { combineSlices, configureStore } from '@reduxjs/toolkit'

const rootReducer = combineSlices(
  burgerIngredientsSlice,
  burgerConstructorSlice,
  userSlice,
)

export const store = configureStore({
  reducer: rootReducer
})
