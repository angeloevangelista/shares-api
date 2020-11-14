import cors from 'cors';
import express from 'express';
import SharesController from './controllers/SharesController';

const server = express();
server.use(cors());
const port = process.env.PORT || 3333;

const sharesController = new SharesController();

server.listen(port, () =>
  console.log(`Server is listening at http://127.0.0.1:${port} 🚀`),
);

server.get('/shares', sharesController.show);
