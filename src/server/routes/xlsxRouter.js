const express = require("express");
const multer = require("multer");
const { loadXLSX } = require("../controllers/xlsx");
const { uploadsDirectory, maxUploadSize } = require("../utils/constants");

const upload = multer({
  dest: uploadsDirectory,
  limits: {
    fileSize: maxUploadSize,
  },
});

const xlsxRouter = express.Router();

xlsxRouter.post("/", upload.single("xlsx"), loadXLSX);

module.exports = xlsxRouter;
