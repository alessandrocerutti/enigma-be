const { models } = require('../../sequelize/connection');
const Utility = require('../../utility/utility')
require('dotenv/config')
const jwt = require('jsonwebtoken');

const jwtAuth = require('../../authorize/jwt.authorize')

async function login(req, res){
    console.log("login" + JSON.stringify(req.headers))

    var {username, password} = req.body; 

    const user = await models.user.findOne({
        include: [
            { model: models.role, attribute: ['id','codice']},
            {model: models.caccia, as:'caccia',
            through: { attributes: [] }, // Exclude the join table fields
            attributes: ['id', 'codice','descrizione']}],
        where: {
            username: username,
            password: password
          }
        })

    console.log("user" + JSON.stringify(user));

   
    if(user){
        const token = jwtAuth.getToken(user);

        const cacciaList = user.caccia;
        
        res.json({token, cacciaList})
    } else {
        return res.status(403).json("Accesso negato")      
    }
}

module.exports = {
    login
}