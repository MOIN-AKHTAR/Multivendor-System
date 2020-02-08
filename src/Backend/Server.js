const App = require("./Connection");
const Express = require("express");
const UserRoute = require("./Route/UserRoute");
const CategoryRoute = require("./Route/CategoryRoute");
const ProductRoute = require("./Route/ProductRoute");
const AppError = require("./Utils/AppError");
const ErrorMiddleWare = require("./Utils/error");

// Resolving CORS Error
App.use((req, res, next) => {
  // Website you wish to allow to connect
  res.header("Access-Control-Allow-Origin", "*");
  // Request headers you wish to allow
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,content-type,Accept,Authorization"
  );
  if (req.method === "OPTIONS") {
    // Request methods you wish to allow
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    return res.status(200).json({});
  }
  next();
});

// ALLOW EXPRESS TO READ JSON
App.use(Express.json());

// ROUTES
App.use("/User", UserRoute);
App.use("/Category", CategoryRoute);
App.use("/Product", ProductRoute);

// It Will Be Execute When There Is No Path To Be Found
App.all("*", (req, res, next) => {
  return next(
    new AppError(
      `Unable To Find ${req.protocol}://${req.get("host")}${req.originalUrl} `,
      404
    )
  );
});

// Execute This MiddleWare When Any Error Occur
App.use(ErrorMiddleWare);

// Listening Request On PORT
const Server = App.listen(process.env.PORT, err => {
  if (err) throw new Error(err.message);
  console.log("Server Is Running On Port ", process.env.PORT);
});

// Handle UncaughtException If Any
process.on("uncaughtException", err => {
  console.log("Unhandled Exception");
  console.log("Shutting Down Server");
  console.log(err.stack);
  console.log(err.name);
  console.log(err.message);
  Server.close(() => {
    process.exit(1);
  });
});

//DB = "mongodb+srv://MOIN-AKHTER:gotohell302610$$$@cluster0-ghael.mongodb.net/test?retryWrites=true&w=majority"
//https://cloud.mongodb.com/v2/5e3a729dcf09a22e6d1caca1#metrics/replicaSet/5e3a762a3f484515d58629ed/explorer
