const Utility = require('../../../utility/utility')
const { models } = require('../../../sequelize/connection');
const { Sequelize, where } = require('sequelize');

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
    console.log("setTimestampAndGetNextStep");

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

            await models.stepSquadra.findOne(
                {
                    where: {
                        "squadra_id":idSquadra,
                        tsInizio: {
                              [Sequelize.Op.ne]: null
                            },
                            tsFine: {
                                [Sequelize.Op.eq]: null
                              }                      
                      },
                      order: [['sequenza', 'ASC']]
                }
            ).then(async function(entity){

                console.log("getStepByIdSquadra, step corretto: " + entity.codice);
                //Concludo lo step
                console.log("getStepByIdSquadra, qrcode bippato " + qrcode);

                if(entity.codice !== qrcode){
                    return res.status(400).json("Step errato, quello corretto è :" + entity.codice + " , con codice "+ entity.codice);
                }

                tsFine = new Date();

                await models.stepSquadra.update(
                    { tsFine : tsFine },
                    { where :
                    {
                        "codice": qrcode
                    }}           
                ).then(async function(entity){
                    console.log("getStepByIdSquadra,update fatto " + entity);

                    await models.stepSquadra.findOne(
                        {
                            where: {
                                "squadra_id":idSquadra,
                                tsInizio: {
                                    [Sequelize.Op.eq]: null
                                  }        
                              },
                              order: [['sequenza', 'ASC']]
                        }
                    ).then(async function(entity){
                        console.log("getStepByIdSquadra, next step " + JSON.stringify(entity));
                        if(entity){
                            await models.stepSquadra.update(
                                { tsInizio : new Date() },
                                { where :
                                {
                                    "codice": entity.codice
                                },
                                returning: true
                            },        
                            ).then(([rowsUpdated, [updatedEntity]]) => {
                                console.log('Updated entity:', updatedEntity.toJSON());
                                return res.status(200).json(updatedEntity.toJSON());
                              })
                        }
                    })
                })
            })
        }

    })
}

//TODO get next step!


module.exports = {
    getStepByIdSquadra,
    setTimestampAndGetNextStep
}