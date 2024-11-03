import { Poll, PollOption, Vote } from "../configs/db.js";
import { io } from "../../server.js";
import { kafka } from "../configs/kafka.js";

/**
 * Route: POST /api/v1/poll
 * Description: This controller adds a new poll. You have to pass the poll question in the `poll` field 
 * and an array of options in the `option` field.
 */
export const createPoll = async (req, res) => {
    try {
        const { poll, option } = req.body;

        const savedPollData = await Poll.create({ poll });

        // Populate option data with respective poll
        const optionData = option.map((item) => ({
            option: item,
            pollId: savedPollData.id
        }));


        await PollOption.bulkCreate(optionData);

        res.status(201).json({ status: true, message: "Created successfully!!" });
    } catch (e) {
        res.status(400).json({ status: false, message: e.message || "Something went wrong! Please try again later." });
    }
};

/**
 * Route: GET /api/v1/poll/
 * Description: This controller retrieves all existing polls along with their options.
 */
export const getPollDetails = async (req, res) => {
    try {
        const polls = await Poll.findAll({
            include: [
                {
                    model: PollOption,
                    as: "Options",
                    attributes: ["id", "option", "count"],
                },
            ],
        });

        res.status(200).json({ status: true, data: polls });
    } catch (e) {
        res.status(400).json({ status: false, message: e?.message ?? "Something went wrong !! please try again later!!" });
    }
};

/**
 * Route: POST /api/v1/poll/:id/vote
 * Description: This controller allows voting for a poll. You have to pass the option ID you want to vote for 
 * in the `option` field, and the name of the person who voted in the `votedBy` field. 
 * The poll ID is passed in the request parameters.
*/

/**
 * Route: POST /api/v1/poll/:id/vote
 * Description: This controller allows voting for a poll.
 */
export const pollVote = async (req, res) => {
    try {
        const { option, votedBy } = req.body;

        // Create a producer for Kafka
        const producer = kafka.producer();
        await producer.connect();

        // Create the message to be sent to Kafka
        const message = {
            pollId: req.params.id,
            option,
            votedBy,
        };

        await producer.send({
            topic: 'polls',
            messages: [{ value: JSON.stringify(message) }],
        });

        await producer.disconnect();

        // Respond to the client immediately
        res.status(201).json({ status: true, message: "Vote sent successfully!" });
    } catch (e) {
        res.status(400).json({ status: false, message: e.message || "Something went wrong! Please try again later!" });
    }
};


/**
 * Route: GET /api/v1/poll/leaderboard
 * Description: This controller provides complete details about the leaderboard for the polls.
 * It returns the poll options sorted in descending order according to the number of votes they have received.
 */
export const leaderboard = async (req, res) => {
    try {
        const polls = await Poll.findAll({
            include: [
                {
                    model: PollOption,
                    as: "Options",
                    attributes: ["id", "option", "count"],
                },
            ],
        });

        const sortedPolls = polls.map(poll => {
            return poll.Options.sort((a, b) => b.count - a.count);
        });

        res.status(200).json({ status: true, data: sortedPolls });
    } catch (e) {
        res.status(400).json({ status: false, message: e?.message ?? "Something went wrong !! please try again later!!" });
    }
};

/**
 * Route: GET /api/polls/realtimeUpdate
 * Description: This controller provides real-time updates about who voted for which poll and updates the leaderboard accordingly.
 */
export const realtimePollUpdates = async (req, res) => {
    try {
        const polls = await Poll.findAll({
            include: [
                {
                    model: PollOption,
                    as: "Options",
                    attributes: ["id", "option", "count"],
                    order: [['count', 'DESC']]
                },
            ],
            raw: true,
            nest: true
        });


        const pollMap = {};

        polls.forEach(poll => {
            const { id, poll: pollText, createdAt, updatedAt, Options } = poll;

            if (!pollMap[id]) {
                pollMap[id] = {
                    id,
                    poll: pollText,
                    createdAt,
                    updatedAt,
                    Options: []
                };
            }

            // Add the option to the appropriate poll
            pollMap[id].Options.push({
                id: Options.id,
                option: Options.option,
                count: Options.count
            });
        });

        const formattedPolls = Object.values(pollMap);

        res.render("pollUpdates", { data: formattedPolls });
    } catch (e) {
        res.status(400).json({ status: false, message: e?.message ?? "Something went wrong! Please try again later." });
    }
};
