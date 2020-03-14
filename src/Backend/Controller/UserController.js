const UserModel = require("../Models/UserModel");
const ProductModel = require("../Models/ProductModel");
const AsyncWrapper = require("../Utils/AsyncWrapper");
const AppError = require("../Utils/AppError");

exports.SignUp = AsyncWrapper(async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  const User = new UserModel({
    firstName,
    lastName,
    email,
    password,
    image: req.file.path
  });
  const Exists = await UserModel.findOne({ email });
  if (Exists) {
    return next(new AppError("Please Select Unique Email", 400));
  }
  await User.save();
  if (!User) {
    return next(new AppError("Server Is Not Responding", 500));
  }

  const Token = User.GenerateToken(User._id);

  res.status(201).send({
    Status: "Success",
    Token,
    Id: User._id
  });
});

exports.LogIn = AsyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;
  console.log(req.body);
  const User = await UserModel.findOne({
    email
  });
  if (!User) {
    return next(new AppError("Invalid Email Or Password", 404));
  }
  console.log(User);
  const IsCorrectPassword = await User.MatchPassword(password, User.password);
  console.log(IsCorrectPassword);
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

exports.GetMe = AsyncWrapper(async (req, res, next) => {
  res.status(200).send({
    Status: "Success",
    User: req.User
  });
});

exports.Update = AsyncWrapper(async (req, res, next) => {
  const ShallowBody = { ...req.body };
  const NotAllowedKeys = ["password"];
  NotAllowedKeys.forEach(Item => delete ShallowBody[Item]);
  for (Keys in ShallowBody) {
    req.User[Keys] = ShallowBody[Keys];
  }
  if (ShallowBody.email) {
    req.User.image = req.User.GetAvatar();
  }
  await req.User.save();
  res.status(200).json({
    Status: "Success",
    User: req.User
  });
});

exports.ChangePassword = AsyncWrapper(async (req, res, next) => {
  const { email = "", password = "" } = req.body;
  if (req.User.email === email) {
    req.User.password = password;
    await req.User.save();
    return res.status(200).send({
      Status: "Success",
      User: req.User
    });
  } else {
    return next(new AppError("You Are Not Allowed To Take This Action", 401));
  }
});

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

  // 4) Check if the user changed password after the token issued
  // const Ischanged = user.PasswordChanged(Decoder.iat);
  // if (Ischanged) {
  //   return next(new AppError("Password Changed.Please Login Again", 401));
  // }
});

// USED TO SELECT ALL THE VENDORS
exports.GetAll = AsyncWrapper(async (req, res, next) => {
  const Vendors = await UserModel.find({ role: "vendor" });
  res.status(200).json({
    Status: "Success",
    Count: Vendors.length,
    Vendors
  });
});

// Making Restriction So That Only Desired Uses Can Access This Path/Route
exports.RestrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.User.role)) {
      return next(new AppError("You Are Not Allowed For This Action", 403));
    }
    next();
  };
};

// User Can Filter Product From All Of The Available Products-
exports.FilterProduct = AsyncWrapper(async (req, res, next) => {
  const Products = await ProductModel.find({
    category: req.params.Id
  });
  if (Products.length === 0) {
    return next(new AppError("Sorry, Can Not Find This Prduct", 404));
  }
  res.status(200).json({
    Status: "Success",
    Count: Products.length,
    Products
  });
});

exports.Pay = AsyncWrapper(async (req, res, next) => {
  const Data = [];

  // Removing Redundency And Optimizing Query By Accumalating Data Related To Single Vendor Into Single Object
  req.User.items.forEach(Item => {
    const ItemFound = Data.find(
      Vendor => Item.vendor.toString() === Vendor.vendor.toString()
    );
    if (!ItemFound) {
      const Obj = {
        vendor: Item.vendor,
        totalAmount: Item.total
      };
      Data.push(Obj);
    } else {
      ItemFound.totalAmount = ItemFound.totalAmount + Item.total;
    }
  });

  // Executing Query And It Will Return Pending Promises
  const promise = Data.map(async Item => {
    const Vendor = await UserModel.findById(Item.vendor);
    Vendor.totalAmount = Vendor.totalAmount + Item.totalAmount;
    return await Vendor.save();
  });

  // Executing All The Pending Promises-
  await Promise.all(promise);

  res.status(200).json({
    Status: "Success",
    Count: Data.length,
    Data
  });
});
