import { burgerIngredientsSlice } from './burger-ingredients'
import { burgerConstructorSlice } from './burger-constructor'
import { combineSlices, configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'

const rootReducer = combineSlices(
  burgerIngredientsSlice,
  burgerConstructorSlice,
)

export const store = configureStore({
  reducer: rootReducer
})
