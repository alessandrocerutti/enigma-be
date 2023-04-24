const Utility = require('../../utility/utility')
const { models } = require('../../sequelize/connection');

async function getAllCaccie(req, res){
    console.log("getAllHunts");

    const cacciaList = await models.caccia.findAll();
	
    if(Utility.isArrayNullOrEmpty(cacciaList)){
        res.status(404).send("Nessuna caccia al tesoro presente")
    } else{
        res.status(200).json(cacciaList);
    }
}


async function getCacciaById(req, res){
    console.log("getCacciaById");
   
    const caccia = await models.caccia.findByPk(req.params.id, { include: models.cacciaTemplate });
    if (caccia) {
		res.status(200).json(caccia);
	} else {
		res.status(404).send('404 - Caccia non trovata');
	}

}

async function salvaCaccia(req, res){
    console.log("salvaCaccia");

    var cacciaDaSalvare = req.body;

    var caccia = await models.caccia.create({
        "codice": cacciaDaSalvare.codice,
        "descrizione":cacciaDaSalvare.descrizione,
    })

    console.log(caccia);
    res.status(200).json(caccia);

}


module.exports = {
    getAllCaccie,
    getCacciaById,
    salvaCaccia

}