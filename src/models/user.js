export default (sequelize, DataTypes) => {
    return sequelize.define("User", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        tableName: "user",
        timestamps: true, // Enable automatic timestamp handling
    });
};
