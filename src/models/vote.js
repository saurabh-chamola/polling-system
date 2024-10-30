// vote.js
export default (sequelize, DataTypes) => {
    return sequelize.define("Vote", {
        votedBy: { 
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "user",   // updated to match lowercase table name
                key: "id"
            },
            onDelete: "CASCADE"
        },
        option: { 
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "pollOption",  // updated to match lowercase table name
                key: "id"
            },
            onDelete: "CASCADE"
        },
    }, {
        tableName: "votes",
    });
};
