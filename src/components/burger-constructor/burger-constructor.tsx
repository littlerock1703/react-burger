import {
  CurrencyIcon,
  DragIcon,
  Button,
  ConstructorElement,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { useState } from 'react'

import { Modal } from '../modal/modal'
import IBurgerIngredient from '../../utils/custom'
import style from './burger-constructor.module.scss'
import { OrderDetails } from './order-details/order-details'


interface IBurgerConstructorProps {
  ingredients: IBurgerIngredient[]
}

export const BurgerConstructor = ({ ingredients }: IBurgerConstructorProps) => {

  const [visibilityOrder, setVisibilityOrder] = useState(false)
  let bun = null
  const filling = []

  for (const ingredient of ingredients) {
    if (ingredient.type === 'bun') {
      bun = ingredient
    } else {
      filling.push(ingredient)
    }
  }

  return (
    <section className={style.burgerConstructor}>
      <div className={style.burgerConstructor__block}>
        {bun !== null && (
          <div className={style.bun}>
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${bun.name} (верх)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          </div>
        )}
        <div className={style.composition}>
          <ul className={style.composition__list}>
            {filling.map(ingredient => (
              <li key={ingredient._id} className={style.ingredient}>
                <DragIcon type="primary" />
                <ConstructorElement
                  text={ingredient.name}
                  price={ingredient.price}
                  thumbnail={ingredient.image}
                />
              </li>
            ))}
          </ul>
        </div>
        {bun !== null && (
          <div className={style.bun}>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${bun.name} (низ)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          </div>
        )}
      </div>
      <div className={style.burgerConstructor__info}>
        <div className={style.price}>
          <span className="text text_type_digits-medium">610</span>
          <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="button" type="primary" size="large" onClick={() => setVisibilityOrder(true)}>
          Оформить заказ
        </Button>
      </div>

      {visibilityOrder && (
        <Modal onClose={() => setVisibilityOrder(false)}>
          <OrderDetails />
        </Modal>
      )}
    </section>
  )
}