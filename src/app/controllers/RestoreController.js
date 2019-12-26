import User from '../models/User';
import Mail from '../../lib/Mail';

class RestoreController {
  async update(req, res) {
    const { username, email } = req.body;

    let user;
    /**
     * Verify if the user exist on DB by username
     */
    if (username) {
      user = await User.findOne({ where: { username } });
      if (!user) {
        return res.status(400).json({ error: 'Usuario não existe!' });
      }
    }

    /**
     * Verify if the user exist on DB by email
     */
    if (email) {
      user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(400).json({ error: 'Usuario não existe!' });
      }
    }

    /**
     * Generate a new random password
     */
    const random = user.generateNewRandomPassword(10);

    /**
     * Update user in DB
     */
    await user.update({
      password: random,
    });

    /**
     * Send e-mail if new password to the user
     */
    await Mail.sendMail({
      to: `${user.name} <${user.email}>`,
      subject: 'Senha redefinida',
      text: `A sua nova senha é ${random}`,
    });

    return res.json({ sucess: 'A nova senha foi enviada!' });
  }
}

export default new RestoreController();
