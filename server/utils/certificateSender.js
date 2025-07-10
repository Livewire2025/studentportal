const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const generateCertificate = (name, score) => {
  const doc = new PDFDocument({ size: "A4", layout: "landscape" });

  const fileName = `certificate_${name.replace(/\s/g, "_")}.pdf`;
  const filePath = path.join(__dirname, "..", "certificates", fileName);

  // Select background based on score
  const bgImage =
    score > 95
      ? "platinum.jpg"
      : score > 70
      ? "gold.jpg"
      : "silver.jpg";

  const bgPath = path.join(__dirname, "..", "certificates", bgImage);

  // Set certificate background
  doc.image(bgPath, 0, 0, {
    width: 841.89,  // A4 landscape
    height: 595.28,
  });

  // Add student name (centered)
  const fontSizeName = 32;
  doc.font("Helvetica-Bold").fontSize(fontSizeName).fillColor("#000000");
  const nameWidth = doc.widthOfString(name);
  const nameX = (841.89 - nameWidth) / 2;
  const nameY = 250; // Adjust this to align properly with your template
  doc.text(name, nameX, nameY);

  doc.end();

  return new Promise((resolve, reject) => {
    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);
    stream.on("finish", () => resolve({ fileName, filePath }));
    stream.on("error", reject);
  });
};

const sendCertificate = async (email, name, score) => {
  try {
    const { filePath, fileName } = await generateCertificate(name, score);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your Certificate of Participation",
      text: `Hi ${name},\n\nCongratulations on successfully completing the test!\n\nPlease find your certificate attached.`,
      attachments: [{ filename: fileName, path: filePath }],
    };

    await transporter.sendMail(mailOptions);
    fs.unlinkSync(filePath); // Clean up
    console.log("Certificate sent to:", email);
  } catch (error) {
    console.error("Certificate Error:", error);
    throw error;
  }
};

module.exports = { sendCertificate };
