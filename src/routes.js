import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import authMiddleware from './app/middlewares/auth';
import UserController from './app/controllers/UserController';

const routes = new Router();

routes.post('/sessions', SessionController.store);

// Este middleare global só funciona para as rotas que estiverem a baixo dele.
routes.use(authMiddleware);

routes.post('/users', UserController.store);
routes.put('/users', UserController.update);

// routes.get('/', async (req, res) => {
//   // const cert = await Cert.create({
//   //   path: './uploadedCert/93124015568.cert',
//   // });

//   // const user = await User.create({
//   //   cnpj: '93124015568',
//   //   name: 'Almerindo Rehem',
//   //   email: 'almerindo.rehem22@gmail.com',
//   //   password: '012345678',
//   //   cert_id: 1,
//   // });

//   const user = await User.getByID(2);

//   return res.json({ user });
// });

export default routes;
