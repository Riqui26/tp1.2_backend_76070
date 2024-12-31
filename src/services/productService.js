class ProductService {
  constructor() {
    this.products = [];
    this.loadProducts();
  }

  loadProducts() {
    const fs = require('fs');
    const path = './src/db/products.json';
    
    if (fs.existsSync(path)) {
      this.products = JSON.parse(fs.readFileSync(path, 'utf-8'));
    }
  }

  getAllProducts(limit) {
    if (limit) {
      return this.products.slice(0, limit);
    }
    return this.products;
  }

  getProductById(id) {
    return this.products.find(product => product.id === id);
  }

  addProduct(productData) {
    const fs = require('fs');
    const { v4: uuid } = require('uuid');
    
    const newProduct = { id: uuid(), ...productData, status: true };
    this.products.push(newProduct);
    this.saveProducts();
    return newProduct;
  }

  updateProduct(id, updatedData) {
    const productIndex = this.products.findIndex(product => product.id === id);
    if (productIndex === -1) return null;

    const updatedProduct = { ...this.products[productIndex], ...updatedData };
    this.products[productIndex] = updatedProduct;
    this.saveProducts();
    return updatedProduct;
  }

  deleteProduct(id) {
    const productIndex = this.products.findIndex(product => product.id === id);
    if (productIndex === -1) return null;

    const deletedProduct = this.products.splice(productIndex, 1);
    this.saveProducts();
    return deletedProduct[0];
  }

  saveProducts() {
    const fs = require('fs');
    fs.writeFileSync('./src/db/products.json', JSON.stringify(this.products, null, 2));
  }
}

module.exports = ProductService;