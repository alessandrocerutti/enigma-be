const { DataTypes } = require('sequelize');

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
	const stepSquadra = sequelize.define('stepSquadra', {
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
			type: DataTypes.UUID,
			unique: true
		},
		descrizione: {
			type: DataTypes.STRING
		},
        sequenza: {
            type: DataTypes.INTEGER
        },
        tipologia:{
            type: DataTypes.STRING,
            allowNull: false
        },
		isTempoCalcolato:{
			type: DataTypes.BOOLEAN,
			default: false
		},
		tsInizio:{
			type:DataTypes.DATE,
			default:false
		},
		tsFine:{
			type:DataTypes.DATE,
			default:false
		},
	},
	{
		underscored: true,
		timestamps: false,
		freezeTableName: true,
		tableName: 't_step_squadra'
	}
	);
	return stepSquadra;
};