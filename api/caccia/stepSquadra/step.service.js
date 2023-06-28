const Utility = require('../../../utility/utility')
const { models } = require('../../../sequelize/connection');
const { Sequelize } = require('sequelize');

async function getStepByIdSquadra(req, res){
    console.log("getStepByIdSquadra");

    var idSquadra = req.params.idSquadra;

    const cacciaList = await models.stepSquadra.findAll();
	
    if(Utility.isArrayNullOrEmpty(cacciaList)){
        res.status(404).send("La squadra non ha step")
    } else{
        res.status(200).json(cacciaList);
    }
}

async function setTimestampAndGetNextStep(req, res){


    var {idSquadra, qrcode} = req.body;

    console.log("getStepByIdSquadra, idSquadra: "+idSquadra);
    console.log("getStepByIdSquadra, qrcode: "+qrcode);

    await models.stepSquadra.findOne(
        {
            where: {
                "squadra_id":idSquadra,
                "codice": qrcode
              }
        }
    ).then(async function(entity){

        console.log("getStepByIdSquadra, step: "+JSON.stringify(entity));
        if(entity === null) {
            console.log('Not found!');
            return res.status(404).json();
        } else{

            console.log("getStepByIdSquadra, squadra_id: "+ entity.squadraId);

            if(entity.squadraId !== idSquadra){
                return res.status(400).json("La squadra non coincide con il qrcode");
            }

            await  models.stepSquadra.findOne(
                {
                    where: {
                        "squadra_id":idSquadra,
                        tsInizio: {
                              [Op.ne]: null
                            }                       
                      },
                      order: [['sequenza', 'ASC']]
                }
            ).then(async function(entity){

                console.log("getStepByIdSquadra, step corretto: "+JSON.stringify(entity));
                //Concludo lo step

                tsFine = new Date();

                
                


            })

            return res.status(200).json();
        }

    })



}


module.exports = {
    getStepByIdSquadra,
    setTimestampAndGetNextStep
}