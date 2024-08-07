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
            references: {
                model: 'chats',
                key: 'id'
            }
        },
        category_id: {
            type: DataTypes.BIGINT,
            allowNull: true,
            references: {
                model: 'categories',
                key: 'id'
            }
        },
        keyword: {
            type: DataTypes.STRING(256),
            allowNull: true
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
            type: DataTypes.BOOLEAN,
            defaultValue: false
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
