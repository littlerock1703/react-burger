import { IBurgerIngredient, IOrder, IConstructorBurgerIngredient } from '../utils/custom'

function generateString(length: number): string {
  const characters =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return result
}

export function generateHistoryOrder(): IOrder {
  const randomId = generateString(24)
  const randomIngredientCount = Math.floor(Math.random() * 5) + 1 // (1 to 5)
  const randomIngredients = Array.from({ length: randomIngredientCount }, () =>
    generateString(24),
  )

  return {
    _id: randomId,
    ingredients: randomIngredients,
    status: 'done',
    name: `Order-${generateString(8)}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    number: Math.floor(Math.random() * 1000) + 1,
  } as IOrder
}

export function generateMockIngredient(
  id?: string,
  uuid?: string,
  type: string = 'ingredient',
): IConstructorBurgerIngredient {
  return {
    _id: id || generateString(12),
    uuid: uuid || generateString(12),
    name: `Mock ${type} ${id || generateString(12)}`,
    type,
    proteins: Math.floor(Math.random() * 100),
    fat: Math.floor(Math.random() * 100),
    carbohydrates: Math.floor(Math.random() * 100),
    calories: Math.floor(Math.random() * 1000),
    price: Math.floor(Math.random() * 10000),
    image: `mock-${type}-image.jpg`,
    image_mobile: `mock-${type}-image-mobile.jpg`,
    image_large: `mock-${type}-image-large.jpg`,
    __v: 0,
  }
}

export function generateMockBun() {
  return generateMockIngredient(undefined, undefined, 'bun')
}

export function generateMockIngredients(
  count: number,
  type?: string,
): IBurgerIngredient[] {
  const ingredients: IBurgerIngredient[] = []
  for (let i = 1; i <= count; i++) {
    ingredients.push(generateMockIngredient(undefined, undefined, type))
  }
  return ingredients
}
