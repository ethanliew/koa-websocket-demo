const Koa = require('koa');
const route = require('koa-route');
const websockify = require('koa-websocket');
const logger = require('koa-logger');
const port = process.env.PORT || 3000;


const WebSocket = require('ws');
const app = websockify(new Koa());

// Regular middleware
// Note it's app.ws.use and not app.use
app.ws.use(function (ctx, next) {
  //console.log(ctx.query.id);
  // return `next` to pass the context (ctx) on to the next ws middleware
  return next(ctx);
});

app.use(logger());


//
// nodejs web socket example
//
// const wss = new WebSocket.Server({ port: port });
// wss.on('connection', ws => {
//   ws.on('message', message => {
//     console.log(`Received message => ${message}`)
//   })
//   ws.send('ho! from server');
// });


app.ws.use(route.all('/:id', function (ctx) {
  // `ctx` is the regular koa context created from the `ws` onConnection `socket.upgradeReq` object.
  // the websocket is added to the context on `ctx.websocket`.
  ctx.websocket.on('message', function (message) {
    console.log(`Received message => ${message}`);
    ctx.websocket.send("Msg from server");
  });
}));

const listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + listener.address().port)
});