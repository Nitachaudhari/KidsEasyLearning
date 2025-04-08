const express = require("express");
const multer = require("multer");
const path = require("path");
const Story = require("../models/Story");

const router = express.Router();

// 📁 Set storage location & filename
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/stories"); // Folder where images will be saved
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });


// ✅ GET: Fetch all stories (optionally filter by language)
router.get("/", async (req, res) => {
  try {
    const { language } = req.query;
    const query = language ? { language } : {};
    const stories = await Story.find(query);
    res.json(stories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching stories", error });
  }
}); 

// ✅ POST: Create new story with image upload
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title, content, language } = req.body;
    const image = req.file ? `/stories/${req.file.filename}` : "";

    const newStory = new Story({ title, content, image, language });
    await newStory.save();
    res.status(201).json({ message: "Story added successfully!", newStory });
  } catch (error) {
    res.status(500).json({ message: "Error adding story", error });
  }
});

module.exports = router;
