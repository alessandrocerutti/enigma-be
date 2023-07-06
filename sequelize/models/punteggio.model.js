const { DataTypes } = require('sequelize');

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
	const punteggio = sequelize.define('punteggio', {
		// The following specification of the 'id' attribute could be omitted
		// since it is the default.
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		descrizione: {
			type: DataTypes.STRING
		},
		punteggio: {
			type:DataTypes.INTEGER
		},
		tipologia: {
			type:DataTypes.STRING
		},
		tsInserimento:{
			type:DataTypes.DATE,
			default:false
		}
	},
	{
		underscored: true,
		timestamps: false,
		freezeTableName: true,
		tableName: 't_punteggio'
	}
	);
	return punteggio;
};