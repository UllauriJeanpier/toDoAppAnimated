import { StyleSheet, View } from 'react-native'
import React from 'react'
import { HStack, Switch, Text, useColorMode } from 'native-base'

const ThemeToggle = () => {

  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <HStack space={2} alignItems='center'>
      <Text>Dark</Text>
      <Switch isChecked={colorMode === 'light'} onToggle={toggleColorMode}></Switch>
      <Text>Light</Text>
    </HStack>
  )
}

export default ThemeToggle