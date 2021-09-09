const mongoose = require("mongoose");

const personagemSchema = new mongoose.Schema({
  nome: {
    type: "string",
    require: true,
  },
  familia: {
    type: "string",
    require: true,
  },
  ocupacao: {
    type: "string",
    require: true,
  },
  epPrimeiraAparicao: {
    type: "string",
    require: true,
  },
  imagem: {
    type: "string",
    require: true,
  },
});

module.exports = mongoose.model("Personagem", personagemSchema);
