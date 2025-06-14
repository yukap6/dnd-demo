'use client'

import classnames from 'classnames'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

interface IProps {
  title?: string
  className?: string
  minWidth?: number
  onClose?: () => void
}

export default function ContentItem(props: IProps) {
  const { onClose = () => {}, title = '', className = '', minWidth = 240 } = props
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: props.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <section
      className={classnames(`content-item flex-col`, {
        [className]: !!className,
      })}
      style={{ minWidth: `${minWidth}px` }}
    >
      <div className="relative flex justify-center h-8 items-center">
        <div
          ref={setNodeRef}
          style={style}
          {...attributes}
          {...listeners}
          className="bg-gray-100 flex-1 w-full h-full flex items-center justify-center cursor-grab select-none"
        >
          {title}
        </div>
        <button onClick={onClose} className="absolute right-2 top-1.5 size-5 cursor-pointer">
          <XMarkIcon />
        </button>
      </div>
      <main className="content"></main>
    </section>
  )
}
