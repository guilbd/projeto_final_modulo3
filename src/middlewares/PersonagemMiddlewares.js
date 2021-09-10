// const Personagem = require("../models/Personagem");
const {personagens, ObjectId}  = require("../database/database");

const validaId = async (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  try {
    const personagem = await personagens.findOne({ _id: ObjectId(id) });
    
    if (!personagem) {
      res.status(400).send({ error: "Id inválido" });
      return;
    }

    res.send(personagem);
  } catch (err) {
    return res.status(500).send({ error: err });
  }
  next();
};

module.exports = { validaId };
