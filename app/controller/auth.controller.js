const bcrypt = require("bcryptjs/dist/bcrypt");
const jsonwebtoken = require("jsonwebtoken");

const User = require("../model/user.model");

const login = async (req, res) => {
  try {
    const user = await User.query()
      .select([
        "users.id",
        "users.name",
        "users.username",
        "users.password",
        "users.created_at",
        "users.updated_at",
      ])
      .where("username", req.body.username)
      .first();

    if (user && (await bcrypt.compare(req.body.password, user.password))) {
      const user_data = await User.query()
        .select([
          "users.id",
          "users.name",
          "users.username",
          "users.password",
          "users.created_at",
          "users.updated_at",
        ])
        .where("id", user.id)
        .first();

      const token = jsonwebtoken.sign(user_data.toJSON(), process.env.APP_KEY, {
        expiresIn: "2h",
      });

      user_data.token = token;

      res.status(200).json({
        message: "Login success!",
        data: user_data
      });

    } else {
      res.status(400).json({
        message: "Invalid Credentials!",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

const register = async (req, res) => {
  try {
    let userCheck = await User.query().where("username", req.body.username).first();
    if (userCheck) {
      return res.status(400).json({
        status: 400,
        message: "username not available!",
      });
    }

    const user = await User.query().insert({
      name: req.body.name,
      username: req.body.username,
      password: await bcrypt.hash(req.body.password, 10),
    });

    res.status(200).json({
      status: 200,
      message: "OK",
      data: user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

const logout = async (req, res) => {
  try {
    res.status(200).json({
      message: "Logout success!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

module.exports = {
  login,
  register,
  logout,
};
