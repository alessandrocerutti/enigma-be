const Utility = require('../../../utility/utility')
const { models } = require('../../../sequelize/connection');

async function getTemplateByCacciaId(req, res){
    console.log("getTemplateByHuntId");
}


async function saveCacciaTemplate(req, res){
    console.log("saveCacciaTemplate");

    const cacciaId = req.body.id;
    var cacciaTemplateList = req.body.cacciaTemplates;

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

    res.status(200).json("ok");

}

module.exports = {
    getTemplateByCacciaId,
    saveCacciaTemplate
}