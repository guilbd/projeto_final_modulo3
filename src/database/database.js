// const mongoose = require("mongoose");

// //conexão do Mongoose para ser exportada
// const connectToDb = () => {
//   mongoose.connect(process.env.DATABASE_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });
// };

// mongoose.connect('mongodb://localhost/personagem', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });

const express = require("express");
const mongodb = require("mongodb");
require("dotenv").config();
const connectToDb = () => {
  const dbUser = process.env.DB_USER;
  const dbPassword = process.env.DB_PASSWORD;
  const dbName = process.env.DB_NAME;
  const dbChar = process.env.DB_CHAR;
  const connectionString = `mongodb+srv://${dbUser}:${dbPassword}@cluster0.${dbChar}.mongodb.net/${dbName}?retryWrites=true&w=majority`;
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  const client = new mongodb.MongoClient(connectionString, options);
//   const db = client.db("db_simpsons");
//   const personagens = db.collection("personagens");

  async function conexao() {
    try {
      await client.connect();
      console.log("Connected to MongoDB");
    } catch (err) {
      console.log(err);
    }
  }
};


// module.exports = { conexao,db, personagens};

module.exports = connectToDb;