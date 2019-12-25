import User from '../models/User';
import Mail from '../../lib/Mail';

class RestoreController {
  async update(req, res) {
    const { email } = req.body;

    /**
     * Verify if the user exist on DB
     */
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: 'User does not exist' });
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
      to: `${user.name} <${email}>`,
      subject: 'Senha redefinida',
      text: `A sua nova senha é ${random}`,
    });

    return res.json({ sucess: 'Password has been send' });
  }
}

export default new RestoreController();
