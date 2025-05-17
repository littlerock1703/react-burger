import { IResponseSuccess } from "./custom"

export const BASE_URL_API = 'https://norma.nomoreparties.space/api/'

export const endpoints = {
  ingredients: BASE_URL_API + 'ingredients',
  orders: BASE_URL_API + 'orders'
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
