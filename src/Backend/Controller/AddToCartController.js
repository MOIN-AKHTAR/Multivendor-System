const AddToCartModle = require("../Models/AddToCartModel");
const ProductModel = require("../Models/ProductModel");
const AsyncWrapper = require("../Utils/AsyncWrapper");
const AppError = require("../Utils/AppError");

exports.AddToCart = AsyncWrapper(async (req, res, next) => {
  // Check Whether The Item Buyer Want To Buy Does Exists Or Not-
  const Product = await ProductModel.findById(req.params.Id);
  if (!Product) {
    return next(
      new AppError("Sorry, This Product Is Not Available Anymore", 404)
    );
  }
  // If Product Does Exist Then Add To Cart And Also Add To User Item Property Which Is An Array-
  const AddToCart = new AddToCartModle({
    product: Product._id,
    buyer: req.User._id,
    vendor: Product.vendor
  });
  // Checking Whether The Item Buyer Inteded To Add Is Already Exists In His/Her Items Array-
  let Index = req.User.items.findIndex(
    Item => Item.product.toString() === Product._id.toString()
  );
  // If Item Is Not In Items Array Of User
  if (Index < 0) {
    const AddedItem = {
      product: Product._id,
      vendor: Product.vendor,
      price: Product.price,
      quantity: 1,
      total: Product.price * 1
    };
    req.User.items.push(AddedItem);
  } else {
    // If Item Is Exists In Items Array Of User than just update quantity of that Specific product
    const quantity = req.User.items[Index].quantity + 1;
    const AddedItem = {
      product: Product._id,
      vendor: Product.vendor,
      price: Product.price,
      quantity,
      total: Product.price * quantity
    };
    req.User.items.splice(Index, 1, AddedItem);
  }
  // req.User.totalAmount =
  let Total = MakeTotal(req.User.items);
  // Making Total Of User Which He/She Buy Products-
  req.User.totalAmount = Total;

  // Updating User
  await req.User.save();
  if (!req.User) {
    return next(new AppError("Server Is Not Responding", 500));
  }
  // Updating/Saving To Cart
  await AddToCart.save();
  if (!AddToCart) {
    return next(new AppError("Server Is Not Responding", 500));
  }
  res.status(201).json({
    Status: "Success",
    AddToCart
  });
});

// This Method Will Delete Every Product Which You Added To Cart
exports.DeleteAllFromCart = AsyncWrapper(async (req, res, next) => {
  const Count = req.User.items.length;
  req.User.items = [];
  req.User.totalAmount = 0;
  await req.User.save();
  res.status(200).json({
    Status: "Success",
    Count: `${Count} Items Are Deleted`
  });
});

// It will only delete some amount of specific product such as deleting 1 quantity of product A who's quantity is 3-
exports.DeleteFromCart = AsyncWrapper(async (req, res, next) => {
  // Check Whether The Item Buyer Want To Buy Does Exists Or Not-
  const Index = req.User.items.findIndex(
    Item => Item.product.toString() === req.params.Id.toString()
  );
  if (Index < 0) {
    return next(
      new AppError("Sorry, This Product Is Not Available Anymore", 404)
    );
  } else {
    if (req.User.items[Index].quantity === 1) {
      // If quantity=== 0 than we want to delete the complete Object from Items Array Otherwise id will be maintained there with quantity of 0 which we not want we want to completely remove object who's quantity=== 0
      req.User.items.splice(Index, 1);
    } else {
      // If Item Exists In Items Array Of User than just update quantity of that Specific product
      const quantity = req.User.items[Index].quantity - 1;
      const AddedItem = {
        product: req.User.items[Index].product,
        vendor: req.User.items[Index].vendor,
        price: req.User.items[Index].price,
        quantity,
        total: quantity * req.User.items[Index].price
      };
      req.User.items.splice(Index, 1, AddedItem);
      req.User.totalAmount = MakeTotal(req.User.items);
    }
    await req.User.save();
    res.status(200).json({
      Status: "Success",
      Message: "Deleted Item From Cart"
    });
  }
});

// This method will Completely Delete Specific Product From Items Array
exports.DeleteSpecificProdcut = AsyncWrapper(async (req, res, next) => {
  // Check Whether The Item Buyer Want To Buy Does Exists Or Not-
  const Index = req.User.items.findIndex(
    Item => Item.product.toString() === req.params.Id.toString()
  );
  if (Index < 0) {
    return next(
      new AppError("Sorry, This Product Is Not Available Anymore", 404)
    );
  } else {
    // Deleting Item From Items Array
    req.User.items.splice(Index, 1);
    // Making Total After Deleting The Product From Items Array
    req.User.totalAmount = MakeTotal(req.User.items);
  }
  await req.User.save();
  res.status(200).json({
    Status: "Success",
    Message: "Deleted Item From Cart"
  });
});

// It Will Make Total Of Product Cost Which You Have To Pay-
const MakeTotal = (Items = []) => {
  let Total = 0;
  Items.forEach(Item => {
    Total = Total + Item.total;
  });
  return Total;
};
