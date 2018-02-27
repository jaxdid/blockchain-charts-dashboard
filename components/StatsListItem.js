import React from 'react'
import PropTypes from 'prop-types'

export default function StatsListItem ({ name, description, unit, values, error }) {
  if (error) renderFailedItem()

  const significantDigitsMap = {
    'Market Price (USD)': 2,
    'Average Block Size': 2,
    'Transaction Rate': 2,
    'Mempool Size': 0,
    'Bitcoins In Circulation': 0
  }

  const { y } = values.pop()
  const value = parseFloat(y)
    .toFixed(significantDigitsMap[name])
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')

  return (
    <div className="stats-list-item">
      <span className="stat-info">&#9432;</span>
      <div className="stat-name">
        {name}
      </div>
      <div className="stat-value">{value}</div>
      <div className="stat-unit">{unit}</div>
    </div>
  )
}

function renderFailedItem () {
  return (
    <div className="stats-list-item error">
      <div className="stat-name error">Some data is</div>
      <div className="stat-value error">Unavailable</div>
      <div className="error-message">Please refresh your browser or try again later.</div>
    </div>
  )
}

StatsListItem.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  unit: PropTypes.string,
  values: PropTypes.array,
  error: PropTypes.string
}
