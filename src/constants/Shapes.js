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

export const locationShape = T.shape({
  pathname: T.string.isRequired,
  search: T.string.isRequired,
  hash: T.string.isRequired,
  state: T.object,
});

export const historyShape = T.shape({
  action: T.string.isRequired,
  block: T.func.isRequired,
  createHref: T.func.isRequired,
  go: T.func.isRequired,
  goBack: T.func.isRequired,
  goForward: T.func.isRequired,
  listen: T.func.isRequired,
  length: T.number.isRequired,
  push: T.func.isRequired,
  replace: T.func.isRequired,
  location: locationShape.isRequired,
});

export const matchShape = T.shape({
  isExact: T.bool.isRequired,
  path: T.string.isRequired,
  url: T.string.isRequired,
  params: T.object,
});
