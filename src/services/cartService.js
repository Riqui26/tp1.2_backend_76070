class CartService {
  constructor({ path }) {
    this.path = path;
    this.carts = [];
    this.loadCarts();
  }

  loadCarts() {
    if (fs.existsSync(this.path)) {
      try {
        this.carts = JSON.parse(fs.readFileSync(this.path, "utf-8"));
      } catch (error) {
        console.error("Error parsing JSON, initializing empty carts array");
        this.carts = [];
      }
    } else {
      this.carts = [];
    }
  }

  async createCart() {
    const id = uuid();
    const newCart = { id, products: [] };
    this.carts.push(newCart);
    await this.saveCarts();
    return newCart;
  }

  async getCartById(id) {
    return this.carts.find(cart => cart.id === id);
  }

  async addProductToCart(cartId, productId) {
    const cart = await this.getCartById(cartId);
    if (!cart) return null;

    const existingProduct = cart.products.find(product => product.product === productId);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.products.push({ product: productId, quantity: 1 });
    }

    await this.saveCarts();
    return cart;
  }

  async getProductsInCart(cartId) {
    const cart = await this.getCartById(cartId);
    return cart ? cart.products : null;
  }

  async saveCarts() {
    try {
      await fs.promises.writeFile(this.path, JSON.stringify(this.carts, null, 2));
    } catch (error) {
      console.error("Error saving carts to file");
    }
  }
}

export const cartService = new CartService({
  path: "./src/db/carts.json",
});