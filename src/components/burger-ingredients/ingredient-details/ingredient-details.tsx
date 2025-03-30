import IBurgerIngredient from '../../../utils/custom'
import style from './ingredient-details.module.scss'

interface IngredientDetailsProps {
  ingredient: IBurgerIngredient
}

export const IngredientDetails = ({ ingredient }: IngredientDetailsProps) => {
  return (
    <div className={style.details}>
      <div className={style.image} style={{ backgroundImage: `url(${ingredient.image_large})` }}/>
      <span className={style.name}>{ingredient.name}</span>
      <ul className={style.nutrients}>
        {[
          { label: 'Калории, ккал', value: ingredient.calories },
          { label: 'Белки, г', value: ingredient.proteins },
          { label: 'Жиры, г', value: ingredient.fat },
          { label: 'Углеводы, г', value: ingredient.carbohydrates },
        ].map((item, index) => (
          <li key={index} className={style.item}>
            <span>{item.label}</span>
            <span className={style.value}>{item.value}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
