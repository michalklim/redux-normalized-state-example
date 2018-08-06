import React from 'react'
import styled from 'styled-components'
import { lighten } from 'polished'
import T from 'prop-types'

import { ms } from 'styles/helpers'

const Container = styled.header`
  display: grid;
  grid-template-columns: 1fr auto;
  grid-column-gap: ${ms(2)};
`

const Label = styled.h3`
  margin: ${ms(2)} 0 0 0;
  padding: ${ms(-1)} ${ms(2)};
  color: ${({theme: {colors}}) => lighten(0.5, colors.accent)};
  text-transform: uppercase;
  font-size: ${ms(0)};
  font-weight: ${({theme: {typo: {weights}}}) => weights.normal};
`

function ListHeader({ label }) {
  return (
    <Container>
     <Label>{label}</Label>
    </Container>
  )
}

ListHeader.propTypes = {
  label: T.string.isRequired,
}

export default ListHeader
