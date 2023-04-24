function applyExtraSetup(sequelize) {
	const { user, role, caccia, cacciaTemplate, tipoStep, squadra} = sequelize.models;

//User and Role
role.hasMany(user);
user.belongsTo(role);

//Caccia e CacciaTemplate
caccia.hasMany(cacciaTemplate,  {foreignKey:'cacciaId'});
cacciaTemplate.belongsTo(caccia, {foreignKey:'cacciaId'});

//Caccia e Squadra
caccia.hasMany(squadra,  {foreignKey:'cacciaId'});
squadra.belongsTo(caccia, {foreignKey:'cacciaId'});

}

module.exports = { applyExtraSetup };