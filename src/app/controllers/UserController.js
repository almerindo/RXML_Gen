import * as Yup from 'yup';
import User from '../models/User';
import Cert from '../models/Cert';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      cnpj: Yup.string().required(),
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    const userlogged = await User.findByPk(req.userID);
    if (userlogged.email !== process.env.MAIL_ADMIN) {
      return res.status(400).json({
        error: `Only Administrator can create users ${userlogged.email}`,
      });
    }

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    // Verifica se o CNPJ já existe
    const cnpjExists = await User.findOne({ where: { cnpj: req.body.cnpj } });
    if (cnpjExists) {
      return res
        .status(401)
        .json({ error: `CNPJ  ${req.body.cnpj} already exists.` });
    }

    // Verifica se o email já existe
    const mailExists = await User.findOne({ where: { email: req.body.email } });
    if (mailExists) {
      return res
        .status(401)
        .json({ error: `Mail user ${req.body.email} already exists.` });
    }

    try {
      const { id, cnpj, name, email } = await User.create(req.body);
      return res.json({ id, cnpj, name, email });
    } catch (err) {
      // return res.json(err);
      return res.status(401).json({ error: 'User was not stored' });
    }
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      certID: Yup.number(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { email, oldPassword, certID } = req.body;

    const user = await User.findByPk(req.userID);

    if (email !== user.email) {
      const userExists = await User.findOne({ where: { email } });

      if (userExists) {
        return res.status(400).json({ error: 'user already exists.' });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match.' });
    }

    if (certID) {
      const certExists = await Cert.findByPk(certID);
      if (!certExists) {
        return res
          .status(400)
          .json({ error: `Certificate id ${certID} was not found.` });
      }
    }

    try {
      const { id, name, cnpj, cert_id } = await user.update(req.body);
      //= await User.getByID(req.userID);
      return res.json({ id, name, cnpj, email, cert_id });
    } catch (err) {
      // return res.json(err);
      return res.status(401).json({ error: 'User was not updated' });
    }
  }
}
export default new UserController();
