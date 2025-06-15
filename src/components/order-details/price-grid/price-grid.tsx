import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { IBurgerIngredient } from '../../../utils/custom'
import style from './price-grid.module.scss'

enum PriceGridSizes { default, medium, large}

interface IPriceGridProps {
  price: IBurgerIngredient['price']
  count?: number
  size?: keyof typeof PriceGridSizes
}

export const PriceGrid = ({ price, count, size = 'default' }: IPriceGridProps): React.JSX.Element => {
  return (
    <div className={`${style.price} text text_type_digits-${size}`}>
      <span>{count ? `${count} x ${price}` : price}</span>
      <CurrencyIcon type="primary" />
    </div>
  )
}
