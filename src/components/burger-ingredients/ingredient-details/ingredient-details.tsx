import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import style from './ingredient-details.module.scss'

export const IngredientDetails = (): React.JSX.Element | null => {
  const { id } = useParams()
  const ingredients = useSelector(state => state.ingredients.ingredients)
  const ingredient = ingredients.find(item => item._id === id)
  if (!ingredient) return null

  return (
    !ingredient ? null : (
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
  )
}
