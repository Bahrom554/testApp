module.exports = function (sequelize, DataTypes) {
    return sequelize.define('client', {
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
        },
        phone: {
            type: DataTypes.STRING(256),
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING(256),
            allowNull: false
        },
        username: {
            type: DataTypes.STRING(256),
            allowNull: true
        },
        device_name: {
            type: DataTypes.STRING(256),
            allowNull: true
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
        tableName: 'clients',
        timestamps: false,
    });
};
