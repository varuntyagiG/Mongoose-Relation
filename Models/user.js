const mongoose = require("mongoose");
const { Schema } = mongoose;

mongoose.connect("mongodb://127.0.0.1:27017/Relation").then((res) => {
  console.log("Connected");
});

// Parent Schema
const schema = new Schema({
  username: {
    type: String,
  },
  address: [
    {
      _id: false,
      location: String, // schema of address
      city: String,
    },
  ],
});

const User = mongoose.model("User", schema);

function AddUsers() {
  const user1 = new User({
    username: "Varun Tyagi",
    address: [
      {
        location: "Gangagram-street",
        city: "Mandi(Tattiri)",
      },
    ],
  });
  user1.address.push({
    location: "Mandi",
    city: "Baghpat",
  });
  user1.save();
}

AddUsers();
