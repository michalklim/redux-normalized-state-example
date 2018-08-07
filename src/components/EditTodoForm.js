import React, {Component } from 'react'
import styled from 'styled-components'
import T from 'prop-types'

import {ms} from 'styles/helpers'


const Form = styled.form`
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

class EditTodoForm extends Component {
  state = {
    todoName: '',
  }

  componentWillMount = () => {
    this.setState({
      todoName: this.props.todoName,
    })
  }

  componentDidMount = () => {
    this.input.focus()
  }

  setInputRef = el => {
    this.input = el
  }

  handleInputChange = e => {
    this.setState({
      todoName: e.target.value
    })
  }

  handleSubmit = e => {
    const {todoName} = this.state

    if(todoName.length) {
      this.props.onEditTodo(todoName)
    }

    e.preventDefault()
  }

  render() {
    const {todoName} = this.state
    return (
      <Form onSubmit={this.handleSubmit} autocomplete="off">
        <Input innerRef={this.setInputRef} type="text" name="name"  value={todoName} onChange={this.handleInputChange}/>
      </Form>
    )
  }
}


EditTodoForm.propTypes = {
  onEditTodo: T.func.isRequired,
  todoName: T.string.isRequired, // eslint-disable-line
}

export default EditTodoForm
