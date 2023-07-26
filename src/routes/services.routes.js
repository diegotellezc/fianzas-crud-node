const servicesController = require('../controllers/services.controller');

// middlewares
const validationsMiddleware = require('../middlewares/validations.middleware');
const servicesMiddleware = require('../middlewares/services.middleware');

const { Router } = require('express');
const router = Router();

router
  .route('/')
  .get(servicesController.findServices)
  .post(
    validationsMiddleware.createServiceValidation,
    servicesController.createService
  );


router.use('/:id', servicesMiddleware.validService);

router
  .route('/:id')
  .patch(
    servicesController.updateService
  )
  .delete(
    servicesController.deleteService
  );

module.exports = router;
