import { useDispatch as dispatchHook, useSelector as selectorHook } from 'react-redux'
import { burgerIngredientsSlice } from './burger-ingredients'
import { burgerConstructorSlice } from './burger-constructor'
import { userSlice } from './user'
import { ordersUserSlice, ordersUserMiddleware } from './orders-user'
import { ordersSlice, ordersHistoryMiddleware } from './orders-history'
import { combineSlices, configureStore } from '@reduxjs/toolkit'


export const middlewares = [ordersHistoryMiddleware, ordersUserMiddleware]

const rootReducer = combineSlices(
  burgerIngredientsSlice,
  burgerConstructorSlice,
  userSlice,
  ordersSlice,
  ordersUserSlice
)

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(...middlewares)
})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
export const useDispatch = dispatchHook.withTypes<AppDispatch>()
export const useSelector = selectorHook.withTypes<RootState>()