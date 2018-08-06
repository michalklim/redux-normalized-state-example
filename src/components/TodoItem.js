import React, { Fragment } from 'react'
import styled from 'styled-components'
import T from 'prop-types'

import { ACTIVE, ARCHIVED} from 'constants/TodosFilters'
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
  padding: 0 ${ms(-2)} 0 0;
  margin: 0;
  background: none;
  border: none;
  font-size: ${ms(-1)};
  color: ${({theme: colors}) => colors.primary};
  cursor: pointer;
  
  &:hover {
    color: ${({theme: colors}) => colors.accent};  
  }
`

const CompleteAction = styled(Action)`
  &:hover {
    color: ${({theme: {colors}}) => colors.success};  
  }
`

const DeleteAction = styled(Action)`
  &:hover {
    color: ${({theme: {colors}}) => colors.warning};  
  }
`

/* eslint-disable */


function TodoItem({item: {name, isCompleted, id, status }, onToggleComplete, onToggleArchive}) {
  return (
    <Container>
      <Name isCompleted={isCompleted}>
        {name}
      </Name>
      <Actions>
        {!isCompleted && <CompleteAction onClick={() => onToggleComplete(id)} >mark as done</CompleteAction>}
        {isCompleted && status === ACTIVE && (
          <Fragment>
            <Action onClick={() => onToggleArchive(id)}>archive</Action>
            <Action onClick={() => onToggleComplete(id)}>unmark</Action>
          </Fragment>
        )}
        {status === ARCHIVED && (
          <Fragment>
            <DeleteAction onClick={() => onToggleArchive(id)} >delete</DeleteAction>
            <Action onClick={() => onToggleArchive(id)} >unarchive</Action>
          </Fragment>
        )}
      </Actions>
    </Container>
  )
}

TodoItem.propTypes = {
  item: todoShape.isRequired,
  onToggleComplete: T.func.isRequired,
  onToggleArchive: T.func.isRequired,
}

export default TodoItem
