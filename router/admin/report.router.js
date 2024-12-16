const express = require("express") ;
const router = express.Router() ;

const Report = require("../../controller/admin/report.controller");

router.get("/", Report.index);

module.exports = router;