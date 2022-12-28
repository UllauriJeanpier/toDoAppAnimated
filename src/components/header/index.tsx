import { View, ImageSourcePropType } from 'react-native'
import React from 'react'
import { Box, Heading, Image, Text, themeTools, useColorModeValue, useTheme, VStack } from 'native-base'

interface Props {
  title: string
  /* image: ImageSourcePropType */
  children: React.ReactNode
}

const Header = ({ title, /* image, */ children }: Props) => {

  const theme = useTheme()
  const activeTextColor = themeTools.getColor(
    theme,
    useColorModeValue('darkText', 'lightText')
  )

  return (
    <VStack h='300px' pb={5}>
      {/* <Image
        position='absolute'
        left={0}
        right={0}
        bottom={0}
        w='full'
        h='300px'
        resizeMode='cover'
        source={image}
        alt='head image'
      /> */}
      <Heading color='white' p={6} size='xl' my={10} >
        <Text color={activeTextColor}>
          {title}
        </Text>
      </Heading>
      {children}
      <Box flex={1} />
    </VStack>
  )
}

export default Header