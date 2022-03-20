require("dotenv").config();
const debug = require("debug")("cuentas-api:server:controllers:tags");
const chalk = require("chalk");
const Tag = require("../../database/models/Tag");
const createCustomError = require("../utils/errors");

const getTags = async (req, res) => {
  const tags = await Tag.find();
  res.json({ tags });
};

const createTag = async (req, res, next) => {
  const tag = req.body;
  try {
    const createdTag = await Tag.create(tag);
    res.status(201).json({ tag: createdTag });
  } catch (error) {
    debug(chalk.red(error.message));
    next(error);
  }
};

const updateTag = async (req, res, next) => {
  const tag = req.body;
  try {
    const updatedTag = await Tag.findByIdAndUpdate(tag.id, tag);
    res.status(200).json({ tag: updatedTag });
  } catch (error) {
    debug(chalk.red(error.message));
    next(error);
  }
};

const deleteTag = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedTag = await Tag.findByIdAndDelete(id);
    if (!deletedTag) {
      throw createCustomError("Tag not found", 404);
    }
    res.status(200).json({ deleted: "ok" });
  } catch (error) {
    debug(chalk.red(error.message));
    next(error);
  }
};

const deleteAllTags = async (req, res, next) => {
  try {
    await Tag.deleteMany({});
    res.json({ deleted: "ok" });
  } catch (error) {
    debug(chalk.red(error.message));
    next(error);
  }
};

module.exports = {
  getTags,
  createTag,
  updateTag,
  deleteTag,
  deleteAllTags,
};
