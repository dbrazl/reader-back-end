import File from '../models/File';

class AvatarController {
  async store(req, res) {
    const {
      originalname: name,
      key,
      location: url,
      mimetype: type,
      size,
    } = req.file;

    /**
     * Verify if the file is a image
     */
    const allowedMimes = [
      'image/jpeg',
      'image/pjpeg',
      'image/png',
      'image/gif',
      'image/svg',
    ];

    if (!allowedMimes.includes(type)) {
      res.status(400).json({ error: 'Invalid file type' });
    }

    /**
     * Verify if the size of image is less or equal 5 MB
     */
    if (size >= 5 * 1024 * 1024) {
      res.status(400).json({ error: 'File is to larger' });
    }

    /**
     * Destroy previous avatar image
     */
    const previousAvatar = await File.findOne({
      where: { avatar: true, owner: req.userId },
    });

    if (previousAvatar) {
      const { path } = previousAvatar;

      await File.destroy({ where: { path } });
    }

    /**
     * Return new avatar
     */
    const path = key;
    const file = await File.create({
      name,
      path,
      url,
      type,
      owner: req.userId,
      avatar: true,
    });

    return res.json(file);
  }

  async delete(req, res) {
    const { path } = req.params;

    await File.destroy({ where: { path } });

    return res.json({ sucess: 'File has been delete' });
  }
}

export default new AvatarController();
