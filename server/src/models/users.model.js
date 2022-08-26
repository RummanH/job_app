const users = require("./users.mongo");

const DEFAULT_USER_NUMBER = 0;

async function getLatestUserNumber() {
  const latestUser = await users.findOne().sort("-userNumber");
  if (!latestUser) {
    return DEFAULT_USER_NUMBER;
  }
  return latestUser.userNumber;
}

async function saveUser(user) {
  const userNumber = (await getLatestUserNumber()) + 1;
  user.userNumber = userNumber;
  const createdUser = await users.create(user);
  createdUser.password = undefined;
  createdUser.role = undefined;
  createdUser.isActive = undefined;
  return createdUser;
}

async function updateMe(user, id) {
  return await users.findByIdAndUpdate(id, user, {
    new: true,
    runValidators: true,
  });
}

async function getOneUser(userId) {
  return await users.findById(userId).select("+password");
}

async function getAllUser() {
  return await users.find({}, { __v: 0 });
}

async function existUser(email) {
  return await users.findOne({ email }).select("+password");
}
module.exports = { saveUser, getOneUser, getAllUser, existUser, updateMe };
