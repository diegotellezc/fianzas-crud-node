const Services = require('../models/services.model')
const catchAsync = require("../utils/catchAsync")

exports.findServices = catchAsync(async (req, res, next) => {
  const services = await Services.findAll()

  res.status(200).json({
    status: 'success',
    results: services.length,
    services,
  });
})

exports.createService = catchAsync(async (req, res, next) => {
  const { name, lastname, email, title, description } = req.body;

  const service = await Services.create({
    name: name.toLowerCase(),
    lastname: lastname.toLowerCase(),
    email: email.toLowerCase(),
    title,
    description
  })

  res.status(201).json({
    status: 'success',
    message: 'The service was created.',
    service
  });
})

exports.updateService = catchAsync(async (req, res, next) => {
  const { service } = req;
  const { name, lastname, email, title, description } = req.body;

  const updatedService = await service.update({ name, lastname, email, title, description });

  res.status(200).json({
    status: 'success',
    message: 'The service was updated.',
    updatedService,
  });
})

exports.deleteService = catchAsync(async (req, res, next) => {
  const { service } = req;

  await service.destroy()

  res.status(200).json({
    status: 'success',
    message: 'The service was deleted.'
  });
})