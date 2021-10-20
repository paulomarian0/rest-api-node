const mongoose = require('mongoose')

const Biblioteca = new mongoose.Schema({
    titulo : {
        type: String,
        required: true
    },
    editora: {
        type:String,
        required: true
    },
    foto: {
        type:String,
        required:false
    },
    autores: {
        type:String,
        required: true
    }
})

const BibliotecaModel = mongoose.model('Livros', Biblioteca)

module.exports = BibliotecaModel