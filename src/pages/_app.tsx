import React from 'react'

import { NextPage } from 'next'
import { AppProps } from 'next/app'
import Head from 'next/head'

import ThemeContainer from 'contexts/theme/ThemeContainer'
import { globalStyles } from 'styles/global'
import Layout from 'components/Layout'

const App: NextPage<AppProps> = ({ Component, pageProps }) => (
  <ThemeContainer>
    <Head>
      <title>ManyTwitch</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Layout>
      <Component {...pageProps} />
    </Layout>

    {globalStyles}
  </ThemeContainer>
)

export default App
