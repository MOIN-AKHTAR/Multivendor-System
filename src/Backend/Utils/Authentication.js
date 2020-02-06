const User = require("./../Model/UserModel");
const Asyncfunc = require("./AsyncWrapper");
const AppError = require("./AppError");
const Bcrypt = require("bcryptjs");

exports.Signup = Asyncfunc(async (req, res, next) => {
  // Destructuring
  const {
    Name,
    Email,
    Password,
    ConformPassword,
    PasswordChangedAt,
    Role,
    Photo = "No Image"
  } = req.body;
  const NewUser = await User.create({
    Name,
    Email,
    Password,
    ConformPassword,
    Role,
    PasswordChangedAt,
    Photo
  });
  if (!NewUser) {
    return next(new AppError("Unable To Create User", 400));
  }
  const Token = NewUser.GenerateToken(NewUser._id);
  res.status(201).json({
    Status: "User Successfully Created",
    Token,
    NewUser
  });
});

exports.Login = Asyncfunc(async (req, res, next) => {
  const { Email, Password } = req.body;
  const user = await User.findOne({ Email }).select("+Password");
  if (!user) {
    return next(new AppError("Invalid Email Or Password", 404));
  }
  const isExist = await Bcrypt.compare(Password, user.Password);
  if (!isExist) {
    return next(new AppError("Invalid Email Or Password", 404));
  }
  const Token = user.GenerateToken(user._id);
  res.status(200).json({
    Status: "Success",
    Token,
    user
  });
});

exports.Protected = Asyncfunc(async (req, res, next) => {
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
  const Decoder = User.VerifyToken(Token);

  // 3) Check if the user exists
  const user = await User.findById(Decoder.id);
  if (!user) {
    return next(new AppError("This User Doesn't Exists Anymore!!!", 401));
  }
  // 4) Check if the user changed password after the token issued
  const Ischanged = user.PasswordChanged(Decoder.iat);
  if (Ischanged) {
    return next(new AppError("Password Changed.Please Login Again", 401));
  }
  // Grant Access To Other Routes-
  req.User = user;
  next();
});

exports.RestrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.User.Role)) {
      return next(new AppError("You Have No Permission For This Action", 403));
    }
    next();
  };
};
