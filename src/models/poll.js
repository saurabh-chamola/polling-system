export default (sequelize, DataTypes) => {
    return sequelize.define("Poll", {
        poll: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        }
    }, {
        tableName: "polls",
    });
};
