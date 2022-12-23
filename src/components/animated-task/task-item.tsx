import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { Box, HStack, themeTools, useColorModeValue, useTheme } from 'native-base'
import AnimatedCheckbox from '../animatedCheckBox/animated-chekcbox'
import AnimatedTaskLabel from './animated-task-label'

interface Props {
  isDone: boolean
  onToggleCheckBox?: () => void
}

const TaskItem = (props: Props) => {
  const { isDone, onToggleCheckBox } = props
  const theme = useTheme()
  const highLightColor = themeTools.getColor(
    theme,
    useColorModeValue('blue.500', 'blue.400')
  )
  const boxStroke = themeTools.getColor(
    theme,
    useColorModeValue('muted.300', 'muted.500')
  )
  const checkmarkColor = themeTools.getColor(
    theme,
    useColorModeValue('white', 'white')
  )
  const activeTextColor = themeTools.getColor(
    theme,
    useColorModeValue('darkText', 'lightText')
  )

  const doneTextColor = themeTools.getColor(
    theme,
    useColorModeValue('muted.400', 'muted.600')
  )

  return (

    <HStack
      alignItems='center'
      w='full'
      px={4}
      py={2}
      bg={useColorModeValue('warmGray.50', 'primary.900')} >
      <Box width={30} height={30} mr={2}  >
        <Pressable onPress={onToggleCheckBox}>
          <AnimatedCheckbox
            highlightColor={highLightColor}
            checkmarkColor={checkmarkColor}
            boxOutlineColor={boxStroke}
            checked={isDone}
          />
        </Pressable>
      </Box>
      <AnimatedTaskLabel
        textColor={activeTextColor}
        inactiveTextColor={doneTextColor}
        strikethrough={isDone}
      >
        Text
      </AnimatedTaskLabel>
    </HStack>

  )
}

export default TaskItem