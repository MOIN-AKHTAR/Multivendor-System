const Express = require("express");
const UserController = require("../Controller/UserController");
const Router = Express.Router();

Router.route("/Signup").post(UserController.SignUp);
Router.route("/Login").post(UserController.LogIn);
Router.route("/Data").get(UserController.Protected, UserController.Data);

module.exports = Router;
