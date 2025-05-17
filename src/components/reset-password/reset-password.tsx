import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import style from './reset-password.module.scss'
import {
  Input,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { updatePassword } from '../../utils/api'

export const ResetPassword = () => {
  const [newPasswordFieldContent, setNewPasswordFieldContent] = useState('')
  const [confirmCodeFieldContent, setConfirmCodeFieldContent] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const goToLoginPage = () => {
    navigate('/login')
  }

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    updatePassword({ newPassword: newPasswordFieldContent, confirmCode: confirmCodeFieldContent })
      .then(() => {
        localStorage.removeItem('isResetPassword')
        goToLoginPage()
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    const isResetPassword = localStorage.getItem('isResetPassword')
    if (isResetPassword !== 'true') {
     navigate('/forgot-password')
    }
  }, [])

  return (
    <div className={style.block}>
      <form className={style.form} onSubmit={handleSubmitForm}>
        <h2 className={style.title}>Восстановление пароля</h2>
        <PasswordInput value={newPasswordFieldContent ?? ''} name="password" onChange={e => setNewPasswordFieldContent(e.target.value)} placeholder="Введите новый пароль" />
        <Input value={confirmCodeFieldContent ?? ''} type="text" name="token" placeholder="Введите код из письма" onChange={e => setConfirmCodeFieldContent(e.target.value)} size="default"/>
        <Button size="medium" htmlType="submit" type="primary" disabled={loading}>
          Сохранить
        </Button>
      </form>
      <div className={style.options}>
        <div className={style.option}>
          <span className={style.remind}>Вспомнили пароль?</span>
          <Button type="secondary" size="medium" onClick={goToLoginPage} htmlType="button">
            Войти
          </Button>
        </div>
      </div>
    </div>
  )
}
