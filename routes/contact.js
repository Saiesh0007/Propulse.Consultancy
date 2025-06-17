const router = require("express").Router();
const Contact = require("../models/contact");

router.post("/post", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newContact = new Contact({ name, email, message });
    await newContact.save();
    res.status(200).json({ success: true, message: "Data Saved" });
  } catch (error) {
    console.error("Error saving contact:", error);
    res.status(400).json({ message: "Technical Error Occurred" });
  }
});

module.exports = router;
