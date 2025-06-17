const express = require("express");
const router = express.Router();
const { sendCertificate } = require("../utils/certificateSender");

router.post("/send-certificate", async (req, res) => {
  const { name, email, score } = req.body;

  try {
    await sendCertificate(email, name, score);
    res.status(200).json({ message: "Certificate sent successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to send certificate" });
  }
});

module.exports = router;
