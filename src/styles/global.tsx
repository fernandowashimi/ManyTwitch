import React from 'react'
import { Global, css } from '@emotion/core'

export const globalStyles = (
  <Global
    styles={css`
      * {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
      }

      html,
      body,
      #__next {
        height: 100%;
      }
    `}
  />
)
