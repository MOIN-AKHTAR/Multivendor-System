const UserModel = require("../Models/UserModel");
const AsyncWrapper = require("../Utils/AsyncWrapper");
const AppError = require("../Utils/AppError");

exports.SignUp = AsyncWrapper(async (req, res, next) => {
  const User = await UserModel.create(req.body);
  if (!User) {
    return next(new AppError("Server Is Not Responding", 500));
  }
  const Token = User.GenerateToken(User._id);

  res.status(201).send({
    Status: "Success",
    Token,
    User
  });
});

exports.LogIn = AsyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;
  const User = await UserModel.findOne({
    email
  });
  if (!User) {
    return next(new AppError("Invalid Email Or Password", 404));
  }
  const IsCorrectPassword = await User.MatchPassword(password, User.password);
  if (!IsCorrectPassword) {
    return next(new AppError("Invalid Email Or Password", 404));
  }
  const Token = User.GenerateToken(User._id);
  res.status(200).send({
    Status: "Success",
    Token,
    User
  });
});

exports.Data = (req, res, next) => {
  res.status(200).json({
    Message: "You Get Data"
  });
};
exports.Protected = AsyncWrapper(async (req, res, next) => {
  let Token;
  // 1) Check if the Token There
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    Token = req.headers.authorization.split(" ")[1];
  } else {
    return next(new AppError("You Are Not Login", 401));
  }
  // 2) Verify The Token
  const Decoder = UserModel.VerifyToken(Token);
  // 3) Check if the user exists
  const user = await UserModel.findById(Decoder.Id);
  if (!user) {
    return next(new AppError("This User Doesn't Exists Anymore!!!", 401));
  }
  // Grant Access To Other Routes-
  req.User = user;
  next();
});
// 4) Check if the user changed password after the token issued
// const Ischanged = user.PasswordChanged(Decoder.iat);
// if (Ischanged) {
//   return next(new AppError("Password Changed.Please Login Again", 401));
// }
