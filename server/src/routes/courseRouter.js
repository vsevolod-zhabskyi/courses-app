const express = require('express');
const CourseController = require('../controllers/CourseController');
const courseValidation = require('../validations/courseValidation');
const authMiddleware = require('../middleware/authMiddleware');

const router = express();

router.post('/', authMiddleware, courseValidation, CourseController.create);
router.get('/', CourseController.getAll);
router.get('/:id', CourseController.getOneById);
router.put('/:id', authMiddleware, courseValidation, CourseController.update);
router.delete('/:id', authMiddleware, CourseController.delete);

module.exports = router;
