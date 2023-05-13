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

    var idCaccia = req.body.id;
    var cacciaDaSalvare =
    {
        "id": idCaccia,
        "codice": req.body.codice,
        "descrizione": req.body.descrizione,
    };

    models.caccia.upsert(cacciaDaSalvare, idCaccia).then(function([instance, created]){
        idCaccia = instance.id;
        
        res.status(200).json(instance);
        
        });
    }


async function confermaTemplate(req, res){
    console.log("confermaTemplate");

    var idCaccia = req.params.id;

    await models.caccia.update(
        { conferma : true },
        { where : { id : idCaccia }}

    ).then( function(entity){

        return res.status(200).json("OK");
    });
    
    return res.status(400).json("OK");
   
}

    module.exports = {
        getAllCaccie,
        getCacciaById,
        salvaCaccia,
        confermaTemplate
    }