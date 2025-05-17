import { IUser, IResponseSuccess, IRefreshTokenResponse, IUserResponse } from './custom'

export const BASE_URL_API = 'https://norma.nomoreparties.space/api/'

export const endpoints = {
  ingredients: BASE_URL_API + 'ingredients',
  orders: BASE_URL_API + 'orders',
  logout: BASE_URL_API + 'auth/logout',
  login: BASE_URL_API + 'auth/login',
  passwordReset: BASE_URL_API + 'password-reset',
  passwordUpdate: BASE_URL_API + 'password-reset/reset',
  register: BASE_URL_API + 'auth/register',
  user: BASE_URL_API + 'auth/user',
  token: BASE_URL_API + 'auth/token',
}

const checkSuccess = <T extends IResponseSuccess>(res: T): Promise<T> => {
  return res.success ? Promise.resolve(res) : Promise.reject(res)
}

const checkResponse = <T>(res: Response): Promise<T> => {
  return res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`)
}

export const request = <T extends IResponseSuccess>(url: string, options?: RequestInit): Promise<T> => {
  return fetch(url, options)
    .then(checkResponse<T>)
    .then(checkSuccess<T>)
}

export const requestWithRefresh = async <T extends IResponseSuccess>(
  url: string,
  options?: RequestInit,
): Promise<T> => {
  try {
    return await request<T>(url, options)
  } catch (err: any) {
    if (err.message === 'jwt expired' || err.message === 'jwt malformed') {
      const refreshData = await request<IRefreshTokenResponse>(endpoints.token, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
      })
      localStorage.setItem('accessToken', refreshData.accessToken)
      localStorage.setItem('refreshToken', refreshData.refreshToken)
      if (options && options.headers) {
        (options.headers as Record<string, string>)[
          'Authorization'
        ] = refreshData.accessToken
      }
      return await request<T>(url, options)
    } else {
      throw err
    }
  }
}

export const resetPassword = async ({ email }: { email: string }) => {
  return await request<IResponseSuccess>(endpoints.passwordReset, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  })
}

export const updatePassword = async ({newPassword, confirmCode}: {newPassword: string, confirmCode: string}) => {
  return await request<IResponseSuccess>(endpoints.passwordUpdate, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      password: newPassword,
      token: confirmCode,
    })
  })
}

export const api = {
  register: ({ email, password, name }: IUser) =>
    request<IUserResponse>(endpoints.register, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ email, password, name })
    }),
  getUser: () =>
    requestWithRefresh<IUserResponse>(endpoints.user, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: localStorage.getItem('accessToken') || ''
      }
    }).then(res => res.user)
}

