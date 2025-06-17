const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const generateCertificate = (name, score) => {
  const doc = new PDFDocument({ size: "A4", layout: "portrait" });
  const fileName = `certificate_${name.replace(/\s/g, "_")}.pdf`;
  const filePath = path.join(__dirname, "..", "temp", fileName);

  const bgImage = score > 95 ? "platinum.jpg" : score > 70 ? "gold.jpg" : "silver.jpg";

  // Draw background image for portrait
  doc.image(path.join(__dirname, "..", "certificates", bgImage), 0, 0, {
    width: 595.28, // A4 portrait width in points
    height: 841.89, // A4 portrait height
  });

  // === NAME CENTERED ===
  const fontSizeName = 26;
  doc.font("Helvetica-Bold").fontSize(fontSizeName).fillColor("#ccff22");
  const nameWidth = doc.widthOfString(name);
  const nameX = (595.28 - nameWidth) / 2;
  const nameY = 360; // Adjust to where "PROUDLY PRESENTED TO" points
  doc.text(name, nameX, nameY);

  // === SCORE BELOW NAME ===
  const fontSizeScore = 20;
  doc.font("Helvetica").fontSize(fontSizeScore).fillColor("#ff00cc");
  const scoreText = `Score: ${score}%`;
  const scoreWidth = doc.widthOfString(scoreText);
  const scoreX = (595.28 - scoreWidth) / 2;
  const scoreY = nameY + 100;
  doc.text(scoreText, scoreX, scoreY);

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
      subject: "Your Certificate of Achievement",
      text: `Hi ${name}, congratulations on completing the test. Your score: ${score}%.`,
      attachments: [{ filename: fileName, path: filePath }],
    };

    await transporter.sendMail(mailOptions);
    fs.unlinkSync(filePath); // Optional: delete file after sending
  } catch (error) {
    console.error("Certificate Error:", error);
    throw error;
  }
};

module.exports = { sendCertificate };
