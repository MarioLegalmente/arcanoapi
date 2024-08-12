class StudentsController{
    constructor() {

    }

    consult(req, res) {
        res.json({msg: 'Consult students from class'})
    }

    consultDetails(req, res) {
        const {id} = req.params
        res.json({msg: `Consult details students from class with ${id}`})
    }

    create(req, res) {
        res.json({msg: 'Create one students from class'})
    }

    update(req, res){
        res.json({msg: 'Update students from class'})
    }

    delete(req, res){
        res.json({msg: 'Update students from class'})
    }

}


module.exports = new StudentsController;