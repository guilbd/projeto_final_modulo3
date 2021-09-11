const express = require("express");
const routes = express.Router();
var cors = require("cors");

const PersonagemController = require("../controllers/PersonagensController");
const PersonagemMiddleware = require("../middlewares/PersonagemMiddlewares");

//Libera o CORS
routes.use(cors());
//Ativa todos os pre-flight
routes.options("*", cors());

routes.get("/personagens", PersonagemController.getAll);

routes.get(
  "/personagens/:id",
  PersonagemMiddleware.validaId,
  PersonagemController.getById
);
routes.post("/personagens", PersonagemController.create);

routes.put(
  "/personagens/:id",
  PersonagemMiddleware.validaId,
  PersonagemController.update
);
routes.delete(
  "/personagens/:id",
  PersonagemMiddleware.validaId,
  PersonagemController.del
);

routes.all("*", function (req, res) {
  res.status(404).send({ message: "Endpoint was not found" });
});

routes.get("/filterByName", PersonagemController.filterByName);

routes.get("/filterAll", PersonagemController.filterAll);

module.exports = routes;