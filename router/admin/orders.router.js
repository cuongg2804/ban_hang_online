const express = require("express") ;
const router = express.Router() ;
const controller = require("../../controller/admin/orders.controller");

router.get("/",controller.index);

// [GET] /admin/orders/detail/:id
router.get("/detail/:id",controller.detail);

module.exports = router;