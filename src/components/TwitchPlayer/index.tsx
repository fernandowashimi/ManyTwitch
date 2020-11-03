import React, { FC } from 'react'
import { Box, BoxProps, useColorMode } from '@chakra-ui/core'
import { TwitchPlayer } from 'react-twitch-embed'

interface TwitchPlayerProps extends BoxProps {
  channel: string
  id: string
}

const Player: FC<TwitchPlayerProps> = ({ channel, id, ...props }) => {
  const { colorMode } = useColorMode()

  return (
    <Box d="inline-block" w="100%" h="100%" {...props}>
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
