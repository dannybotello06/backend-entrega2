import express from "express"
import ProductManager from "../classManager/ProductManager.js"


const productRouter = express.Router();
const file="./src/data/products.json";
const productManager = new ProductManager(file);

//GET  "/api/products" 
productRouter.get("/",async(req,res)=> {

    try {
        const data = await productManager.getProducts();
        if( data.hasOwnProperty('error'))
        {
            res.status(500).send(data);
        }
        res.status(200).send(data);

        
    } catch (error) {
        res.status(500).send({message: error.message});
    }

})


//GET  "/api/product/:pid"

productRouter.get("/:id",async(req,res)=> {

    try {
        const{id}=req.params;
      
       
        const data = await productManager.getProductID(id)
        if( data.hasOwnProperty('error'))
            {
                res.status(500).send(data);
            }
      
      
        res.status(200).send(data);

        
    } catch (error) {
        res.status(500).send({message: error.message});
    }

})


//POST "/api/product
productRouter.post("/",async(req,res)=> {

    try {
        const body=req.body;
        const data = await productManager.addProductID(body);
        if( data.hasOwnProperty('error'))
            {
                res.status(500).send(data);
            }
        res.status(200).send(data); 
    } catch (error) {
        res.status(500).send({message: error.message});
    }

})



//PUT  "/api/product/:pid"

productRouter.put("/:id",async(req,res)=> {

    try {
        const{id}=req.params;
        const body=req.body;
        const data = await productManager.setProductID(id,body);
        if( data.hasOwnProperty('error'))
            {
                res.status(500).send(data);
            }
        res.status(200).send(data); 
    } catch (error) {
        res.status(500).send({message: error.message});
    }

})

//DELETE  "/api/product/:pid"

productRouter.delete("/:id",async(req,res)=> {

    try {
        const{id}=req.params;
        const data = await productManager.deleteProductID(id);
        if( data.hasOwnProperty('error'))
            {
                res.status(500).send(data);
            }
        res.status(200).send(data); 
    } catch (error) {
        res.status(500).send({message: error.message});
    }

})




export default productRouter;