'use client'
import { useState } from 'react'
import { v4 as uuid } from 'uuid'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  // verticalListSortingStrategy,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable'
import { MapIcon, MusicalNoteIcon, ChatBubbleBottomCenterIcon } from '@heroicons/react/24/outline'

import NavIcon from '@/components/NavIcon'
import ContentItem from '@/components/ContentItem'

const NAMES = {
  map: 'Map',
  music: 'Music',
  chat: 'Chat',
}

export default function Home() {
  const contentItemMinWidth = 240
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )
  const [contentItems, setContentItems] = useState([
    {
      id: uuid(),
      title: NAMES.map,
      visible: true,
      icon: <MapIcon />,
    },
    {
      id: uuid(),
      title: NAMES.music,
      visible: true,
      icon: <MusicalNoteIcon />,
    },
    {
      id: uuid(),
      title: NAMES.chat,
      className: '',
      visible: true,
      icon: <ChatBubbleBottomCenterIcon />,
    },
  ])
  const renderedContentItems = contentItems.filter((item) => item.visible)

  const onItemToggle = (id: string) => {
    const newItems = [...contentItems].map((item) => ({
      ...item,
      visible: item.id === id ? !item.visible : item.visible,
    }))
    setContentItems(newItems)
  }

  const handleDragEnd = (event) => {
    const { active, over } = event

    if (active.id !== over.id) {
      setContentItems((items) => {
        // 通过ID查找对象索引
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over.id)

        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  return (
    <div className="home font-[family-name:var(--font-geist-sans)]">
      <main className="content">
        <nav className="sidebar z-10 bg-white pt-8 border-r border-r-gray-200 fixed top-0 left-0 bottom-0 w-16 flex flex-col gap-3">
          {contentItems.map((item) => (
            <NavIcon
              key={item.id}
              title={item.title}
              icon={item.icon}
              isDisabled={!item.visible}
              onClick={() => onItemToggle(item.id)}
            />
          ))}
        </nav>
        <section className="h-screen pl-16">
          <section
            className={`h-full grid grid-cols-${renderedContentItems.length} overflow-x-auto`}
            style={{
              minWidth: `${contentItemMinWidth * renderedContentItems.length}px`,
            }}
          >
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={contentItems.map((item) => item.id)}
                strategy={horizontalListSortingStrategy}
              >
                {renderedContentItems.map((item, itemIndex) => (
                  <ContentItem
                    key={item.id}
                    title={item.title}
                    minWidth={contentItemMinWidth}
                    onClose={() => onItemToggle(item.id)}
                    id={item.id}
                    className={
                      itemIndex === contentItems.filter((item) => item.visible).length - 1
                        ? ''
                        : 'border-r border-gray-200'
                    }
                  />
                ))}
              </SortableContext>
            </DndContext>
          </section>
        </section>
      </main>
    </div>
  )
}
