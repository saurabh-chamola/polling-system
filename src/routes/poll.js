import express from "express"
import { createPoll, getPollDetails, leaderboard, pollVote, realtimePollUpdates } from "../controllers.js/poll.js"


const router = express.Router()
router.route("/").post(createPoll).get(getPollDetails)
router.route("/:id/vote").post(pollVote)
router.route("/leaderboard").get(leaderboard)
router.route("/realtimeUpdate").get(realtimePollUpdates)

export default router