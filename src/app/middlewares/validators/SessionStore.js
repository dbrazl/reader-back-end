import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    /**
     * Schema validation
     */
    const schema = Yup.object().shape({
      username: Yup.string(),
      email: Yup.string().email('Entre com um e-mail válido!'),
      password: Yup.string().required('Informe a senha!'),
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
