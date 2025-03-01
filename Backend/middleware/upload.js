require('dotenv').config();  // This should be at the top

const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');

const storage = new GridFsStorage({
  url: process.env.MONGO_URI,  // Make sure this points to MONGO_URI in .env
  options: { useNewUrlParser: true },
  file: (request, file) => {
    const match = ["image/png", "image/jpg"];

    if (match.indexOf(file.mimetype) === -1)
      return `${Date.now()}-rent-${file.originalname}`;

    return {
      bucketName: "photos",
      filename: `${Date.now()}-rent-${file.originalname}`,
    };
  },
});

module.exports = multer({ storage });
