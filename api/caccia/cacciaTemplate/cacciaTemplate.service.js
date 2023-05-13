const Utility = require('../../../utility/utility')
const { models } = require('../../../sequelize/connection');

async function getTemplateByCacciaId(req, res){
    console.log("getTemplateByHuntId");
}


async function saveCacciaTemplate(req, res){
    console.log("saveCacciaTemplate");

    const cacciaId = req.body.id;
    var cacciaTemplateList = req.body.cacciaTemplates;

    const caccia = await models.caccia.findByPk(cacciaId);

    if (caccia!=null && caccia.conferma){
        return res.status(304).json("Il template della caccia è già stato bloccato, impossibile modificare ulteriormente. Contattare un amministratore");
    }

    await models.cacciaTemplate.destroy({
        where:{
            caccia_id : req.body.id
        }
    });

    cacciaTemplateList.forEach(async element => {
        await models.cacciaTemplate.create({
            "codice": element.codice,
            "descrizione": element.descrizione,
            "sequenza":  element.sequenza,
            "tipologia": element.tipologia,
            "isTempoCalcolato": element.isTempoCalcolato==null?false:element.isTempoCalcolato,
            "cacciaId": cacciaId
        });
    });

    res.status(200).send();
}

module.exports = {
    getTemplateByCacciaId,
    saveCacciaTemplate
}