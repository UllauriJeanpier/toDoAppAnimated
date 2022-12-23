import { Pressable } from 'react-native'
import React from 'react'
import Animated from 'react-native-reanimated'
import { Box, HStack, Text } from 'native-base'
import { useAnimatedTask } from './hook'

interface Props {
  strikethrough: boolean
  textColor: string
  inactiveTextColor: string
  onPress?: () => void
  children?: React.ReactNode
}

const AnimatedBox = Animated.createAnimatedComponent(Box)
const AnimatedHStack = Animated.createAnimatedComponent(HStack)
const AnimatedText = Animated.createAnimatedComponent(Text)

const AnimatedTaskLabel = (props: Props) => {
  const {
    strikethrough,
    textColor,
    inactiveTextColor,
    onPress,
    children
  } = props

  const {
    hStackAnimatedStyle, 
    textColorAnimatedStyles
  } = useAnimatedTask({
    textColor,
    inactiveTextColor,
    strikethrough
  })


  return (
    <Pressable onPress={onPress}>
      <AnimatedHStack alignItems='center' style={[hStackAnimatedStyle]} >
        <AnimatedText fontSize={19} noOfLines={1} isTruncated px={1} style={[textColorAnimatedStyles]}>
          {children}

        </AnimatedText>
        <AnimatedBox position='absolute' h={1} borderBottomWidth={1} ></AnimatedBox>
      </AnimatedHStack>
    </Pressable>
  )
}

export default AnimatedTaskLabel