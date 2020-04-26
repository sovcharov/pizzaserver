import * as express from 'express';
import { Application } from 'express';
import {MyNodeConfig} from '../serverconfig/mynodeconfig';
const myNodeConfig = new MyNodeConfig();
import { MySqlService } from './services/mysql.service';
const mySqlService = new MySqlService();
let bodyParser = require('body-parser');

const app: Application = express();
import * as http from 'http';

const server = http.createServer(app);
server.listen(myNodeConfig.serverPort);

app.use(bodyParser.urlencoded({ extended: false },{limit: '5mb'}));
app.use(bodyParser.json({limit: '5mb'}));

app.use(function(req, res, next) {
  let allowedOrigins = myNodeConfig.allowedOrigins;
  let origin : string = String(req.headers.origin);
  if (allowedOrigins.indexOf(origin) > -1) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  // res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "DELETE, PUT, GET, POST");
  next();
});

app.use('/', express.static(__dirname + '/static'));


app.get('/api/getmenu', function(req, res) {
  mySqlService.getMenu((items) => {
    res.send(items);
  });
});

app.get('/api/getorders/:user', function(req, res) {
  mySqlService.getOrders(req.params.user, (items) => {
    res.send(items);
  });
});

app.get('/api/getorder/:order', function(req, res) {
  mySqlService.getOrder(req.params.order, (items) => {
    res.send(items);
  });
});

app.post('/api/saveorder', function(req, res) {
  let order = req.body.order;
  for (let i = 0; i < order.cart.length; i += 1) {
    order.cart[i].price = (order.cart[i].price/order.usdPerCurrency).toFixed(2);
    order.cart[i].price = parseFloat(order.cart[i].price);
  }
  mySqlService.saveOrder(req.body.order, (items) => {
    let qtyRowsSent = 0;
    for (let i = 0; i < order.cart.length; i += 1) {
      mySqlService.saveOrderItem(order.cart[i], items.data[0].id, (data) => {
        qtyRowsSent += 1;
        if (qtyRowsSent === order.cart.length) {
          res.send({result: true})
        }
      });
    }
  });
});

app.use('/:path', express.static(__dirname + '/static'));
