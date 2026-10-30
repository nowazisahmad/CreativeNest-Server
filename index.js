import express from "express";
import cors from "cors";
import "dotenv/config";
import { MongoClient } from 'mongodb';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());



app.get("/", (req, res) => {
    res.send("Server Run Successfully!")
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})