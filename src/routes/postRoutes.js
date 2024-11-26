import express from "express";
import multer from "multer";
import cors from "cors";
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsControllers.js";


const corsOptions = {
    origin: "http://localhost:8000",
    optionsSccessStatus: 200
}
// comando para Multer se encontrar e nomear corretamente o arquivo que for upado
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
  })

//chamada do multer para armazenar o arquivo.
  const upload = multer({ dest: "./uploads" , storage})

const routes = (app) => {
    // Habilita o servidor a entender requisições com corpo em formato JSON
    app.use(express.json());
    // Rota GET para buscar todos os posts
    app.use(cors(corsOptions))
    app.get("/posts", listarPosts);
    // Rota  para criar um novo post
    app.post("/posts", postarNovoPost);
    // Rota para fazer upload de uma imagem
    app.post("/upload", upload.single("imagem"), uploadImagem);
    // Rota para atualizar no banco um registro
    app.put("/upload/:id", atualizarNovoPost);
}

export default routes;