const Utility = require('../../utility/utility')
const { models } = require('../../sequelize/connection');

async function savePunteggio(req, res){
    console.log("savePunteggio");
    
    var punteggioDaSalvare = req.body;
    var idCaccia = req.params.idCaccia;

    var squadra = await models.punteggio.create({
    "descrizione": punteggioDaSalvare.descrizione,
    "cacciaId": punteggioDaSalvare.cacciaId,
    "punteggio": punteggioDaSalvare.punteggio,
    "tsInserimento": new Date(),
    "squadraId": punteggioDaSalvare.squadraId,
    "tipologia": punteggioDaSalvare.tipologia
    })

    console.log(squadra);
    res.status(200).json(squadra);
}
module.exports = {
    savePunteggio
}
