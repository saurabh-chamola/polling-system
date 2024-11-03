export default (sequelize, DataTypes) => {
    return sequelize.define("Vote", {
        votedBy: {
            allowNull: false,
            type:DataTypes.STRING
        },
        option: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "option",
                key: "id"
            },
            onDelete: "CASCADE"
        },
    }, {
        tableName: "votes",
    });
};
