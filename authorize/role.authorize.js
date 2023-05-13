const Constants = require('../utility/constants')

function isSuperAdmin(payload, req, res, next) {
    if(!payload){
        return res.status(400).end();
    }
    if(payload && Constants.role.superadmin!=payload.role){
        return res.status(401).end();
    }
    console.log("isSuperAdmin: OK")
    next()
}

function isAdmin(payload, req, res, next) {
    if(!payload){
        return res.status(400).end();
    }
    if(payload && (Constants.role.superadmin==payload.role || Constants.role.admin==payload.role)){
        console.log("isAdmin: OK")
        next()
    }else{
        return res.status(401).end();
    }
}

function isUser(payload, req, res, next) {
    if(!payload){
        return res.status(400).end();
    }
    if(payload && (Constants.role.superadmin==payload.role || Constants.role.admin==payload.role || Constants.role.user==payload.role)){
        console.log("isUser: OK")
        next()
    }else{
        return res.status(401).end();
    }
}

module.exports = {
    isSuperAdmin,
    isAdmin,
    isUser
}