import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IOrder, WebsocketStatus } from '../../utils/custom'
import { OrdersUserActions } from '../actions/orders-user'
import { socketMiddleware } from '../../middleware/websocket-mw'

interface OrdersUserState {
  status: WebsocketStatus
  ordersUser: IOrder[]
}

const initialState: OrdersUserState = {
  status: WebsocketStatus.OFFLINE,
  ordersUser: [],
}

export const ordersUserSlice = createSlice({
  name: 'ordersUser',
  initialState,
  reducers: {
    setOrdersUser: (state, action: PayloadAction<IOrder[]>) => {
      state.ordersUser = action.payload
    },
  },
  extraReducers: builder => {
    builder
      .addCase(OrdersUserActions.onConnecting, state => {
        state.status = WebsocketStatus.CONNECTING
      })
      .addCase(OrdersUserActions.onOpen, state => {
        state.status = WebsocketStatus.ONLINE
      })
      .addCase(OrdersUserActions.onMessage, (state, action) => {
        const data = action.payload
        if (data.success && data.orders) {
          state.ordersUser = data.orders.filter(order => {return (Array.isArray(order.ingredients) && order.ingredients.every(i => typeof i === 'string'))})
        }
      })
      .addCase(OrdersUserActions.onClose, state => {
        state.status = WebsocketStatus.OFFLINE
      })
  },
})

export const ordersUserMiddleware = socketMiddleware(OrdersUserActions, true)
export const { setOrdersUser } = ordersUserSlice.actions
