import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    /**
     * Schema validation
     */
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      avatar_id: Yup.number(),
    });

    /**
     * Verify if request is valid with our schema
     */
    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res
      .status(400)
      .json({ error: 'Dados enviados são inválidos.', messages: err.inner });
  }
};
