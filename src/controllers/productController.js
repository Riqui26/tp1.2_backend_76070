class ProductController {
  constructor(productService) {
    this.productService = productService;
  }

  async getAllProducts(req, res) {
    const { limit } = req.query;
    const products = await this.productService.getAll(limit);
    res.status(200).json(products);
  }

  async getProductById(req, res) {
    const { pid } = req.params;
    const product = await this.productService.getById(pid);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  }

  async addProduct(req, res) {
    const { title, description, code, price, status, stock, category, thumbnails } = req.body;

    try {
      const product = await this.productService.create({ title, description, code, price, status, stock, category, thumbnails });
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async updateProduct(req, res) {
    const { pid } = req.params;
    const { title, description, code, price, status, stock, category } = req.body;

    try {
      const product = await this.productService.update({ id: pid, title, description, code, price, status, stock, category });

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async deleteProduct(req, res) {
    const { pid } = req.params;

    try {
      const product = await this.productService.delete(pid);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.status(200).json({ message: "Product deleted successfully", product });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default ProductController;