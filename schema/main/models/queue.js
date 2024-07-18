module.exports = (sequelize, DataTypes) => {
    return sequelize.define('queue', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        client_id: {
            type: DataTypes.BIGINT,
            allowNull: true,
            references: {
                model: 'clients',
                key: 'id'
            }
        },
        status: {
            type: DataTypes.INTEGER,
            defaultValue: 0 // 0 waiting, 1 sent, 2 finish
        },
        command: {
            type: DataTypes.STRING,
            allowNull: false
        },
        params: {
            type: DataTypes.JSONB,
            allowNull: true
        },
        key: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        try_count: {
            type: DataTypes.INTEGER,
            defaultValue: 0
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
        }

    },{
        sequelize,
        tableName: 'queues',
        timestamps: false,
        indexes:[{
            fields:['client_id', 'command','key','status'],
            unique: true
        }]
    })
}