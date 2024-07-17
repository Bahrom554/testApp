const { fields } = require("../../../http/middlewares/multer");

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('contact', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,

        },
        name: {
            type: DataTypes.STRING(256),
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING(256),
            allowNull: true
        },
        client_id: {
            type: DataTypes.BIGINT,
            allowNull: true,
            references: {
                model: 'clients',
                key: 'id'
            }
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    }, {
        sequelize,
        tableName: 'contacts',
        timestamps: false,
    });
};
