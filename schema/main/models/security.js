module.exports = function (sequelize, DataTypes) {
    return sequelize.define('security', {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        two_step_password: {
            type: DataTypes.STRING,
            allowNull: true
        },
        local_password: {
            type: DataTypes.STRING,
            allowNull: true
        },
        hidden_chat_password: {
            type: DataTypes.STRING,
            allowNull: true
        },
        client_id: {
            type: DataTypes.BIGINT,
            allowNull: true,
            unique: true,
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
        tableName: 'securities',
        timestamps: false,
    });
};
