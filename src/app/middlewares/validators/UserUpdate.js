import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    /**
     * Schema validation
     */
    const schema = Yup.object().shape({
      name: Yup.string(),
      username: Yup.string(),
      email: Yup.string().email('Entre com um e-mail válido!'),
      oldPassword: Yup.string().min(
        6,
        'A senha antiga deve ter pelo menos 6 caracteres!'
      ),
      password: Yup.string()
        .min(6, 'A senha deve ter pelo menos 6 caracteres!')
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required('Informe a nova senha!') : field
        ),
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
