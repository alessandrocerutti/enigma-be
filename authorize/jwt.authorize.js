const jwt = require('jsonwebtoken');
require('dotenv/config')

function isAuthorized(req, res, next) {
    const token = req.headers['x-jwt-auth']

    var payload 
	try {
		payload = jwt.verify(token, process.env.SECRET_KEY)
	} catch (e) {
        console.log(e)
		if (e instanceof jwt.JsonWebTokenError) {
			return res.status(401).end()
		}
		return res.status(400).end()
	}
	console.log("jwt.isAuthorized: OK")
    next(payload)
}


function getToken (user){
	return jwt.sign(
		{user:user.id, role:user.role.codice},
		process.env.SECRET_KEY,
		{
			algorithm: "HS256",
			//expiresIn: 
		})   
}


module.exports = {
	isAuthorized,
	getToken
} 