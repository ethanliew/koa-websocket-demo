const Koa = require('koa');
const route = require('koa-route');
const serve = require('koa-static');
const logger = require('koa-logger');
const port = process.env.PORT || 4000

const app = new Koa();

app.use(logger())

// server html file in public folder
app.use(serve('./public'))

const listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + listener.address().port)
})