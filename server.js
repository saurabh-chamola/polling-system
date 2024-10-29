import express from "express";
import {sequelize} from "./src/configs/db.js";

const PORT = process.env.PORT || 8000;

const app = express();



app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});
