import style from './modal-overlay.module.scss'

interface IModalOverlayProps {
  onClose: () => void
}

export const ModalOverlay = ({ onClose }: IModalOverlayProps) => (
  <div className={style.overlay} onClick={onClose}></div>
)
