const express = require('express');
const router = express.Router();

const course = require('../controllers/course')

router.get('/', course.index);
router.get('/paginate', course.coursePaginate);
router.post('/', course.create);
router.get('/trash', course.trash);
router.get('/:id', course.show);
router.put('/:id', course.update);
router.patch('/:id', course.restore);
router.delete('/:id', course.destroy);

module.exports = router;