import { useSelector } from '../../../services/reducers/index'
import { PriceGrid } from '../price-grid/price-grid'

interface IOrderPriceProps {
  ingredients: string[]
}

export const OrderPrice = ({ ingredients }: IOrderPriceProps): React.JSX.Element => {
  const ingredientsWithId = useSelector(state => state.ingredients.ingredientsWithId)
  const totalPrice = ingredients.reduce((acum, ingredientId) => {return acum + (ingredientsWithId[ingredientId]?.price ?? 0)}, 0)

  return <PriceGrid price={totalPrice} />
}
