const AuthRouter = require("./auth");
const UserRouter = require("./user");
const CategoriesRouter = require("./categories");
const ProductRouter = require("./product");
const TransactionRouter = require("./transaction");


const routes = (app, prefix) => {
  app.use(prefix, AuthRouter);
  app.use(prefix, UserRouter);
  app.use(prefix, CategoriesRouter);
  app.use(prefix, ProductRouter);
  app.use(prefix, TransactionRouter);
};

module.exports = routes;
