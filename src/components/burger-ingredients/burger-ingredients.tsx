import { useState } from 'react'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { IngredientItem } from './ingredient-item/ingredient-item'
import { IngredientDetails } from './ingredient-details/ingredient-details'
import { Modal } from '../modal/modal'
import style from './burger-ingredients.module.scss'
import IBurgerIngredient from '../../utils/custom'

interface IBurgerIngredientsProps {
  ingredients: IBurgerIngredient[]
}

export const BurgerIngredients = ({ ingredients }: IBurgerIngredientsProps) => {
  const [currentTab, setCurrentTab] = useState('buns')
  const [currentIngredient, setCurrentIngredient] =
    useState<IBurgerIngredient | null>(null)

  const categories = [
    { type: 'bun', title: 'Булки', count: 3 },
    { type: 'sauce', title: 'Соусы', count: 0 },
    { type: 'main', title: 'Начинки', count: 1 },
  ]

  const filteredItems = (type: string) =>
    ingredients.filter(item => item.type === type)

  return (
    <section className={style.ingredients}>
      <header className={style.header}>
        <h1 className={style.title}>Соберите бургер</h1>
        <nav className={style.tabs}>
          {categories.map(({ type, title }) => (
            <Tab
              key={type}
              value={type}
              active={currentTab === type}
              onClick={setCurrentTab}
            >
              {title}
            </Tab>
          ))}
        </nav>
      </header>

      <section className={style.categories}>
        <div className={style.views}>
          {categories.map(({ type, title, count }) => (
            <article key={type} className={style.category}>
              <h2 className={style.category__title}>{title}</h2>
              <ul className={style.list}>
                {filteredItems(type).map(item => (
                  <IngredientItem
                    key={item._id}
                    ingredient={item}
                    onClick={() => setCurrentIngredient(item)}
                    count={count}
                  />
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {currentIngredient && (
        <Modal title="Детали ингредиента" onClose={() => setCurrentIngredient(null)}>
          <IngredientDetails ingredient={currentIngredient} />
        </Modal>
      )}
    </section>
  )
}
