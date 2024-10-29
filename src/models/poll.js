export default (sequelize, DataTypes) => {
    sequelize.define("poll", {
        question: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        }
    }, {
        tableName: "polls"
    }
    )
}
