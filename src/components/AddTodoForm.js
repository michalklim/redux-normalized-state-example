import React, {Component } from 'react'
import styled from 'styled-components'
import T from 'prop-types'

import {ms} from 'styles/helpers'


const Form = styled.form`
  padding: ${ms(1)} ${ms(2)};
  display: grid;
  grid-template-columns: 1fr auto;
  grid-column-gap: ${ms(2)};
`

const Input = styled.input`
  font-family: ${({theme: {typo: {fonts}}}) => fonts.primary};
  width: 100%;
  border: none;
  outline: none;
  font-size: ${ms(0)};
  height: auto;
  line-height: 1;
 
  &::placeholder {
    color: ${({theme: {colors}}) => colors.accent};
  }
`

class AddTodoForm extends Component {
  state = {
    todoName: '',
  }

  handleInputChange = e => {
    this.setState({
      todoName: e.target.value
    })
  }

  handleSubmit = e => {
    const {todoName} = this.state

    if(todoName.length) {
      this.props.onAddTodo(todoName)
      this.setState({
        todoName: '',
      })
    }

    e.preventDefault()
  }

  render() {
    const {todoName} = this.state
    return (
      <Form onSubmit={this.handleSubmit} autocomplete="off">
        <Input type="text" name="name" placeholder="🤦 Add new todo...‍" value={todoName} onChange={this.handleInputChange}/>
      </Form>
    )
  }
}


AddTodoForm.propTypes = {
  onAddTodo: T.func.isRequired,
}

export default AddTodoForm
