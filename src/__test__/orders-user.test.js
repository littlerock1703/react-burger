import { initialState, ordersUserSlice, setOrdersUser } from '../services/reducers/orders-user'
import { WebsocketStatus } from '../utils/custom'
import { generateHistoryOrder } from './mocker'

describe('ordersUserSlice reducers', () => {
  it('should create an action to set user orders', () => {
    const newOrdersUser = [generateHistoryOrder()]
    const action = setOrdersUser(newOrdersUser)

    const newState = ordersUserSlice.reducer(initialState, action)

    expect(newState.ordersUser).toEqual(newOrdersUser)
  })

  it('should handle onOpen action', () => {
    const action = { type: 'USER_ORDERS_OPEN' }

    const newState = ordersUserSlice.reducer(initialState, action)

    expect(newState.status).toEqual(WebsocketStatus.ONLINE)
  })

  it('should handle onConnecting action', () => {
    const action = { type: 'USER_ORDERS_CONNECTING' }

    const newState = ordersUserSlice.reducer(initialState, action)

    expect(newState.status).toEqual(WebsocketStatus.CONNECTING)
  })

  it('should handle onClose action', () => {
    const action = { type: 'USER_ORDERS_CLOSE' }

    const newState = ordersUserSlice.reducer(initialState, action)

    expect(newState.status).toEqual(WebsocketStatus.OFFLINE)
  })

  it('should handle onMessage action with success and orders', () => {
    const newOrders = [generateHistoryOrder(), generateHistoryOrder()]
    const action = {
      type: 'USER_ORDERS_MESSAGE',
      payload: {
        success: true,
        orders: newOrders,
      },
    }

    const newState = ordersUserSlice.reducer(initialState, action)

    expect(newState.ordersUser).toEqual(newOrders)
  })

  it('should handle onMessage action with failed', () => {
    const newOrders = [generateHistoryOrder(), generateHistoryOrder()]
    const action = {
      type: 'USER_ORDERS_MESSAGE',
      payload: {
        success: false,
        orders: newOrders,
      },
    }

    const newState = ordersUserSlice.reducer(initialState, action)

    expect(newState.ordersUser).toEqual([])
  })
})
