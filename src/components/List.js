import React from 'react'
import styled from 'styled-components'
import T from 'prop-types'

import { listItemShape } from 'constants/Shapes'
import { Emoji } from 'components'
import { ms } from 'styles/helpers'

const Container = styled.ul`
  margin: 0;
  padding: 0;
`

const EmptyText = styled.div`
  padding: ${ms(-1)} ${ms(2)};
`

function List({ items, itemComponent: ItemComponent, onItemToggleComplete, onItemToggleArchive, onItemDelete, onItemEdit }) {
  return (
    <Container>
      {items.length
        ? items.map(item => (
          <ItemComponent key={item.id} item={item} onToggleComplete={onItemToggleComplete} onToggleArchive={onItemToggleArchive} onDelete={onItemDelete} onEdit={onItemEdit} />
        ))
        :  (
          <EmptyText>
            <Emoji symbol="🤔" />
            There are no items on this list
          </EmptyText>
        )
      }
    </Container>
  )
}

List.propTypes = {
  items: T.arrayOf(listItemShape).isRequired,
  itemComponent: T.element.isRequired,
  onItemToggleComplete: T.func,
  onItemToggleArchive: T.func,
  onItemDelete: T.func,
  onItemEdit: T.func,
}

List.defaultProps = {
  onItemToggleComplete: () => {},
  onItemToggleArchive: () => {},
  onItemDelete: () => {},
  onItemEdit: () => {}
}

export default List
