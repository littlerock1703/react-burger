import { Login } from '../../components/login/login'
import style from './login.module.scss'

export const LoginPage = () => {
  return (
    <section className={style.block}>
      <Login />
    </section>
  )
}
