const Express = require("express");
const UserController = require("../Controller/UserController");
const ProductController = require("../Controller/ProductController");
const Router = Express.Router();

Router.use(UserController.Protected, UserController.RestrictTo("vendor"));

Router.route("/")
  .post(ProductController.AddProduct)
  .get(ProductController.GetAll)
  .delete(ProductController.DeleteAll);

Router.route("/:Id")
  .patch(ProductController.UpdateProduct)
  .delete(ProductController.RemoveProduct);

module.exports = Router;
