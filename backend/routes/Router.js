const express = require("express");

const router = express();

router.use("/api/users", require("./UserRoutes"));

// rota teste

router.get("/", (req, res) => {
  res.send("api funcionando");
});

module.exports = router;
