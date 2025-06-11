import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components'
import { IOrder } from '../../../utils/custom'
import { OrderPrice } from '../order-price/order-price'
import { OrderStatus } from '../order-status/order-status'
import { OrderPreview } from '../order-preview/order-preview'
import style from './order-queue.module.scss'

interface IOrderQueueProps {
  order: IOrder
  statusVisability?: boolean
  onClick?: () => void
}

export const OrderQueue = ({ order, statusVisability = true, onClick = () => {}}: IOrderQueueProps): React.JSX.Element => {
  return (
    <div className={style.queue} onClick={onClick}>
      <div className={style.header}>
        <p className={style.id}>#{order.number}</p>
        <FormattedDate className={style.date} date={new Date(`${order.createdAt}`)} />
      </div>
      <div className={style.body}>
        <h3 className={style.title}>{order.name}</h3>
        {statusVisability && <OrderStatus status={order.status} />}
      </div>
      <div className={style.footer}>
        <OrderPreview ingredients={order.ingredients} />
        <OrderPrice ingredients={order.ingredients} />
      </div>
    </div>
  )
}
