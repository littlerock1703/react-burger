import { ForgotPassword } from '../../components/forgot-password/forgot-password'
import style from './forgot-password.module.scss'

export const ForgotPasswordPage = () => {
  return (
    <section className={style.block}>
      <ForgotPassword />
    </section>
  )
}
