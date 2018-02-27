import _ from 'lodash'
import React, { Component } from 'react'
import axios from 'axios'
import ActivityIndicator from './ActivityIndicator'
import StatsList from './StatsList'

class ChartsDashboard extends Component {
  constructor (props) {
    super(props)

    this.state = {
      statsData: [],
      chartsData: []
    }

    this.getStatsData()
    this.getChartsData()
  }

  getStatsData () {
    const stats = [
      'market-price',
      'avg-block-size',
      'transactions-per-second',
      'mempool-size',
      'total-bitcoins'
    ]

    const promises = this.createPromises(stats, '1days')
    this.resolvePromises(promises, 'stats')
  }

  getChartsData () {
    const charts = [
      'market-price',
      'market-cap',
      'trade-volume'
    ]

    const promises = this.createPromises(charts, '1years')
    this.resolvePromises(promises, 'charts')
  }

  createPromises (fragments, timespan) {
    return fragments.map(fragment => {
      return axios.get(`https://api.blockchain.info/charts/${fragment}?timespan=${timespan}&format=json&cors=true`)
    })
  }

  resolvePromises (promises, dataType) {
    axios.all(promises)
      .then(responses => {
        if (responses.length) {
          const newData = responses.map(({ data }) => {
            const { values } = data
            const dataRetrieved = values && values.length

            return dataRetrieved ? data : null
          })

          this.setState(previousState => {
            const property = `${dataType}Data`
            _.assign(previousState[property], newData)
          })
        }
      })
      .catch(e => this.handleFetchingError(e, dataType))
  }

  handleFetchingError (e, dataType) {
    const property = `${dataType}Data`
    const { state } = this

    state[property] = [{ totalFailure: true }]
    this.setState(state)

    console.error(`${e}. Unable to fetch ${dataType} data.`)
    return null
  }

  render () {
    const { statsData, chartsData } = this.state
    const statsFailed = _.some(statsData, 'totalFailure')
    const chartsFailed = _.some(chartsData, 'totalFailure')
    const statsLoading = !statsFailed && !statsData.length
    const chartsLoading = !chartsFailed && !chartsData.length
    const loading = statsLoading || chartsLoading

    if (loading) {
      return (
        <div className="charts-dashboard">
          <ActivityIndicator />
        </div>
      )
    }

    return (
      <div className="charts-dashboard">
        <StatsList data={statsData} error={statsFailed} />
        {`Charts ${chartsFailed ? 'failed' : 'loaded'}...`}
      </div>
    )
  }
}

export default ChartsDashboard
