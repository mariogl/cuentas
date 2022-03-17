require("dotenv").config();
const express = require("express");
const { validate } = require("express-validation");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const auth = require("./middlewares/auth");
const { generalError, notFoundError } = require("./middlewares/errors");
const usersRouter = require("./routes/usersRouter");
const { authUserRequestSchema } = require("./schemas/usersSchemas");
const categoriesRouter = require("./routes/categoriesRouter");
const transactionsRouter = require("./routes/transactionsRouter");

const app = express();
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGIN,
    optionsSuccessStatus: 200,
  })
);
app.use(morgan("dev"));
app.use(helmet());
app.use(express.json());

app.use("/users", usersRouter);
app.use(validate(authUserRequestSchema), auth);
app.use("/categories", categoriesRouter);
app.use("/transactions", transactionsRouter);

app.use(notFoundError);
app.use(generalError);

module.exports = app;
