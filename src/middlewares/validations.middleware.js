const { body, validationResult } = require('express-validator');

const validFields = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      errors: errors.mapped(),
    });
  }

  next();
};

exports.createServiceValidation = [
  body('name').notEmpty().withMessage('Name cannot be empty.'),
  body('lastname').notEmpty().withMessage('Lastname cannot be empty.'),
  body('email')
    .notEmpty()
    .withMessage('Email cannot be empty.')
    .isEmail()
    .withMessage('Must be a valid email.'),
  body('title').notEmpty().withMessage('Title cannot be empty.'),
  body('description').notEmpty().withMessage('Description cannot be empty.'),
  validFields,
];




