import express from "express";
import cors from "cors";
import "dotenv/config";
import { MongoClient, ObjectId } from 'mongodb';

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
const db = connectClient.db("CreativeNest");
const studiosCollection = db.collection("Studio");

app.post("/add-studio", async(req, res) => {
  const data = req.body
  const result = await studiosCollection.insertOne(data);
  res.send(result);
});

app.get("/studios", async(req, res) => {
  const result = await studiosCollection.find().toArray();
  res.send(result);
});

app.get("/featured-studios", async(req, res) => {
  const result = await studiosCollection.find().sort({ createdAt: -1 }).limit(6).toArray();
  res.send(result); 
});

app.get("/studios/:id", async(req, res) => {
  const { id } = req.params;
  const result = await studiosCollection.findOne({ _id: new ObjectId(id),});
  res.send(result);
});

app.get("/", (req, res) => {
    res.send({message: "Server Run Successfully!"})
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});