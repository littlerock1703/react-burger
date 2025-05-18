import { Outlet } from 'react-router-dom'
import { AppHeader } from '../app-header/app-header'
import style from './layout.module.scss'

export const Layout = () => {
  return (
    <>
      <AppHeader />
      <main className={style.main}>
        <Outlet />
      </main>
    </>
  )
}
