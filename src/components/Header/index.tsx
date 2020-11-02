import React, { FC, useState } from 'react'
import { Flex, Box, Switch, Stack, useColorMode } from '@chakra-ui/core'
import { FiSun, FiMoon } from 'react-icons/fi'

import NextLink from 'next/link'

const Header: FC = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const [isChecked, setIsChecked] = useState(colorMode === 'dark')

  const handleSwitchClick = () => {
    toggleColorMode()
    setIsChecked(s => !s)
  }

  return (
    <Flex className="header" align="center" justify="space-between" px="3em">
      <NextLink href="/">ManyTwitch</NextLink>
      <Stack align="center" isInline>
        <Box as={isChecked ? FiMoon : FiSun} size="22px" mb="1" />
        <Switch size="md" onChange={handleSwitchClick} isChecked={isChecked} />
      </Stack>
    </Flex>
  )
}

export default Header
