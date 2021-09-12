require("express-async-errors");

const validarEndpoint = (req, res) =>{
  res.status(404).send({ message: "Endpoint was not found" });
};

const tratarErros = (error, req, res, next) =>{
  res.status(error.status || 500).json({
    error:{ 
      status:error.status || 500,
      message:error.message || "Erro interno do servidor"
    },

});
next();
};

module.exports = {
  validarEndpoint,
  tratarErros
}