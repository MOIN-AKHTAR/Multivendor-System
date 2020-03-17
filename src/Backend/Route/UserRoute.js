const Express = require("express");
const UserController = require("../Controller/UserController");
const fileUpload = require("../../FrontEnd/Shares/Middleware/UploadImage");
const Router = Express.Router();
Router.route("/Signup").post(fileUpload.single("image"), UserController.SignUp);
Router.route("/Login").post(UserController.LogIn);

// Router.use(UserController.Protected);

Router.route("/ChangePassword").patch(UserController.ChangePassword);

Router.route("/Filter/:Id").get(UserController.FilterProduct);

Router.route("/Me")
  .get(UserController.GetMe)
  .patch(UserController.Update)
  .delete(UserController.Delete);
// UserController.RestrictTo("admin"),
Router.route("/GetAll").get(UserController.GetAll);
//UserController.RestrictTo("user"),
Router.route("/Pay").post(UserController.Pay);

module.exports = Router;
