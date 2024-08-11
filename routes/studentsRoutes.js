const express = require ('express')
const router = express.Router()

router.get('/',(req, res) => {
    res.json({
        msg: 'Request students'
    })
})
router.post('/',(req, res) => {
    res.json({
        msg: 'Create students'
    })
})
router.put('/',(req, res) => {
    res.json({
        msg: 'Update students'
    })
})
router.delete('/',(req, res) => {
    res.json({
        msg: 'Delete students'
    })
})


module.exports = router;