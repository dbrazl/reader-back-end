import Sequelize, { Model } from 'sequelize';

import aws from 'aws-sdk';
import fs from 'fs';
import { resolve } from 'path';
import { promisify } from 'util';

class File extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING,
        url: Sequelize.STRING,
        avatar: Sequelize.BOOLEAN,
        type: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', async file => {
      if (!file.url) {
        file.url = `${process.env.APP_URL}/file/${file.path}`;
      }
    });

    const s3 = new aws.S3();

    this.addHook('beforeBulkDestroy', async file => {
      if (process.env.STORAGE_TYPE === 's3') {
        s3.deleteObject({
          Bucket: process.env.BUCKET,
          Key: file.where.path,
        }).promise();
      }

      promisify(fs.unlink)(
        resolve(__dirname, '..', '..', '..', 'tmp', 'uploads', file.where.path)
      );
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'owner' });
  }
}

export default File;
