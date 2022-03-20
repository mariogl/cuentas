const express = require("express");
const multer = require("multer");
const { loadXLSX } = require("../controllers/xlsx");
const { uploadsDirectory } = require("../utils/constants");

const upload = multer({ dest: uploadsDirectory });

const xlsxRouter = express.Router();

xlsxRouter.post("/", upload.single("xlsx"), loadXLSX);

module.exports = xlsxRouter;
