const express = require('express');
const CourseController = require('../controllers/CourseController');
const courseValidation = require('../validations/courseValidation');

const router = express();

router.post('/', courseValidation, CourseController.create);
router.get('/', CourseController.getAll);
router.get('/:id', CourseController.getOneById);
router.put('/:id', courseValidation, CourseController.update);
router.delete('/:id', CourseController.delete);

module.exports = router;
