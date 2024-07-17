module.exports = function (sequelize, DataTypes) {
    return sequelize.define('message', {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,

        },
        message_id: {
            type: DataTypes.BIGINT,
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
        writer_id: {
            type: DataTypes.BIGINT,
            allowNull: true,
            references: {
                model: 'chats',
                key: 'id'
            }
        },
        file_id: {
            type: DataTypes.BIGINT,
            allowNull: true,
            references: {
                model: 'files',
                key: 'id'
            }
        },
        client_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: {
                model: 'clients',
                key: 'id'
            }
        },
        text: {
            type: DataTypes.STRING,
            allowNull: true
        },
        date: {
            type: DataTypes.DATE,
            allowNull: true,
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
        tableName: 'messages',
        timestamps: false,
        indexes: [{
            unique: true,
            fields: ['message_id', 'chat_id']
        }],
    })
}