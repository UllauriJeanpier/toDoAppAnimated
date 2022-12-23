import React, { useCallback, useState } from 'react'
import { Box, Center, Text, VStack, useColorModeValue } from "native-base";
import ThemeToggle from '../components/theme-toggle';
import AnimatedCheckbox from '../components/animatedCheckBox/animated-chekcbox';
import { Pressable } from 'react-native';
import TaskItem from '../components/animated-task/task-item';

const MainScreen = () => {

  const [checked, setChecked] = useState(false)
  const handlePressCheckBox = useCallback(() => {
    setChecked(prev => !prev)
  }, [])

  return (
    <Center _dark={{ bg: 'blueGray.900' }} _light={{ bg: 'blueGray.50' }} px={4} flex={1} >
      <VStack space={5} alignItems='center'>
        <Box w="100px" h="100px">
          <TaskItem isDone={checked} onToggleCheckBox={handlePressCheckBox } />
        </Box>

        <Box p={10} bg={useColorModeValue('red.500', 'yellow.500')}>
          <Text>Hello</Text>
        </Box>
        <ThemeToggle />
      </VStack>

    </Center>
  )
}

export default MainScreen  