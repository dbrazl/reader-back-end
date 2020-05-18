import Sequelize, { Model } from 'sequelize';

class Page extends Model {
  static init(sequelize) {
    super.init(
      {
        publicationId: Sequelize.NUMBER,
        number: Sequelize.NUMBER,
        htmlUrl: Sequelize.STRING,
        cssUrl: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Page;
