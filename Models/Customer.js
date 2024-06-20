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

// CustomerSchema.pre("findOneAndDelete", async function () {
//   console.log("pre-middleware");
// });

CustomerSchema.post("findOneAndDelete", async function (cus) {
  if (cus.orders.length) {
    let ans = await Order.deleteMany({ _id: { $in: cus.orders } });
    console.log(ans);
  }
});

const Order = mongoose.model("Order", OrderSchema);
const Customer = mongoose.model("Customer", CustomerSchema);

// async function addCustomer() {
//   let cus1 = new Customer({
//     username: "Putta-Vijay kumar",
//   });
//   let order1 = await Order.findOne({ item: "GulabGamum" });
//   let order2 = await Order.findOne({ item: "Namkeen" });
//   // let order3 = await Order.findOne({ item: "Breed" });

//   cus1.orders.push(order1);
//   cus1.orders.push(order2); // we push objects but only id store in MDB dbs because we define only id in schema
//   // cus1.orders.push(order3);

//   let data = await cus1.save();
//   console.log(data);
//   // let findData = await Customer.find({}).populate("orders"); // populate method replace object id to object
//   // console.log(findData[0]);
//   // console.log(findData[0].orders);
// }

// addCustomer();

// async function XYZ() {
//   let res = await Order.insertMany([
//     {
//       item: "Namkeen",
//       Price: 75,
//     },
//     {
//       item: "GulabGamum",
//       Price: 150,
//     },
//     {
//       item: "Milk-Cake",
//       Price: 250,
//     },
//   ]);
//   console.log(res);
// }

// XYZ();

async function DelteUser() {
  let res = await Customer.findByIdAndDelete("667321d7a1adddd1e11cf3af");
  console.log(res);
}

DelteUser();
