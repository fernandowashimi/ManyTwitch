import React, { FC } from 'react'
import { Stack, Text, Button } from '@chakra-ui/core'
import { FiChevronLeft } from 'react-icons/fi'

import { useRouter } from 'next/router'

const Tutorial: FC = () => {
  const router = useRouter()

  const handleGoBack = () => {
    router.back()
  }

  return (
    <div className="page">
      <Stack
        as="main"
        height="100%"
        direction="column"
        align="center"
        justify="center"
        spacing={10}
        shouldWrapChildren
      >
        <Text fontSize="xl">To do!</Text>
        <Button leftIcon={FiChevronLeft} variant="link" onClick={handleGoBack}>
          Go back
        </Button>
      </Stack>
    </div>
  )
}

export default Tutorial
