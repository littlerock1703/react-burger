import { useState } from 'react'
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import style from './app-header.module.scss'

export const AppHeader = () => {

return (
<header className={style.header}>
  <nav className={style.nav}>
    <ul className={style.menu}>
      <ul className={style.menu}>
        <li>
          <a href="#main" className={`${style.link} ${style.active}`}>
          <BurgerIcon type='primary' />
          <span>Конструктор</span>
          </a>
        </li>
        <li>
          <a href="#list" className={style.link}>
          <ListIcon type='secondary'/>
          <span>Лента заказов</span>
          </a>
        </li>
      </ul>
      <a href="/" className={style.logo}>
        <Logo />
      </a>
      <a href="#profile" className={`${style.link} ${style.profile}`}>
        <ProfileIcon type='secondary'/>
        <span>Личный кабинет</span>
      </a>
    </ul>
  </nav>
</header>
)
}

// export default AppHeader;