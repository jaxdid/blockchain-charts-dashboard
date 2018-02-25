import React, { Component } from 'react'
import ActivityIndicator from './ActivityIndicator'

class ChartsDashboard extends Component {
  constructor (props) {
    super(props)

    this.state = {
      stillLoading: true
    }

    this.getData()
  }

  getData () {
    // get data from Blockchain APIs
  }

  render () {
    if (this.state.stillLoading) {
      return (
        <div className="charts-dashboard">
          <ActivityIndicator />
        </div>
      )
    }

    return (
      <div className="charts-dashboard">
        Stats...
      </div>
    )
  }
}

export default ChartsDashboard
