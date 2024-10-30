// pollOption.js
export default (sequelize, DataTypes) => {
    return sequelize.define("PollOption", {
        pollId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "poll", // lowercase table name here
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
        tableName: "pollOption" // lowercase this as well
    });
};
