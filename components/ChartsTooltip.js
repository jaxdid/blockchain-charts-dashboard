import React from 'react'
import PropTypes from 'prop-types'
import commaSeparate from '../helpers/commaSeparate'

export default function ChartsTooltip ({ label, type, data, legendData }) {
  if (!label) return null

  const { pricesColor, capsColor, volumesColor } = legendData
  const dateString = new Date(data[0].values[label].x * 1000).toDateString()

  const firstLabelColor = pricesColor || volumesColor

  return (
    <div className="tooltip">
      <div className="date">{dateString}</div>
      {renderLabel(label, data[0], firstLabelColor)}
      {type === 'values' ? renderLabel(label, data[1], capsColor) : null}
    </div>
  )
}

function renderLabel (label, data, color) {
  const { name, values } = data
  const commaSeparatedValue = commaSeparate(values[label].y.toFixed(0))

  return (
    <div className="label-price">
      <div
        style={{
          display: 'inline-block',
          width: 10,
          height: 10,
          marginRight: 10,
          border: '1px solid #fff',
          backgroundColor: color
        }}
      />
      {`${name}: ${commaSeparatedValue}`}
    </div>
  )
}

ChartsTooltip.propTypes = {
  data: PropTypes.array,
  label: PropTypes.number,
  legendData: PropTypes.object,
  type: PropTypes.string
}
