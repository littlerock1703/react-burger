import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { IOrder } from '../../utils/custom'
import { useSelector, useDispatch } from '../../services/reducers/index'
import { requestOrder } from '../../services/actions/burger-constructor'
import { PriceGrid } from './price-grid/price-grid'
import { OrderPrice } from './order-price/order-price'
import { OrderStatus } from './order-status/order-status'
import style from './order-details.module.scss'

const stackIngredients = (ingredients: string[]): Record<string, number> => {
  const similarIngredients: Record<string, number> = {}
  ingredients.forEach((ingredientId: string) => { similarIngredients[ingredientId] = (similarIngredients[ingredientId] || 0) + 1})
  return similarIngredients
}

export const OrderDetails = (): React.JSX.Element => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const number = Number(id)

  const ingredientsWithId = useSelector(
    state => state.ingredients.ingredientsWithId,
  )

  const selectedOrder: IOrder | null = useSelector(state => {
    let order = state.orders.orders.find(order => order.number === number)
    if (order) return order

    order = state.ordersUser.ordersUser.find(order => order.number === number)
    if (order) return order

    return state.order.currentOrder
  })

  useEffect(() => {
    if (!selectedOrder) {
      dispatch(requestOrder(number))
    }
  }, [])

  if (!selectedOrder) {
    return <>
      <p className={style.loader}>Загрузка...</p>
    </>
  }

  const stackedIngredients = stackIngredients(selectedOrder.ingredients)

  return (
    <div className={style.details}>
      <h3 className={style.id}>#{selectedOrder.number}</h3>
      <div className={style.head}>
        <h3 className={style.title}>{selectedOrder.name}</h3>
        <OrderStatus status={selectedOrder.status} />
      </div>

      <div className={style.body}>
        <h3 className={style.title}>Состав:</h3>
        <ul className={style.list}>
          {Object.keys(stackedIngredients).map((id, index: number) => {
            const ingredient = ingredientsWithId[id]
            if (!ingredient) return null
            const count = stackedIngredients[id]
            return (
              <li className={style.item} key={index}>
                <div className={style.item__ingredient}>
                  <div className={style.img}>
                    <img height="56" width="112" src={ingredient.image} alt={ingredient.name} />
                  </div>
                  <h4 className={style.name}>{ingredient.name}</h4>
                </div>
                <div className={style.item__price}>
                  <PriceGrid price={ingredient.price} count={count} />
                </div>
              </li>
            )
          })}
        </ul>
      </div>

      <div className={style.footer}>
        <FormattedDate className={style.date} date={new Date(selectedOrder.createdAt)} />
        <OrderPrice ingredients={selectedOrder.ingredients} />
      </div>
    </div>
  )
}
