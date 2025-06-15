import { useSelector } from '../../../services/reducers/index'
import style from './order-preview.module.scss'

const limitForPreview: number = 6

interface IOrderPreviewProps {
  ingredients: string[]
}

export const OrderPreview = ({ ingredients }: IOrderPreviewProps): React.JSX.Element => {
  const ingredientsWithId = useSelector(state => state.ingredients.ingredientsWithId)
  const countMore = Math.max(0, ingredients.length - limitForPreview)
  const ingredientsPreview = ingredients.slice(0, limitForPreview)

  return (
    <ul className={style.preview}>
      {ingredientsPreview.map((id, index) => {
        const ingredient = ingredientsWithId[id]
        if (!ingredient) return null
        const zIndex = ingredientsPreview.length - index
        return (
          <li key={index} className={style.ingredient} style={{ zIndex }}>
            <img src={ingredient.image} alt={ingredient.name} height="56" width="112"/>
            {countMore > 0 && zIndex === 1 && (<span className={style.more}>+{countMore}</span>)}
          </li>
        )
      })}
    </ul>
  )
}
