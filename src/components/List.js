import React from 'react'
import T from 'prop-types'

import { listItemShape } from 'constants/Shapes'

function List({ items, itemComponent: ItemComponent }) {
  return (
    <ul>
      {items.map(item => (
        <ItemComponent key={item.id} item={item} />
      ))}
    </ul>
  )
}

List.propTypes = {
  items: T.arrayOf(listItemShape).isRequired,
  itemComponent: T.element.isRequired,
}

export default List
