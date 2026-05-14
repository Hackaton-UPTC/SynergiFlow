const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const messages = require("../config/messages");
const serverResponses = require("../utils/helpers/responses");
const { User } = require("../models/users/user");

const routes = (app) => {
  const router = express.Router();

  router.post("/auth", async (req, res) => {
    try {
      const username = (req.body.username || "").trim().toLowerCase();
      const password = req.body.password || "";
      const action = (req.body.action || "login").trim().toLowerCase();

      if (username.length < 3 || password.length < 6) {
        return serverResponses.sendError(res, messages.BAD_REQUEST);
      }

      if (!["login", "register"].includes(action)) {
        return serverResponses.sendError(res, messages.BAD_REQUEST);
      }

      const existingUser = await User.findOne({ username }).lean();

      if (action === "register") {
        if (existingUser) {
          return serverResponses.sendError(res, messages.CONFLICT);
        }

        const passwordHash = await bcrypt.hash(password, 10);
        const user = await User.create({ username, passwordHash });
        const token = jwt.sign({ sub: user._id.toString(), username: user.username }, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRES_IN || "12h",
        });

        return serverResponses.sendSuccess(res, messages.ACCOUNT_CREATED, {
          token,
          user: {
            id: user._id,
            username: user.username,
          },
        });
      }

      if (!existingUser) {
        return serverResponses.sendError(res, messages.AUTHENTICATION_FAILED);
      }

      const storedUser = await User.findOne({ username }).select("+passwordHash");
      const isValidPassword = await bcrypt.compare(password, storedUser.passwordHash);

      if (!isValidPassword) {
        return serverResponses.sendError(res, messages.AUTHENTICATION_FAILED);
      }

      const token = jwt.sign({ sub: storedUser._id.toString(), username: storedUser.username }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || "12h",
      });

      return serverResponses.sendSuccess(res, messages.SUCCESSFUL_LOGIN, {
        token,
        user: {
          id: storedUser._id,
          username: storedUser.username,
        },
      });
    } catch (error) {
      return serverResponses.sendError(res, messages.INTERNAL_SERVER_ERROR);
    }
  });

  app.use("/api", router);
};

module.exports = routes;
