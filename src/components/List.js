import React from 'react'
import T from 'prop-types'

import { listItemShape } from 'constants/Shapes'

function List({ items, itemComponent: ItemComponent, onItemToggleComplete, onItemToggleArchive, onItemDelete }) {
  return (
    <ul>
      {items.map(item => (
        <ItemComponent key={item.id} item={item} onToggleComplete={onItemToggleComplete} onToggleArchive={onItemToggleArchive} onDelete={onItemDelete} />
      ))}
    </ul>
  )
}

List.propTypes = {
  items: T.arrayOf(listItemShape).isRequired,
  itemComponent: T.element.isRequired,
  onItemToggleComplete: T.func,
  onItemToggleArchive: T.func,
  onItemDelete: T.func,
}

List.defaultProps = {
  onItemToggleComplete: () => {},
  onItemToggleArchive: () => {},
  onItemDelete: () => {},
}

export default List
