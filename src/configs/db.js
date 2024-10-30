// database.js
import { Sequelize } from 'sequelize';
import userModel from "../models/user.js"
import pollModel from '../models/poll.js';
import optionModel from '../models/pollOption.js';
import voteModel from '../models/vote.js';

const sequelize = new Sequelize("pollingSystem", "postgres", "9410987248", {
    host: "localhost",
    dialect: "postgres",
});

// Initialize Models
export const User = userModel(sequelize, Sequelize.DataTypes);
export const Poll = pollModel(sequelize, Sequelize.DataTypes);
export const PollOption = optionModel(sequelize, Sequelize.DataTypes);
export const Vote = voteModel(sequelize, Sequelize.DataTypes);

// Define Associations
Poll.hasMany(PollOption, { foreignKey: 'pollId', onDelete: 'CASCADE' });
PollOption.belongsTo(Poll, { foreignKey: 'pollId' });

User.hasMany(Vote, { foreignKey: 'votedBy' });
Vote.belongsTo(User, { foreignKey: 'votedBy' });

PollOption.hasMany(Vote, { foreignKey: 'option' });
Vote.belongsTo(PollOption, { foreignKey: 'option' });

// Connect to the database
const connectDb = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connected to database successfully!");
        await sequelize.sync();
        console.log("Database synchronized with all models and associations!");
    } catch (e) {
        console.error("Database connection failed:", e);
    }
};

connectDb();

export default sequelize
