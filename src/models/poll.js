export default (sequelize, DataTypes) => {
    return sequelize.define("poll", {
    
        poll: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        tableName: "poll"
    });
    
}
