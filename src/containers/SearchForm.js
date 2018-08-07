import React, {Component } from 'react'
import T from 'prop-types'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { lighten } from 'polished'
import Fuse from 'fuse.js'
import { bindActionCreators, compose } from 'redux'
import { connect } from 'react-redux'
import debounce from 'lodash/debounce'

import {locationShape, historyShape, todoShape} from 'constants/Shapes'
import {ms} from 'styles/helpers'
import { getAllTodos } from 'reducers/todos'
import * as TodosActions from 'actions/todos'

const InputWrapper = styled.form`
  padding: ${ms(-1)} ${ms(2)};
 box-shadow: 0 1px 0 ${({theme: {colors}}) => lighten(0.02, colors.disabled)};
`

const Input = styled.input`
  font-family: ${({theme: {typo: {fonts}}}) => fonts.primary};
  width: 100%;
  border: none;
  outline: none;
  font-size: ${ms(1)};
  height: auto;
  line-height: 1;
 
  &::placeholder {
    color: ${({theme: {colors}}) => colors.disabled};
  }
`

class SearchForm extends Component {
  state = {
    query: '',
    isSearching: false
  }

  componentDidUpdate = prevProps => {
    if(prevProps.location.pathname === '/search' && this.props.location.pathname !== '/search') {
      // Reset search
      this.setState({
        query: '',
        isSearching: false
      })
    }
  }

  search = debounce(() => {
    const fuse = new Fuse(this.props.todos, {keys: ['name'], id: 'id'})

    this.props.searchTodo(fuse.search(this.state.query))
  }, 300)

  handleInputChange = e => {
    this.setState({
      query: e.target.value
    })

    // Search has started
    if(e.target.value.length === 1 && !this.state.isSearching) {
      this.props.history.push(`/search`)
      this.setState({
        isSearching: true,
      })
    }

    // Search has ended
    if(e.target.value.length === 0 && this.state.isSearching) {
      this.props.history.push(`/active`)
    }

    this.search()
  }

  handleSubmit = e => {
    e.preventDefault();
  }

  render() {
    const {query} = this.state
    return (
      <InputWrapper onSubmit={this.handleSubmit}>
        <Input type="text" name="name" placeholder="🔍 Search...‍" value={query} onChange={this.handleInputChange}/>
      </InputWrapper>
    )
  }
}


SearchForm.propTypes = {
  history: historyShape.isRequired,
  location: locationShape.isRequired,
  searchTodo: T.func.isRequired,
  todos: T.arrayOf(todoShape).isRequired,
}

const mapStateToProps = (state) => ({
  todos: getAllTodos(state)
})

function mapDispatchToProps(dispatch) {
  return bindActionCreators(TodosActions, dispatch)
}

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(SearchForm)
