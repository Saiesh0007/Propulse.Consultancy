const express = require("express");
const multer = require("multer");
const Gallery = require("../models/gallery");

const router = express.Router();

// Use multer memory storage to avoid saving on disk
const storage = multer.memoryStorage();
const upload = multer({ storage });

// POST: Upload Image to MongoDB
router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const newImage = new Gallery({
      title: req.body.title,
      image: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      },
    });

    const savedImage = await newImage.save();
    res.status(201).json({ _id: savedImage._id, title: savedImage.title });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to upload image" });
  }
});

// GET: All Image Metadata
router.get("/", async (req, res) => {
  try {
    const images = await Gallery.find({}, "_id title createdAt").sort({ createdAt: -1 });
    res.json(images);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch images" });
  }
});

// GET: Image File by ID
router.get("/:id/image", async (req, res) => {
  try {
    const image = await Gallery.findById(req.params.id);
    if (!image) return res.status(404).send("Image not found");

    res.set("Content-Type", image.image.contentType);
    res.send(image.image.data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch image" });
  }
});

module.exports = router;
