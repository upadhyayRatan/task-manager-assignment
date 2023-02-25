const { MongoClient, ObjectId } = require("mongodb");
const connectionUrl = "mongodb://localhost:27017";
const dataBaseName = "task-manager";

MongoClient.connect(
  connectionUrl,
  { useNewUrlParser: true },
  async (error, client) => {
    if (error) {
      return console.log("Unable to connect to DB!");
    }
    const db = client.db(dataBaseName);
 
  }
)

 