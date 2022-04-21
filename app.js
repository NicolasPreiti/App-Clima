const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

//Rutas
const rootPost = require("./routes/rootPost");

//Middlewares
app.use(express.static(`./public`));
app.use(express.json());


app.get("/", (req, res)=>{
});

app.use("/", rootPost);

app.listen(port, ()=>{
    console.log(`🚀🚀 SERVIDOR FUNCIONANDO 🚀🚀`);
});