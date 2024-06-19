const mongoose = require("mongoose");
const { Schema } = mongoose;

mongoose.connect("mongodb://127.0.0.1:27017/Relation").then((res) => {
  console.log("Connected");
});

// Parent Schema
const Userschema = new Schema({
  username: {
    type: String,
  },
  email: String,
});

const PostSchema = new Schema({
  content: String,
  likes: Number,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const User = mongoose.model("User", Userschema);
const Post = mongoose.model("Post", PostSchema);

// let addUser = async () => {
//   let user1 = new User({
//     username: "Anjali",
//     email: "KminiNumber1@gmail.com",
//   });
//   let response = await user1.save();
//   console.log(response);
// };

// addUser();
let addPost = async () => {
  let Post1 = new Post({
    content: "Trips",
    likes: 50,
  });

  let User1 = await User.findOne({ username: "Anjali" });
  Post1.user = User1;

  let post = await Post1.save();
  console.log(post);
};
addPost();
