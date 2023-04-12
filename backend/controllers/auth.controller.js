const { secret } = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  try {
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8)
    });

    const savedUser = await user.save();

    if (req.body.roles) {
      const roles = await Role.find({ name: { $in: req.body.roles } });
      savedUser.roles = roles.map(role => role._id);
    } else {
      const role = await Role.findOne({ name: "user" });
      savedUser.roles = [role._id];
    }

    await savedUser.save();

    return res.status(200).json({ message: "User was registered successfully!" });
  } catch (error) {
    const { message = "Unexpected error occurred" } = error;
    return res.status(500).json({ message });
  }
};

exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username })
      .populate("roles", "-__v");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

    if (!passwordIsValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: user.id }, secret, { expiresIn: 86400 });

    const authorities = user.roles.map(role => `ROLE_${role.name.toUpperCase()}`);

    return res.status(200).json({
      id: user._id,
      username: user.username,
      email: user.email,
      roles: authorities,
      accessToken: token
    });
  } catch (error) {
    const { message = "Unexpected error occurred" } = error;
    return res.status(500).json({ message });
  }
};
