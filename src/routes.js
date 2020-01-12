import { Router } from 'express';

import User from './app/models/User';

const routes = new Router();

routes.get('/', async (req, res) => {
  // const cert = await Cert.create({
  //   path: './uploadedCert/93124015568.cert',
  // });

  // const user = await User.create({
  //   cnpj: '93124015568',
  //   name: 'Almerindo Rehem',
  //   email: 'almerindo.rehem22@gmail.com',
  //   password: '012345678',
  //   cert_id: 1,
  // });

  const user = await User.getByID(2);

  return res.json({ user });
});

export default routes;
