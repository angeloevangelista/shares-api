import { Router } from 'express';

import SharesController from '../controllers/SharesController';

const routes = Router();
const sharesController = new SharesController();

routes.get('/shares', sharesController.show);

export default routes;
