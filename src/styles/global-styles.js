import { injectGlobal } from 'styled-components'
import { normalize } from 'polished'

import theme from './theme'

/* eslint no-unused-expressions: 0 */
injectGlobal`
  ${normalize()}
  
  body {
    background: ${theme.colors.accent};
  }
`
