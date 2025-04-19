const validator = (schema) => async (req, res, next) => {
  try {
    const parseBody = await schema.parseAsync(req.body);
    req.body = parseBody;
    next();
  } catch (err) {
    const message = err.errors[0].message;
    console.log(message);
    res.status(400).json({ msg: message });
  }
};

export default validator;
