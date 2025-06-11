import { Link, NavLink, Outlet } from 'react-router-dom'
import style from './profile.module.scss'

import { useDispatch } from 'react-redux'
import { logout } from '../../services/actions/user'

export const ProfilePage = (): React.JSX.Element => {
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
  }
  return (
    <section className={style.profile}>
      <nav className={style.profile__sidebar}>
        <ul className={style.sidebar}>
          <li>
            <NavLink end className={({ isActive }) => `${style.sidebar__link} ${isActive && style.active}`} to="/profile">
              Профиль
            </NavLink>
          </li>
          <li>
            <NavLink end to="/profile/orders" className={({ isActive }) => `${style.sidebar__link} ${isActive && style.active}`}>
              История заказов
            </NavLink>
          </li>
          <li>
            <Link className={style.sidebar__link} onClick={handleLogout} to={'/login'}>
              Выход
            </Link>
          </li>
        </ul>
        <p className={style.sidebar__footnote}>
          В этом разделе вы можете
          <br /> изменить свои персональные данные
        </p>
      </nav>
      <Outlet />
    </section>
  )
}
