const Sequalize = require('sequelize');
require('dotenv/config')
const { applyExtraSetup } = require('./extra-setup');

var sequelize = new Sequalize(
    process.env.DB_DATABASE,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host : process.env.DB_HOST,
        dialect : process.env.DB_DIALECT
    }
);

const modelDefiners = [
    require('./models/user.model'),
    require('./models/role.model'),
    require('./models/caccia.model'),
    require('./models/cacciaTemplate.model'),
    require('./models/tipoStep.model'),
    require('./models/squadra.model'),
    require('./models/stepSquadra.model'),
    require('./models/punteggio.model'),
	// Add more models here...
	// require('./models/item'),
];

// We define all models according to their files.
for (var modelDefiner of modelDefiners) {
	modelDefiner(sequelize);
}

applyExtraSetup(sequelize)

module.exports= sequelize;