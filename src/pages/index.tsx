import React, { FC, useState } from 'react'
import { Stack, Button, Text, Link, Box, Flex } from '@chakra-ui/core'
import { FiBook, FiPlus } from 'react-icons/fi'
import { FaTwitch } from 'react-icons/fa'

import Image from 'next/image'
import NextLink from 'next/link'

import ChannelListModal from 'components/ChannelListModal'

const Home: FC = () => {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpenModal = () => {
    setIsOpen(true)
  }

  const handleCloseModal = () => {
    setIsOpen(false)
  }

  return (
    <>
      <Stack
        as="main"
        height="100%"
        direction="column"
        align="center"
        justify="center"
        spacing={10}
        shouldWrapChildren
      >
        <Image
          className="splash"
          src="/images/splash.svg"
          alt="ManyTwitch splash illustration"
          quality={100}
          width={640}
          height={360}
        />

        <Text fontSize={['2xl', '1xl', '1xl', 'xl']} textAlign="center">
          Watch multiple <Box as={FaTwitch} display="inline" />{' '}
          <Link href="https://www.twitch.tv/" isExternal>
            Twitch.tv
          </Link>{' '}
          channels at the same time!
        </Text>

        <Flex direction="row">
          <NextLink href="/tutorial">
            <Button leftIcon={FiBook} variant="outline" mx="4px">
              Tutorial
            </Button>
          </NextLink>

          <Button leftIcon={FiPlus} mx="4px" onClick={handleOpenModal}>
            Start adding channels
          </Button>
        </Flex>
      </Stack>
      <ChannelListModal isVisible={isOpen} onClose={handleCloseModal} />
    </>
  )
}

export default Home
