export default (sequelize, DataTypes) => {
    return sequelize.define("PollOption", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        optionText: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // other attributes
    }, {
        tableName: "pollOptions",
    });
};
