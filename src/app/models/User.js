import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
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

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }

  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'avatar_id' });
  }

  generateNewRandomPassword(size) {
    const characters = [
      'a',
      'b',
      'c',
      'd',
      'e',
      'f',
      'g',
      'h',
      'i',
      'j',
      'k',
      'l',
      'm',
      'n',
      'o',
      'p',
      'q',
      'r',
      's',
      't',
      'u',
      'v',
      'w',
      'x',
      'y',
      'z',
      '!',
      '@',
      '#',
      '$',
      '%',
      '^',
      '&',
      '*',
      '(',
      ')',
      '-',
      '=',
      '+',
      '/',
      '?',
      '>',
      '<',
      ',',
      '.',
      '`',
      '~',
    ];

    const passwordSize = size / 2;

    const randomNumber = Math.random();

    const string = String(randomNumber);

    const [, number] = string.split('.');

    // eslint-disable-next-line no-var
    var password = '';

    for (let i = 0; i < passwordSize; i += 1) {
      password += number[i] + characters[number[i]];
    }

    return String(password);
  }
}

export default User;
