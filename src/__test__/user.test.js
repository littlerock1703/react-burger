import { initialState, setIsAuthAction, setUserAction, userSlice } from '../services/reducers/user'
import { login, logout } from '../services/actions/user'

describe('userSlice Test', () => {

  it('should return the initial state', () => {
    expect(userSlice.reducer(undefined, { type: '' })).toEqual(initialState)
  })

  it('should handle login.fulfilled action', () => {
    const email = 'test@test.com'

    expect(
      userSlice.reducer(undefined, {
        type: login.fulfilled.type,
        payload: { email },
      }),
    ).toEqual({ ...initialState, isAuth: true, user: { email } })
  })

  it('should handle logout.fulfilled action', () => {
    expect(
      userSlice.reducer(undefined, {
        type: logout.fulfilled.type,
      }),
    ).toEqual({ ...initialState, user: null })
  })

  it('should create an action to set user', () => {
    const newUser = { name: 'User', email: 'test@test.com' }
    const action = setUserAction(newUser)

    const newState = userSlice.reducer(initialState, action)

    expect(newState.user).toEqual(newUser)
  })

  it('should create an action to set auth checked', () => {
    const action = setIsAuthAction(true)

    const newState = userSlice.reducer(initialState, action)

    expect(newState.isAuth).toBe(true)
  })
})
