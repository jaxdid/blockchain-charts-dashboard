import React from 'react'
import PropTypes from 'prop-types'

export default function ChartsTooltip ({ data, label }) {
  if (!label) return null

  return (
    <div className="tooltip">
      <p className="date">{new Date(data[0].values[label].x * 1000).toDateString()}</p>
      <p className="label-price">{`${data[0].name} : ${data[0].values[label].y}`}</p>
      {data[1] ? <p className="label-price">{`${data[1].name} : ${data[1].values[label].y}`}</p> : ''}
    </div>
  )
}

ChartsTooltip.propTypes = {
  data: PropTypes.array,
  label: PropTypes.number
}
