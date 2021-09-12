const { personagens, ObjectId } = require("../database/database");
const valid = (id) => {
  if (!ObjectId.isValid(id)) {
    return "Id inválido";
  }
};

exports.getAll = async (req, res) => {
  try {
    const personagemFind = await personagens.find({}).toArray();
    !personagemFind.length === 0
      ? res.status(404).json({ message: "não existem personagens cadastrados" })
      : res.status(200).json(personagemFind);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  const id = req.params.id;
  const validado = valid(id);
  if (validado) {
    res.status(400).json({ erro: validado });
    return;
  }
  try {
    const findPersonagem = await personagens.findOne({ _id: ObjectId(id) });
    findPersonagem
      ? res.status(200).json(findPersonagem)
      : res.status(404).json({ message: "Personagem não encontrado" });
  } catch (err) {
    res.status(500);
  }
};

exports.create = async (req, res) => {
  const objeto = req.body;

  if (
    !objeto ||
    !objeto.nome ||
    !objeto.familia ||
    !objeto.ocupacao ||
    !objeto.epPrimeiraAparicao ||
    !objeto.imagem
  ) {
    res.status(404).send({
      message: "Você não enviou todos os dados necessários para o cadastro",
    });
    return;
  }

  try {
    const result = await personagens.insertOne(objeto);
    return res.status(201).send({ message: "Personagem criado com sucesso" });
  } catch (err) {
    res.status(500).send({ error: err });
  }
};

exports.update = async (req, res) => {
  const id = req.params.id;
  const objeto = req.body;

  if (
    !objeto ||
    !objeto.nome ||
    !objeto.familia ||
    !objeto.ocupacao ||
    !objeto.epPrimeiraAparicao ||
    !objeto.imagem
  ) {
    res.status(404).send({
      message: "Você não enviou todos os dados necessários para o cadastro",
    });
  }

  const qntPersonagens = await personagens.countDocuments({
    _id: ObjectId(id),
  });

  if (qntPersonagens !== 1) {
    res.status(500).send({ error: "Personagem não encontrado!!" });
  }

  try {
    const result = await personagens.updateOne(
      {
        _id: ObjectId(id),
      },
      {
        $set: objeto,
      }
    );
    if (result.acknowledged === false) {
      res.status(500).send({ error: "Ocorreu um erro" });
    }
    res.status(200).json(objeto);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.del = async (req, res) => {
  const id = req.params.id;
  const qtdePersonagens = await personagens.countDocuments({
    _id: ObjectId(id),
  });
  if (qtdePersonagens === false) {
    res.status(404).send({ error: "Personagem não encontrado!" });
    return;
  }
  const result = await personagens.deleteOne({ _id: ObjectId(id) });

  if (result.deletedCount === false) {
    res.status(500).send({ error: "Ocorreu um erro ao remover o personagem" });
    return;
  }
  try {
    await res.personagem.remove();
    res.send({ message: "personagem removido com sucesso" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.filterByName = async (req, res) => {
  const nome = req.query.nome;
  if (!nome) {
    res.status(400).send({ erro: "Parametro não recebido" });
    return;
  }
  try {
    const personagem = await personagens
      .find({ nome: { $regex: `${nome}`, $options: "i" } })
      .toArray();
    return res.send({ personagem });
  } catch (err) {
    return res.status(500).send({ erro: err.message });
  }
};

exports.filterAll = async (req, res) => {
  let { nome, familia, ocupacao, epPrimeiraAparicao } = req.query;

  !nome ? (nome = "") : (nome = nome);
  !familia ? (familia = "") : (familia = familia);
  !ocupacao ? (ocupacao = "") : (ocupacao = ocupacao);
  !epPrimeiraAparicao
    ? (epPrimeiraAparicao = "")
    : (epPrimeiraAparicao = epPrimeiraAparicao);
  // !imagem ? (imagem = "") : (imagem = imagem);

  try {
    const personagem = await personagens
      .find({
        nome: { $regex: `${nome}`, $options: "i" },
        familia: { $regex: `${familia}`, $options: "i" },
        ocupacao: { $regex: `${ocupacao}`, $options: "i" },
        epPrimeiraAparicao: { $regex: `${epPrimeiraAparicao}`, $options: "i" },
        // imagem: { $regex: `${imagem}`}
      })
      .toArray();

    if (personagem.length === 0)
      return res.status(404).send({ erro: "Personagem não encontrado" });

    return res.send({ personagem });
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
};
