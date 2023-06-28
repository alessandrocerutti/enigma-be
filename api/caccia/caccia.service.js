const Utility = require('../../utility/utility')
const { models } = require('../../sequelize/connection');

const PDFDocument = require('pdfkit');
const fs = require('fs');
const qr = require('qr-image');

const UUID = require('uuid');

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

    ).then( async function(entity){

        var squadraList = await models.squadra.findAll(
            {
                where: {
                    "cacciaId": idCaccia
                  }
            });


        var templateList = await models.cacciaTemplate.findAll({
                where:{
                    "cacciaId" : idCaccia
                }
                });

        console.log("squadraList: " + squadraList);

        console.log("templateList: " + templateList);


        await squadraList.forEach(async squadra => {
            templateList.forEach(async template =>{

                await models.stepSquadra.create({
                    "codice": UUID.v4(),
                    "descrizione": template.descrizione,
                    "sequenza":  template.sequenza,
                    "tipologia": template.tipologia,
                    "isTempoCalcolato": template.isTempoCalcolato==null?false:template.isTempoCalcolato,
                    "cacciaId": idCaccia,
                    "squadraId":squadra.id
                });

            })

        })

        return res.status(200).send();
        
    });
   
}


async function startCaccia(req, res){
    console.log("startCaccia");

    const cacciaId = req.params.id;

    const tsInizio = new Date();
    //prendo gli step con il numero più basso per tutte le squadre e setto tsPartenza

    //TODO per ora prendo quelli con sequenza 1


    await models.stepSquadra.update(
        {"tsInizio": tsInizio},
        {
        where:{
            "sequenza":1,
            "cacciaId": cacciaId
        }
        
    }).then(function(){
        return res.status(200).json();
    });

}


async function getPdfStepByCacciaId(req, res){
    console.log("getPdfStepByCacciaId");

    var idCaccia = req.params.id;

    try {
    // Esegui una query per ottenere il valore dalla tabella
    const recordList = await models.stepSquadra.findAll(
        {
            where:{
                "cacciaId" : idCaccia
            }
            }
    )

    if (Utility.isArrayNullOrEmpty(recordList)) {
      return res.status(404).json({ error: 'Record non trovato' });
    }

    
    // Crea un nuovo documento PDF
    const doc = new PDFDocument();

    await recordList.forEach(async record => {
        const readableValue = record.codice; // Sostituisci 'value' con il nome del campo che contiene il valore leggibile
        console.log("getPdfStepByCacciaId - readableValue: " + readableValue);

        const qrCodePath = '.tmp/'+readableValue + '_tmp.png'; // Specifica il percorso e il nome del file temporaneo per l'immagine QRCode
        
        const qrCodeImage =  qr.imageSync(readableValue, { type: 'png' });
        fs.writeFileSync(qrCodePath, qrCodeImage);
    
        // Aggiungi il QR code al documento PDF
        doc.image(qrCodeImage, { width: 100, height: 100 });
    
        // Aggiungi il valore leggibile al documento PDF
        doc.text(readableValue);
        
        fs.unlinkSync(qrCodePath);
    });

    // Invia il documento PDF come risposta
    res.setHeader('Content-Disposition', 'attachment; filename="qrcode_enigma.pdf"');
    res.setHeader('Content-Type', 'application/pdf');
    doc.pipe(res);
    doc.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Si è verificato un errore durante la generazione del PDF' });
  }



}

    module.exports = {
        getAllCaccie,
        getCacciaById,
        salvaCaccia,
        confermaTemplate,
        getPdfStepByCacciaId,
        startCaccia
    }