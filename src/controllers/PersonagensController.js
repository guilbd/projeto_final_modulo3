const Personagem = require("../models/Personagem");

const getAll = async (req, res) => {
  try {
    const personagens = await Personagem.find(); //find é uma Promise
    return res.send({ personagens });
  } catch (err) {
    res.status(500).send({ error: err });
  }
};

const getById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const personagem = await Personagem.findById(id);
      if (!personagem) {
        res.status(404).json({ message: "Personagem não encontrado" });
        return;
      }
      return res.send({ personagem });
    } catch (err) {
      res.status(500).send({ error: err });
    }
  };

  const create = async (req, res) => {
    const { nome, familia,ocupacao, epPrimeiraAparicao, imagem } = req.body;
  
    if (!nome || !familia || !ocupacao || !epPrimeiraAparicao || !imagem) {
      res.status(404).send({
        message: "Você não enviou todos os dados necessários para o cadastro",
      });
      return;
    }
  
    const novoPersonagem = await Personagem({
      nome,
      familia,
      ocupacao,
      epPrimeiraAparicao,
      imagem,
    });
  
    try {
      await novoPersonagem.save();
      return res
        .status(201)
        .send({ message: "Personagem criado com sucesso", novoPersonagem });
    } catch (err) {
      res.status(500).send({ error: err });
    }
  };

  const update = async (req, res) => {
    const { nome, familia,ocupacao, epPrimeiraAparicao, imagem } = req.body;
  
    if (!nome || !familia || !ocupacao || !epPrimeiraAparicao || !imagem) {
        res.status(404).send({
          message: "Você não enviou todos os dados necessários para o cadastro",
        });
        return;
      }
  
    res.personagem.nome = nome;
    res.personagem.familia = familia;
    res.personagem.ocupacao = ocupacao;
    res.personagem.epPrimeiraAparicao = epPrimeiraAparicao;
    res.personagem.imagem = imagem;
  
    try {
      await res.personagem.save();
      res.send({ message: "Personagem alterado com sucesso!" });
    } catch (err) {
      res.status(500).send({ error: err });
    }
  };

  const del = async (req, res) => {
    try {
      await res.personagem.remove();
      res.send({ message: "personagem removido com sucesso" });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };
  
  module.exports = {
    getAll,
    getById,
    create,
    update,
    del,
  };
  