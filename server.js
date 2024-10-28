import express from "express";
import dbConnect from "./src/configs/db.js";
const PORT = process.env.PORT || 8000;

const app = express();

dbConnect()

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});
