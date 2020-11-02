import React, { FC, useEffect, useState } from 'react'
import { Grid, Box, Stack, Select, IconButton } from '@chakra-ui/core'
import { FiLogOut, FiList, FiGrid } from 'react-icons/fi'

import { useRouter } from 'next/router'

import TwitchPlayer from 'components/TwitchPlayer'
import TwitchChat from 'components/TwitchChat'
import ChannelListModal from 'components/ChannelListModal'

const getLayout = (length: number) => {
  if (length === 1) return { rows: 1, columns: 1 }
  if (length === 2) return { rows: 1, columns: 2 }
  if (length === 3 || length === 4) return { rows: 2, columns: 2 }
  if (length === 5 || length === 6) return { rows: 3, columns: 2 }
  if (length >= 7 && length <= 9) return { rows: 3, columns: 3 }
  if (length >= 10) return { rows: Math.ceil(length / 3), columns: 3 }
  return { rows: 1, columns: 1 }
}

const removeDuplicates = (array: string[]) => {
  return Array.from(new Set(array))
}

const Channels: FC = () => {
  const router = useRouter()
  const queryChannels = router.query.channels
  const [channels, setChannels] = useState([])
  const [selectedChannelChat, setSelectedChannelChat] = useState<string>()
  const [displayChat, setDisplayChat] = useState(process.browser)
  const [layout, setLayout] = useState({ rows: 1, columns: 1 })
  const [isOpen, setIsOpen] = useState(false)

  const handleOpenModal = () => {
    setIsOpen(true)
  }

  const handleCloseModal = () => {
    setIsOpen(false)
  }

  const handleSelectChange = ({ target }) => {
    setSelectedChannelChat(target.value)
  }

  useEffect(() => {
    if (queryChannels) {
      const channelList: string[] = [].concat(queryChannels)
      const uniqueChannelList = removeDuplicates(channelList)

      setSelectedChannelChat(uniqueChannelList[0])
      setChannels(uniqueChannelList)
    }
  }, [queryChannels])

  useEffect(() => {
    if (channels) {
      const layout = getLayout(channels.length)
      setLayout(layout)
    }
  }, [channels])

  return (
    <>
      <Stack isInline spacing={2}>
        <Grid
          templateColumns={`repeat(${layout.columns}, 1fr)`}
          templateRows={`repeat(${layout.rows}, 1fr)`}
          h="calc(100vh - 3em)"
          w="100%"
        >
          {channels.map((channel, index) => {
            const id = channel + index
            return <TwitchPlayer key={id} channel={channel} id={id} />
          })}
        </Grid>

        {displayChat && (
          <Box width="500px">
            <Stack h="100%" spacing={2}>
              <Stack isInline spacing={2}>
                <IconButton aria-label="Hide sidebar" icon={FiLogOut} />

                <IconButton
                  aria-label="Add channel"
                  icon={FiList}
                  onClick={handleOpenModal}
                />

                <IconButton aria-label="Change columns" icon={FiGrid} />

                <Select onChange={handleSelectChange}>
                  {channels.map((channel, index) => {
                    const id = channel + index
                    return (
                      <option
                        style={{ backgroundColor: '#333' }}
                        key={id}
                        value={channel}
                      >
                        {channel}
                      </option>
                    )
                  })}
                </Select>
              </Stack>

              <Box h="100%">
                {selectedChannelChat && (
                  <TwitchChat
                    channel={selectedChannelChat}
                    id={selectedChannelChat}
                  />
                )}
              </Box>
            </Stack>
          </Box>
        )}
      </Stack>
      <ChannelListModal
        initialList={channels}
        isVisible={isOpen}
        onClose={handleCloseModal}
      />
    </>
  )
}

export default Channels
