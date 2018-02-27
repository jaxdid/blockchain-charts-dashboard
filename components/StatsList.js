import _ from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import StatsListItem from './StatsListItem'

export default function StatsList ({ data, error }) {
  return (
    <div className="stats-list">
      {error ? renderFailedList() : renderList(data)}
    </div>
  )
}

function renderFailedList () {
  return (
    <div className="error">
      <div className="error-title">Unable to fetch stats data</div>
      <div className="error-message">Please refresh your browser or try again later.</div>
    </div>
  )
}

function renderList (data) {
  return data.map(statData => {
    return _.isNull(statData) ? renderFailedListItem() : renderListItem(statData)
  })
}

function renderFailedListItem () {
  return <StatsListItem key={Date.now()} error="Null stat data" />
}

function renderListItem ({ name, description, unit, values }) {
  return (
    <StatsListItem
      key={name}
      name={_.startCase(name)}
      description={description}
      unit={unit}
      values={values}
      error=""
    />
  )
}

StatsList.propTypes = {
  data: PropTypes.array.isRequired,
  error: PropTypes.bool.isRequired
}

renderListItem.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  unit: PropTypes.string.isRequired,
  values: PropTypes.array.isRequired
}
