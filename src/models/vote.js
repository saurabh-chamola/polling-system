export default (sequelize, DataTypes) => {
    return sequelize.define("Vote", {
        votedBy: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        option: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        tableName: "votes",
    });
};
