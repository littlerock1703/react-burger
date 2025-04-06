import {
    CurrencyIcon,
    Counter,
  } from '@ya.praktikum/react-developer-burger-ui-components'
import IBurgerIngredient from '../../../utils/custom'
  
import style from './ingredient-item.module.scss'
  
interface IngredientItemProps {
  ingredient: IBurgerIngredient
  count?: number
  onClick: () => void
}

export const IngredientItem = ({
  ingredient,
  onClick,
  count = 0,
}: IngredientItemProps) => {
  return (
    <div className={style.ingredient} onClick={onClick}>
      {count > 0 && <Counter count={count} size="default" extraClass="m-1" />}
      <img src={ingredient.image} alt={ingredient.name} width="240" height="120" />
      <div className={style.price}>
        <span className="text text_type_digits-default">
          {ingredient.price}
        </span>
        <CurrencyIcon type="primary" />
      </div>
      <span className={style.name}>{ingredient.name}</span>
    </div>
  )
}
