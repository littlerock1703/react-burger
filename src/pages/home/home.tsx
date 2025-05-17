import { BurgerIngredients } from '../../components/burger-ingredients/burger-ingredients'
import { BurgerConstructor } from '../../components/burger-constructor/burger-constructor'
import { selectIngredients } from '../../services/reducers/burger-ingredients'
import { useSelector } from 'react-redux'
import style from './home.module.scss'

export const HomePage = () => {
  const { ingredientsRequest, ingredientsFailed } = useSelector(selectIngredients)

  return (
    <>
      {ingredientsRequest ? (
        <p className={style.preload}>Загрузка...</p>
      ) : ingredientsFailed ? (
        <p className={style.preload}>Что-то пошло не так</p>
      ) : (
        <>
          <BurgerIngredients />
          <BurgerConstructor />
        </>
      )}
    </>
  )
}