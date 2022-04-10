const Log = require("elasticsearch/src/lib/log");
const { ProductModel } = require("./../../models/Products");
class ProductsController {
  //GET /
  showAllproduct = async (req, res) => {
    const { sort_by } = req.query;
    const sort = {};
    if (
      ["price_asc", "price_desc", "createdAt_asc", "createdAt_desc"].includes(
        sort_by
      )
    ) {
      const sortArr = sort_by.split("_");
      sort[sortArr[0]] = sortArr[1];
    }
    const filter = req.filter;
    try {
      const products = await ProductModel.find(filter)
        .select({
          name: 1,
          price: 1,
          discount: 1,
          vote_average: 1,
          images: 1,
        })
        .sort(sort);
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({
        error,
      });
    }
  };
  //Get by id : /products/:id
  showProductById = async (req, res) => {
    try {
      const _id = req.params.id;
      const product = await ProductModel.findById(_id);
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ error });
    }
  };
  //get product by category
  //product/category/:id

  //put : /products/:id
  updateProduct(req, res) {}

  createProduct = async (req, res) => {
    let listImages = req.files.map((file) => {
      const index = file.path.indexOf("public");
      return file.path.slice(index + 6);
    });
    if (!req.files) {
      return res.status(400).json({ message: "Upload file failed" });
    }
    try {
      const data = req.body;
      console.log(data);
      const newProduct = new ProductModel({ ...data, images: listImages });
      const product = await newProduct.save();
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ error });
    }
  };
  showProductByCategory = async (req, res) => {
    const filter = req.filter;
    const { sort_by } = req.query;
    const sort = {};
    if (
      ["price_asc", "price_desc", "createdAt_asc", "createdAt_desc"].includes(
        sort_by
      )
    ) {
      const sortArr = sort_by.split("_");
      sort[sortArr[0]] = sortArr[1];
    }
    try {
      const _id = req.params.id;
      if (_id) {
        const products = await ProductModel.find({
          category_id: _id,
          ...filter,
        })
          .select({
            name: 1,
            price: 1,
            discount: 1,
            vote_average: 1,
            images: 1,
          })
          .sort(sort);

        res.status(200).json(products);
      }
    } catch (error) {
      res.status(500).json({
        error,
      });
    }
  };
}

module.exports = new ProductsController();
