const CategoryModel = require("../Models/CategoryModel");
const AsyncWrapper = require("../Utils/AsyncWrapper");
const AppError = require("../Utils/AppError");

exports.AddCategory = AsyncWrapper(async (req, res, next) => {
  const Category = await CategoryModel.create({
    name: req.body.name,
    admin: req.User._id
  });
  if (!Category) {
    return next(new AppError("Server Is Down Plz Try Again", 500));
  }
  res.status(201).json({
    Status: "Success",
    Category
  });
});

exports.RemoveCategory = AsyncWrapper(async (req, res, next) => {
  const Category = await CategoryModel.findByIdAndDelete(req.params.Id);
  if (!Category) {
    return next(new AppError("Can Not Find This Category", 404));
  }
  res.status(203).json({
    Status: "Success",
    Category
  });
});

exports.GetAll = AsyncWrapper(async (req, res, next) => {
  const Categories = await CategoryModel.find({});
  res.status(200).json({
    Status: "Success",
    Count: Categories.length,
    Categories
  });
});
