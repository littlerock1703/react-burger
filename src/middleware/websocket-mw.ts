import {
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
  Middleware,
} from '@reduxjs/toolkit'
import { RootState } from '../services/reducers/index'

export type TWsActionTypes<R, S> = {
  connect: ActionCreatorWithPayload<string>
  disconnect: ActionCreatorWithoutPayload
  sendMessage?: ActionCreatorWithPayload<S>
  onConnecting: ActionCreatorWithoutPayload
  onOpen: ActionCreatorWithoutPayload
  onClose: ActionCreatorWithoutPayload
  onError: ActionCreatorWithPayload<string>
  onMessage: ActionCreatorWithPayload<R>
}

const RECONNECT_PERIOD = 3000

export const socketMiddleware = <R, S>(
  wsActions: TWsActionTypes<R, S>,
  withTokenRefresh: boolean = false,
): Middleware<object, RootState> => {
  return store => {
    let socket: WebSocket | null = null
    let isConnected = false
    let reconnectTimer = 0
    let url = ''
    const {
      connect,
      sendMessage,
      onOpen,
      onClose,
      onError,
      onMessage,
      onConnecting,
      disconnect,
    } = wsActions

    const handleOpen = () => store.dispatch(onOpen())
    const handleError = (msg = 'Error') => store.dispatch(onError(msg))
    const handleClose = () => {
      store.dispatch(onClose())
      if (isConnected) {
        reconnectTimer = window.setTimeout(() => {
          store.dispatch(connect(url))
        }, RECONNECT_PERIOD)
      }
    }
    const handleMessage = async (event: MessageEvent) => {
      try {
        const parsedData = JSON.parse(event.data)
        if (
          withTokenRefresh &&
          parsedData.message === 'Invalid or missing token'
        ) {
          try {
            const response = await fetch(
              'https://norma.nomoreparties.space/api/auth/token',
              {
                method: 'POST',
                headers: { 'Content-Type': 'application/json;charset=utf-8' },
                body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
              },
            )
            if (!response.ok) throw new Error('Ошибка ' + response.status)
            const refreshData = await response.json()
            if (!refreshData.success) throw new Error(refreshData.message || 'Ошибка обновления токена')
            localStorage.setItem('refreshToken', refreshData.refreshToken)
            localStorage.setItem('accessToken', refreshData.accessToken)
            const wssUrl = new URL(url)
            wssUrl.searchParams.set(
              'token',
              refreshData.accessToken.replace('Bearer ', ''),
            )
            store.dispatch(connect(wssUrl.toString()))
          } catch (error) {
            handleError((error as { message: string }).message)
          }
          store.dispatch(disconnect())
          return
        }
        store.dispatch(onMessage(parsedData))
      } catch (error) {
        handleError((error as { message: string }).message)
      }
    }

    return next => action => {
      if (connect.match(action)) {
        url = action.payload
        socket = new WebSocket(url)
        isConnected = true
        store.dispatch(onConnecting())
        socket.onopen = handleOpen
        socket.onmessage = handleMessage
        socket.onerror = () => handleError()
        socket.onclose = handleClose
      }

      if (socket && sendMessage?.match(action)) {
        try {
          socket.send(JSON.stringify(action.payload))
        } catch (error) {
          handleError((error as { message: string }).message)
        }
      }

      if (socket && disconnect.match(action)) {
        clearTimeout(reconnectTimer)
        isConnected = false
        reconnectTimer = 0
        socket.close()
        socket = null
      }

      next(action)
    }
  }
}
