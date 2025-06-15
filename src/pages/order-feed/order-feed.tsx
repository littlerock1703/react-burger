import { useEffect } from 'react'
import { useDispatch, useSelector } from '../../services/reducers/index'
import { IOrder } from '../../utils/custom'
import { OrderQueue } from '../../components/order-details/order-queue/order-queue'
import { OrdersHistoryActions } from '../../services/actions/orders-history'
import { wsEndpoints } from '../../utils/api'
import { useLocation, useNavigate } from 'react-router-dom'
// import { Loader } from '../../components/loader/loader'
import style from './order-feed.module.scss'

const ORDER_DISPLAY_LIMIT = 14

export const FeedPage = (): React.JSX.Element => {
  const dispatch = useDispatch()
  const { orders, total, totalToday } = useSelector(state => state.orders)

  useEffect(() => {
    dispatch(OrdersHistoryActions.connect(wsEndpoints.feed))
    return () => {
      dispatch(OrdersHistoryActions.disconnect())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const location = useLocation()
  const navigate = useNavigate()

  const openDetails = (number: number) => {
    navigate(`/feed/${number}`, {
      state: { background: location },
    })
  }

  if (orders.length < 1) {
    return <>
      <p className={style.loader}>Загрузка...</p>
    </>
  }

  return (
    <div className={style.container}>
      <h1 className={style.header}>Лента заказов</h1>
      <section className={style.ordersHistory}>
        <div className={style.orders}>
          {orders.map((order: IOrder) => (
            <OrderQueue
              key={order._id}
              order={order}
              onClick={() => openDetails(order.number)}
              statusVisability={false}
            />
          ))}
        </div>
      </section>
      <section className={style.ordersInfo}>
        <div className={style.ordersStatuses}>
          <div>
            <h3 className={style.title}>Готовы:</h3>
            <ul className={`${style.orderNumbers} ${style.success}`}>
              {orders
                .filter((order: IOrder) => order.status === 'done')
                .slice(0, ORDER_DISPLAY_LIMIT)
                .map((order: IOrder) => (
                  <li key={order.number}>{order.number}</li>
                ))}
            </ul>
          </div>
          <div>
            <h3 className={style.title}>В работе:</h3>
            <ul className={style.orderNumbers}>
              {orders
                .filter((order: IOrder) => order.status !== 'done')
                .slice(0, ORDER_DISPLAY_LIMIT)
                .map((order: IOrder) => (
                  <li key={order.number}>{order.number}</li>
                ))}
            </ul>
          </div>
        </div>
        <p>
          <span className={style.title}>Выполнено за все время:</span>
          <span className={style.total}>{total}</span>
        </p>
        <p>
          <span className={style.title}>Выполнено за сегодня:</span>
          <span className={style.total}>{totalToday}</span>
        </p>
      </section>
    </div>
  )
}
