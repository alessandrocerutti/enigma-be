const { DataTypes } = require('sequelize');

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
	sequelize.define('huntTemplate', {
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
		hunt_id: {
			allowNull: false,
			type: DataTypes.INTEGER
		},
		description: {
			type: DataTypes.STRING
		},
        sequence: {
            type: DataTypes.INTEGER
        },
        step_id:{
            type: DataTypes.INTEGER,
            allowNull: false
        }
        ,
        step_type:{
            type: DataTypes.STRING,
            allowNull: false,
        }
	},
	{
		underscored: true,
		timestamps: false,
		freezeTableName: true,
		tableName: 't_hunt_template'
	}
	);
};