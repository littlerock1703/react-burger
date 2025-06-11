import { useDispatch } from 'react-redux'
import { useDrop, useDrag } from 'react-dnd'
import {
    ConstructorElement,
    DragIcon
  } from '@ya.praktikum/react-developer-burger-ui-components'
  import {
      removeIngredient,
      moveIngredient
  } from '../../../services/reducers/burger-constructor'
  import style from './order-element.module.scss'

  interface IOrderElementProps {
    type?: 'top' | 'bottom'
    uuid?: string
    index?: number
    text: string
    price: number
    thumbnail: string
    isLocked: boolean
  }

  export const OrderElement = ({
    type,
    uuid,
    index,
    text,
    price,
    thumbnail,
    isLocked,
  }: IOrderElementProps): React.JSX.Element => {
    const dispatch = useDispatch()

    const handleRemove = () => {!isLocked && uuid && dispatch(removeIngredient(uuid))}

    const [{ isDragging }, handleDrag] = useDrag({
      type: 'move',
      item: { index },
      collect: monitor => ({ isDragging: monitor.isDragging() })
    })

    const [_, handleDrop] = useDrop({
      accept: 'move',
      hover: (item: { index: number }) => {
        const hoveredIndex = index
        const dragedIndex = item.index

        if (hoveredIndex === undefined || dragedIndex === hoveredIndex) return

        dispatch(moveIngredient({ dragedIndex, hoveredIndex }))
        item.index = hoveredIndex
      }
    })

    return (
      <li className={`${style.element} ${!isLocked && style.dragCursor}`} ref={node => (isLocked ? null : handleDrag(handleDrop(node)))} style={{ opacity: isDragging ? 0.5 : 1 }}>
        <div className={style.drag}>
          {!isLocked && <DragIcon type="primary" />}
        </div>
        <ConstructorElement
          type={type}
          text={text}
          isLocked={isLocked}
          thumbnail={thumbnail}
          price={price}
          handleClose={handleRemove}
        />
      </li>
    )
  }
  