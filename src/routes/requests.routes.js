const requestsController = require('../controllers/requests.controller')

// middlewares
const validationsMiddleware = require('../middlewares/validations.middleware');
const requestsMiddleware = require('../middlewares/requests.middleware');

const { Router } = require('express');
const router = Router();

router
  .route('/')
  .get(requestsController.findRequests)
  .post(
    validationsMiddleware.validationToCreate,
    requestsController.createRequest
  );

router.use('/:id', requestsMiddleware.validRequest);

router
  .route('/:id')
  .patch(
    requestsController.updateRequest
  )
  .delete(
    requestsController.deleteRequest
  );


module.exports = router;
