import React, { FC, useEffect, useState } from 'react'
import { Grid, Box, Stack, Select, IconButton } from '@chakra-ui/core'
import { FiLogOut, FiList } from 'react-icons/fi'
import { RiLayoutBottomFill, RiLayoutGridFill } from 'react-icons/ri'

import { useRouter } from 'next/router'

import TwitchPlayer from 'components/TwitchPlayer'
import TwitchChat from 'components/TwitchChat'
import ChannelListModal from 'components/ChannelListModal'

type Mode = 'even' | 'main'

interface Layout {
  rows: number
  columns: number
}

const getLayout = (length: number, mode: Mode): Layout => {
  if (length === 1) return { rows: 1, columns: 1 }
  if (length === 2) return { rows: 1, columns: 2 }

  if (mode === 'even') {
    if (length === 3 || length === 4) return { rows: 2, columns: 2 }
    if (length === 5 || length === 6) return { rows: 3, columns: 2 }
    if (length >= 7 && length <= 9) return { rows: 3, columns: 3 }
    if (length >= 10) return { rows: Math.ceil(length / 3), columns: 3 }
  }

  if (mode === 'main') {
    if (length >= 3) {
      const withoutMain = length - 1

      if (withoutMain <= 4) {
        return { rows: 2, columns: withoutMain }
      } else {
        const rows = Math.ceil(withoutMain / 4) + 1
        return { rows, columns: 4 }
      }
    }
  }

  return { rows: 1, columns: 1 }
}

const getGridArea = (mode: Mode, layout: Layout, index: number) => {
  if (mode === 'main') {
    if (index === 0) {
      return `1 / 1 / 2 / ${layout.columns + 1}`
    } else {
      const row = Math.ceil(index / 4)
      const indicator = (index / 4).toFixed(2).toString().split('.')[1]
      let position

      if (indicator === '25') position = 1
      if (indicator === '50') position = 2
      if (indicator === '75') position = 3
      if (indicator === '00') position = 4

      const a = `${row + 1} / ${position} / ${row + 2} / ${position + 1}`
      console.log('index: ', index, 'grid: ', a)
      return a
    }
  }

  return null
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
  const [mode, setMode] = useState<Mode>('even')
  const [isOpen, setIsOpen] = useState(false)

  const handleOpenModal = () => {
    setIsOpen(true)
  }

  const handleCloseModal = () => {
    setIsOpen(false)
  }

  const handleToggleMode = () => {
    setMode(p => (p === 'even' ? 'main' : 'even'))
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
      const layout = getLayout(channels.length, mode)
      setLayout(layout)
    }
  }, [channels, mode])

  return (
    <>
      <Stack isInline spacing={2}>
        <Grid
          templateColumns={`repeat(${layout.columns}, 1fr)`}
          templateRows={
            mode === 'main'
              ? `2fr repeat(${layout.rows - 1}, 1fr)`
              : `repeat(${layout.rows}, 1fr)`
          }
          h="calc(100vh - 3em)"
          w="100%"
        >
          {channels.map((channel, index) => {
            const id = channel + index
            return (
              <TwitchPlayer
                gridArea={
                  channels.length > 2 && getGridArea(mode, layout, index)
                }
                key={id}
                channel={channel}
                id={id}
              />
            )
          })}
        </Grid>

        {displayChat && (
          <Box width="500px">
            <Stack h="100%" spacing={2}>
              <Stack isInline spacing={2}>
                {/* <IconButton aria-label="Hide sidebar" icon={FiLogOut} /> */}

                <IconButton
                  aria-label="Add channel"
                  icon={FiList}
                  onClick={handleOpenModal}
                />

                <IconButton
                  aria-label="Change columns"
                  icon={mode === 'even' ? RiLayoutGridFill : RiLayoutBottomFill}
                  onClick={handleToggleMode}
                />

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
