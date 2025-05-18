import { Login } from '../../components/login/login'
import style from './login.module.scss'

export const LoginPage = (): React.JSX.Element => {
  return (
    <section className={style.block}>
      <Login />
    </section>
  )
}
