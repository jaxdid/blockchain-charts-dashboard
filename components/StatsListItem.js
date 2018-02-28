import _ from 'lodash'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import StatDescription from './StatDescription'

class StatsListItem extends Component {
  constructor (props) {
    super(props)

    this.state = {
      name: props.name,
      description: props.description,
      unit: props.unit,
      values: props.values,
      error: props.error,
      descriptionVisible: false
    }

    this.toggleDescription = this.toggleDescription.bind(this)
  }

  renderFailedItem () {
    return (
      <div className="stats-list-item error">
        <div className="stat-name error">{this.state.name || 'Some data is'}</div>
        <div className="stat-value error">Unavailable</div>
        <div className="error-message">Please refresh your browser or try again later.</div>
      </div>
    )
  }

  renderItem (value) {
    const { name, unit } = this.state

    return (
      <div className="stats-list-item">
        <span className="stat-info" onClick={this.toggleDescription}>&#9432;</span>
        <div className="stat-name">{name}</div>
        <div className="stat-value">{value}</div>
        <div className="stat-unit">{unit}</div>
      </div>
    )
  }

  toggleDescription () {
    this.setState(previousState => {
      return {
        descriptionVisible: !previousState.descriptionVisible
      }
    })
  }

  render () {
    const {
      name,
      description,
      values,
      error,
      descriptionVisible
    } = this.state

    const hasMissingData = error || !(values && values.length)

    if (hasMissingData) {
      return this.renderFailedItem()
    }

    const significantDigitsMap = {
      'Market Price (USD)': 2,
      'Average Block Size': 2,
      'Transaction Rate': 2,
      'Mempool Size': 0,
      'Bitcoins In Circulation': 0
    }

    const { y } = _.last(values)
    const value = parseFloat(y)
      .toFixed(significantDigitsMap[name])
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')

    return descriptionVisible
      ? <StatDescription description={description} hideAgain={this.toggleDescription} />
      : this.renderItem(value)
  }
}

export default StatsListItem

StatsListItem.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  unit: PropTypes.string,
  values: PropTypes.array,
  error: PropTypes.string
}
