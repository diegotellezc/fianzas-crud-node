const Requests = require('../models/requests.model')
const catchAsync = require('../utils/catchAsync')


exports.findRequests = catchAsync(async(req, res, next) => {
  const requests = await Requests.findAll()

  res.status(200).json({
    status: 'success',
    results: requests.length,
    requests,
  });
})

exports.createRequest = catchAsync(async(req, res, next) => {
  const { name, lastname, email, title, description } = req.body;

  const request = await Requests.create({
    name: name.toLowerCase(),
    lastname: lastname.toLowerCase(),
    email: email.toLowerCase(),
    title,
    description
  })

  res.status(201).json({
    status: 'success',
    message: 'The request was created.',
    request
  });
})

exports.updateRequest = catchAsync(async(req, res, next) => {
  const { request } = req;
  const { name, lastname, email, title, description } = req.body;

  const updatedRequest = await request.update({ name, lastname, email, title, description });

  res.status(200).json({
    status: 'success',
    message: 'The request was updated.',
    updatedRequest,
  });
})

exports.deleteRequest = catchAsync(async(req, res, next) => {
  const { request } = req;

  await request.destroy()

  res.status(200).json({
    status: 'success',
    message: 'The request was deleted.'
  });
})