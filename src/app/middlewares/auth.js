import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  /**
   * Verify if the token is provide
   */
  if (!authHeader) {
    return res.status(401).json({ error: 'Token is not provide.' });
  }

  const [, token] = authHeader.split(' ');

  /**
   * Verify if the token is valid
   */
  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    req.userId = decoded.id;

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token invalid.' });
  }
};
