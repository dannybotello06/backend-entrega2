import express from "express"
import productRouter from "./routes/product.router.js";
import cartRouter from "./routes/cart.router.js";
import {engine} from "express-handlebars"
import {Server} from "socket.io"
import http from "http"
import viewsRouter from "./routes/views.router.js";
import ProductManager from "./classManager/ProductManager.js"

const app = express();
const server = http.createServer(app)
const io = new Server(server)


//handlebars

app.engine("handlebars",engine());
app.set("view engine","handlebars");
app.set("views","./src/views");


app.use(express.json());
const PORT = 8080;
app.use(express.static("public"));

//endpoints

app.use("/api/products",productRouter);

app.use("/api/carts",cartRouter);

app.use("/",viewsRouter);


//websockets
const file="./src/data/products.json";
const productManager = new ProductManager(file);
io.on("connection",(socket)=> {
   console.log("operaciones");
    socket.on("newProduct",async(productData)=>{

        try {
         
            const newProduct = await productManager.addProductID(productData);
            const { message } = newProduct;
            io.emit("productAdded",productData,message);
        } catch (error) {
            res.status(500).send({message: error.message});
        }

    })

    socket.on("deleteProduct",async(productData)=>{

        try {
         
            console.log("deleteProduct");
            const { id } = productData;
            const newProduct = await productManager.deleteProductID(id);
            io.emit("productUpdate",id);  

        } catch (error) {
            res.status(500).send({message: error.message});
        }

       

    })


})



server.listen(PORT,()=> console.log(`servidor iniciado en: http://localhost:${PORT}`));
