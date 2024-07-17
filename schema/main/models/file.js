module.exports = function (sequelize, DataTypes) {
    return sequelize.define("file", {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        filename: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        originalname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        mimetype: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        size: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        path: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
    }, {
        sequelize,
        tableName: 'files',
        timestamps: false
    });
}