const Utility = require('../../utility/utility')
const { models } = require('../../sequelize/connection');

async function getTemplateByHuntId(req, res){
    console.log("getTemplateByHuntId");
}


async function createHuntTemplate(req, res){
    console.log("createHuntTemplate");
    
    const hunts = await models.huntTemplate.findAll();

}



module.exports = {
    getTemplateByHuntId,
    createHuntTemplate
}