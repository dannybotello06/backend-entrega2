const socket=io();

const formNewProduct= document.getElementById("formNewProduct");
formNewProduct.addEventListener("submit",(event)=>{

    event.preventDefault();
    const formData = new FormData(formNewProduct);

    const productData={};

    formData.forEach((value,key)=>{

        productData[key]=value;
    })

    socket.emit("newProduct",productData)

})

socket.on("productAdded",(newProduct,id)=>{

    const productList= document.getElementById("productsList");

    productList.innerHTML+=
    `<li id=${id}>${newProduct.title}-${newProduct.price}
    <form id="deleteProduct">
    <input type="hidden" id="id" name="id" value=${id}>
    <button type="submit">Borrar</button>
    </form> </il> `
    location.reload();  
});


const deleteProduct= document.getElementById("deleteProduct");
deleteProduct.addEventListener("submit",(event)=>{

   
    const formData = new FormData(deleteProduct);

    const productData={};

    formData.forEach((value,key)=>{

        productData[key]=value;
    })

    socket.emit("deleteProduct",productData)
})


socket.on("productUpdate",(id)=>{

    console.log("productUpdate");
    node=document.getElementById(id);
    node.parentNode.removeChild(node);

   

});

