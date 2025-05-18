import { Register } from '../../components/register/register'
import style from './register.module.scss'

export const RegisterPage = (): React.JSX.Element => {
  return (
    <section className={style.block}>
      <Register />
    </section>
  )
}
