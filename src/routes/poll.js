import express from "express"
import { createPoll, pollVote } from "../controllers.js/poll.js"


const router = express.Router()
router.route("/").post(createPoll)
router.route("/:id/vote").post(pollVote)

export default router