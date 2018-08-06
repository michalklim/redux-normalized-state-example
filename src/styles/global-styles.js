import { injectGlobal } from 'styled-components'
import { normalize } from 'polished'

import theme from './theme'

/* eslint no-unused-expressions: 0 */
injectGlobal`
  ${normalize()}
  
  html {
  box-sizing: border-box;
}
*, *:before, *:after {
  box-sizing: inherit;
}
  
  body {
    background: ${theme.colors.accent};
  }
`
