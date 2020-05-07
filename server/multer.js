const multer = require("multer");

let diskStorage = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, "uploads");
    },
    filename: (req, file, callback) => {
      let filename = `${Date.now()}-sikhuka-${file.originalname}`;
      callback(null, filename);
    }
});
let uploadFile = multer({storage: diskStorage}).single("file");

module.exports = uploadFile