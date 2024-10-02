const { body } = require("express-validator");

const userCreateValidator = () => {
  return [
    body("name")
      .isString()
      .withMessage("o nome é obrigatorio")
      .isLength({ min: 3 })
      .withMessage("O nome precisa ter no minimo 3 caracteres"),
    body("email")
      .isString()
      .withMessage("o email precisa ser obrigatorio")
      .isEmail()
      .withMessage("insira um email valido"),
    body("password")
      .isString()
      .withMessage("a senha é obrigatorio")
      .isLength({ min: 5 })
      .withMessage("a senha precisa ter no minimo 5 caracteres"),
    body("confirmpassword")
      .isString()
      .withMessage("a confirmação da senha é obrigatoria")
      .custom((value, { req }) => {
        if (value != req.body.password) {
          throw new Error("as senhas não são iguais");
        }
        return true;
      }),
  ];
};

const loginValidation = () => {
  return [
    body("email")
      .isString()
      .withMessage("o email é obrigatorio")
      .isEmail()
      .withMessage("insira um email valido"),
    body("password").isString().withMessage("a senha é obrigatoria"),
  ];
};

const userUpdateValidator = () => {
  return [
    body("name")
      .optional()
      .isLength({ min: 3 })
      .withMessage("o nome precisa de pelo menos 3 caracteres"),
    body("password")
      .optional()
      .isLength({ min: 5 })
      .withMessage("a senha precisa ter 5 caracteres"),
  ];
};

module.exports = {
  userCreateValidator,
  loginValidation,
  userUpdateValidator,
};
