const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()


const pbuDirPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

app.use(express.static(pbuDirPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Aman Gautam'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Weather',
        name: 'Aman Gautam'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Weather',
        name: 'Aman Gautam',
        query: 'please provide your concern'
    })
})
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({ error: 'you must provide an address' })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error)
        return res.send({ error: 'given address do not exIst' })
        else {
            forecast(latitude, longitude, (error, data) => {
                if (error)
                return res.send({ error: 'cannot get the forcast' })
                else
                return res.send(
                    { forecast: data ,
                    location: location,
                     address: req.query.address
            })
                })
        }
    })
    
})
app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({ error: 'no search provided' })
    }

    res.send({ product: [] })
})
app.get('/help/*', (req, res) => {
    res.render('404page', {
        title: '404',
        name: 'Aman Gautam',
        msg: 'help page not available'
    })
})
app.get('*', (req, res) => {
    res.render('404page', {
        title: '404',
        name: 'Aman Gautam',
        msg: 'page not found'
    })
})


app.listen(3000, () => { console.log('server is runnning') })