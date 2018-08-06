import React from 'react';
import T from 'prop-types'

function Emoji({className, label, symbol}) {
  return (
    <span
      className={className}
      role="img"
      aria-label={label}
      aria-hidden={label.length ? "false" : "true"}
    >
        {symbol}
    </span>
  )
}

Emoji.propTypes = {
  symbol: T.string.isRequired,
  label: T.string,
  className: T.string,
}

Emoji.defaultProps = {
  label: '',
  className: '',
}

export default Emoji
