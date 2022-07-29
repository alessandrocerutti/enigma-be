const { models } = require('../../sequelize/connection');
const Utility = require('../../utility/utility')
require('dotenv/config')
const jwt = require('jsonwebtoken');

async function login(req, res){
    console.log("login" + JSON.stringify(req.headers))

    var {username, password} = req.body; 

    const user = await models.user.findOne({
        include: [models.role],
        where: {
            username: username,
            password: password
          }
        })
    console.log(JSON.stringify(user))
    if(user){
        const token = jwt.sign(
            {user:user.id, role:user.role.code},
            process.env.SECRET_KEY, //TODO da cambiare e mettere in env
            {
                algorithm: "HS256",
                //expiresIn: 
            })    
        res.json({token})
    } else {
        return res.status(403).json("Accesso negato")      
    }

}

module.exports = {
    login
}