const Express = require("express");
const UserController = require("../Controller/UserController");
const Router = Express.Router();

Router.route("/Signup").post(UserController.SignUp);
Router.route("/Login").post(UserController.LogIn);

Router.use(UserController.Protected);

Router.route("/ChangePassword").patch(UserController.ChangePassword);

Router.route("/Filter/:Id").get(UserController.FilterProduct);

Router.route("/Me")
  .get(UserController.GetMe)
  .patch(UserController.Update);

Router.route("/GetAll").get(
  UserController.RestrictTo("admin"),
  UserController.GetAll
);

module.exports = Router;
