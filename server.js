import express from "express";
import routes from "./src/routes/postRoutes.js";



const app = express(); // Cria uma instância do Express, que será o nosso servidor web
routes(app)
app.use(express.static("uploads"))

// Inicia o servidor na porta 3000 e mostra uma mensagem no console
app.listen(3000, () => {
    console.log("servidor escutando...");
});



