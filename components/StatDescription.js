import React from 'react'
import PropTypes from 'prop-types'

export default function StatDescription ({ description, hideAgain }) {
  return (
    <div className="stats-list-item" onClick={hideAgain} onMouseLeave={hideAgain}>
      <div className="stat-description">
        <div className="content">{description}</div>
      </div>
    </div>
  )
}

StatDescription.propTypes = {
  description: PropTypes.string.isRequired,
  hideAgain: PropTypes.func.isRequired
}
