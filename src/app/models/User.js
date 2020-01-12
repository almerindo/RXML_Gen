import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';
import Cert from './Cert';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        cnpj: Sequelize.STRING,
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Cert, { foreignKey: 'cert_id', as: 'cert' });
  }

  checkPassword(passord) {
    return bcrypt.compare(passord, this.password_hash);
  }

  static getByID(id) {
    return this.findOne({
      where: { id },
      attributes: ['id', 'cnpj', 'email'],
      include: [
        {
          model: Cert,
          as: 'cert',
          attributes: ['path'],
        },
      ],
    });
  }
}

export default User;
