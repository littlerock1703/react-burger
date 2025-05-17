import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AppHeader } from '../app-header/app-header'
import { BurgerConstructor } from '../burger-constructor/burger-constructor'
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { getIngredients } from '../../services/actions/burger-ingredients'
import style from './app.module.scss'
import { selectIngredients } from '../../services/reducers/burger-ingredients'

function App() {
  const dispatch = useDispatch()
  const { ingredientsRequest, ingredientsFailed } = useSelector(selectIngredients)

  useEffect(() => {
    dispatch(getIngredients())
  }, [dispatch]);

  return (
    <>
      <AppHeader />
      {ingredientsRequest && <main className={style.content}>
        <p className={style.preload}>Загрузка...</p>
      </main>}
      {ingredientsFailed && <main className={style.content}>
        <p className={style.preload}>Что-то пошло не так</p>
      </main>}
      {!ingredientsRequest && !ingredientsFailed && (
        <main className={style.content}>
          <BurgerIngredients />
          <BurgerConstructor />
        </main>
      )} 
    </>
  )
}

export default App
