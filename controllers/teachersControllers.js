class TeachersController{
    constructor() {

    }
    consult(req, res) {
        res.json({msg: 'Consult teachers from class'})
    }

    consultDetails(req, res) {
        res.json({msg: 'Consult details teachers from class'})
    }

    create(req, res) {
        res.json({msg: 'Create one teachers from class'})
    }

    update(req, res){
        res.json({msg: 'Update teachers from class'})
    }

    delete(req, res){
        res.json({msg: 'Update teachers from class'})
    }

}


module.exports = new TeachersController;