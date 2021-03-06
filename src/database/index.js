import Sequelize from 'sequelize';
// import mongoose from 'mongoose';

import User from '../app/models/User';
import Cert from '../app/models/Cert';
import Invoice from '../app/models/Invoice';

import databaseConfig from '../config/database';

const models = [User, Cert, Invoice];

class Datababase {
  constructor() {
    this.init();
    // this.mongo();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }

  mongo() {
    // this.mongoConnection = mongoose.connect(process.env.MONGO_URL, {
    //   useNewUrlParser: true,
    //   useFindAndModify: true,
    //   useUnifiedTopology: true,
    // });
  }
}

export default new Datababase();
