import React, { Fragment } from 'react'
import styled from 'styled-components'
import { lighten } from 'polished'
import T from 'prop-types'

import { ACTIVE, ARCHIVED} from 'constants/TodosFilters'
import {ms} from 'styles/helpers'
import { todoShape } from 'constants/Shapes'
import { Emoji } from 'components'

const Actions = styled.div`
  display: flex;
  opacity: 0;
  transition: opacity 200ms cubic-bezier(0.55, 0.085, 0.68, 0.53);
`

const Container = styled.li`
  padding: ${ms(-1)} ${ms(2)};
  display: grid;
  grid-template-columns: 1fr auto;
  grid-column-gap: ${ms(2)};
  box-shadow: 0 1px 0 ${({theme: {colors}}) => lighten(0.02, colors.disabled)};
  
  &:hover {
    box-shadow: 0 0 6px ${({theme: {colors}}) => lighten(0.01, colors.disabled)};
  
    ${Actions} {
      opacity: 1;
    }
  }
`

const Name = styled.div`
  color: ${({isCompleted, theme: {colors}}) => isCompleted ? colors.disabled: colors.primary};
  text-decoration: ${({isCompleted}) => isCompleted ? 'line-through' : 'none'};
  display: flex;
  align-items: center;
`

const Action = styled.button`
  padding: 0 ${ms(-1)} 0 0;
  margin: 0;
  background: none;
  border: none;
  font-size: ${ms(2)};
  color: ${({theme: colors}) => colors.primary};
  cursor: pointer;
  transition: all 400ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
  
  &:hover {
    transform: translateY(-4px); 
  }
  
  &:nth-last-child {
    padding: 0;
  }
`


/* eslint-disable */


function TodoItem({item: {name, isCompleted, id, status }, onToggleComplete, onToggleArchive, onDelete}) {
  return (
    <Container>
      <Name isCompleted={isCompleted}>
        {name}
      </Name>
      <Actions>
        {!isCompleted && <Action onClick={() => onToggleComplete(id)}><Emoji symbol="👍" /></Action>}
        {isCompleted && status === ACTIVE && (
          <Fragment>
            <Action onClick={() => onToggleComplete(id)}><Emoji symbol="👎" /></Action>
            <Action onClick={() => onToggleArchive(id)}><Emoji symbol="📦" /></Action>
          </Fragment>
        )}
        {status === ARCHIVED && (
          <Action onClick={() => onToggleArchive(id)}><Emoji symbol="😰️" /></Action>
        )}
        <Action onClick={() => onDelete(id)}><Emoji symbol="⚰️" /></Action>
      </Actions>
    </Container>
  )
}

TodoItem.propTypes = {
  item: todoShape.isRequired,
  onToggleComplete: T.func.isRequired,
  onToggleArchive: T.func.isRequired,
  onDelete: T.func.isRequired,
}

export default TodoItem
