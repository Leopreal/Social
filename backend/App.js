require("dotenv").config();

const express = require("express");

const path = require("path");

const cors = require("cors");

const porta = process.env.PORTA;

const app = express();

// configuracao JSON

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// cors
app.use(cors({ credentials: true, origin: "http://localhost:3000" })); // padrao react

// conecção db
require("./config/db.js");

// rotas
const router = require("./routes/Router.js");

app.use(router);

app.listen(porta, () => {
  console.log("RODANDO");
});
