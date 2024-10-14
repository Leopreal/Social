# 🐦 Rede Social


## 🚀 Tecnologias Utilizadas

### Back-End
- **Node.js** & **Express**: Para criar a API.
- **MongoDB**: Para armazenar dados.
- **Mongoose**: Para modelar dados no MongoDB.
- **jsonwebtoken**: Para autenticação de usuários.
- **bcryptjs**: Para segurança das senhas.
- **cors**: Para permitir requisições de diferentes origens.
- **dotenv**: Para variáveis de ambiente.
- **multer**: Para uploads de arquivos (se necessário).

### Front-End
- **React**: Para construir a interface.
- **Redux**: Para gerenciar o estado da aplicação.
- **React Router**: Para navegação.
- **react-icons**: Para adicionar ícones.

## 📦 Instalação

### 1. Clonando o Repositório


git clone https://github.com/seu-usuario/nome-do-repositorio.git
cd nome-do-repositorio

2. Configurando o Back-End

Copiar código
cd backend
npm install
Crie um arquivo .env e adicione suas variáveis de ambiente, como MONGODB_URI e JWT_SECRET.
Inicie o servidor: npm run server


Copiar código
npm start
3. Configurando o Front-End
bash
Copiar código
cd frontend
npm install
npm start

📝 Usando a Aplicação
Registrar-se: Vá para a página de registro e crie sua conta! 📝
Login: Faça login com suas credenciais. 🔑
Publicar Posts: Compartilhe suas ideias e interaja com os posts de outros usuários! 🖊️
Curtir e Comentar: Mostre amor pelos posts e deixe seus comentários! ❤️💬
🛠️ Testando a API com o Postman
Registro: POST /api/users/register
Login: POST /api/users/login
Criar Post: POST /api/posts
Curtir Post: PUT /api/posts/:id/like
Comentar Post: POST /api/posts/:id/comment
👉 Não esqueça de adicionar o token JWT no cabeçalho das requisições que precisam de autenticação!

🤝 Contribuição
Contribuições são bem-vindas! Sinta-se à vontade para abrir um issue ou enviar um pull request. 🚀


DEPENDECIAS USADAS

back-end

npm i bcryptjs cors dotenv express express-validator jsonwebtoken mongoose multer

front-end

npm i react-icons react-router-dom @reduxjs/toolkit
