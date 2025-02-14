
import fs from "fs";

class ProductManager {
  constructor(pathfile) {
    this.pathfile = pathfile;
  }

  //getProducts

  getProducts = async () => {
    try {
      //leer archivo y guardamos contenido

      const fileData = await fs.promises.readFile(this.pathfile, "utf-8");
      if (fileData.length === 0) {
        return ({error:"No se encuentra productos registrados "});
    }
      const data = JSON.parse(fileData);
      if (fileData.length > 0) {
        return data;
    }
    return ({error:"No se encuentra productos registrados "});
     
    } catch (error) {
      throw new Error("Error consultando los productos " + error.message);
    }
  };

  //getProductById
  getProductID = async (id) => {
    try {
      const fileData = await fs.promises.readFile(this.pathfile, "utf-8");
      if (fileData.length === 0) {
        return ({error:"No se encuentra el producto "+ id})
    }
    
      const data = JSON.parse(fileData);
      const resulfilter = data.find((r) => r.id === parseInt(id));
      return resulfilter;
    } catch (error) {
      throw new Error("Error consultando el producto " + error.message);
    }
  };

  //addProduct
  addProductID = async (product) => {
    try {

     
      const { title, description, code, price, stock, category, thumbnail } =
        product;
      var status = true;
      const fileData = await fs.promises.readFile(this.pathfile, "utf-8");
      var id = 1;
      var data = new Array();
      if (fileData.length > 5) {
        data = JSON.parse(fileData);
        id = Math.max(...data.map((obj) => obj.id || 0)) + 1;
      }
    
      data.push({
        id,
        title,
        description,
        code,
        price,
        stock,
        status,
        category,
        thumbnail,
      });

      var fileRes = JSON.stringify(data).toString();
      fs.promises.writeFile(this.pathfile, fileRes);
      return ({message:id})
    } catch (error) {
      throw new Error("Error creando el producto " + error.message);
    }
  };

  //setProductById

  setProductID = async (id, product) => {
    try {
      const fileData = await fs.promises.readFile(this.pathfile, "utf-8");
      const data = JSON.parse(fileData);
      const index = data.findIndex((r) => r.id === parseInt(id));
      if (index === -1) {
        return ({error:"Producto no encontrado"})
      } else {
        var status = true;
        const { title, description, code, price, stock, category, thumbnail } =
          product;
        var id = parseInt(id);
     
        data[index] = {
          id,
          title,
          description,
          code,
          price,
          status,
          stock,
          category,
          thumbnail,
        };
        var fileRes = JSON.stringify(data).toString();
        fs.promises.writeFile(this.pathfile, fileRes);
        return ({message:"Producto actualizado " })
      }
    } catch (error) {
      throw new Error("Error actualizando el producto " + error.message);
    }
  };

  //deleteProductById

  deleteProductID = async (id) => {
    try {
      const fileData = await fs.promises.readFile(this.pathfile, "utf-8");
      const data = JSON.parse(fileData);

      console.log(id);
      const index = data.findIndex((r) => r.id === parseInt(id));


      if (index === -1) {
        return ({error:"Producto no encontrado"})
      } else {
        data.splice(index, 1);
        var fileRes = JSON.stringify(data).toString();
        fs.promises.writeFile(this.pathfile, fileRes);
        return ({message:"Producto Borrado " })
      }
    } catch (error) {
      throw new Error(" Error borrando el  producto " + error.message);
    }
  };
}

export default ProductManager;
