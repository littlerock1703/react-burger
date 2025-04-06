import { useRef, RefObject, useState } from 'react'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { IngredientItem } from './ingredient-item/ingredient-item'
import { IngredientDetails } from './ingredient-details/ingredient-details'
import { Modal } from '../modal/modal'
import style from './burger-ingredients.module.scss'
import { IBurgerIngredient } from '../../utils/custom'

interface IBurgerIngredientsProps {
  ingredients: IBurgerIngredient[]
}

export const BurgerIngredients = ({ ingredients }: IBurgerIngredientsProps) => {
  const [currentTab, setCurrentTab] = useState('buns')
  const [currentIngredient, setCurrentIngredient] =
    useState<IBurgerIngredient | null>(null)

  const bunsRef = useRef<HTMLDivElement>(null)
  const mainRef = useRef<HTMLDivElement>(null)
  const sauceRef = useRef<HTMLDivElement>(null)
  const viewRef = useRef<HTMLDivElement>(null)

  const categories = [
    { type: 'bun', title: 'Булки', tabRef: bunsRef},
    { type: 'sauce', title: 'Соусы', tabRef: sauceRef },
    { type: 'main', title: 'Начинки', tabRef: mainRef }
  ]

  const scrollToCategory = (refObj: RefObject<HTMLDivElement>) => {
    if (refObj && refObj.current) {
      refObj.current.scrollIntoView({behavior: 'smooth', block: 'start'})
    }
  }

  const handleScroll = () => {
    if (bunsRef.current && mainRef.current && sauceRef.current && viewRef.current) {
      const viewBlock = viewRef.current.getBoundingClientRect()
      const tabsBlock: [string, DOMRect][] = [
        ['bun', bunsRef.current.getBoundingClientRect()],
        ['sauce', sauceRef.current.getBoundingClientRect()],
        ['main', mainRef.current.getBoundingClientRect()]
      ]

      let minBlock = tabsBlock.pop()
      if (!minBlock) return

      for (const block of tabsBlock) {
        const currBlock = Math.round(block[1].y + block[1].height - viewBlock.y)
        const prevBlock = Math.round(minBlock[1].y + minBlock[1].height - viewBlock.y)
        if (currBlock > 0 && prevBlock > currBlock) minBlock = block
      }
      minBlock && setCurrentTab(minBlock[0])
    }
  }


  const filteredItems = (type: string) =>
    ingredients.filter(item => item.type === type)

  return (
    <section className={style.ingredients}>
      <header className={style.header}>
        <h1 className={style.title}>Соберите бургер</h1>
        <nav className={style.tabs}>
          {categories.map(({ type, title, tabRef }) => (
            <Tab
              key={type}
              value={type}
              active={currentTab === type}
              onClick={() => {
                setCurrentTab(type)
                scrollToCategory(tabRef)
              }}
            >
              {title}
            </Tab>
          ))}
        </nav>
      </header>

      <section className={style.categories}>
        <div className={style.views} ref={viewRef} onScroll={handleScroll}>
          {categories.map(({ type, title, tabRef }) => (
            <article key={type} ref={tabRef} className={style.category}>
              <h2 className={style.category__title}>{title}</h2>
              <ul className={style.list}>
                {filteredItems(type).map(item => (
                  <IngredientItem
                    key={item._id}
                    ingredient={item}
                    onClick={() => setCurrentIngredient(item)}
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
