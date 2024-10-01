const User = require("../models/User");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

const authGuard = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  // checando se o header tem o token

  if (!token) return res.status(401).json({ errors: ["acesso negado"] });

  // checando se o token é valido

  try {
    const verified = jwt.verify(token, jwtSecret);

    req.user = await User.findById(verified.id).select("-password");

    next();
  } catch (error) {
    res.status(401).json({ errors: ["token invalido"] });
  }
};

module.exports = authGuard;
