import {getTodosProdutos, criarProduto, atualizarProduto} from "../model/produtosModel.js";
import fs from "fs"

export async function listarProdutos(req, res) { 
    const resultado = await getTodosProdutos()
    res.status(200).json(resultado);

};

export async function enviarProduto(req, res){
    const novoProduto = req.body;
    try {
        const produtoCriado = await criarProduto(novoProduto);
        res.status(200).json(produtoCriado);
    } catch(erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"});
    }
};
export async function uploadImagem(req, res){
    const novoProduto = {
        
    }
    try {
        const produtoCriado = await criarProduto(novoProduto);
        const imagemAtualizada = `uploads/${produtoCriado.insertedId}.png`
        fs.renameSync(req.file.path, imagemAtualizada)
        res.status(200).json(produtoCriado);
    } catch(erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"});
    }
};

export async function atualizarNovoProduto(req, res){
    const id = req.params.id;
    const urlImg = `http://localhost:3000/${id}.png`
    const produto = {
        imgUrl : urlImg,
        categoria : req.body.categoria,
        nome : req.body.nome,
        preco : req.body.preco
    }
    try {
        const produtoCriado = await atualizarProduto(id, Produto);
        res.status(200).json(produtoCriado);
    } catch(erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"});
    }
}