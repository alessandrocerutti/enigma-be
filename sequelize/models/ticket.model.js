const { DataTypes } = require('sequelize');

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
	sequelize.define('ticket', {
		// The following specification of the 'id' attribute could be omitted
		// since it is the default.
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		code: {
			allowNull: false,
			type: DataTypes.STRING,
			unique: true
		},
		position: {
			type: DataTypes.STRING
		},
		street: {
			type: DataTypes.STRING
		},
		note: {
			type: DataTypes.STRING
		},
		user_mod: {
			type: DataTypes.INTEGER
		},
		user_cre: {
			type: DataTypes.INTEGER
		}
	},
	{
		underscored: true,
		timestamps: true,
		freezeTableName: true,
		tableName: 't_ticket'
	}
	);
};