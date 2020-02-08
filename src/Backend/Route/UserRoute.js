const Express = require("express");
const UserController = require("../Controller/UserController");
const Router = Express.Router();

Router.route("/Signup").post(UserController.SignUp);
Router.route("/Login").post(UserController.LogIn);

Router.use(UserController.Protected);

Router.route("/ChangePassword").patch(UserController.ChangePassword);

Router.route("/Me")
  .get(UserController.GetMe)
  .patch(UserController.Update);

module.exports = Router;
