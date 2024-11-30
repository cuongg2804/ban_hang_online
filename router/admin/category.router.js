const express = require("express") ;
const router = express.Router() ;
const category = require("../../controller/admin/category.controller");

const multer  = require('multer') ;
const uploadCloud = require("../../middlewares/admin/uploadcloud.middleware");
const upload = multer() ;

router.get("/", category.index);

// GET /admin/products-category/create

router.get("/create", category.create);

// [GET] /admin/products-category/detail/:id

router.get("/detail/:id", category.detail);

// POST /admin/products-category/create

router.post("/create",
upload.single('thumbnail'), 
uploadCloud.uploadSingle,
category.createPost);

//  GET /admin/products-category/edit/;id

router.get("/edit/:id",
upload.single('thumbnail'), 
uploadCloud.uploadSingle,
category.edit
);

// PATCH /admin/products-category/edit/:id

router.patch("/edit/:id",
upload.single('thumbnail'), 
uploadCloud.uploadSingle,
category.editPatch
);

// GET /admin/products-category/delete/:id

router.get("/delete/:id", category.delete);

//GET /admin/products-category/bins

router.get("/bins", category.bin);

// [GET] /admin/products-category/recovery/:id

router.get("/recovery/:id", category.recovery);

module.exports = router