import express from "express";
import pollRoutes from "./src/routes/poll.js"
// import { init } from "./src/configs/kafka.js";
import sequelize from "./src/configs/db.js";

const PORT = process.env.PORT || 8000;
// init().catch((e) => {
//     console.log(e)
// })
const app = express();

app.use(express.json())
app.use("/api/v1/poll", pollRoutes)



app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});
