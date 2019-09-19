const Koa = require('koa');
const route = require('koa-route');
const websockify = require('koa-websocket');
const logger = require('koa-logger');
const app = websockify(new Koa());
const port = process.env.PORT || 3000

// Regular middleware
// Note it's app.ws.use and not app.use
app.ws.use(function (ctx, next) {
  // return `next` to pass the context (ctx) on to the next ws middleware
  return next(ctx);
});

app.use(logger())


// Using routes
app.ws.use(route.all('/ws/:id', function (ctx) {
  // `ctx` is the regular koa context created from the `ws` onConnection `socket.upgradeReq` object.
  // the websocket is added to the context on `ctx.websocket`.
  ctx.websocket.send('Hello World' + id);
  ctx.websocket.on('message', function (message) {
    // do something with the message from client
    console.log(message);
  });
}));


const listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + listener.address().port)
})