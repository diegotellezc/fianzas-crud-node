const Suggestions = require('../models/suggestions.model')
const catchAsync = require('../utils/catchAsync')

exports.findSuggestions = catchAsync( async (req, res, next) => {
  const suggestions = await Suggestions.findAll()

  res.status(200).json({
    status: 'success',
    results: suggestions.length,
    suggestions,
  });
})

exports.createSuggestion = catchAsync( async (req, res, next) => {
  const { name, lastname, email, title, description } = req.body;

  const suggestion = await Suggestions.create({
    name: name.toLowerCase(),
    lastname: lastname.toLowerCase(),
    email: email.toLowerCase(),
    title,
    description
  })

  res.status(201).json({
    status: 'success',
    message: 'The suggestion was created.',
    suggestion
  });
})

exports.updateSuggestion = catchAsync( async (req, res, next) => {
  const { suggestion } = req;
  const { name, lastname, email, title, description } = req.body;

  const updatedSuggestion = await suggestion.update({ name, lastname, email, title, description });

  res.status(200).json({
    status: 'success',
    message: 'The suggestion was updated.',
    updatedSuggestion,
  });
})

exports.deleteSuggestion = catchAsync( async (req, res, next) => {
  const { suggestion } = req;

  await suggestion.destroy()

  res.status(200).json({
    status: 'success',
    message: 'The suggestion was deleted.'
  });
})