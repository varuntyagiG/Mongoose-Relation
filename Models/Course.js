const mongoose = require("mongoose");
const { Schema } = mongoose;

mongoose.connect("mongodb://127.0.0.1:27017/Relation").then((res) => {
  console.log("MDB Connected");
});

const CourseSchema = new Schema({
  Course: String,
  price: Number,
});

const UserSchema = new Schema({
  email: String,
  password: Number,
  course: [
    {
      type: Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
});

const Course = mongoose.model("Course", CourseSchema);
const User = mongoose.model("User", UserSchema);

// async function AddCouses() {
//   let coures = await Course.insertMany([
//     {
//       Course: "Web-dev",
//       price: 5999,
//     },
//     {
//       Course: "Web3",
//       price: 6999,
//     },
//     {
//       Course: "AI-ML",
//       price: 11999,
//     },
//   ]);
//   console.log(coures);
// }

// AddCouses();

async function UserData() {
  let user1 = new User({
    email: "jauharkingAli@gmail.com",
    password: 7633818384,
  });

  // let course1 = await Course.findOne({ Course: "Web-dev" });
  let course2 = await Course.findOne({ Course: "Web3" });
  // let course3 = await Course.findOne({ Course: "AI-ML" });

  // user1.course.push(course1);
  user1.course.push(course2);
  // user1.course.push(course3);

  let response = await user1.save();
  console.log(response);
}

UserData();
