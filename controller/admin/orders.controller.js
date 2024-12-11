const Order = require("../../models/orders.model");
const Product = require("../../models/product.model");
const filter = require("../../helper/filter.helper");
const Pagination = require("../../helper/pagination.helper");
const Account = require("../../models/accounts.model");
module.exports.index = async (req ,res) => {
    const find_list = {
    }
    //Search
    // if(req.query.keyword){
    //     const regex = new RegExp(req.query.keyword, "i");
    //     find_list.id = regex ;
    // }
    // console.log(find_list);
    if(req.query.status) {
        find_list.status = req.query.status
    }
    //End Search 

    //Pagination 
    const countRecord = await Order.countDocuments(find_list);
    const objectPagination = Pagination(req,countRecord) ;   
    //End Pagination

    

    const orderList  = await Order
        .find(find_list)
        .limit(objectPagination.limitItem)
        .skip(objectPagination.skipItem)
        .sort({createdAt: "desc"});
        for(const record  of orderList){
            
            record.totalPrice = 0 ; 
            let totalPrice = 0 ;
            record.products.forEach(item => {
             
                item.price =  (item.price - item.price*(item. discountPercentage/100)).toFixed(0); 
                item.totalPrice = item.price * item.quantity ;
                totalPrice += item.totalPrice ;
                record.totalPrice = totalPrice;
            })
            record.totalPrice = totalPrice; 

            const inforAdmin = await Account.findOne({
                _id : record.user_id
            }).select("fullName");

            if(inforAdmin){
                record.createByFullName = inforAdmin.fullName;
            }
            
        }
        for(const record  of orderList){
            let id = record._id.id;
            
        }
    res.render("admin/pages/orders/index.pug",{
        pageTitle :"Đơn hàng",
        orders : orderList
    })
}

module.exports.detail = async (req ,res) => {
    try {
        const idOrder = req.params.id;
        const status = req.query.status;
        const order = await Order.findOne({
            _id: idOrder
        });
        order.totalPrice = 0 ;
        for(const item of order.products){
            const dataProduct = await Product.findOne({
                _id : item.product_id
            })
            item.price =  (item.price - item.price*(item. discountPercentage/100)).toFixed(0); 
            item.totalPrice = item.price * item.quantity ;
            item.thumbnail = dataProduct.thumbnail;
            item.title = dataProduct.title;
        
            order.totalPrice += item.totalPrice ;
        }

        res.render("admin/pages/orders/detail.pug", {
            pageTitle: "Đặt hàng thành công",
            order : order,
            status : status
    });
    } catch (error) {
        res.redirect("back");
    }
}

// [GET] /admin/orders/accept/:id
module.exports.accept = async (req ,res) => {
    const idAdmin  = req.cookies.id;
    await Order.updateOne({
        _id :req.params.id
    },{
        user_id : idAdmin,
        updatedAt: Date.now(),
        status : "Đã xác nhận"
    })
    res.redirect("/admin/orders");
}

module.exports.cancel = async (req ,res) => {
    const idAdmin  = req.cookies.id;
    await Order.updateOne({
        _id :req.params.id
    },{
        user_id : idAdmin,
        updatedAt: Date.now(),
        status : "Bị hủy"
    })
    res.redirect("/admin/orders");
}

module.exports.cancel = async (req ,res) => {
    const idAdmin  = req.cookies.id;
    await Order.updateOne({
        _id :req.params.id
    },{
        user_id : idAdmin,
        updatedAt: Date.now(),
        status : "Bị hủy"
    })
    res.json({
        code : 200
    });
    
}

module.exports.edit = async (req ,res) => {
    await Order.updateOne({
        _id : req.params.id
    },req.query)
    res.redirect("/admin/orders");
}

module.exports.orderList = async (req, res) => {
    try {
        const find_list = {};

        // Search
        if (req.query.status !== "all") {
            find_list.status = req.query.status;
        }

        // Pagination
        const countRecord = await Order.countDocuments(find_list);
        const objectPagination = Pagination(req, countRecord);

        // Get order list from database
        const orderListFromDb = await Order.find(find_list)
            .limit(objectPagination.limitItem)
            .skip(objectPagination.skipItem)
            .sort({ createdAt: "desc" });

        // Transform order list
        const orderList = [];
        for (const record of orderListFromDb) {
            const newRecord = {
                ...record._doc, // Copy toàn bộ thuộc tính từ đối tượng gốc
                totalPrice: 0, // Gán giá trị mặc định
                products: record.products.map(item => {
                    const price = (item.price - item.price * (item.discountPercentage / 100)).toFixed(0);
                    const totalPrice = price * item.quantity;
                    return {
                        ...item, // Copy thuộc tính gốc
                        price, // Cập nhật giá đã chiết khấu
                        totalPrice // Tổng giá cho từng sản phẩm
                    };
                })
            };

            // Tính tổng giá của toàn bộ đơn hàng
            newRecord.totalPrice = newRecord.products.reduce((acc, item) => acc + item.totalPrice, 0);

            // Lấy thông tin người tạo
            const inforAdmin = await Account.findOne({
                _id: record.user_id
            }).select("fullName");

            if (inforAdmin) {
                newRecord.createByFullName = inforAdmin.fullName;
            }

            orderList.push(newRecord); // Thêm vào danh sách mới
        }

        // Trả kết quả
        res.json({
            code: 200,
            listOrder: orderList
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            code: 500,
            message: "Internal Server Error"
        });
    }
};
