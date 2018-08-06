const PREFIX = 'ventureDevs_'

export const loadTodos = () => {
  try {
    const todos = localStorage.getItem(`${PREFIX}todos`)

    if(todos === null) {
      return undefined;
    }

    return JSON.parse(todos)
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
    return undefined;
  }
}

export const saveTodos = todos => {
  try {
    const todosSerialized = JSON.stringify(todos)

    localStorage.setItem(`${PREFIX}todos`, todosSerialized)
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
  }
}
