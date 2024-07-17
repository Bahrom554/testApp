const path = require("path");
const multer = require('multer');
const CONST = require("../../utils/constants");

/*Multer File Handler Middleware*/
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        
        cb(null, CONST.defaults.UPLOAD_DIR);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
      }

});

const upload = multer({storage: storage});

module.exports = upload;