import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { RootState, useDispatch, useSelector } from '../../../services/reducers/index'
import { OrdersUserActions } from '../../../services/actions/orders-user'
import { OrderQueue } from '../../order-details/order-queue/order-queue'
import { IOrder } from '../../../utils/custom'
import { wsEndpoints } from '../../../utils/api'
import style from './orders.module.scss'

export const ProfileOrders = (): React.JSX.Element => {
  const dispatch = useDispatch()
  const orders = useSelector((state: RootState) => state.ordersUser.ordersUser)

  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(OrdersUserActions.connect(wsEndpoints.ordersUser))
    return () => {
      dispatch(OrdersUserActions.disconnect())
    }
  }, [])

  const openDetails = (number: number) => {
    navigate(`/profile/orders/${number}`, {state: { background: location }})
  }

  if (orders.length < 1) {
    return <>
      <p className={style.loader}>Загрузка...</p>
    </>
  }

  return (
    <div className={style.orders}>
      {orders.map((order: IOrder) => (
        <OrderQueue order={order} key={order._id} onClick={() => openDetails(order.number)} />
      ))}
    </div>
  )
}
