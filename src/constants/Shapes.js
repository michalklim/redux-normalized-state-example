import T from 'prop-types'
import {ARCHIVED, ACTIVE} from 'constants/TodosFilters'

export const listItemShape = T.shape({
  id: T.string.isRequired,
})

export const todoShape = T.shape({
  id: T.string.isRequired,
  isCompleted: T.bool.isRequired,
  status: T.oneOf([ACTIVE, ARCHIVED]).isRequired,
  name: T.string.isRequired,
})
