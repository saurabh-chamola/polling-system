import { Poll, PollOption, Vote } from "../configs/db.js";

export const createPoll = async (req, res) => {
    try {
        const { poll, option } = req.body;

        // Save the poll data
        const savedPollData = await Poll.create({ poll });

        // Prepare the option data with correct fields
        const optionData = option.map((item) => ({
            option: item,           // Each option as a string from the array
            pollId: savedPollData.id // Foreign key reference to the poll
        }));

        // Bulk create options associated with the poll
        await PollOption.bulkCreate(optionData);

        res.status(201).json({ status: true, savedPollData });
    } catch (e) {
        res.status(400).json({ status: false, message: e.message || "Something went wrong! Please try again later." });
    }
};



export const pollVote = async (req, res) => {
    try {
        const { option, votedBy } = req?.body
        await Vote.create({ pollId: req?.params?.id, option, votedBy })
        await PollOption.increment(
            { count: 1 }, // Increment the count by 1
            { where: { id: option } } // Specify the condition
        );

        res.status(201).json({ status: true, message: "Voted successfully!!" })
    }
    catch (e) {
        res.status(400).json({ status: false, message: e?.message ?? "Something went wrong !! please try again later!!" })
    }
}