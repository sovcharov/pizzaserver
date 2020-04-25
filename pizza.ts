import * as express from 'express';
import { Application } from 'express';
import {MyNodeConfig} from '../serverconfig/mynodeconfig';
const myNodeConfig = new MyNodeConfig();
import { MySqlService } from './services/mysql.service';
const mySqlService = new MySqlService();

const app: Application = express();
import * as http from 'http';

const server = http.createServer(app);
server.listen(myNodeConfig.serverPort);

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

app.put('/api/saveorder', function(req, res) {
  mySqlService.saveOrder(req.body.order, (items) => {
    res.send(items);
  });
});

app.use('/:path', express.static(__dirname + '/static'));
