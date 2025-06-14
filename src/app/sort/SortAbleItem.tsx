'use client'

import React from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

export function SortableItem(props) {
  const { id } = props
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging, // 新增：获取拖拽状态
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: isDragging ? 'none' : 'transform 1s ease',
  }

  return (
    <div
      className="h-6 m-2 bg-gray-100"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      测试 {id}
    </div>
  )
}
