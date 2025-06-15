export interface IBurgerIngredient {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
}

export interface IResponseSuccess {
  success: boolean
  message?: string
}

export interface IIngredientsResponse extends IResponseSuccess {
  data: IBurgerIngredient[]
}

export interface IConstructorBurgerIngredient extends IBurgerIngredient {
  uuid: string
}

export interface IOrderState {
  bun: IConstructorBurgerIngredient | null
  ingredients: IConstructorBurgerIngredient[]
  orderNumber: number | null
  orderCreateRequest: boolean
  orderCreateFailed: string | null
  orderGetRequest: boolean
  orderGetFailed: string | null
  currentOrder: IOrder | null
}

export interface IOrderNumberResponse extends IResponseSuccess {
  name: string
  order: {number: number}
}

export interface IIngredientWithIdState {
  [key: string]: IBurgerIngredient
}

export interface IIngredientsState {
  ingredientsWithId: IIngredientWithIdState
  ingredients: IBurgerIngredient[] | []
  ingredientsFailed: null | string
  ingredientsRequest: boolean
}

export interface IFormData {
  [key: string]: string
}

export interface IFormDataReturn {
  value: IFormData
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  setValue: React.Dispatch<React.SetStateAction<IFormData>>
}

export interface IUser {
  name: string
  email: string
  password?: string
}

export interface IRefreshTokenResponse extends IResponseSuccess {
  accessToken: string
  refreshToken: string
}


export interface IUserResponse extends IRefreshTokenResponse {
  user: IUser
}

export interface IOrderResponse {
  orders: IOrder[]
  total: number | undefined
  totalToday: number | undefined
}

export interface IOrder {
  _id: string
  number: number
  name: string
  ingredients: string[]
  updatedAt: string
  createdAt: string
  status: keyof typeof OrderStatuses
  owner: string
  __v: number
}

export enum WebsocketStatus {
  CONNECTING = 'CONNECTING',
  OFFLINE = 'OFFLINE',
  ONLINE = 'ONLINE'
}

export interface IOrderRequest extends IOrderResponse, IResponseSuccess {}

export enum OrderStatuses {
  pending,
  done,
  created
}
