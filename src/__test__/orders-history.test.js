import { initialState, ordersSlice, setOrders, setTotals } from '../services/reducers/orders-history'
import { WebsocketStatus } from '../utils/custom'
import { generateHistoryOrder } from './mocker'

describe('orders slice reducers', () => {

  it('execute reducer action to set totals', () => {
    const { total, totalToday } = { total: 5, totalToday: 10 }
    const action = setTotals({ total, totalToday })

    const newState = ordersSlice.reducer(initialState, action)

    expect(newState.totalToday).toEqual(totalToday)
    expect(newState.total).toEqual(total)
  })

  it('execute reducer action to set orders', () => {
    const newOrders = [generateHistoryOrder()]
    const action = setOrders(newOrders)

    const newState = ordersSlice.reducer(initialState, action)

    expect(newState.orders).toEqual(newOrders)
  })

  it('execute reducer action to handle onConnecting', () => {
    const action = { type: 'ORDERS_CONNECTING' }

    const newState = ordersSlice.reducer(initialState, action)

    expect(newState.status).toEqual(WebsocketStatus.CONNECTING)
  })

  it('execute reducer action to handle onOpen', () => {
    const action = { type: 'ORDERS_OPEN' }

    const newState = ordersSlice.reducer(initialState, action)

    expect(newState.status).toEqual(WebsocketStatus.ONLINE)
  })

  it('execute reducer action to handle onClose', () => {
    const action = { type: 'ORDERS_CLOSE' }

    const newState = ordersSlice.reducer(initialState, action)

    expect(newState.status).toEqual(WebsocketStatus.OFFLINE)
  })

  it('execute reducer action to handle onMessage with success and orders', () => {
    const newOrders = [generateHistoryOrder(), generateHistoryOrder()]
    const { total, totalToday } = { total: 2, totalToday: 8 }
    const action = {
      type: 'ORDERS_MESSAGE',
      payload: {
        success: true,
        orders: newOrders,
        totalToday,
        total,
      },
    }

    const newState = ordersSlice.reducer(initialState, action)

    expect(newState.orders).toEqual(newOrders)
    expect(newState.totalToday).toEqual(totalToday)
    expect(newState.total).toEqual(total)
  })

  it('execute reducer action to handle onMessage with failed', () => {
    const newOrders = [generateHistoryOrder(), generateHistoryOrder()]
    const { total, totalToday } = { total: 2, totalToday: 8 }
    const action = {
      type: 'ORDERS_MESSAGE',
      payload: {
        success: false,
        orders: newOrders,
        totalToday,
        total,
      },
    }

    const newState = ordersSlice.reducer(initialState, action)

    expect(newState.totalToday).toEqual(initialState.totalToday)
    expect(newState.total).toEqual(initialState.total)
    expect(newState.orders).toEqual([])
  })
})
