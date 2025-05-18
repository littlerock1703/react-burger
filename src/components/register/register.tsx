import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import style from './register.module.scss'
import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { register } from '../../services/actions/user'

export const Register = (): React.JSX.Element => {
  const [nameFieldContent, setNameFieldContent] = useState('')
  const [emailFieldContent, setEmailFieldContent] = useState('')
  const [passwordFieldContent, setPasswordFieldContent] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLoginClick = () => {
    navigate('/login')
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(register({ email: emailFieldContent, password: passwordFieldContent, name: nameFieldContent }))
      .then(response => {
        if (register.fulfilled.match(response)) {
          navigate('/')
        } 
        else if (register.rejected.match(response)) {
          console.error('Registration rejected:', response)
        }
      })
      .catch(error => {
        console.error('Registration error:', error)
      })
  }

  return (
    <div className={style.block}>
      <form className={style.form} onSubmit={handleFormSubmit}>
        <h2 className={style.title}>Регистрация</h2>
        <Input value={nameFieldContent ?? ''} type="text" onChange={e => setNameFieldContent(e.target.value)} name="name" size="default" placeholder="Имя" />
        <EmailInput value={emailFieldContent} onChange={e => setEmailFieldContent(e.target.value)} name="email" isIcon={false} />
        <PasswordInput value={passwordFieldContent} onChange={e => setPasswordFieldContent(e.target.value)} name="password" />
        <Button htmlType="submit" type="primary" size="medium">
          Зарегистрироваться
        </Button>
      </form>
      <div className={style.options}>
        <div className={style.option}>
          <span className={style.remind}>Уже зарегистрированы?</span>
          <Button type="secondary" size="medium" onClick={handleLoginClick} htmlType="button">
            Войти
          </Button>
        </div>
      </div>
    </div>
  )
}
