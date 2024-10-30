import express from "express";
import pollRoutes from "./src/routes/poll.js"
import  sequelize  from "./src/configs/db.js";

const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.json())
app.use("/api/v1/poll",pollRoutes)



app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});
