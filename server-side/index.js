require('dotenv').config('../.env')
const express = require('express')
//const cors = require ('cors')
const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');
const { insertMany } = require('./database');
const BibliotecaModel = require('./database');


/////////////////////////////////////////////////////////////

//app.use(cors())
const app = express();
app.use(express.json());

const url = process.env.DB_ATLAS;

try {
    mongoose.connect(url);
    console.log("Sucesso")
} catch (e) {
    console.log("Deu erro puta")

}

/////////////////////////////////////////////////////////////////

//listar
app.get("/listar/", async (req, res) => {

    const listar = await BibliotecaModel.find()

    res.json(listar)
})

//add
app.post("/", async (req, res) => {

    const { titulo, editora, foto, autores } = req.body

    const livro = new BibliotecaModel({ titulo, editora, foto, autores })

    try {
        await BibliotecaModel.insertMany(livro)
    } catch (e) {
        res.send(e)
    }


    res.sendStatus(200)

})

//update por id
app.put("/update/:id", async (req, res) => {

    try {
        await BibliotecaModel.findOneAndUpdate({ _id: req.params.id }, req.body)
    } catch (e) {
        res.send(e)
    }


    res.sendStatus(200)


})
//deletar por id
app.delete("/delete/:_id", async (req, res) => {

    deletarLivro = await BibliotecaModel.remove({ _id: req.params._id })

    try {
        res.sendStatus(200)
    } catch (e) {
        res.send(e)
    }


})



const PORT = 8080;

app.listen(PORT, () => {

    console.log(`Rodando na porta ${PORT}`)
})