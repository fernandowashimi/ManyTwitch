import React, { FC } from 'react'
import { Grid } from '@chakra-ui/core'

import Header from 'components/Header'

const Layout: FC = ({ children }) => {
  return (
    <Grid
      className="layout"
      templateRows="3rem calc(100vh - 3rem)"
      minHeight="100%"
    >
      <Header />
      {children}
    </Grid>
  )
}

export default Layout
