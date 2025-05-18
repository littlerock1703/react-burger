import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import style from './login.module.scss'
import {
  EmailInput,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { useState } from 'react'
import { login } from '../../services/actions/user'

export const Login = (): React.JSX.Element => {
  const [emailFieldContent, setEmailFieldContent] = useState('')
  const [passwordFieldContent, setPasswordFieldContent] = useState('')
  const [loginRequest, setLoginRequest] = useState(false)
  const [loginRequesError, setLoginRequesError] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault()
    setLoginRequest(true)
    dispatch(login({ email: emailFieldContent, password: passwordFieldContent }))
      .then(response => {
        if (login.rejected.match(response)) {
          setLoginRequesError(true)
        }
      })
      .catch(error => {
        console.error('Login error:', error)
      })
      .finally(() => setLoginRequest(false))
  }

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailFieldContent(e.target.value)
    setLoginRequesError(false)
  }

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordFieldContent(e.target.value)
    setLoginRequesError(false)
  }

  const navigateToRegisterPage = () => {
    navigate('/register')
  }

  const navigateToPasswordForgotPage = () => {
    navigate('/forgot-password')
  }

  return (
    <div className={style.block}>
      <form className={style.form} onSubmit={handleSubmitForm}>
        <h2 className={style.title}>Вход</h2>
        <EmailInput name="email" value={emailFieldContent} isIcon={false} onChange={onChangeEmail}/>
        <PasswordInput name="password" value={passwordFieldContent} onChange={onChangePassword} />
        {loginRequesError && (<span className={style.error}>Ошибка авторизации. Проверьте данные.</span>)}
        <Button htmlType="submit" type="primary" size="medium" disabled={loginRequest}>
          Войти
        </Button>
      </form>
      <div className={style.options}>
        <div className={style.option}>
          <span className={style.newbie}>Вы — новый пользователь?</span>
          <Button type="secondary" size="medium" onClick={navigateToRegisterPage} htmlType="button">
            Зарегистрироваться
          </Button>
        </div>
        <div className={style.option}>
          <span className={style.remind}>Забыли пароль?</span>
          <Button type="secondary" size="medium" onClick={navigateToPasswordForgotPage} htmlType="button">
            Восстановить пароль
          </Button>
        </div>
      </div>
    </div>
  )
}
