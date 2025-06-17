const express = require("express");
const router = express.Router();
const Newsletter = require("../models/newsletter");
const nodemailer = require("nodemailer");

// Setup Gmail transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

router.post("/newsletter", async (req, res) => {
  const { email } = req.body;

  try {
    if (!email) {
      return res.status(401).json({ error: "Email is required" });
    }

    const existing = await Newsletter.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "You're already subscribed!" });
    }

    const subscriber = new Newsletter({ email });
    await subscriber.save();

    // ✅ Send Confirmation Email
    await transporter.sendMail({
      from: `"Propulse Consultancy" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Thanks for Subscribing to Propulse Consultancy!",
      html: `
        <div style="font-family:Arial, sans-serif; color:#333">
          <h2 style="color:#0a1529;">Welcome to Propulse Consultancy 🚀</h2>
          <p>Hi there,</p>
          <p>You've successfully subscribed to our newsletter. We'll keep you updated with the latest insights and innovations.</p>
          <br/>
          <p>– The Propulse Consultancy Team</p>
        </div>
      `,
    });

    res.status(200).json({ message: "Subscribed successfully and email sent!" });
  } catch (err) {
    console.error("Newsletter Error:", err);
    res.status(400).json({ error: "Something went wrong" });
  }
});

module.exports = router;
