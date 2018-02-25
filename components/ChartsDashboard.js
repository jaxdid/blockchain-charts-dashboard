import React, { Component } from 'react'
import axios from 'axios'
import ActivityIndicator from './ActivityIndicator'

class ChartsDashboard extends Component {
  constructor (props) {
    super(props)

    this.state = {
      statsData: []
    }

    this.getStatsData()
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
            const dataRetrieved = data && data.values && data.values.length

            return {
              data: dataRetrieved ? data : null,
              decimalPlaces: stats[index].decimalPlaces
            }
          })

          this.setState({ statsData })
        }
      })
      .catch(() => {
        console.error(`Unable to fetch stats data.`)
        return null
      })
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
