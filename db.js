`use strict`

const config = require('./config');
const Sequelize = require('sequelize');

console.log('Init sequelize...');

var sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialet,
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

// sequelize
//     .authenticate()
//     .then(() => {
//         console.log('Connection has been established successfully.');
//     })
//     .catch(error => {
//         console.log('Unable to connect to the database: ', error);
//     });

function defineModel(name, attributes) {
    var attrs = {};

    attrs.id = {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    };

    for (let key in attributes) {
        let value = attributes[key];
        if (typeof value === 'object' && value['type']) {
            value.allowNull = value.allowNull || false;
            attrs[key] = value;
        } else {
            attrs[key] = {
                type: value,
                allowNull: false
            }
        }
    }

    attrs.createdAt = {
        type: Sequelize.BIGINT,
        allowNull: false
    };

    attrs.updatedAt = {
        type: Sequelize.BIGINT,
        allowNull: false
    }

    attrs.version = {
        type: Sequelize.INTEGER,
        allowNull: false
    }

    return sequelize.define(name, attrs, {
        tableName: name,
        timestamps: false,
        hooks: {
            beforeValidate: function (obj) {
                let now = Date.now();
                if (obj.isNewRecord) {
                    obj.createdAt = now;
                    obj.updatedAt = now;
                    obj.version = 0;
                } else {
                    obj.updatedAt = now;
                    obj.version++;
                }
            }
        }
    })
}

module.exports = {
    STRING: Sequelize.STRING,
    INTEGER: Sequelize.INTEGER,
    BIGINT: Sequelize.BIGINT,
    defineModel: defineModel,
    sync: () => {
        if (process.env.NODE_ENV !== 'production') {
            sequelize.sync({ force: true });
        } else {
            throw new Error("Cannot sync() in production environment! ");
        }
    }
}