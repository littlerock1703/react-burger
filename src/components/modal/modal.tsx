import { createPortal } from 'react-dom'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import style from './modal.module.scss'
import { ModalOverlay } from './modal-overlay/modal-overlay'
import { useEscapeKey } from '../../hooks/useEscapeKey'

interface IModalProps {
  children: React.ReactNode
  onClose: () => void
  title?: string
}

export const Modal = ({ children, onClose, title }: IModalProps) => {
  const modals = document.getElementById('modals') as HTMLElement

  useEscapeKey(onClose)

  return createPortal(
    <div className={style.modal}>
      <ModalOverlay onClose={onClose} />
      <div className={style.modal__body}>
        <div className={style.modal__header}>
          <h3 className={style.modal__title}>{title}</h3>
          <button className={style.modal__close} onClick={onClose}>
            <CloseIcon type="primary" />
          </button>
        </div>
        <div className={style.modal__content}>{children}</div>
      </div>
    </div>,
    modals,
  )
}
