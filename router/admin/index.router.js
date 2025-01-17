const dashBroad = require("./dashbroad.router") ;
const systemConfig = require("../../config/system");
const Product = require("./product.router");
const Category = require("./category.router");
const Role = require("./role.router");
const Accounts = require("./accounts.router");
const Auth = require("./auth.router");
const myAccount = require("./my-account.router");
const order = require("./orders.router");
const middlewaresAuth = require("../../middlewares/admin/middlewares.auth");
const distributor = require("./contributor.router");
const report = require("../admin/report.router");

const Setting = require("./setting.router");

module.exports = (app) => {
    const Admin_Path = `${systemConfig.prefixAdmin}`;

    app.use("/" + Admin_Path + "/dashboard",middlewaresAuth.requireAuth,dashBroad);
    
    app.use("/" + Admin_Path + "/products",middlewaresAuth.requireAuth, Product);

    app.use("/" + Admin_Path + "/products-category", middlewaresAuth.requireAuth,Category);

    app.use("/" + Admin_Path + "/roles", middlewaresAuth.requireAuth,Role);

    app.use("/" + Admin_Path + "/accounts", middlewaresAuth.requireAuth, Accounts);

    app.use("/" + Admin_Path + "/my-account", middlewaresAuth.requireAuth,myAccount);

    app.use("/" + Admin_Path + "/auth", Auth);

    app.use("/" + Admin_Path + "/orders",middlewaresAuth.requireAuth, order);

    app.use("/" + Admin_Path + "/settings",middlewaresAuth.requireAuth, Setting);

    // GET /admin/distributor
    app.use("/" + Admin_Path + "/distributor",  middlewaresAuth.requireAuth,distributor);

    // GET /admin/report

    app.use("/" + Admin_Path + "/report",middlewaresAuth.requireAuth,  report);
}