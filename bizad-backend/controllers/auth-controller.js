const jwt = require("jsonwebtoken");
const { User } = require("../models/users");

const maxAge = 3 * 24 * 60 * 60;
const secret = "noa";

async function tryLogin(email, password) {
  const user = await User.find({ email, password });
  if (!user.length) {
    throw new Error("Incorrect user or password");
  }
  return user[0];
}

function createToken(id) {
  return jwt.sign({ id }, secret, { expiresIn: maxAge });
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    const user = await tryLogin(email, password);
    console.log({ user });
    if (user instanceof Error) {
      res.status(401).json({
        message: "Invalid email or password",
      });
    } else {
      const token = createToken(user.id);
      const tokenAge = maxAge * 1000;
      res.cookie("jwt", token, { httpOnly: true, maxAge: tokenAge });
      const userData = {
        userId: user.id,
        email: user.email,
        services: user.services || {},
      };
      console.log(userData);
      res.status(200).json(userData);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function logout(req, res) {
  res.cookie("jwt", "", { maxAge: 1 });
  res.status(200).json({ logged_out: true });
}

async function signup(req, res) {
  try {
    const user = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };
    const userExist = await User.findOne({ email: user.email });
    if (userExist) {
      throw new Error("User already exist");
    }

    const newUser = await User.create(user);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({
      message: err.message,
      status: 500,
    });
  }
}

async function addService(req, res) {
  try {
    console.log(req.body);
    const { userId, service, serviceStatus } = req.body;
    const user = await User.findById(userId);

    user.services = { ...user.services, [service]: serviceStatus };
    await user.save();
    res.json(user.services);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err.message,
      status: 500,
    });
  }
}

async function deleteService(req, res) {
  try {
    const { userId, service } = req.body;
    await User.updateOne({ _id: userId }, { services: { $unset: service } });
    const user = await User.findById(userId);
    console.log(user.services);
    res.json(user.services);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err.message,
      status: 500,
    });
  }
}

module.exports = {
  login,
  logout,
  signup,
  deleteService,
  addService,
};
