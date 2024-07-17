module.exports = function (sequelize, DataTypes) {
    return sequelize.define('location', {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lat: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        long: {
            type: DataTypes.FLOAT,
            allowNull: false
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
        tableName: 'locations',
        timestamps: false,
    });
};
