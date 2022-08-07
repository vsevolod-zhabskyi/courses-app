const express = require('express');

const AuthorController = require('../controllers/AuthorController');
const authorValidation = require('../validations/authorValidation');

const router = express();

router.post('/', authorValidation, AuthorController.create);
router.get('/', AuthorController.getAll);
router.get('/:id', AuthorController.getOneById);
router.put('/:id', authorValidation, AuthorController.update);
router.delete('/:id', AuthorController.delete);

module.exports = router;
