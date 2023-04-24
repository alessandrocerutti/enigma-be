const { DataTypes } = require('sequelize');

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
	const caccia = sequelize.define('caccia', {
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
			unique: true
		},
		descrizione: {
			type: DataTypes.STRING
		}
	},
	{
		underscored: true,
		timestamps: true,
		freezeTableName: true,
		tableName: 't_caccia'
	}
	);
	return caccia;
};