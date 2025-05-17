import { useSelector } from 'react-redux'
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { getUser } from '../../services/reducers/user'
import { NavLinkCustom } from './nav-link-custom/nav-link-custom'
import style from './app-header.module.scss'

export const AppHeader = () => {
  const user = useSelector(getUser)

  return (
  <header className={style.header}>
    <nav className={style.nav}>
      <ul className={style.menu}>
        <ul className={style.menu}>
          <li>
            <NavLinkCustom link={'/'} text={'Конструктор'} icon={<BurgerIcon type="primary" />} />
          </li>
          <li>
            <NavLinkCustom link={'/feed'} text={'Лента заказов'} icon={<ListIcon type="primary" />} />
          </li>
        </ul>
        <a href="/" className={style.logo}>
          <Logo />
        </a>
        <NavLinkCustom link={'/profile'} text={user?.name ? user.name : 'Личный кабинет'} icon={<ProfileIcon type="primary" />} />
      </ul>
    </nav>
  </header>
  )
}

// export default AppHeader;