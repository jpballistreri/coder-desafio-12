import express from "express";
import path from "path";
import routerApi from "./routes/productos.js";
import web from "./routes/web.js";
import fs from "fs";

import * as http from "http";
import io from "socket.io";

/** INICIALIZACION API con EXPRESS */
const app = express();
const puerto = 8080;

const publicPath = path.resolve(__dirname, "../public");
app.use(express.static(publicPath));

app.set("view engine", "pug");
const viewsPath = path.resolve(__dirname, "../views/");
app.set("views", viewsPath);

const myServer = http.Server(app);

myServer.listen(puerto, () => console.log("Server up en puerto", puerto));

//server.on("error", (err) => {
//  console.log("ERROR ATAJADO", err);
//});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*** DEFINICION ROUTERS ***/

app.use("/api", routerApi);
app.use("/productos", web);

const myWSServer = io(myServer);

//myWSServer.on("connection", function (socket) {
//  console.log("\n\nUn cliente se ha conectado");
//  console.log(`ID DEL SOCKET DEL CLIENTE => ${socket.client.id}`);
//  console.log(`ID DEL SOCKET DEL SERVER => ${socket.id}`);
//
//  socket.on("new-message", function (data) {
//    const newMessage = {
//      socketId: socket.client.id,
//      message: data,
//    };
//    console.log(newMessage);
//    messages.push(newMessage);
//
//    //PARA RESPONDERLE A UN SOLO CLIENTE
//    // socket.emit('messages', messages);
//
//    //PARA ENVIARLE EL MENSAJE A TODOS
//    myWSServer.emit("messages", messages);
//
//    //PARA ENVIARLE MENSAJE A TODOS MENOS AL QUE ME LO MANDO
//    // socket.broadcast.emit('messages', messages);
//  });
//
//  socket.on("askData", (data) => {
//    console.log("ME LLEGO DATA");
//    socket.emit("messages", messages);
//  });
//});
//
