function applyExtraSetup(sequelize) {
	const { user, role } = sequelize.models;

  //user_role
	user.hasOne(role, { foreignKey: 'id', sourceKey:'role_id'});

}

module.exports = { applyExtraSetup };