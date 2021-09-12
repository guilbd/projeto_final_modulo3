const express = require("express");
const routes = express.Router();
var cors = require("cors");

const PersonagemController = require("../controllers/PersonagensController");


//Libera o CORS
routes.use(cors());
//Ativa todos os pre-flight
routes.options("*", cors());

routes.get("/personagens", PersonagemController.getAll);

routes.get(
  "/personagens/:id",
  PersonagemController.getById
);
routes.post("/personagens", PersonagemController.create);

routes.put(
  "/personagens/:id",
  PersonagemController.update
);
routes.delete(
  "/personagens/:id",
  PersonagemController.del
);

routes.get("/filterByName", PersonagemController.filterByName);

routes.get("/filterAll", PersonagemController.filterAll);

module.exports = routes;