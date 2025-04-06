import { useState, useEffect } from 'react'
import { AppHeader } from '../app-header/app-header'
import { BurgerConstructor } from '../burger-constructor/burger-constructor'
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { ingredientsData } from '../../utils/data'
import IBurgerIngredient from '../../utils/custom'
import style from './app.module.scss'


const INGREDIENTS_URL = 'https://norma.nomoreparties.space/api/ingredients'

function App() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const [burgerComposition, setBurgerComposition] = useState<IBurgerIngredient[]>([])
  const [ingredients, setIngredients] = useState<IBurgerIngredient[]>([])

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const res = await fetch(INGREDIENTS_URL);
        if (!res.ok) throw new Error(`Error ${res.status}`);
        
        const { success, data } = await res.json();
        if (!success) throw new Error(`Error ${data}`);
        
        setIngredients(data);
        setBurgerComposition(data);
      } catch (error) {
        console.error('Error', error.message);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchIngredients();
  }, []);

  return (
    <>
      <AppHeader />
      {!loading && !error && (
        <main className={style.content}>
          <BurgerIngredients ingredients={ingredients} />
          <BurgerConstructor ingredients={burgerComposition} />
        </main>
      )} 
    </>
  )
}

export default App
