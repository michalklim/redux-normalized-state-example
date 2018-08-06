import React from 'react'
import T from 'prop-types'

import { listItemShape } from 'constants/Shapes'

function List({ items, itemComponent: ItemComponent, onItemComplete }) {
  return (
    <ul>
      {items.map(item => (
        <ItemComponent key={item.id} item={item} onComplete={onItemComplete} />
      ))}
    </ul>
  )
}

List.propTypes = {
  items: T.arrayOf(listItemShape).isRequired,
  itemComponent: T.element.isRequired,
  onItemComplete: T.func.isRequired,
}

export default List
