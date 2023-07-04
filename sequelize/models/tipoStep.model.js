const { DataTypes } = require('sequelize');

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
	const tipoStep = sequelize.define('tipoStep', {
		// The following specification of the 'id' attribute could be omitted
		// since it is the default.
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		codice: {
			allowNull: false,
			type: DataTypes.STRING,
			unique: true,
			validate: {
				is: /^\w{3,}$/
			}
		},
		descrizione: {
			type: DataTypes.STRING
		},
	},
	{
		underscored: true,
		timestamps: false,
		freezeTableName: true,
		tableName: 't_tipo_step'
	}
	);
	return tipoStep;
};