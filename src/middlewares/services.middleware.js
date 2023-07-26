const Services = require('../models/services.model')
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');


exports.validService = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const service = await Services.findOne({
    where: {
      id,
    }
  });

  if (!service) {
    return next(new AppError(`The service was not found 😔`, 404));
  }

  req.service = service;
  next();
});