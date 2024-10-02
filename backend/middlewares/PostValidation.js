const { body } = require("express-validator");

const PostInsertValidation = () => {
  return [
    body("title")
      .not()
      .isEmpty()
      .withMessage("O título é obrigatório")
      .isString()
      .withMessage("O título deve ser uma string")
      .isLength({ min: 3 })
      .withMessage("O título precisa ter no mínimo 3 caracteres."),

    body("post")
      .not()
      .isEmpty()
      .withMessage("O conteúdo do post é obrigatório")
      .isString()
      .withMessage("O conteúdo do post deve ser uma string")
      .isLength({ min: 10 })
      .withMessage("O conteúdo do post precisa ter no mínimo 10 caracteres."),
  ];
};

module.exports = {
  PostInsertValidation,
};
