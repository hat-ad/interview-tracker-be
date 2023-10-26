const Bcryptjs = require("bcryptjs");
const { OK, ERROR } = require("../../../utils/responseHelper");
const { GenerateToken } = require("../functions/function");
const UserService = require("../services/user.service");

exports.createUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserService.checkEmail(email);
    if (user) {
      return ERROR(res, user, "email already Exists!");
    }
    const hashPassword = await Bcryptjs.hash(password, 12);

    const body = {
      email,
      password: hashPassword,
      userCode: email.split("@")[0],
    };
    const newUser = await UserService.createUser(body);
    const token = GenerateToken(newUser);

    newUser.token = token;
    await newUser.save();

    return OK(res, { user: newUser, token }, "User Created SuccessFully!");
  } catch (error) {
    return ERROR(res, null, error.message || "Something went Wrong");
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserService.checkEmail(email);

    if (!user) {
      return ERROR(res, null, "This User has not Registered yet");
    }

    const hashedPassword = await Bcryptjs.compare(password, user.password);
    if (!hashedPassword) return ERROR(res, null, "Invalid Password!");
    const token = GenerateToken(user);
    user.token = token;
    await user.save();

    return OK(res, { user, token }, "User Logged in Successfully!");
  } catch (error) {
    return ERROR(res, null, error.message || "Something went Wrong");
  }
};
