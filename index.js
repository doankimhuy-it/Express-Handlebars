const express = require('express')
const path = require('path')
const expressHbs = require('express-handlebars')
const bodyParser = require('body-parser')

const app = express()

const hbs = expressHbs.create({
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: path.join(__dirname, 'views/partials'),
    extname: 'hbs',
    defaultLayout: 'layout'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')

app.use(express.static(path.join(__dirname, 'Handlebars-StaticFiles')))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.render('index', { author: "Nhom01" })
})

const { emotions, categories, products, zodiacs } = require('./data')

app.get('/task1', (req, res) => {
    res.render('task1', { author: "19120173 - Đinh Minh Bảo", emotions: emotions })
})

app.get('/task2', (req, res) => {
    let salary = parseFloat(req.query.salary || 0)
    res.locals.jars = [
        salary * 55 / 100,
        salary * 10 / 100,
        salary * 5 / 100,
        salary * 10 / 100,
        salary * 10 / 100,
        salary * 10 / 100
    ]
    res.render('task2', { author: "19120239 - Đoàn Kim Huy" })
})

app.post('/task2', (req, res) => {
    let salary = parseFloat(req.body.salary || 0)
    res.locals.jars = [
        salary * 55 / 100,
        salary * 10 / 100,
        salary * 5 / 100,
        salary * 10 / 100,
        salary * 10 / 100,
        salary * 10 / 100
    ]
    res.render('task2', { author: "19120239 - Đoàn Kim Huy" })
})

app.get('/task3', (req, res) => {
    let category = req.query.cat || 0

    res.locals.categories = categories
    res.locals.products = products

    if (category) {
        res.locals.products = products.filter(item => item.category == category)
    }
    res.render('task3', { author: "19120283 - Quách Bình Long" })
})

app.get('/task4', (req, res) => {
    res.locals.zodiacs = zodiacs
    res.render('task4', { author: "19120239 - Đoàn Kim Huy" })
})

app.get('/task4/:name', (req, res) => {
    res.locals.zodiac = zodiacs.filter(item => item.name == req.params.name)[0]
    res.render('task4-details', { author: "19120239 - Đoàn Kim Huy" })
})

app.set('port', process.env.PORT || 5000)
app.listen(app.get('port'), () => {
    console.log(`Server is running at localhost:${app.get('port')}`)
})