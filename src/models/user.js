export default (sequelize, DataTypes) => {
    return sequelize.define("User", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        tableName: "users",
        timestamps: true, // Enable automatic timestamp handling
    });
};
