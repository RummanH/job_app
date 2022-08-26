const AppError = require("../../services/AppError");

const {
  saveUser,
  getOneUser,
  getAllUser,
  existUser,
  updateMe,
} = require("../../models/users.model");

function bodyFilter(candidateObj, ...allowed) {
  const filtered = {};
  Object.keys(candidateObj).forEach((el) => {
    if (allowed.includes(el)) {
      filtered[el] = candidateObj[el];
    }
  });

  return filtered;
}

async function httpSignupUser(req, res, next) {
  const { name, email, password, passwordConfirm } = req.body;
  if (!name || !email || !password || !passwordConfirm) {
    return next(new AppError("Please provide all values!", 400));
  }

  if (await existUser(email)) {
    return next(new AppError("User already exist!", 400));
  }

  const user = await saveUser({ name, email, password, passwordConfirm });
  const token = await user.createJWT();

  return res.status(201).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
}

async function httpLoginUser(req, res, next) {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError("Please provide email and password!", 400));
  }

  const user = await existUser(email);
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  const token = await user.createJWT();
  user.password = undefined;

  return res.status(200).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
}

async function httpUpdateMe(req, res, next) {
  const { name, lastName, email, location, password, passwordConfirm } =
    req.body;

  if (password || passwordConfirm) {
    return next(
      new AppError(
        "This route is not for password update. please use updateMyPassword",
        400
      )
    );
  }

  if (!name || !lastName || !email || !location) {
    return next(new AppError("Please provide all the values!", 400));
  }

  const filteredBody = bodyFilter(
    req.body,
    "name",
    "lastName",
    "email",
    "location"
  );

  const updatedMe = await updateMe(filteredBody, req.user.id);

  res.status(200).json({
    status: "success",
    data: {
      user: updatedMe,
    },
  });
}

async function httpUpdateUser(req, res, next) {
  return res.status(200).json({
    status: "success",
    data: {
      user: "User",
    },
  });
}

async function httpGetOneUser(req, res, next) {
  const user = await getOneUser(req.params.id, next);

  if (!user) {
    return next(new AppError("No user found!", 404));
  }

  return res.status(200).json({
    status: "success",
    data: { user },
  });
}

async function httpGetAllUsers(req, res, next) {
  const users = await getAllUser();
  return res.status(200).json({
    status: "success",
    data: {
      users: users,
    },
  });
}

module.exports = {
  httpSignupUser,
  httpLoginUser,
  httpUpdateUser,
  httpGetOneUser,
  httpGetAllUsers,
  httpUpdateMe,
};