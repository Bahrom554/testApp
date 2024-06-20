
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('user', {
        id: {
            autoIncrement: true,
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING(256),
            allowNull: true,
            unique:true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
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
        tableName: 'users',
        schema: 'public',
        timestamps: false,
    
    });
};
