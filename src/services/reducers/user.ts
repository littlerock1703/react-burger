import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUser } from '../../utils/custom'
import { login, logout } from '../actions/user'

type IUserState = {
  user: IUser | null
  isAuth: boolean
}

const initialState: IUserState = {
  user: null,
  isAuth: false,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload
    },
    setUser: (state, action: PayloadAction<IUser | null>) => {
      state.user = action.payload
    },
  },
  selectors: {
    getIsAuth: state => state.isAuth,
    getUser: state => state.user,
  },
  extraReducers: builder => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload
        state.isAuth = true
      })
      .addCase(logout.fulfilled, state => {
        state.user = null
      })
  },
})

export const { getIsAuth, getUser } = userSlice.selectors
export default userSlice.reducer
export const setIsAuthAction = userSlice.actions.setIsAuth;
export const setUserAction = userSlice.actions.setUser;
