const Constants = require('../utility/constants')

module.exports.isAuthorized = function(payload, req, res, next) {
    if(payload && Constants.role.superadmin!=payload.role){
        return res.status(401).end();
    }
    next()
}
