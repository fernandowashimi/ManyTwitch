import React, { FC } from 'react'
import { Box, useColorMode } from '@chakra-ui/core'
import { TwitchChat } from 'react-twitch-embed'

interface TwitchChatProps {
  channel: string
  id: string
}

const Chat: FC<TwitchChatProps> = ({ channel, id }) => {
  const { colorMode } = useColorMode()

  return (
    <Box d="inline-block" w="100%" h="100%">
      <TwitchChat
        channel={channel}
        id={id}
        theme={colorMode}
        width="100%"
        height="100%"
      />
    </Box>
  )
}

export default Chat
