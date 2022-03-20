const express = require("express");
const { validate } = require("express-validation");
const {
  getTags,
  createTag,
  deleteTag,
  updateTag,
  deleteAllTags,
} = require("../controllers/tags");
const { tagSchema } = require("../schemas/tagsSchemas");

const tagsRouter = express.Router();

tagsRouter.get("/", getTags);
tagsRouter.post("/", validate(tagSchema), createTag);
tagsRouter.put("/", validate(tagSchema), updateTag);
tagsRouter.delete("/all", deleteAllTags);
tagsRouter.delete("/:id", deleteTag);

module.exports = tagsRouter;
