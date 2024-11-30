import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";


const conexao = await conectarAoBanco(process.env.STR_CONEXAO)


export  async function getTodosProdutos() {
    const db = conexao.db("NBProdutos")
    const colecao = db.collection("produtos")
    return colecao.find().toArray()
}

export async function criarProduto(novoProduto) {
    const db = conexao.db("NBProdutos")
    const colecao = db.collection("produtos")
    return colecao.insertOne(novoProduto)

}

export async function atualizarProduto(id, novoProduto ) {
    const db = conexao.db("NBProdutos")
    const colecao = db.collection("produtos")
    const objectID = ObjectId.createFromHexString(id)
    return colecao.updateOne({_id: new ObjectId(objectID)}, {$set:novoProduto})

}