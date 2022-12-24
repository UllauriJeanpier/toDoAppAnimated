import { useStyledSystemPropsResolver } from "native-base"
import React from "react"

export const makeStyledComponent = (Comp: any) => {
  return React.forwardRef(({ debug, ...props }: any, ref: any) => {
    const [style, resProps] = useStyledSystemPropsResolver(props)
    return (
      <Comp {...resProps} style={style} ref={ref} >
        {props.children}
      </Comp>
    )
  })
}