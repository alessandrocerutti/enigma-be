const { DataTypes } = require('sequelize');

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
	sequelize.define('huntUser', {
		// The following specification of the 'id' attribute could be omitted
		// since it is the default.
		hunt_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 't_hunt',
				key: 'id'
			}
		},
		user_id: {
			allowNull: false,
			type: DataTypes.INTEGER,
			references: {
				model: 't_user',
				key: 'id'
			}
		}
	},
	{
		underscored: true,
		timestamps: false,
		freezeTableName: true,
		tableName: 't_hunt_user'
	}
	);
};