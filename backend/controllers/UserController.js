const User = require("../models/User");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;

// gerador de token

const generateToken = (id) => {
  return jwt.sign({ id }, jwtSecret, {
    expiresIn: "7d",
  });
};

// Register user and sing in
const register = async (req, res) => {
  const { name, email, password } = req.body;

  // checando se o user existe

  const user = await User.findOne({ email });

  if (user) {
    res.status(200).json({ errors: ["Por favor utilize outro email"] });
    return;
  }

  // gerar senha
  const salt = await bcrypt.genSalt(); // gerar senha aleatoria para o banco
  const passwordHash = await bcrypt.hash(password, salt);

  // criar usuario

  const newUser = await User.create({
    name,
    email,
    password: passwordHash,
  });

  // verificacao para ver se o user foi feito com sucesso e gerar o token

  if (!newUser) {
    res.status(422).json({ errors: ["houve um erro!"] });
    return;
  }

  res.status(201).json({
    _id: newUser._id,
    token: generateToken(newUser._id),
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  // checa se existe
  if (!user) {
    res.status(404).json({ errors: ["usuario nao encontrado"] });
    return;
  }

  // checa se as senhas coincidem
  if (!(await bcrypt.compare(password, user.password))) {
    res.status(422).json({ errors: ["senha invalida"] });
    return;
  }

  // retorna usuario com  token
  res.status(201).json({
    _id: user._id,
    token: generateToken(user._id),
  });
};

module.exports = {
  register,
  login,
};
