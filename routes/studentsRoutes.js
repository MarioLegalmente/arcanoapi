const express = require ('express')
const router = express.Router()
const studentController = require ('../controllers/studentsControllers.js')

router.get('/', studentController.consult)
router.post('/', studentController.create)


router.route('/:id')
    .get(studentController.consultDetails)
    .put(studentController.update)
    .delete(studentController.delete)


module.exports = router;