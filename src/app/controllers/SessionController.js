import jwt from 'jsonwebtoken';
import User from '../models/User';
import File from '../models/File';
import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    const { username, email, password } = req.body;

    let user;
    /**
     * Verify if the user exist by e-mail
     */
    if (email) {
      user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(401).json({ error: 'Usuário não existe!' });
      }
    }

    /**
     * Verify if the user exist by username
     */
    if (username) {
      user = await User.findOne({ where: { username } });

      if (!user) {
        return res.status(401).json({ error: 'Usuário não existe!' });
      }
    }

    /**
     * Check password
     */
    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'A senha está incorreta!' });
    }

    const { id, name, avatar_id } = user;

    /**
     * Find url of user avatar if it exist
     */
    const file = await File.findOne({ where: { id: avatar_id } });

    const url = file && file.url;

    /**
     * Return user and token
     */
    return res.json({
      user: {
        id,
        name,
        username: username || user.username,
        email: email || user.email,
        avatar: { avatar_id, url },
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
