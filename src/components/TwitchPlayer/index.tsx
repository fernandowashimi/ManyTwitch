import React, { FC } from 'react'
import { Box, useColorMode } from '@chakra-ui/core'
import { TwitchPlayer } from 'react-twitch-embed'

interface TwitchPlayerProps {
  channel: string
  id: string
}

const Player: FC<TwitchPlayerProps> = ({ channel, id }) => {
  const { colorMode } = useColorMode()

  return (
    <Box d="inline-block" w="100%" h="100%">
      <TwitchPlayer
        channel={channel}
        id={id}
        theme={colorMode}
        width="100%"
        height="100%"
        muted
      />
    </Box>
  )
}

export default Player
