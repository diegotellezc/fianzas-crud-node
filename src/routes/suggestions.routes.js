const suggestionsController = require('../controllers/suggestions.controller');

// middlewares
const validationsMiddleware = require('../middlewares/validations.middleware');
const suggestionsMiddleware = require('../middlewares/suggestions.middleware');

const { Router } = require('express');
const router = Router();

router
  .route('/')
  .get(suggestionsController.findSuggestions)
  .post(
    validationsMiddleware.validationToCreate,
    suggestionsController.createSuggestion
  );

router.use('/:id', suggestionsMiddleware.validSuggestion);

router
  .route('/:id')
  .patch(
    suggestionsController.updateSuggestion
  )
  .delete(
    suggestionsController.deleteSuggestion
  );


module.exports = router;
