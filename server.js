require("dotenv").config();
const express = require("express");
const { connectToDb,db, personagens} = require("./src/database/database")
const routes = require("./src/routes/routes");
const {validarEndpoint, tratarErros} = require("./src/middlewares/PersonagemMiddlewares")

connectToDb();

const app = express();
const port =  process.env.PORT || 3000;

app.use(express.json());
app.use(routes)
app.all("*", validarEndpoint);
app.use(tratarErros);
app.listen(port, () => console.log(`Servidor rodando em http://localhost:${port}`));
