
import 'dotenv/config';
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";

// Conecta ao banco de dados utilizando a string de conexão fornecida como variável de ambiente
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);


// Função assíncrona para buscar todos os posts do banco de dados
export async function getTodosPosts() {
    // Seleciona o banco de dados 'imersao-alura'
    const db = conexao.db("imersao-alura");
    // Seleciona a coleção 'posts' dentro do banco de dados
    const colecao = db.collection("posts");
    // Retorna todos os documentos (posts) da coleção como um array
    return colecao.find().toArray();
}

export async function criarPost(novoPost) {
    const db = conexao.db("imersao-alura");
    const colecao = db.collection("posts");
    return colecao.insertOne(novoPost);
}

export async function atualizarPost(id, novoPost) {
    const db = conexao.db("imersao-alura");
    const colecao = db.collection("posts");
    const objID = ObjectId.createFromHexString(id);
    return colecao.updateOne({_id: new ObjectId(objID)}, {$set:novoPost});
}