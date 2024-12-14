const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    DistributorName: String,
    Address: String,
    Email: String,
      deleted : {
        type : String ,
        default : false
      },
      status : {
        type : String,
        default : "active"
      }
},
{
    timestamps: true,
}
);

const Order = mongoose.model("Distributor", orderSchema, "Distributor");

module.exports = Order;