import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { OrdersHistoryActions } from '../actions/orders-history'
import { IOrder, WebsocketStatus } from '../../utils/custom'
import { socketMiddleware } from '../../middleware/websocket-mw'
import { IOrderResponse } from '../../utils/custom'

export interface IOrdersState extends IOrderResponse {
  status?: WebsocketStatus
}

const initialState: IOrdersState = {
  orders: [],
  total: undefined,
  totalToday: undefined,
  status: WebsocketStatus.OFFLINE,
}

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setTotals: (state, action: PayloadAction<{ total: number; totalToday: number }>) => {
      state.total = action.payload.total
      state.totalToday = action.payload.totalToday
    },
    setOrders: (state, action: PayloadAction<IOrder[]>) => {
      state.orders = action.payload
    }
  },
  extraReducers: builder => {
    builder
      .addCase(OrdersHistoryActions.onConnecting, state => {
        state.status = WebsocketStatus.CONNECTING
      })
      .addCase(OrdersHistoryActions.onOpen, state => {
        state.status = WebsocketStatus.ONLINE
      })
      .addCase(OrdersHistoryActions.onMessage, (state, action) => {
        const data = action.payload
        if (data.success && data.orders) {
          state.total = data.total
          state.totalToday = data.totalToday
          state.orders = data.orders.filter(order => {return (Array.isArray(order.ingredients) && order.ingredients.every(i => typeof i === 'string'))})
        }
      })
      .addCase(OrdersHistoryActions.onClose, state => {
        state.status = WebsocketStatus.OFFLINE
      })
  }
})

export const ordersHistoryMiddleware = socketMiddleware(OrdersHistoryActions)
export const { setOrders, setTotals } = ordersSlice.actions
