const express = require("express") ;
const router = express.Router() ;
const distributor = require("../../controller/admin/distributor.controller");

const multer  = require('multer') ;
const uploadCloud = require("../../middlewares/admin/uploadcloud.middleware");
const upload = multer() ;

router.get("/",distributor.index);

// [GET] /admin/distributor/detail/:id

router.get("/detail/:id",distributor.detail);

// [GET] /admin/distributor/edit/:id

router.get("/edit/:id",distributor.edit);

//PATCH /admin/distributor/edit/:id

router.patch("/edit/:id",distributor.editPatch);

// [GET] /admin/distributor/deleted/674d0ccaeacaa58a6beaa3b9

router.get("/deleted/:id",distributor.delete);

// GET /admin/distributor/create

router.get("/create",distributor.create);

// POST /admin/distributor/create

router.post("/create",distributor.createPost);

module.exports = router;

