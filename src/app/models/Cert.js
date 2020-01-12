import Sequelize, { Model } from 'sequelize';

class Cert extends Model {
  static init(sequelize) {
    super.init(
      {
        path: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Cert;
