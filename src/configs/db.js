import { Sequelize } from 'sequelize';
import UserModel from '../models/user.js';
import PollModel from '../models/poll.js';
import PollOptionModel from '../models/pollOption.js';
import VoteModel from '../models/vote.js';

// Initialize Sequelize connection
export const sequelize = new Sequelize({
    host: "localhost",
    dialect: "postgres",
    username: "postgres",
    password: "9410987248",
    database: "pollingSystem"
});

// Initialize Models
const User = UserModel(sequelize, Sequelize.DataTypes);
const Poll = PollModel(sequelize, Sequelize.DataTypes);
const PollOption = PollOptionModel(sequelize, Sequelize.DataTypes);
const Vote = VoteModel(sequelize, Sequelize.DataTypes);

// Define Associations
// Poll.hasMany(PollOption, { foreignKey: 'pollId', onDelete: 'CASCADE' });
// PollOption.belongsTo(Poll, { foreignKey: 'pollId' });


// User.hasMany(Vote, { foreignKey: 'votedBy' });
// Vote.belongsTo(User, { foreignKey: 'votedBy' });

// PollOption.hasMany(Vote, { foreignKey: 'option' });
// Vote.belongsTo(PollOption, { foreignKey: 'option' });

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

export default sequelize;
