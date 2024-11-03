import { Sequelize } from 'sequelize';
import pollModel from '../models/poll.js';
import optionModel from '../models/pollOption.js';
import voteModel from '../models/vote.js';

const sequelize = new Sequelize("pollingSystem", "postgres", "9410987248", {
    host: "localhost",
    dialect: "postgres",
});

// Initialize Models
export const Poll = pollModel(sequelize, Sequelize.DataTypes);
export const PollOption = optionModel(sequelize, Sequelize.DataTypes);
export const Vote = voteModel(sequelize, Sequelize.DataTypes);

// Define Associations
Poll.hasMany(PollOption, { foreignKey: 'pollId', as: 'Options', onDelete: 'CASCADE' });
PollOption.belongsTo(Poll, { foreignKey: 'pollId' });


PollOption.hasMany(Vote, { foreignKey: 'option', onDelete: 'CASCADE' });
Vote.belongsTo(PollOption, { foreignKey: 'option' });

// Connect to the database
const connectDb = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        console.log("Connected to database successfully!");
    } catch (e) {
        console.error("Database connection failed:", e);
    }
};

connectDb();

export default sequelize;
