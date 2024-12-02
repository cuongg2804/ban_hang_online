const Order = require("../../models/orders.model");
const Product = require("../../models/product.model");
const filter = require("../../helper/filter.helper");
const Pagination = require("../../helper/pagination.helper");

module.exports.index = async (req ,res) => {
    const find_list = {
        // deleted : false
    }
 
    //Ba nút lọc
    const filterStatus = filter(req);
    //End ba nút

    //Search
    if(req.query.keyword){
        const regex = new RegExp(req.query.keyword, "i");
        find_list.title = regex ;
    }

    if(req.query.status) {
        find_list.status = req.query.status
    }
    //End Search 

    //Pagination 
    const countRecord = await Order.countDocuments(find_list);
    const objectPagination = Pagination(req,countRecord) ;   
    //End Pagination

    //Sort
    const sort = {} ;
    if(req.query.sortKey && req.query.sortValue) {
        sort[req.query.sortKey] = req.query.sortValue ;
    }
    else {
        sort.position = "desc" ;
    }
    //End Sort

    

    const orderList  = await Order
        .find(find_list)
        .limit(objectPagination.limitItem)
        .skip(objectPagination.skipItem)
        .sort({createdAt: "desc"});

        // orderList.totalPrice = 0 ;
        // for(const item of order.orderList){
        //     const dataProduct = await Product.findOne({
        //         _id : item.product_id
        //     })
        //     item.price =  (item.price - item.price*(item. discountPercentage/100)).toFixed(0); 
        //     item.totalPrice = item.price * item.quantity ;
        //     item.thumbnail = dataProduct.thumbnail;
        //     item.title = dataProduct.title;
        
        //     order.totalPrice += item.totalPrice ;
        // }
    
        
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
        }
        
    
    res.render("admin/pages/orders/index.pug",{
        pageTitle :"Đơn hàng",
        orders : orderList
    })
}

module.exports.detail = async (req ,res) => {
    try {
        const idOrder = req.params.id;
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
            order : order
    });
    } catch (error) {
        res.redirect("/");
    }
}