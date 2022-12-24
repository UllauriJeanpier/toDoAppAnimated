import { AnimatePresence, View } from 'moti'
import React, { useCallback, useRef } from 'react'
import { Text } from 'react-native'
import { PanGestureHandlerProps, ScrollView } from 'react-native-gesture-handler'
import { makeStyledComponent } from '../../utils/styled'
import TaskItem from '../animated-task/task-item'

const StyledView = makeStyledComponent(View)
const StyledScrollView = makeStyledComponent(ScrollView)

export interface TaskItemData {
  id: string
  subject: string
  done: boolean
}

interface TaskListProps {
  data: TaskItemData[]
  editingItemId: string | null
  onToggleItem: (item: TaskItemData) => void
  onChangeSubject: (item: TaskItemData, newSubject: string) => void
  onFinishEditing: (item: TaskItemData) => void
  onPressLabel: (item: TaskItemData) => void
  onRemoveItem: (item: TaskItemData) => void
}

interface TaskItemProps extends Pick<PanGestureHandlerProps, 'simultaneousHandlers'> {
  data: TaskItemData
  isEditing: boolean
  onToggleItem: (item: TaskItemData) => void
  onChangeSubject: (item: TaskItemData, newSubject: string) => void
  onFinishEditing: (item: TaskItemData) => void
  onPressLabel: (item: TaskItemData) => void
  onRemove: (item: TaskItemData) => void
}

export const AnimatedTaskItem = (props: TaskItemProps) => {
  const {
    data,
    simultaneousHandlers,
    isEditing,
    onToggleItem,
    onFinishEditing,
    onChangeSubject,
    onPressLabel,
    onRemove
  } = props

  const handleToggleCheckBox = useCallback(() => {
    onToggleItem(data)
  }, [data, onToggleItem])

  const handleChangeSubject = useCallback(
    (subject: any) => {
      onChangeSubject(data, subject)
    },
    [data, onChangeSubject],
  )

  const handleFinishEditing = useCallback(
    () => {
      onFinishEditing(data)
    },
    [data],
  )

  const handlePressLabel = useCallback(
    () => {
      onPressLabel(data)
    },
    [data, onPressLabel],
  )

  const handleRemove = useCallback(
    () => {
      onRemove(data)
    },
    [data, onRemove],
  )

  return (
    <StyledView w='full' from={{
      opacity: 0,
      scale: 0.5,
      marginBotton: -46
    }}
      animate={{
        opacity: 1,
        scale: 1,
        marginBottom: 0
      }}
      exit={{
        opacity: 0,
        scale: 0.5,
        marginBottom: -46
      }}
    >
      <TaskItem simultaneousHandlers={simultaneousHandlers}
        subject={data.subject}
        isDone={data.done}
        isEditing={isEditing}
        onPressLabel={handlePressLabel}
        onToggleCheckBox={handleToggleCheckBox}
        onChangeSubject={handleChangeSubject}
        onFinishEditing={handleFinishEditing}
        onRemove={handleRemove}
      />

    </StyledView>
  )
}

const TaskList = (props: TaskListProps) => {
  const { data, editingItemId, onToggleItem, onChangeSubject, onFinishEditing, onPressLabel, onRemoveItem } = props
  const refScrollView = useRef(null)

  return (
    <StyledScrollView ref={refScrollView} w='full'>
      <AnimatePresence>
        {data.map((item) => (
          <AnimatedTaskItem
            key={item.id}
            data={item}
            simultaneousHandlers={refScrollView}
            isEditing={editingItemId === item.id}
            onToggleItem={onToggleItem}
            onChangeSubject={onChangeSubject}
            onFinishEditing={onFinishEditing}
            onPressLabel={onPressLabel}
            onRemove={onRemoveItem}
          />
        )
        )}
      </AnimatePresence>

    </StyledScrollView>
  )
}

export default TaskList