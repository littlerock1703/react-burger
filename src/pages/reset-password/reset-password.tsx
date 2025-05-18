import { ResetPassword } from '../../components/reset-password/reset-password'
import style from './reset-password.module.scss'

export const ResetPasswordPage = () => {
  return (
    <section className={style.block}>
      <ResetPassword />
    </section>
  )
}
