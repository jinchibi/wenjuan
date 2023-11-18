/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC } from 'react'
import { DndContext, closestCenter, MouseSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

type PropsType = {
  children: JSX.Element | JSX.Element[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  items: Array<{ id: string; [key: string]: any }>
  onDragEnd: (oldIndex: number, newIndex: number) => void
}

const SortableContainer: FC<PropsType> = (props: PropsType) => {
  const { children, items, onDragEnd } = props
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        // 8px 鼠标点击之后移动8px算拖拽
        distance: 8,
      },
    })
  )
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleDragEnd(event: any) {
    const { active, over } = event

    if (active.id !== over.id) {
      const oldIndex = items.findIndex(c => c.id === active.id)
      const newIndex = items.findIndex(c => c.id === over.id)
      //   return arrayMove(items, oldIndex, newIndex)
      onDragEnd(oldIndex, newIndex)
    }
  }
  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {children}
      </SortableContext>
    </DndContext>
  )
}
export default SortableContainer
