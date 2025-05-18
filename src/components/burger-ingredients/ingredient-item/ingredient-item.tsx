import { useSelector } from 'react-redux'
import { useDrag } from 'react-dnd'

import {
    CurrencyIcon,
    Counter,
  } from '@ya.praktikum/react-developer-burger-ui-components'
import { IBurgerIngredient } from '../../../utils/custom'
  
import style from './ingredient-item.module.scss'
  
interface IngredientItemProps {
  ingredient: IBurgerIngredient
  onClick: () => void
}

export const IngredientItem = ({
  ingredient,
  onClick,
}: IngredientItemProps): React.JSX.Element | null => {

  const { bun, ingredients } = useSelector(state => state.order)

  const count = [...ingredients, bun].filter(item => item?._id === ingredient._id).length

  const [_, drag] = useDrag({type: 'ingredient', item: ingredient})

  return (
    <li className={style.ingredient} ref={drag} onClick={onClick}>
      {count > 0 && <Counter count={count} size="default" extraClass="m-1" />}
      <img src={ingredient.image} alt={ingredient.name} width="240" height="120" />
      <div className={style.price}>
        <span className="text text_type_digits-default">
          {ingredient.price}
        </span>
        <CurrencyIcon type="primary" />
      </div>
      <span className={style.name}>{ingredient.name}</span>
    </li>
  )
}
