const messages = require('../messages');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server-express');
require('dotenv').config();

module.exports = {
  newMessage: (parent, { content }) => {
    const message = {
      id: messages.length + 1,
      content,
    };

    messages.push(message);
    return message;
  },
  signUp: async (parent, { username, email, password }, { models }) => {
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const newUser = await models.User.create({
        username,
        email: email.trim().toLowerCase(),
        password: hashedPassword,
      });

      return jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
    } catch (err) {
      console.error(err);
      throw new Error('User creation error');
    }
  },
  signIn: async (parent, { username, email, password }, { models }) => {
    let user;
    if (email) {
      const normalizedEmail = email.trim().toLowerCase();
      user = await models.User.findOne({ email: normalizedEmail });
    } else {
      user = await models.User.findOne({ username });
    }

    if (!user) {
      throw new AuthenticationError('Authentication error');
    }

    const verify = await bcrypt.compare(password, user.password);

    if (!verify) {
      throw new AuthenticationError('Authentication error');
    }

    return jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  },
};
