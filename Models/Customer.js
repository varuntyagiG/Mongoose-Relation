const mongoose = require("mongoose");
const { Schema } = mongoose;

mongoose.connect("mongodb://127.0.0.1:27017/Relation").then((res) => {
  console.log("MDB Connected");
});

const OrderSchema = new Schema({
  item: String,
  Price: Number,
});

const CustomerSchema = new Schema({
  username: String,
  orders: [
    {
      type: Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
});

const Order = mongoose.model("Order", OrderSchema);
const Customer = mongoose.model("Customer", CustomerSchema);

async function addCustomer() {
  // let cus1 = new Customer({
  //   username: "Varun",
  // });
  // let order1 = await Order.findOne({ item: "samosa" });
  // let order2 = await Order.findOne({ item: "Chips" });
  // let order3 = await Order.findOne({ item: "Breed" });

  // cus1.orders.push(order1);
  // cus1.orders.push(order2); // we push objects but only id store in MDB dbs because we define only id in schema
  // cus1.orders.push(order3);

  // let data = await cus1.save();
  // console.log(data);
  let findData = await Customer.find({}).populate("orders"); // populate method replace object id to object
  console.log(findData[0]);
  console.log(findData[0].orders);
}

addCustomer();

// async function XYZ() {
//   let res = await Order.insertMany([
//     {
//       item: "samosa",
//       Price: 10,
//     },
//     {
//       item: "Chips",
//       Price: 12,
//     },
//     {
//       item: "Breed",
//       Price: 15,
//     },
//   ]);
//   console.log(res);
// }

// XYZ();
