import React from 'react'
import styled from 'styled-components'
import T from 'prop-types'

import { ACTIVE} from 'constants/TodosFilters'
import {ms} from 'styles/helpers'
import { todoShape } from 'constants/Shapes'

const Container = styled.li`
  padding: ${ms(0)};
  display: grid;
  grid-template-columns: 1fr auto;
  grid-column-gap: ${ms(2)};
`

const Name = styled.div`
  color: ${({isCompleted, theme: {colors}}) => isCompleted ? colors.disabled: colors.primary};
`

const Actions = styled.div`
  display: flex;
`

const Action = styled.button`
  padding: 0;
  margin: 0;
  background: none;
  border: none;
  color: ${({theme: colors}) => colors.primary};
  cursor: pointer;
  
  &:hover {
    color: ${({theme: colors}) => colors.accent};  
  }
`

const CompleteAction = styled(Action)`
  &:hover {
    color: ${({theme: colors}) => colors.success};  
  }
`

/* eslint-disable */


function TodoItem({item: {name, isCompleted, id, status }, onComplete, onArchive}) {
  return (
    <Container>
      <Name isCompleted={isCompleted}>
        {name}
      </Name>
      <Actions>
        {!isCompleted && <CompleteAction onClick={() => onComplete(id)} >&#10004;</CompleteAction>}
        {isCompleted && status === ACTIVE && <Action onClick={() => onArchive(id)} >&#9904;</Action>}
      </Actions>
    </Container>
  )
}

TodoItem.propTypes = {
  item: todoShape.isRequired,
  onComplete: T.func.isRequired,
  onArchive: T.func.isRequired,
}

export default TodoItem
