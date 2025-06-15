'use client'

import React, { useState } from 'react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

// 可排序项组件
const SortableItem = ({ id, text }: { id: string; text: string }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useSortable({
    id,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: isDragging ? 'none' : 'transform 0.3s cubic-bezier(0.2, 0, 0, 1)',
    zIndex: isDragging ? 10 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`
        flex-shrink-0 w-32 h-32 rounded-xl shadow-md
        flex items-center justify-center cursor-grab
        transition-all duration-300
        ${isDragging ? 'bg-blue-500 text-white shadow-lg scale-105' : 'bg-white hover:bg-gray-50'}
      `}
    >
      <span className="text-lg font-medium">{text}</span>
    </div>
  )
}

// 主组件
const HorizontalDragList = () => {
  const [items, setItems] = useState([
    { id: '1', text: 'Item 1' },
    { id: '2', text: 'Item 2' },
    { id: '3', text: 'Item 3' },
    { id: '4', text: 'Item 4' },
    { id: '5', text: 'Item 5' },
  ])

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return

    setItems((items) => {
      const oldIndex = items.findIndex((item) => item.id === active.id)
      const newIndex = items.findIndex((item) => item.id === over.id)
      return arrayMove(items, oldIndex, newIndex)
    })
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items.map((i) => i.id)} strategy={horizontalListSortingStrategy}>
        <div className="flex space-x-4 p-6 overflow-x-auto bg-gray-100 rounded-2xl">
          {items.map((item) => (
            <SortableItem key={item.id} id={item.id} text={item.text} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  )
}

export default HorizontalDragList
