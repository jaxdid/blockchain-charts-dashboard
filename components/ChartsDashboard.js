import React, { Component } from 'react'
import axios from 'axios'
import ActivityIndicator from './ActivityIndicator'

class ChartsDashboard extends Component {
  constructor (props) {
    super(props)

    this.state = {
      statsData: [],
      chartsData: {}
    }

    this.getStatsData()
    this.getChartsData()
  }

  getStatsData () {
    const stats = [
      { stat: 'market-price', decimalPlaces: 2 },
      { stat: 'avg-block-size', decimalPlaces: 2 },
      { stat: 'transactions-per-second', decimalPlaces: 2 },
      { stat: 'mempool-size', decimalPlaces: 0 },
      { stat: 'total-bitcoins', decimalPlaces: 0 }
    ]

    const promises = stats.map(({ stat }) => {
      return axios.get(`https://api.blockchain.info/charts/${stat}?timespan=1days&format=json&cors=true`)
    })

    axios.all(promises)
      .then(responses => {
        if (responses.length) {
          const statsData = responses.map(({ data }, index) => {
            if (data) {
              const { description, name, unit, values } = data
              const dataRetrieved = values && values.length

              if (!dataRetrieved) {
                return null
              }

              return {
                description,
                name,
                unit,
                values,
                decimalPlaces: stats[index].decimalPlaces
              }
            }
          })

          this.setState({ statsData })
        }
      })
      .catch(e => this.handleFetchingError(e, 'stats'))
  }

  getChartsData () {
    const charts = [
      'market-pricee',
      'market-cap',
      'trade-volume'
    ]

    const promises = charts.map(chart => {
      return axios.get(`https://api.blockchain.info/charts/${chart}?timespan=1years&format=json&cors=true`)
    })

    axios.all(promises)
      .then(responses => {
        if (responses.length) {
          const chartsData = this.state.chartsData

          responses.map(response => {
            if (/market price/i.test(response.data.name)) {
              chartsData.marketPriceData = response.data
            } else if (/market cap/i.test(response.data.name)) {
              chartsData.marketCapData = response.data
            } else if (/trade volume/i.test(response.data.name)) {
              chartsData.tradeVolumeData = response.data
            }
          })

          this.setState(chartsData)
        }
      })
      .catch(e => this.handleFetchingError(e, 'charts'))
  }

  handleFetchingError (e, dataType) {
    const reference = `${dataType}Data`
    const newState = this.state

    newState[reference] = 'failed'
    this.setState(newState)

    console.error(`${e}. Unable to fetch ${dataType} data.`)
    return null
  }

  render () {
    const { statsData, chartsData } = this.state
    const statsFailed = statsData === 'failed'
    const chartsFailed = chartsData === 'failed'
    const statsLoading = !statsFailed && !statsData.length
    const chartsLoading = !chartsFailed && Object(chartsData).keys && !Object(chartsData).keys.length
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
        {`Stats ${statsFailed ? 'failed' : 'loaded'}...`}
        {`Charts ${chartsFailed ? 'failed' : 'loaded'}...`}
      </div>
    )
  }
}

export default ChartsDashboard
