const Requests = require('../models/requests.model')
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');


exports.validRequest = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const request = await Requests.findOne({
    where: {
      id,
    }
  });

  if (!request) {
    return next(new AppError(`The request was not found 😔`, 404));
  }

  req.request = request;
  next();
});