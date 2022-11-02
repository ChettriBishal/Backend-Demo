// const express = require("express");
// const server = express();
// const memeList = require("./memeResource")

const express = require("express");
const { copyFileSync } = require("fs");
const server = express();
const memesList = require("./memeResource")

// server.get("/meme",(req, res) =>{
//     const list = [...memeList];
//     const randomIndex = Math.floor(Math.random()* list.length);
//     res.send(`<img src="${list[randomIndex]}"/>`)
// })
server.get("/meme", (req, res) => {
    const list = [...memesList];
    const randomIndex = Math.floor(Math.random() * list.length)
    res.send(`<img src="${list[randomIndex]}"/>`)
});

server.get("/meme/:id", (req, res) =>{
    const { id } = req.params;
    console.log(id)
    const list = [...memesList];
    res.send(`<img src = "${list[id]}"`)
})



// server.get("/",(request))
server.get("/",(request, response) =>{
    response.send("<h1>Hello World </h1>");
})

server.listen(3000,() => console.log("server started on port 3000"))