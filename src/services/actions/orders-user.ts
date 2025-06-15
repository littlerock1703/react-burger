import { createAction } from '@reduxjs/toolkit'
import { IOrderRequest } from '../../utils/custom'

export const OrdersUserActions = {
  connect: createAction<string, 'USER_ORDERS_CONNECT'>('USER_ORDERS_CONNECT'),
  onOpen: createAction('USER_ORDERS_OPEN'),
  disconnect: createAction('USER_ORDERS_DISCONNECT'),
  onError: createAction<string, 'USER_ORDERS_ERROR'>('USER_ORDERS_ERROR'),
  onMessage: createAction<IOrderRequest, 'USER_ORDERS_MESSAGE'>('USER_ORDERS_MESSAGE'),
  onConnecting: createAction('USER_ORDERS_CONNECTING'),
  onClose: createAction('USER_ORDERS_CLOSE'),
}