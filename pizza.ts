import * as express from 'express';
import { Application } from 'express';
import {MyNodeConfig} from '../serverconfig/mynodeconfig';
const myNodeConfig = new MyNodeConfig();

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

app.get('/api/getmenu', function(req, res) {
  console.log("api works");
});
