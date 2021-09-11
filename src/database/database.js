const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;
const dbChar = process.env.DB_CHAR;
const connectionString = `mongodb+srv://${dbUser}:${dbPassword}@cluster0.${dbChar}.mongodb.net/${dbName}?retryWrites=true&w=majority`;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const client = new MongoClient(connectionString, options);

const connectToDb = async () => {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log(err);
  }
};

const db = client.db('db_simpsons');
const personagens = db.collection('personagens');

module.exports = {
  connectToDb,
  db,
  personagens,
  ObjectId,
};
