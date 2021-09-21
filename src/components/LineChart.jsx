import React from 'react'
import { Line } from 'react-chartjs-2'


//data du grapgh (a recuperer avec l'api)
const data = {
  labels: ['janv', 'févr', 'mars', 'avr', 'avr', 'juin', 'juill', 'août', 'sept', 'oct', 'nov', 'déc'],
  datasets: [
    {
      label: 'nombres de ventes',
      data: [1, 4, 3, 5, 2, 3, 4, 6, 7, 4, 8, 11],
      fill: true,
      backgroundColor: '#c7f9cc',
      borderColor: '#5eeb5b',
    },
  ],
}

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
}

const LineChart = () => (
  <>
    <div className='header'>
      <h1 className='title'>Statistiques</h1>
    </div>
    <Line data={data} options={options} />
  </>
)

export default LineChart