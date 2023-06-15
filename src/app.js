require('dotenv').config()
const path = require('path')
const express = require('express')
const app = express()
const routes = require('./routes/routes')
const port = process.env.PORT || 3000

app.use(routes)
app.use(express.static(__dirname + '/webroot/'));
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'webroot/views/'));
app.listen(port, () => console.log(`app listening on port ${port}!`))