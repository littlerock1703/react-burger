import { ResetPassword } from '../../components/reset-password/reset-password'
import style from './reset-password.module.scss'

export const ResetPasswordPage = (): React.JSX.Element => {
  return (
    <section className={style.block}>
      <ResetPassword />
    </section>
  )
}
