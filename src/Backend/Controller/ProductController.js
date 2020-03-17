const ProductModel = require("../Models/ProductModel");
const CategoryModel = require("../Models/CategoryModel");
const AsyncWrapper = require("../Utils/AsyncWrapper");
const AppError = require("../Utils/AppError");

exports.AddProduct = AsyncWrapper(async (req, res, next) => {
  const {
    name,
    description = "No Description",
    price,
    picture = "No Image Yet",
    category
  } = req.body;
  const vendor = req.User._id;
  const IsCategory = await CategoryModel.findById(category);
  if (!IsCategory) {
    return next(new AppError("This Category Doesn't Exist", 404));
  }
  const Product = await ProductModel.create({
    name,
    description,
    price,
    picture,
    category,
    vendor
  });
  if (!Product) {
    return next(new AppError("Server Is Down Plz Try Again", 500));
  }
  res.status(201).json({
    Status: "Success",
    Product
  });
});

exports.RemoveProduct = AsyncWrapper(async (req, res, next) => {
  // Check whether Product exist or not
  const Product = await ProductModel.findById(req.params.Id);
  if (!Product) {
    return next(new AppError("Could Not Find This Product", 404));
  }
  // If product exist check whether the vendor who is removing is the one who created this product
  if (Product.vendor.toString() !== req.User._id.toString()) {
    return next(new AppError("You Are Not Allowed", 401));
  }
  await Product.remove();
  res.status(200).json({
    Status: "Success",
    Product
  });
});

exports.UpdateProduct = AsyncWrapper(async (req, res, next) => {
  // Find product if it exists
  const Product = await ProductModel.findById(req.params.Id);
  if (!Product) {
    return next(new AppError("Could Not Find This Product", 404));
  }
  // We changed Product.vendor & req.User._id toString because they both are project which never be same-
  // If product exists then check whether the person who is deleting is the same who created
  if (Product.vendor.toString() !== req.User._id.toString()) {
    return next(new AppError("You Are Not Allowed For This Action", 401));
  }
  for (const key in req.body) {
    Product[key] = req.body[key];
  }
  await Product.save();
  res.status(200).json({
    Status: "Success",
    Product
  });
});

exports.DeleteAll = AsyncWrapper(async (req, res, next) => {
  const Product = await ProductModel.deleteMany({ vendor: req.User._id });
  res.status(200).json({
    Status: "Success",
    Count: `${Product.deletedCount} Items Deleted`
  });
});

exports.GetAll = AsyncWrapper(async (req, res, next) => {
  const Product = await ProductModel.find({ vendor: req.User._id });
  res.status(200).json({
    Status: "Success",
    Count: Product.length,
    Product
  });
});
