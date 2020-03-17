const Express = require("express");
const CategoryController = require("../Controller/CategoryController");
const UserController = require("../Controller/UserController");
const Router = Express.Router();

Router.use(UserController.Protected, UserController.RestrictTo("admin"));

Router.route("/")
  .get(CategoryController.GetAll)
  .post(CategoryController.AddCategory);
Router.route("/:Id")
  .get(CategoryController.GetSpcificCategory)
  .delete(CategoryController.RemoveCategory)
  .patch(CategoryController.UpdateCategory);

module.exports = Router;
