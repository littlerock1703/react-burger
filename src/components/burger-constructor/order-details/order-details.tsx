import iconChecked from '../../../assets/checked.svg'
import style from './order-details.module.scss'

export const OrderDetails = () => {
  return (
    <div className={style.order}>
      <p className={`${style.order__id} text text_type_digits-large mt-4 mb-8`}>
        034536
      </p>
      <p className="text text_type_main-medium">идентификатор заказа</p>
      <img className="mt-15 mb-15" src={iconChecked} alt="Изображение успешного заказа" width="120" height="120" />
      <p className="text text_type_main-default mb-2">
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-default mb-20" style={{ color: `var(--text-inactive-color)` }}>
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  )
}
