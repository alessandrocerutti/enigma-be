function applyExtraSetup(sequelize) {
	const { user, role, caccia, cacciaTemplate, tipoStep, squadra, stepSquadra, punteggio} = sequelize.models;

//User and Role
role.hasMany(user);
user.belongsTo(role);

//User and Caccia

user.belongsToMany(caccia, {
	through: "t_user_caccia",
	as: "caccia",
	foreignKey: "caccia_id",
  });
  
  caccia.belongsToMany(user, {
	through: "t_user_caccia",
	as: "users",
	foreignKey: "user_id",
  });


//Caccia e CacciaTemplate
caccia.hasMany(cacciaTemplate,  {foreignKey:'cacciaId'});
cacciaTemplate.belongsTo(caccia, {foreignKey:'cacciaId'});

//Caccia e Squadra
caccia.hasMany(squadra,  {foreignKey:'cacciaId'});
squadra.belongsTo(caccia, {foreignKey:'cacciaId'});

//Squadra e StepSquadra
squadra.hasMany(stepSquadra, {foreignKey:'squadraId'})
stepSquadra.belongsTo(squadra, {foreignKey:'squadraId'})

caccia.hasMany(stepSquadra,  {foreignKey:'cacciaId'});
stepSquadra.belongsTo(caccia, {foreignKey:'cacciaId'});


//Squadra e Punteggio
squadra.hasMany(punteggio, {foreignKey:'squadraId'})
punteggio.belongsTo(squadra, {foreignKey:'squadraId'})

caccia.hasMany(punteggio,  {foreignKey:'cacciaId'});
punteggio.belongsTo(caccia, {foreignKey:'cacciaId'});

}

module.exports = { applyExtraSetup };