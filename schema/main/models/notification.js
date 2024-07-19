module.exports = function (sequelize, DataTypes) {
    return sequelize.define('notification', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,

        },
        eventName: {
            type: DataTypes.STRING(256),
            allowNull: false
        },
        chat_id: {
            type: DataTypes.BIGINT,
            allowNull: true,
        },
        keyword_id: {
            type: DataTypes.BIGINT,
            allowNull: true,
            references: {
                model: 'keywors',
                key: 'id'
            }
        },
        type: {
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
        is_seen: {
         type: DataTypes.BOOLEAN
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
        tableName: 'notifications',
        timestamps: false,
    });
};
