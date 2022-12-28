import React, { useCallback, useState } from 'react'
import { Box, Center, Text, VStack, useColorModeValue, Fab, Icon } from "native-base";
import ThemeToggle from '../components/theme-toggle';
import { AntDesign } from '@expo/vector-icons';
import AnimatedColorBox from '../components/animated-color-box';
import TaskItem from '../components/animated-task/task-item';

import TaskList, { TaskItemData } from '../components/task-list';
import Header from '../components/header';

const initialData: TaskItemData[] = [
  {
    id: 'asdasdasdasd',
    subject: 'Test 1',
    done: false
  },
  {
    id: 'asdawqweqwe',
    subject: 'Test 2',
    done: false
  },
  {
    id: 'asdasdasdqwe',
    subject: 'Test 3',
    done: false
  }
]

const MainScreen = () => {

  const [data, setData] = useState<TaskItemData[]>(initialData)
  const [editingItemId, setEditingItemId] = useState<string | null>(null)
  const [subject, setSubject] = useState('Task Item')

  const handleToggleTaskItem = useCallback((item: any) => {
    setData(prevData => {
      const newData = [...prevData]
      const index = newData.indexOf(item)
      newData[index] = {
        ...item,
        done: !item.done
      }
      return newData
    })
  }, [])

  const handleChangeTaskItemSubject = useCallback(
    (item: TaskItemData, newSubject: any) => {
      setData(prevData => {
        const newData = [...prevData]
        const index = newData.indexOf(item)
        newData[index] = {
          ...item,
          subject: newSubject
        }
        return newData
      })
    }, [])

  const handleFinishEditingTaskItem = useCallback(() => {
    setEditingItemId(null)
  }, [])

  const handlePressTaskItemLabel = useCallback((item: any) => {
    setEditingItemId(item.id)
  }, [])

  const handleRemoveItem = useCallback((item: any) => {
    setData(prevData => {
      const newData = prevData.filter(i => i !== item)
      return newData
    })
  }, [])


  return (
    <AnimatedColorBox
      flex={1}
      bg={useColorModeValue('warmGray.50', 'primary.900')}
      w='full'
    >
      <Header title='Your tasks list' >
        <VStack space={5} alignItems='center' w='full' >
          <TaskList
            data={data}
            editingItemId={editingItemId}
            onToggleItem={handleToggleTaskItem}
            onChangeSubject={handleChangeTaskItemSubject}
            onFinishEditing={handleFinishEditingTaskItem}
            onPressLabel={handlePressTaskItemLabel}
            onRemoveItem={handleRemoveItem}
          />
          <ThemeToggle />
        </VStack>
      </Header>
      <Fab
          position='absolute'
          renderInPortal={false}
          size='sm'
          icon={
            <Icon
              color='white'
              as={<AntDesign name='plus' />}
              size='sm'
            />
          }
          colorScheme={useColorModeValue('blue', 'darkBlue')}
          bg={useColorModeValue('blue.500', 'blue.400')}
          onPress={() => {
            const id = Math.random().toString(36).substring(7)
            setData(prevData => {
              return [
                {
                  id,
                  subject: '',
                  done: false
                },
                ...prevData,
              ]
            })
            setEditingItemId(id)
          }}
        />
    </AnimatedColorBox>
  )
}

export default MainScreen  