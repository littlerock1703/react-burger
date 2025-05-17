import { useNavigate } from 'react-router-dom'
import style from './forgot-password.module.scss'
import {
  EmailInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { useEffect, useState } from 'react'
import { resetPassword } from '../../utils/api'

export const ForgotPassword = () => {
  const navigate = useNavigate()

  const [emailFieldContent, setEmailFieldContent] = useState('')
  const [passwordResetRequest, setPasswordResetRequest] = useState(false)

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setPasswordResetRequest(true)
    resetPassword({ email: emailFieldContent })
      .then(() => {
        localStorage.setItem('isResetPassword', 'true')
        navigate('/reset-password')
      })
      .finally(() => setPasswordResetRequest(false))
  }

  const navigateToLoginPage = () => {
    navigate('/login')
  }

  const navigateToPasswordResetPage = () => {
    navigate('/reset-password')
  }

  useEffect(() => {
    const isResetPassword = localStorage.getItem('isResetPassword')
    if (isResetPassword === 'true') {
      navigateToPasswordResetPage()
    }
  }, [navigate])

  return (
    <div className={style.block}>
      <form className={style.form} onSubmit={handleFormSubmit}>
        <h2 className={style.title}>Восстановление пароля</h2>
        <EmailInput onChange={e => setEmailFieldContent(e.target.value)} value={emailFieldContent ?? ''} name="email" placeholder="Укажите e-mail" isIcon={false}/>
        <Button htmlType="submit" type="primary" size="medium" disabled={passwordResetRequest}>
          Восстановить
        </Button>
      </form>
      <div className={style.options}>
        <div className={style.options__grid}>
          <span className={style.remind}>Вспомнили пароль?</span>
          <Button type="secondary" size="medium" onClick={navigateToLoginPage} htmlType="button">
            Войти
          </Button>
        </div>
      </div>
    </div>
  )
}
