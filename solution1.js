const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/mongo-exercises");

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: Date,
  isPublished: Boolean,
  price: Number,
});

const Course = mongoose.model("Course", courseSchema);

async function getCourses() {
  return await Course.find({
    isPublished: true,
  })
    .or([{ price: { $gte: 15 } }, { name: /.*by.*/i }])
    .sort({ price: -1 })
    .select("name author price");
}

async function updateCourse(id) {
  const course = await Course.findById(id);
  if (!course) return;
  course.isPublished = true;
  course.author = "Tanu";
  const result = await course.save();
  console.log(result);
}

updateCourse("5a68fdc3615eda645bc6bdec");
// async function run() {
//   const courses = await );
//   console.log(courses);
// }

// run();

const express = require("express");
const router = express.Router();
const Course = require("../../models/Course");
const { check, validationResult } = require("express-validator");

module.exports = router;

router.get("/getCourses", async (req, res) => {
  try {
    let course = await Course.find();
    return res.json(course);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});


router.get("/getCourse", async (req, res) => {
  const { id } = req.body;
  const course = await Course.findById(id);
  res.send(course);
});

router.post(
  "/createCourse",
  async (req, res) => {
    try {
      await (req.body).validate();

      if (!errors.isEmpty()) {
        // Show error if validations failed
        return res.status(400).json({ errors: errors.array() });
      }
      await (req.body).save();
      return res.json({ message: "Success" });
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server Error");
    }
  }
);

router.put(
  "/updateCourse/:id",
  async (req, res) => {
    try {
      const id =  parseInt(req.params.id);
      const { courseDetails } = req.body;
      
      const course = await Course.findByIdAndUpdate(
        id, courseDetails
      );
      await course.save();
      return res.json({ course: course });
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server Error");
    }
  }
);

router.delete(
  "/delete/:id",
  async (req, res) => {
    try {
      const id =  parseInt(req.params.id);

      let course= await Course.findOneAndDelete({
        _id: id,
      });

      return res.json({ course: course });
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server Error");
    }
  }
);
