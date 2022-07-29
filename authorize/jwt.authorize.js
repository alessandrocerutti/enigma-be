const jwt = require('jsonwebtoken');
require('dotenv/config')

module.exports.isAuthorized = function(req, res, next) {
    const token = req.headers['x-jwt-auth']

    console.log("isAuthorized")

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
    next(payload)
}
