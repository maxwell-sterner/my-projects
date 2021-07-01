const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://maxwell:dirtySocks@cluster0.w5cuu.mongodb.net/<dbname>?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useUnifiedTopology: true });


async function connectDB(){
	await client.connect();

	const database = client.db("playlist-creator");

	const collection = database.collection("songs");

	const result = await collection.insertOne({
		"user-id":"3",
		"playlist":"Party",
		"song-id":"3"
	});

}

connectDB();