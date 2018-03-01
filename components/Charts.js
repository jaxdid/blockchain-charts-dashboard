import React from 'react'
import PropTypes from 'prop-types'
import {
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  Tooltip
} from 'recharts'
import ChartsTooltip from './ChartsTooltip'

export default function Charts ({ data, error }) {
  return error ? renderFailedCharts() : renderCharts(data)
}

function renderFailedCharts () {
  return (
    <div className="charts">
      <div className="error">
        <div className="error-title">Charts data unavailable</div>
        <div className="error-message">Please refresh your browser or try again later.</div>
      </div>
    </div>
  )
}

function renderCharts (data) {
  const valuesData = extractValuesData(data)
  const volumesData = extractVolumesData(data)
  const lineChartData = transformForLineChart(valuesData)
  const areaChartData = volumesData[0].values

  return (
    <div className="charts">
      <ResponsiveContainer className="market-values-chart" width={'99%'} height={'99%'}>
        <LineChart syncId="marketStats" data={lineChartData}>
          <Line type="monotone" dataKey="marketCap" stroke={'#00AEE6'} dot={false} isAnimationActive={false} />
          <Line type="monotone" dataKey="marketPrice" stroke={'#123962'} dot={false} isAnimationActive={false} />
          <Tooltip
            content={<ChartsTooltip type="values" data={valuesData} legendData={{ capsColor: '#00AEE6', pricesColor: '#123962' }} />}
            animationEasing="linear"
            animationDuration={100}
          />
        </LineChart>
      </ResponsiveContainer>
      <ResponsiveContainer className="market-volumes-chart" width={'99%'} height={'99%'}>
        <AreaChart syncId="marketStats" data={areaChartData}>
          <Area type="monotone" dataKey="y" stroke={'#799EB2'} fill={'#799EB2'} dot={false} isAnimationActive={false} />
          <Tooltip
            content={<ChartsTooltip type="volumes" data={volumesData} legendData={{ volumesColor: '#799EB2' }} />}
            animationEasing="linear"
            animationDuration={100}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

function transformForLineChart (data) {
  const lineChartData = []

  data[0].values.map(({ x, y }) => {
    lineChartData.push({
      ts: x,
      marketPrice: y
    })
  })

  data[1].values.map(({ x, y }) => {
    lineChartData.map((dataPoint, index) => {
      if (dataPoint.ts === x) {
        lineChartData[index].marketCap = y / 10000000
      }
    })
  })

  return lineChartData
}

function extractValuesData (data) {
  return data.filter(data => !(/trade volume/i.test(data.name)))
}

function extractVolumesData (data) {
  return data.filter(data => /trade volume/i.test(data.name))
}

Charts.propTypes = {
  data: PropTypes.array.isRequired,
  error: PropTypes.bool.isRequired
}
