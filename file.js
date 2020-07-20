/**
Hacer un programa que nos permita cargar/modificar/borrar un catalogo de
productos (deberían tener "id", como identificador único de número, por ej: 1, 2, 3.; título, descripción
de producto y precio (float)).
*/

const catalogue = {
    productList: [],
    idAssigner: 1,
    validFields: ["title", "description", "price"],
    addProduct: function (title, description, price) {
        let product = {
            id: this.idAssigner,
            title,
            description,
            price,
        }
        this.productList.push(product);
        this.idAssigner++
    },
    findById: function (id) {        
        const index = this.productList.findIndex(product => id === product.id);
        if (index == -1) throw new Error ("El id ingresado no corresponde a ningún producto existente.");
        return index;   
    },
    validateFields: function (field) {
        if (!this.validFields.includes(field)) throw new Error ("El campo ingresado no corresponde a ningún campo editable.");
    },
    modifyProduct: function (id, field, newValue) {
        const index = this.findById(id);
        this.validateFields(field);
        this.productList[index][field] = newValue;
    },
    removeProduct: function (id) {
        this.findById(id);
        return this.productList.filter(product => id !== product.id);
    }
}

catalogue.addProduct("Gato", "Juguete de peluche", 250.68);
catalogue.addProduct("Perro", "Juguete de peluche", 258.89);
catalogue.addProduct("Elefante", "Juguete de peluche", 200.89);
catalogue.addProduct("Mono", "Juguete de peluche", 230.89);


/**
Además de esto vamos a necesitar un carrito de compras
 * que nos permita cargar/borrar productos de 
 * nuestro carrito, sumar el precio total de los elementos
 * de nuestro carrito. 
 */

const cart = {
    productList: [],
    idAssigner: 1,
    findByCatalogueId: function (id) {        
        return this.productList.findIndex(product => product.catalogueId === id);         
    },
    addProduct: function (catalogueId, quantity) {
        const catalogueIndex = catalogue.findById(catalogueId);
        const cartIndex = this.findByCatalogueId(catalogueId);
        if (cartIndex === -1) {
            let cartProduct = {
                ...catalogue.productList[catalogueIndex],
                id: this.idAssigner,
                catalogueId: catalogueId,
                quantity,
            }
            this.productList.push(cartProduct);
            this.idAssigner++
        }
        else {
            this.productList[cartIndex].quantity += quantity; 
        }   
    },
    removeProduct: function (catalogueId, quantity) {
        const cartIndex = this.findByCatalogueId(catalogueId);
        if (cartIndex === -1) throw new Error ("El producto ingresado no existe en el carrito.");
        this.productList[cartIndex].quantity -= quantity;
        if (this.productList[cartIndex].quantity <= 0) {
            this.productList.splice(cartIndex,1);
        }
    },
    addTotalPrice: function () {
        return this.productList.reduce((totalPrice, product) => totalPrice += (product.price*product.quantity), 0);
    }     
}