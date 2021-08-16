import express from "express";
import path from "path";
import routerApi from "./routes/productos.js";
import web from "./routes/web.js";
import fs from "fs";

/** INICIALIZACION API con EXPRESS */
const app = express();
const puerto = 8080;
const server = app.listen(puerto, () =>
  console.log("Server up en puerto", puerto)
);

app.set("view engine", "pug");
const viewsPath = path.resolve(__dirname, "../views/");
app.set("views", viewsPath);
//const defaultLayerPath = path.resolve(__dirname, "../views/layouts/index.hbs");
//const partialDirPath = path.resolve(__dirname, "../views/partials");

//app.engine(
//  "hbs",
//  handlebars({
//    layoutsDir: layoutDirPath,
//    extname: "hbs",
//    defaultLayout: defaultLayerPath,
//    partialsDir: partialDirPath,
//  })
//);

server.on("error", (err) => {
  console.log("ERROR ATAJADO", err);
});

const publicPath = path.resolve(__dirname, "../public");
app.use(express.static(publicPath));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*** DEFINICION ROUTERS ***/

app.use("/api", routerApi);
app.use("/productos", web);
//app.get("/productos/vista", (req, res) => {
//res.render("main", { mensaje: "HOLA MUNDO" }); // Se muestra la plantilla hello.pug
//});
