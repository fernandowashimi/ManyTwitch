import React, { FC } from 'react'
import { Box, BoxProps, useColorMode } from '@chakra-ui/core'
import { motion } from 'framer-motion'
import { TwitchPlayer } from 'react-twitch-embed'

interface TwitchPlayerProps extends BoxProps {
  channel: string
  id: string
  gridArea: string
}

const MotionBox = motion.custom(Box)

const Player: FC<TwitchPlayerProps> = ({ channel, id, gridArea }) => {
  const { colorMode } = useColorMode()

  return (
    <MotionBox layout d="inline-block" w="100%" h="100%" gridArea={gridArea}>
      <TwitchPlayer
        channel={channel}
        id={id}
        theme={colorMode}
        width="100%"
        height="100%"
        muted
      />
    </MotionBox>
  )
}

export default Player
