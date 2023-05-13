const express = require('express')
const app = express()
require('dotenv/config')
const sequelize = require('./sequelize/connection')
const jwtAuth = require('./authorize/jwt.authorize')
const roleAuth = require('./authorize/role.authorize')
app.use(express.json())

//Import Routes
//is server up
const serverHealthRoute = require('./api/serverHealthRoute')
app.use('/rest', serverHealthRoute)
//auth
const authRoute = require('./api/auth/auth.route')
app.use('/rest/auth', authRoute)
//user
const userRoute = require('./api/user/user.route')
app.use('/rest/user',jwtAuth.isAuthorized, roleAuth.isSuperAdmin, userRoute)
//role
const roleRoute = require('./api/role/role.route')
app.use('/rest/ruolo', jwtAuth.isAuthorized,roleAuth.isSuperAdmin, roleRoute)

const cacciaRoute = require('./api/caccia/caccia.route')
app.use('/rest/caccia', jwtAuth.isAuthorized,roleAuth.isSuperAdmin, cacciaRoute)

const cacciaTemplateRoute = require('./api/caccia/cacciaTemplate/cacciaTemplate.route')
app.use('/rest/caccia/template', jwtAuth.isAuthorized,roleAuth.isAdmin, cacciaTemplateRoute)

const squadraRoute = require('./api/squadra/squadra.route')
app.use('/rest/squadra', jwtAuth.isAuthorized,roleAuth.isAdmin, squadraRoute)

sequelize.sync({force: true});

//start listening
app.listen(3000)
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });