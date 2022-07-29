const Utility = require('../../utility/utility')
const { models } = require('../../sequelize/connection');

async function getAllRoles(req, res){
    console.log("getAllRoles");

    const roles = await models.role.findAll();
	
    if(Utility.isArrayNullOrEmpty(roles)){
        res.status(404).send("Roles not found")
    } else{
        res.status(200).json(roles);
    }
}

async function getRoleById(req, res){
    console.log("get role by id");
    const role = await models.role.findByPk(req.params.id);
    if (role) {
		res.status(200).json(role);
	} else {
		res.status(404).send('404 - Not found');
	}
}

module.exports = {
    getAllRoles,
    getRoleById
}