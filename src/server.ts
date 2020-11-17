import cors from 'cors';
import express from 'express';
import 'express-async-errors';

import routes from './routes';
import errorHandler from './handlers/ErrorHandler';

const port = process.env.PORT || 3333;
const server = express();

server.use(cors());
server.use(routes);
server.use(errorHandler);

server.listen(port, () =>
  console.log(`Server is listening at http://127.0.0.1:${port} 🚀`),
);
