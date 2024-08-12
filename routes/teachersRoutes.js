const express = require ('express')
const router = express.Router()
const teacherController = require ('../controllers/teachersControllers.js')

router.get('/', teacherController.consult)
router.post('/', teacherController.create)


router.route('/:id')
    .get(teacherController.consultDetails)
    .put(teacherController.update)
    .delete(teacherController.delete)


module.exports = router;