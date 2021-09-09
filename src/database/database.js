const mongoose = require("mongoose");

//conexão do Mongoose para ser exportada
const connectToDb = () => {
  mongoose.connect(process.env.DATABASE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = connectToDb;