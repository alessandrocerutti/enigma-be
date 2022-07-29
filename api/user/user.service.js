const Utility = require('../../utility/utility')
const { models } = require('../../sequelize/connection')

async function getAllUsers(req, res){
    console.log("getAllUsers");

    const users = await models.user.findAll({ include: models.role });
    if(Utility.isArrayNullOrEmpty(users)){
        res.status(404).send("Users not found")
    } else{
        res.status(200).json(users);
    }

}

async function getUserById(req, res){
    console.log("get user by id");
    const user = await models.user.findByPk(req.params.id, { include: models.role });
    if (user) {
		res.status(200).json(user);
	} else {
		res.status(404).send('404 - Users not found');
	}
}

module.exports = {
    getAllUsers,
    getUserById
}