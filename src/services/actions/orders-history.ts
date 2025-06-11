import { createAction } from '@reduxjs/toolkit'
import { IOrderRequest } from '../../utils/custom'

export const OrdersHistoryActions = {
  onError: createAction<string, 'ORDERS_ERROR'>('ORDERS_ERROR'),
  disconnect: createAction('ORDERS_DISCONNECT'),
  onMessage: createAction<IOrderRequest, 'ORDERS_MESSAGE'>('ORDERS_MESSAGE'),
  onConnecting: createAction('ORDERS_CONNECTING'),
  connect: createAction<string, 'ORDERS_CONNECT'>('ORDERS_CONNECT'),
  onClose: createAction('ORDERS_CLOSE'),
  onOpen: createAction('ORDERS_OPEN'),
}