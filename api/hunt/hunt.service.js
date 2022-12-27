const Utility = require('../../utility/utility')
const { models } = require('../../sequelize/connection');

async function getAllHunts(req, res){
    console.log("getAllHunts");

    const hunts = await models.hunt.findAll();
	
    if(Utility.isArrayNullOrEmpty(hunts)){
        res.status(404).send("Hunts not found")
    } else{
        res.status(200).json(hunts);
    }
}

async function createHunt(req, res){
    console.log("createHunt");

    var hunt = req.body;

    user = await models.hunt.create({
        "code": hunt.code,
        "description":hunt.description,
        "user_id":hunt.user_id
    })

    console.log(user);
    res.status(200).json(user);

}


module.exports = {
    getAllHunts,
    createHunt
}