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

async function createUser(req, res){
    console.log("create User");

    var user = req.body;

    user = await models.user.create({
        "username": user.username,
        "password":user.password,
        "role_id":user.role_id
    })

    console.log(user);
    res.status(200).json(user);

}

async function deleteUser(req, res){
    console.log("delete User");

    user = await models.user.destroy({where:{ "id":req.params.id}})

    console.log(user);
    res.status(200).json(user);
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    deleteUser
}