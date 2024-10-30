export default (sequelize, DataTypes) => {
    return sequelize.define("PollOption", {
        pollId: { 
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "poll",  // This should match your Poll model's table name
                key: "id"
            },
            onDelete: "CASCADE"
        }
,
        option: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        
    }, {
        tableName: "pollOptions",
    });
};
