module.exports = function (sequelize, DataTypes) {
    return sequelize.define('chat', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,

        },
        name: {
            type: DataTypes.STRING(256),
            allowNull: false
        },
        username: {
            type: DataTypes.STRING(256),
            allowNull: true
        },
        type: {
            type: DataTypes.STRING(256),
            allowNull: false,
            defaultValue: 'account'
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
        tableName: 'chats',
        timestamps: false,
    });
};
