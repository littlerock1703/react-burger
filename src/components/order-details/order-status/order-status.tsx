import { OrderStatuses } from '../../../utils/custom'
import style from './order-status.module.scss'

interface IOrderStatusProps {
  status: keyof typeof OrderStatuses
}

export const OrderStatus = ({ status }: IOrderStatusProps): React.JSX.Element => {
  return (
    <span className={`${style['stat_' + status]} ${style.stat}`}>
      {{done: 'Выполнен', pending: 'Готовится', created: 'Создан'}[status]
      }
    </span>
  )
}
