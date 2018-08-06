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
    color: ${theme.colors.primary};
    font-family: ${theme.typo.fonts.primary};
    font-weight: ${theme.typo.weights.normal};
  }
`
