require('dotenv').config()
const express = require('express')
const fetch = require('node-fetch');
const app = express()
const PORT = process.env.PORT || 3000

app.use(express.static('public'))
app.set('view engine', 'ejs')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// Problem: fetch ist Teil des Window Objects und nicht in node verfügbar
// https://www.npmjs.com/package/node-fetch
// Eine Lösung für das Problem
app.get('/', (req, res) => {
    fetch(`https://newsapi.org/v2/everything?q=bitcoin&apiKey=${process.env.API_KEY}`)
        .then(res => res.json())
        .then(json => {
            console.log(json)
            res.render('index', { data: json.articles })
        });
})
app.post('/', (req, res) => {

    fetch(`https://newsapi.org/v2/everything?q=${req.body.search}&apiKey=${process.env.API_KEY}`)
        .then(res => res.json())
        .then(json => {
            console.log(json)
            res.render('index', { data: json.articles })
        });
})



app.listen(PORT, () => console.log(`http://localhost:${PORT}`))