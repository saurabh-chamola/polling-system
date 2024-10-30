export default (sequelize, DataTypes) => {
    return sequelize.define("Vote", {
        votedBy: { 
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "User",  
                key: "id"
            },
            onDelete: "CASCADE"
        },
        option: { 
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "PollOption",  
                key: "id"
            },
            onDelete: "CASCADE"
        },
    }, {
        tableName: "votes",
    });
};
