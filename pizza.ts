import * as express from 'express';
import { Application } from 'express';

const app: Application = express();
import * as http from 'http';

const server = http.createServer(app);
server.listen(3339);
