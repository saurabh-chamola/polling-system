import express from "express"
import { createPoll, leaderboard, pollVote } from "../controllers.js/poll.js"


const router = express.Router()
router.route("/").post(createPoll)
router.route("/:id/vote").post(pollVote)
router.route("/leaderboard").get(leaderboard)

export default router