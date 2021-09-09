
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
const port = process.env.PORT || 3000  // Heroku will use the value "process.env.PORT", if doesn't exists, will use "3000"

//Define Paths for Expresss config
const publicDirectoryPath = path.join(__dirname, '../public')    
const viewsPath = path.join(__dirname, '../templates/views') //After changing the file name "views" for "templates", we must change the directory// then, we set below: "app.set('views', viewsPath)"
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location -- http://expressjs.com/en/4x/api.html#app.set
app.set('view engine','hbs')// Setting up hbs to express, telling express which templating engine we've installed. 'view value' is the config option. 'hbs' is the name of the template engine module you installed. For this we have to install hbs library "npmjs.com/package/hbs"
app.set('views', viewsPath)//After changing the file name "views" for "templates", we must change the directory// then, we set below: "app.set('views', viewsPath)"
hbs.registerPartials(partialsPath)


// Setup static directory to serve - http://expressjs.com/en/4x/api.html#app.use
app.use(express.static(publicDirectoryPath)) //A way to customize your server - With this function, we are customizing the URL with extension: about.html, help.html, index.html. This was before we passed the .html documents to .hbs documents

app.get('',(req, res) => {
    res.render('index', {//'index' must match up with hbs document, in this case "index.hbs", It must be a view.
        title: 'Weather App',
        name: 'Oscar Vargas'
    }) 
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Oscar Vargas'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpul text',
        title: 'Help',
        name: 'Oscar Vargas'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => { //ES6 Default Function Parameters: when geocode does not have the object {latitude,longitude,location}, it will return an empty object: {}, thus the code does not crash
        if (error) {
            return res.send({error}) //if an error exist, it will stops the function by "return"
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
    
            res.send({
                forecast: forecastData,
                location,                
                address: req.query.address
            })
        })
    })
 
})

//Query String
app.get('/products', (req, res) => {
    if (!req.query.search) { //This will run only when req.query.search does not exist
        return res.send({
            error: 'You must provide a search term'
        })
    }

    //console.log(req.query) //prints: { search: 'games', rating: '5' } // console.log(req.query.search) prints: games
    res.send({
        products: []
    })
})

// 404 Summary
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Oscar Vargas',
        errorMessage: 'Help article not found'
    })
})


app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Oscar Vargas',
        errorMessage:'Page not found'
    })
})

//Starting the server
app.listen(port, () => {
    console.log('Server is up on port ' + port) 
})
