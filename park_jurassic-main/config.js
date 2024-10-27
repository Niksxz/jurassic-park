const mongoose = require("mongoose")
const connect = mongoose.connect("mongodb+srv://Rafa:TesteJurassicPark@login.1s8my.mongodb.net/?retryWrites=true&w=majority&appName=login")


connect.then(() => {
    console.log("conectado")
})
.catch(() => {
    console.log("não foi possivel conectar")
})


const LoginSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true
    },
    email: {
        type:String,
        required: true
    },
    password: {
        type:String,
        required: true
    }
})

const collection = new mongoose.model("user", LoginSchema)


module.exports = collection;