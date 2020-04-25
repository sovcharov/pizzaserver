import * as express from 'express';
import { Application } from 'express';
import {MyNodeConfig} from '../serverconfig/mynodeconfig';
const myNodeConfig = new MyNodeConfig();

const app: Application = express();
import * as http from 'http';

const server = http.createServer(app);
server.listen(myNodeConfig.serverPort);
