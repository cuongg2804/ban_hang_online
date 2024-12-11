const express = require("express") ;
const router = express.Router() ;
const controller = require("../../controller/admin/orders.controller");

router.get("/",controller.index);

// [GET] /admin/orders/detail/:id
router.get("/detail/:id",controller.detail);

// [GET] /admin/orders/accept/:id

router.get("/accept/:id", controller.accept);

// [GET] /admin/orders/cancel/:id

router.get("/cancel/:id", controller.cancel);

// [POST]   /admin/orders/update/:id
router.post("/update/:id", controller.edit);

//[GET] /admin/orders/list-orders
router.get("/list-orders",controller.orderList);

module.exports = router;