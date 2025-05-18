import { Outlet } from 'react-router-dom'
import { AppHeader } from '../app-header/app-header'
import style from './layout.module.scss'

export const Layout = (): React.JSX.Element => {
  return (
    <>
      <AppHeader />
      <main className={style.main}>
        <Outlet />
      </main>
    </>
  )
}
