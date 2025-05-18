import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import {
    Input,
    EmailInput,
    PasswordInput,
    Button,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { IUser } from '../../utils/custom'
import { getUser } from '../../services/reducers/user'
import { patchUser } from '../../services/actions/user'
import style from './profile.module.scss'

export const Profile = (): React.JSX.Element => {
  const user = useSelector(getUser)
  const [nameFieldContent, setNameFieldContent] = useState(user?.name || '')
  const [passwordFieldContent, setPasswordFieldContent] = useState('')
  const [emailFieldContent, setEmailFieldContent] = useState(user?.email || '')
  const [userRequest, setUserRequest] = useState(false)
  const [showButtons, setShowButtons] = useState(false)
  const [nameFieldDisabled, setNameFieldDisabled] = useState(true)
  const dispatch = useDispatch()

  const resetState = (payload?: IUser) => {
    setNameFieldContent(payload?.name || user?.name || '')
    setPasswordFieldContent('')
    setEmailFieldContent(payload?.email || user?.email || '')
    setShowButtons(false)
    setNameFieldDisabled(true)
  }

  const handleFormSubmit= (e: React.FormEvent) => {
    e.preventDefault()
    setUserRequest(true)
    dispatch(patchUser({ name: nameFieldContent, email: emailFieldContent, password: passwordFieldContent }))
      .unwrap()
      .then(payload => {
        resetState(payload)
        setUserRequest(false)
      })
      .catch(error => {
        console.error('Error updating user:', error)
      })
  }

  const handleResetClick = (e: React.FormEvent) => {
    e.preventDefault()
    resetState()
  }

  useEffect(() => {
    setShowButtons(
      user?.name !== nameFieldContent
      || user?.email !== emailFieldContent
      || passwordFieldContent !== ''
    )
  }, [user, nameFieldContent, passwordFieldContent, emailFieldContent ])

  return (
    <form className={style.profile} onSubmit={handleFormSubmit}>
      <Input
        value={nameFieldContent ?? ''}
        name="name"
        error={false}
        disabled={nameFieldDisabled}
        type={'text'}
        placeholder="Имя"
        icon="EditIcon"
        onChange={e => setNameFieldContent(e.target.value)}
        onIconClick={() => setNameFieldDisabled(!nameFieldDisabled)}/>
      <EmailInput
        value={emailFieldContent ?? ''}
        name="email"
        onChange={e => {setEmailFieldContent(e.target.value)}}
        placeholder="Логин"
        isIcon={true}/>
      <PasswordInput
        value={passwordFieldContent ?? ''}
        name="password"
        onChange={e => setPasswordFieldContent(e.target.value)}
        icon="HideIcon"/>
      {showButtons && (
        <div className={style.buttons}>
          <Button
            htmlType="button"
            disabled={userRequest ? true : false}
            size="medium"
            type="secondary"
            onClick={handleResetClick}>
            Отмена
          </Button>
          <Button
            htmlType="submit"
            disabled={userRequest ? true : false}
            size="medium"
            type="primary"
            onClick={handleFormSubmit}>
            Сохранить
          </Button>
        </div>
      )}
    </form>
  )
}
