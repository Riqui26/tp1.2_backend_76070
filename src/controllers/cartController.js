class CartController {
  constructor(cartService) {
    this.cartService = cartService;
  }

  async createCart(req, res) {
    try {
      const cart = await this.cartService.create();
      res.status(201).json(cart);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async getCartProducts(req, res) {
    const { cid } = req.params;
    try {
      const products = await this.cartService.getProductsByCartId(cid);
      if (!products) {
        return res.status(404).json({ message: "Cart not found" });
      }
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async addProductToCart(req, res) {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    try {
      const updatedCart = await this.cartService.addProductToCart(cid, pid, quantity);
      if (!updatedCart) {
        return res.status(404).json({ message: "Cart not found" });
      }
      res.status(200).json(updatedCart);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default CartController;