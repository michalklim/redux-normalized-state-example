import React, { Fragment, Component } from 'react'
import styled from 'styled-components'
import { lighten } from 'polished'
import T from 'prop-types'

import { ACTIVE, ARCHIVED} from 'constants/TodosFilters'
import {ms} from 'styles/helpers'
import { todoShape } from 'constants/Shapes'
import { Emoji, EditTodoForm } from 'components'

const Actions = styled.div`
  display: flex;
  opacity: 0;
  transition: opacity 200ms cubic-bezier(0.55, 0.085, 0.68, 0.53);
`

const Action = styled.button`
  padding: 0 ${ms(-1)} 0 0;
  margin: 0;
  background: none;
  border: none;
  font-size: ${ms(2)};
  color: ${({theme: colors}) => colors.primary};
  cursor: pointer;
  transition: transform 400ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
  
  &:hover {
    transform: translateY(-4px); 
  }
  
  &:nth-last-child {
    padding: 0;
  }
`

const EditAction = styled(Action)`
  padding: 0 0 0 ${ms(-1)};
  opacity: 0;
  transition: all 200ms cubic-bezier(0.55, 0.085, 0.68, 0.53);
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
    
     ${EditAction} {
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

class TodoItem extends Component {
  state = {
    isEditing: false
  }

  handleEdit = () => {
    this.setState({
      isEditing: true
    })
  }

  handleSubmitEdit = newName => {
    this.props.onEdit(this.props.item.id, newName)
    this.setState({
      isEditing: false,
    })
  }

  render() {
    const {item: {name, isCompleted, id, status }, onToggleComplete, onToggleArchive, onDelete} = this.props
    const { isEditing }  = this.state

    return (
      <Container>
        <Name isCompleted={isCompleted}>
          {isEditing
            ? (<EditTodoForm onEditTodo={this.handleSubmitEdit} todoName={name} />)
            : name
          }
          {!isEditing && !isCompleted && <EditAction onClick={this.handleEdit}><Emoji symbol="🖊️" /></EditAction>}
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
}

TodoItem.propTypes = {
  item: todoShape.isRequired,
  onToggleComplete: T.func.isRequired,
  onToggleArchive: T.func.isRequired,
  onDelete: T.func.isRequired,
  onEdit: T.func.isRequired,
}

export default TodoItem
