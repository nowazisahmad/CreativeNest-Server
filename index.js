import express from "express";
import cors from "cors";
import "dotenv/config";
import { MongoClient } from 'mongodb';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const client = new MongoClient(process.env.MONGODB_URI);
export async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("You successfully connected to MongoDB!");
    return client;
  } catch (err) {
    console.dir(err);
  }
}

const connectClient = await connectToMongoDB();
const db = connectClient.db("Cat-Harry");

app.get("/", (req, res) => {
    res.send("Server Run Successfully!")
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})