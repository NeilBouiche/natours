const fs = require('fs')
const express = require('express')

const app = express()

// middleware
app.use(express.json())

// read data
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
)

// get all tours
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours: tours,
    },
  })
})

// get a specific tour
app.get('/api/v1/tours/:id', (req, res) => {
  const specificTourId = req.params.id * 1
  const tour = tours.find((tour) => tour.id === specificTourId)
  if (specificTourId > tours.length) {
    return res.status(404).json({ status: 'fail', message: 'Invalid id' })
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour: tour,
    },
  })
})

// post a new tour
app.post('/api/v1/tours', (req, res) => {
  const newId = tours[tours.length - 1].id + 1
  const newTour = Object.assign({ id: newId }, req.body)
  tours.push(newTour)
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({ status: 'success', data: { tour: newTour } })
    }
  )
})

//patch a tour
app.patch('/api/v1/tours/:id', (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({ status: 'faild', message: 'Invalid id' })
  }
  res.status(200).json({
    status: 'succes',
    data: {
      tour: '<Updated tour here...>',
    },
  })
})

//delete a tour
app.patch('/api/v1/tours/:id', (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({ status: 'faild', message: 'Invalid id' })
  }
  res.status(204).json({
    status: 'succes',
    data: null,
  })
})

const port = 3000
app.listen(port, () => {
  console.log('App running on port ' + port)
})
