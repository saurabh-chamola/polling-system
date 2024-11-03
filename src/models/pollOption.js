export default (sequelize, DataTypes) => {
    return sequelize.define("Option", {
        pollId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "polls",
                key: "id"
            },
            onDelete: "CASCADE"
        },
        count: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        option: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        tableName: "option",
    });
};
