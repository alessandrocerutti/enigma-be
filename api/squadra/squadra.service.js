const Utility = require('../../utility/utility')
const { models } = require('../../sequelize/connection');

async function getSquadraByIdCaccia(req, res){
    console.log("getSquadraByIdCaccia");
    const squadraList = await models.squadra.findAll(
        {
            where: {
                "caccia_id": req.params.idCaccia
              }
        });
	
    if(Utility.isArrayNullOrEmpty(squadraList)){
        res.status(404).send("Squadre non disponibili")
    } else{
        res.status(200).json({squadraList});
    }
}

async function saveSquadra(req, res){
    console.log("getSquadraById");
    
    var squadraDaSalvare = req.body;
    var idCaccia = req.params.idCaccia;

    var squadra = await models.squadra.create({
        "codice": squadraDaSalvare.codice,
        "descrizione":squadraDaSalvare.descrizione,
        "cacciaId": idCaccia
    })

    console.log(squadra);
    res.status(200).json(squadra);
}

module.exports = {
    getSquadraByIdCaccia,
    saveSquadra
}