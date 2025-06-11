import style from './modal-overlay.module.scss'

interface IModalOverlayProps {
  onClose: () => void
}

export const ModalOverlay = ({ onClose }: IModalOverlayProps): React.JSX.Element => (
  <div className={style.overlay} onClick={onClose}></div>
)
