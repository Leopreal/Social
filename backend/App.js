const express = require("express");

const path = require("path");

const cors = require("cors");

const porta = 5000;

const app = express();

// configuracao JSON

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(porta, () => {
  console.log("RODANDO");
});
