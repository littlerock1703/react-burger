import { configureStore } from "@reduxjs/toolkit"
import { createOrder, requestOrder } from '../services/actions/burger-constructor'
import {
  burgerConstructorSlice,
  initialState,
  addIngredient
} from '../services/reducers/burger-constructor'
import { generateMockBun, generateMockIngredient, generateMockIngredients } from "./mocker"
import * as api from '../utils/api'

describe('burgerConstructorSlice reducers', () => {

  it('execute reducer setIngredients', () => {
    const newIngredients = generateMockIngredients(2)
    const action = burgerConstructorSlice.actions.setIngredients(newIngredients)

    const newState = burgerConstructorSlice.reducer(undefined, action)

    expect(newState.ingredients).toEqual(newIngredients)
  })

  it('execute reducer addIngredient', () => {
    const mokeIngredient = {
      ...generateMockIngredient(),
      uuid: 'qE23w'
    }
    const action = {
      type: addIngredient,
      payload: mokeIngredient,
    }

    const newState = burgerConstructorSlice.reducer(undefined, action)

    expect(newState.ingredients).toHaveLength(1)
    expect(newState.ingredients[0]).toEqual(mokeIngredient)
  })

  it('execute reducer setBun', () => {
    const mockBun = generateMockBun();
    const action = burgerConstructorSlice.actions.setBun(mockBun)

    const newState = burgerConstructorSlice.reducer(undefined, action)

    expect(newState.bun).toEqual(mockBun)
  })

  it('execute reducer removeIngredient', () => {
    const mockBun = generateMockBun()
    const initialIngredients = [...generateMockIngredients(4), mockBun]
    const initialStateWithIngredients = { ...initialState, ingredients: initialIngredients }
    const uuidRemovedIngredient = initialIngredients[0].uuid
    const action = burgerConstructorSlice.actions.removeIngredient(uuidRemovedIngredient)

    const newState = burgerConstructorSlice.reducer(initialStateWithIngredients, action)

    expect(newState.ingredients).toHaveLength(initialIngredients.length - 1)
    expect(newState.ingredients.some(ingredient => ingredient.uuid === uuidRemovedIngredient)).toBeFalsy()
  })
  
  it('execute reducer cleanOrder', () => {
    const initialStateWithOrder = {
      ...initialState,
      ingredients: generateMockIngredients(2),
      bun: generateMockBun(),
      orderNumber: 1234567,
    }
    const action = burgerConstructorSlice.actions.cleanOrder()

    const newState = burgerConstructorSlice.reducer(initialStateWithOrder, action)

    expect(newState.orderNumber).toBeNull()
    expect(newState.ingredients).toHaveLength(0)
    expect(newState.bun).toBeNull()
  })

  it('execute reducer moveIngredient', () => {
    const ingredient1 = generateMockIngredient()
    const ingredient2 = generateMockIngredient()
    const initialStateWithIngredients = {
      ...initialState,
      ingredients: [ingredient1, ingredient2],
    }
    
    const expectedState = {
      ...initialState,
      ingredients: [undefined, ingredient2],
    }

    const action = burgerConstructorSlice.actions.moveIngredient({ dragIndex: 0, hoverIndex: 1 })

    const newState = burgerConstructorSlice.reducer(initialStateWithIngredients, action)

    expect(newState).toEqual(expectedState);
  })

  it('execute reducer createOrder.pending', () => {
    const action = {
      type: createOrder.pending.type,
    }

    const newState = burgerConstructorSlice.reducer(undefined, action)

    expect(newState.orderCreateRequest).toBe(true)
    expect(newState.orderCreateFailed).toBeNull()
  })

  it('execute reducer createOrder.rejected', () => {
    const message = 'Some Error'
    const action = {
      type: createOrder.rejected.type,
      error: { message }
    }

    const newState = burgerConstructorSlice.reducer(undefined, action)

    expect(newState.orderCreateRequest).toBe(false)
    expect(newState.orderCreateFailed).toBe(message)
  })

  it('execute reducer createOrder.fulfilled', () => {
    const orderNumber = '1234567'
    const action = {
      type: createOrder.fulfilled.type,
      payload: orderNumber
    }

    const newState = burgerConstructorSlice.reducer(undefined, action)

    expect(newState.orderNumber).toBe(orderNumber)
    expect(newState.orderCreateRequest).toBe(false)
    expect(newState.orderCreateFailed).toBeNull()
  })

  it('execute reducer requestOrder.pending', () => {
    const action = {
      type: requestOrder.pending.type,
    }

    const newState = burgerConstructorSlice.reducer(undefined, action)

    expect(newState.orderGetRequest).toBe(true)
    expect(newState.orderGetFailed).toBeNull()
  })

  it('execute reducer requestOrder.fulfilled ingredients is not array', () => {
    const order = { ingredients: null }
    const action = {
      type: requestOrder.fulfilled.type,
      payload: order,
    }

    const newState = burgerConstructorSlice.reducer(undefined, action)

    expect(newState.currentOrder).toBeNull()
    expect(newState.orderGetRequest).toBe(false)
    expect(newState.orderGetFailed).toBeNull()
  })

  it('execute reducer requestOrder.fulfilled ingredients is array but bad', () => {
    const order = { ingredients: ['string', null] }
    const action = {
      type: requestOrder.fulfilled.type,
      payload: order,
    }

    const newState = burgerConstructorSlice.reducer(undefined, action)

    expect(newState.currentOrder).toBeNull()
    expect(newState.orderGetRequest).toBe(false)
    expect(newState.orderGetFailed).toBeNull()
  })

  it('execute reducer requestOrder.fulfilled', () => {
    const order = { ingredients: ['string', 'string'] }
    const action = {
      type: requestOrder.fulfilled.type,
      payload: order,
    }

    const newState = burgerConstructorSlice.reducer(undefined, action)

    expect(newState.currentOrder).toBe(order)
    expect(newState.orderGetRequest).toBe(false)
    expect(newState.orderGetFailed).toBeNull()
  })

  it('execute reducer requestOrder.rejected', () => {
    const message = 'Some Error'
    const action = {
      type: requestOrder.rejected.type,
      error: { message }
    }

    const newState = burgerConstructorSlice.reducer(undefined, action)

    expect(newState.orderGetRequest).toBe(false)
    expect(newState.orderGetFailed).toBe(message)
  })

})
