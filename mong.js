const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connect to db..."))
  .catch((err) => console.log("could not connect ...", err));

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: {
    type: Number,
    required: function () {
      return this.isPublished;
    },
  },
});

const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    // name: "Angular JS Course",
    author: "Tim",
    tags: ["angular", "frontend"],
    isPublished: true,
    // price: 15
  });
  try {
    await course.validate();
    // const result = await course.save();
    // console.log(result);
  } catch (error) {
    console.log(error.message);
  }
}

async function getCourse() {
  const course = await Course.find({ author: "Tim", isPublished: true })
    .limit(10)
    .sort({ name: "asc" })
    .select({ name: 1, tags: 1, author: 1 });
  console.log(`These are the courses : ${course}`);
}

// async function updateCourse(id) {
//   const course = await Course.findById(id);
//   course.author = "Achala";
//   const result = await course.save();
//   console.log(result);
// }

async function updateCourse(id) {
  const course = await Course.findByIdAndUpdate(
    id,
    {
      $set: { author: "Rose", isPublished: true },
    },
    { new: true }
  );
  const result = await course.save();
  console.log(result);
}

createCourse();
// getCourse();

//updateCourse("644946c5b2151893138e2225");
