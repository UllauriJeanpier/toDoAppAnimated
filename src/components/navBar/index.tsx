import { View, Text } from 'react-native'
import React, { useCallback } from 'react'
import { useNavigation } from '@react-navigation/native'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import { HStack } from 'native-base'

const NavBar  = () => {
  
  const navigation = useNavigation<DrawerNavigationProp<{}>>()
  const handlePressMenuButton = useCallback(() => {
    navigation.openDrawer()
  },[navigation])
  
  return (
    <HStack
      w='full'
      h={40}
      alignItems='center'
      alignContent='center'
      p={4 }
    >
      
    </HStack>
  )
}

export default NavBar 