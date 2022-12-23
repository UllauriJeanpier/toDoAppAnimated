import { useEffect } from "react"
import { 
  Easing, 
  interpolateColor, 
  useAnimatedStyle, 
  useSharedValue, 
  withDelay, 
  withSequence, 
  withTiming
} from "react-native-reanimated"

interface Props {
  strikethrough: boolean
  textColor: string
  inactiveTextColor: string
}

export const useAnimatedTask = (props: Props) => {
  const {
    strikethrough,
    textColor,
    inactiveTextColor,
  } = props

  const hStackOffset = useSharedValue(0)
  const hStackAnimatedStyle = useAnimatedStyle(
    () => ({
      transform: [{ translateX: hStackOffset.value }]
    }),
    [strikethrough]
  )

  const textColorProgress = useSharedValue(0)
  const textColorAnimatedStyles = useAnimatedStyle(
    () => ({
      color: interpolateColor(
        textColorProgress.value,
        [0, 1],
        [textColor, inactiveTextColor]
      )
    }),
    [strikethrough, textColor, inactiveTextColor]
  )

  useEffect(() => {
    const easing = Easing.out(Easing.quad)
    if (strikethrough) {
      hStackOffset.value = withSequence(
        withTiming(4, {
          duration: 200,
          easing
        }),
        withTiming(0, {
          duration: 200,
          easing
        })
      )
      textColorProgress.value = withDelay(
        1000,
        withTiming(1, {
          duration: 400, easing
        })
      )
    } else {
      textColorProgress.value = withTiming(0, {
        duration: 400,
        easing
      })
    }
  }, [strikethrough])

  return {
    hStackAnimatedStyle,
    textColorAnimatedStyles
  }
}