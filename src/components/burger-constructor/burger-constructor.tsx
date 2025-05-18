import { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useDrop } from 'react-dnd'
import {
  CurrencyIcon,
  Button
} from '@ya.praktikum/react-developer-burger-ui-components'

import { Modal } from '../modal/modal'
import { IBurgerIngredient } from '../../utils/custom'
import style from './burger-constructor.module.scss'
import { OrderDetails } from './order-details/order-details'
import { createOrder } from '../../services/actions/burger-constructor'
import { setBun, addIngredient, cleanOrder } from '../../services/reducers/burger-constructor'
import { OrderElement } from './order-element/order-element'


export const BurgerConstructor = (): React.JSX.Element => {

  const dispatch = useDispatch()
  const { bun, ingredients } = useSelector(state => state.order)
  const { user } = useSelector(state => state.user)

  const [visibilityOrder, setVisibilityOrder] = useState(false)
  const navigate = useNavigate()

  const countTotalPrice = useMemo(() => {
    const totalPrice = ingredients.reduce((acc, ingredient) => acc + ingredient?.price, 0) + (bun ? bun.price * 2 : 0)
    return totalPrice
  }, [ingredients, bun])

  const handleModalWinOpen = () => {
    if (!user) {
      navigate('/login')
    }
    else {
      dispatch(createOrder())
      setVisibilityOrder(true)
    }
  }

  const handleModalWinClose = () => {
    dispatch(cleanOrder())
    setVisibilityOrder(false)
  }

  const handleDrop = (ingredient: IBurgerIngredient) => {
    if (ingredient.type === 'main' || ingredient.type === 'sauce' ) {
      dispatch(addIngredient(ingredient))
    } else {
      dispatch(setBun(ingredient))
    }
  }

  const [_, drop] = useDrop({
    accept: 'ingredient',
    drop: handleDrop,
  })

  return (
    <section className={style.burgerConstructor } ref={drop}>
      <ul className={`${style.burgerConstructor__block} ${(bun === null && ingredients.length < 1) && style.empty}`}>
        {bun !== null && (
          <OrderElement
            type="top"
            text={`${bun.name} (верх)`}
            isLocked={true}
            thumbnail={bun.image}
            price={bun.price}
          />
        )}
        <li className={style.composition}>
          <ul className={style.composition__list}>
            {ingredients.map((ingredient, index)  => (
              <OrderElement
                index={index}
                key={ingredient.uuid}
                isLocked={false}
                uuid={ingredient.uuid}
                text={ingredient.name}
                thumbnail={ingredient.image}
                price={ingredient.price}
              />
            ))}
          </ul>
        </li>
        {bun !== null && (
          <OrderElement
            type="bottom"
            text={`${bun.name} (низ)`}
            isLocked={true}
            thumbnail={bun.image}
            price={bun.price}
          />
        )}
      </ul>
      <div className={style.burgerConstructor__info}>
        <div className={style.price}>
          <span className="text text_type_digits-medium">{countTotalPrice}</span>
          <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="button" type="primary" size="large" disabled={!bun && ingredients.length === 0} onClick={handleModalWinOpen}>
          Оформить заказ
        </Button>
      </div>

      {visibilityOrder && (
        <Modal onClose={handleModalWinClose}>
          <OrderDetails />
        </Modal>
      )}
    </section>
  )
}