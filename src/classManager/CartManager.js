import fs from "fs";

class CartManager {
  constructor(pathfile) {
    this.pathfile = pathfile;
  }

  getCartID = async (id) => {
    try {
      const fileData = await fs.promises.readFile(this.pathfile, "utf-8");

      if (fileData.length === 0) {
        return { error: "No hay carrito para el id " + id };
      }
      const data = JSON.parse(fileData);
      const resulfilter = data.find((r) => r.id === parseInt(id));
      if (resulfilter.length === 0) {
        return { error: "No hay carrito para el id " + id };
      }
      return resulfilter;
    } catch (error) {
      throw new Error("Error rconsultando el carrito " + error.message);
    }
  };

  //addCart
  addCart = async () => {
    try {
      const fileData = await fs.promises.readFile(this.pathfile, "utf-8");
      var id = 1;
      var data = new Array();
      if (fileData.length > 0) {
        data = JSON.parse(fileData);
        id = Math.max(...data.map((obj) => obj.id || 0)) + 1;
      }

      const products = new Array();
      data.push({
        id,
        products,
      });
    
      var fileRes = JSON.stringify(data).toString();
      fs.promises.writeFile(this.pathfile, fileRes);
      return { message: "Carrito creado"};

    } catch (error) {
      throw new Error("Error creando el carrito " + error.message);
    }
  };

  //addProductById
  addCartProductID = async (idcart, id, quantity) => {
    try {
      const fileData = await fs.promises.readFile(this.pathfile, "utf-8");
      const data = JSON.parse(fileData);
      if (fileData.length > 0) {
        const index = data.findIndex((r) => r.id === parseInt(idcart));
        if (index === -1) {
          return { error: "no existe el carrito  id " + idcart };
        } else {
          id=  parseInt(id)
          data[index].products.push({id , quantity });
          var fileRes = JSON.stringify(data).toString();
          fs.promises.writeFile(this.pathfile, fileRes);
          return { message: "Producto Agregado para el carrito " + idcart};
        }
      }

      return { error: "no existe el carrito  id " + idcart };
    } catch (error) {
      throw new Error("Error agregando el producto al carrito " + error.message);
    }
  };

  //deleteProductById

  deleteCartProductID = async (idcart, id) => {
    try {
      const fileData = await fs.promises.readFile(this.pathfile, "utf-8");
      const data = JSON.parse(fileData);
      if (fileData.length > 0) {
        const index = data.findIndex((r) => r.id === parseInt(idcart));
        if (index === -1) {
          return { error: "no existe el carrito  id " + idcart };
        } else {

          const indexProduct = data[index].products.findIndex((r) => r.id === parseInt(id));
          if (index === -1) {
            return { error: "no existe el producto "+ id + " el carrito  id " + idcart };
          } else { 
          data[index].products.splice(indexProduct, 1);
          var fileRes = JSON.stringify(data).toString();
          fs.promises.writeFile(this.pathfile, fileRes);
          return { message: "Producto fue borrado para el carrito " + id };
          }
        }
      }

      return { error: "no existe el carrito  id " + idcart };
    } catch (error) {
      throw new Error("Error borrando el producto en el carrito " + error.message);
    }
  };
}

export default CartManager;
