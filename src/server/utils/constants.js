const usernameMinLength = 6;
const userpasswordMinLength = 7;
const userNameMinLength = 2;

const userDataMinimums = {
  username: usernameMinLength,
  password: userpasswordMinLength,
  name: userNameMinLength,
};

const uploadsDirectory = "uploads/";

module.exports = {
  userDataMinimums,
  uploadsDirectory,
};
