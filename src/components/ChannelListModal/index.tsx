import React, { FC, useEffect, useState } from 'react'
import {
  Stack,
  List,
  ListItem,
  InputGroup,
  Input,
  InputRightElement,
  Divider,
  Box,
  Text,
  IconButton,
  ModalOverlay,
  ModalContent,
  Modal,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button
} from '@chakra-ui/core'
import { FiCornerDownLeft, FiTrash2, FiPlus } from 'react-icons/fi'

import { useRouter } from 'next/router'

interface EditableChannelListProps {
  initialList?: string[]
  isVisible: boolean
  onClose: () => void
}

const EditableChannelList: FC<EditableChannelListProps> = ({
  initialList,
  isVisible,
  onClose
}) => {
  const router = useRouter()
  const [channels, setChannels] = useState([])
  const [input, setInput] = useState('')

  const handleInputChange = ({ target }) => {
    setInput(target.value.trim())
  }

  const handleKeyPress = ({ key }) => {
    if (key === 'Enter') {
      handleAddChannel()
    }
  }

  const handleAddChannel = () => {
    if (input) {
      const duplicated = channels.filter(c => c === input)

      if (duplicated.length === 0) {
        setChannels(p => [...p, input])
        setInput('')
      }
    }
  }

  const handleRemoveChannel = index => {
    const newList = channels
    newList.splice(index, 1)
    setChannels([...newList])
  }

  const handleConfimation = () => {
    const path = channels.join('/')
    onClose()
    router.push(`/${path}`)
  }

  useEffect(() => {
    if (initialList) {
      setChannels(initialList)
    }
  }, [initialList])

  return (
    <Modal isOpen={isVisible} onClose={onClose} closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add channels</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={4}>
            <List spacing={3}>
              {!channels.length && (
                <ListItem>
                  <Text>No channels yet</Text>
                </ListItem>
              )}
              {channels.map((channel, index) => {
                return (
                  <ListItem
                    key={`${channel}-${index}`}
                    d="flex"
                    dir="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Text>{channel}</Text>
                    <IconButton
                      variant="ghost"
                      icon={FiTrash2}
                      aria-label="Remove channel"
                      onClick={() => handleRemoveChannel(index)}
                    />
                  </ListItem>
                )
              })}
            </List>
            <Divider />
            <Stack isInline>
              <InputGroup size="md" w="100%">
                <Input
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Insert channel name and press 'Enter'"
                  onKeyPress={handleKeyPress}
                />
                <InputRightElement>
                  <Box as={FiCornerDownLeft} />
                </InputRightElement>
              </InputGroup>
              <IconButton
                variant="solid"
                icon={FiPlus}
                aria-label="Remove channel"
                onClick={handleAddChannel}
              />
            </Stack>
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="solid"
            isDisabled={channels.length === 0}
            onClick={handleConfimation}
          >
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default EditableChannelList
