const Suggestions = require('../models/suggestions.model')
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');


exports.validSuggestion = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const suggestion = await Suggestions.findOne({
    where: {
      id,
    }
  });

  if (!suggestion) {
    return next(new AppError(`The suggestion was not found 😔`, 404));
  }

  req.suggestion = suggestion;
  next();
});