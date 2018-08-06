import React from 'react'
import T from 'prop-types'

import { listItemShape } from 'constants/Shapes'

function List({ items, itemComponent: ItemComponent, onItemToggleComplete, onItemToggleArchive }) {
  return (
    <ul>
      {items.map(item => (
        <ItemComponent key={item.id} item={item} onToggleComplete={onItemToggleComplete} onToggleArchive={onItemToggleArchive} />
      ))}
    </ul>
  )
}

List.propTypes = {
  items: T.arrayOf(listItemShape).isRequired,
  itemComponent: T.element.isRequired,
  onItemToggleComplete: T.func.isRequired,
  onItemToggleArchive: T.func.isRequired,
}

export default List
