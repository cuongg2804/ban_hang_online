const Contributor = require("../../models/distributor.model");
const config = require("../../config/system");
module.exports.index = async (req,res) => {
    const find_list = {
        deleted : "false"
    }
    if(req.query.keyword){
        const regex = new RegExp(req.query.keyword, "i");
        find_list.DistributorName=regex; 
    }
    
    const ContributorList = await Contributor.find(find_list)
    
    res.render("admin/pages/distributor/index.pug",{
        pageTitle : "Nhà sản xuất",
        ContributorList : ContributorList
    });
}

module.exports.detail = async (req,res) => {
    const id = req.params.id;
    
    const ContributorDetail = await Contributor.findOne({
        _id : id,
        deleted : "false"
    })
    

    res.render("admin/pages/distributor/detail.pug",{
       pageTitle : "Nhà sản xuất",
       ContributorDetail : ContributorDetail
    }); 
}

module.exports.edit = async (req,res) => {
    const id = req.params.id;
    
    const ContributorDetail = await Contributor.findOne({
        _id : id,
        deleted : "false"
    })

    res.render("admin/pages/distributor/edit.pug",{
       pageTitle : "Nhà sản xuất",
       ContributorDetail : ContributorDetail
    }); 
}

module.exports.editPatch = async (req,res) => {
    const id = req.params.id;
    
    await Contributor.updateOne({
        _id: id
    },req.body )
    req.flash("success","Cập nhật thành công ");
    res.redirect(`/${config.prefixAdmin}/distributor`);
}

module.exports.delete = async (req,res) => {
    const id = req.params.id;
    
    await Contributor.updateOne({
        _id: id
    },{
        deleted: "true"
    })
    req.flash("success","Xóa nhà sản xuất thành công ! ");
    res.redirect(`/${config.prefixAdmin}/distributor`);
}

module.exports.create  = async (req,res) => {
    res.render("admin/pages/distributor/create.pug",{
        pageTitle : "Thêm nnhà sản xuất"
     });
}

module.exports.createPost  = async (req,res) => {
    const newDistributor = new Contributor(req.body);
    await newDistributor.save();
    req.flash("success","Thêm nhà sản xuất thành công ! ");
    res.redirect(`/${config.prefixAdmin}/distributor`);
}