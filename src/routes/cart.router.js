import express from "express"
import CartManager from "../classManager/CartManager.js"


const cartRouter = express.Router();
const file="./src/data/carts.json";
const cartManager = new CartManager(file);


//GET  "/api/cart/:pid"

cartRouter.get("/:id",async(req,res)=> {

    try {
        const{id}=req.params;
        const data = await cartManager.getCartID(id)  
        if( data.hasOwnProperty('error'))
            {
                res.status(500).send(data);
            }
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({message: error.message});
    }

})


//POST "/api/cart/"

cartRouter.post("/",async(req,res)=> {

    try {
        const{id}=req.params;
        const data = await cartManager.addCart();
        if( data.hasOwnProperty('error'))
            {
                res.status(500).send(data);
            }  
        res.status(201).send(data);
    } catch (error) {
        res.status(500).send({message: error.message});
    }

})


//POST /api/cart/productId"

cartRouter.post("/product/",async(req,res)=> {

    try {
        const{idcart,id,quantity}=req.query;
       
       
        const data = await cartManager.addCartProductID(idcart,id,quantity) ;
        if( data.hasOwnProperty('error'))
            {
                res.status(500).send(data);
            } 
        res.status(201).send(data);
    } catch (error) {
        res.status(500).send({message: error.message});
    }

})


cartRouter.delete("/product/",async(req,res)=> {

    try {
        const{idcart,id}=req.query;
       
       
        const data = await cartManager.deleteCartProductID(idcart,id) ;
        if( data.hasOwnProperty('error'))
            {
                res.status(500).send(data);
            } 
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({message: error.message});
    }

})




export default cartRouter;