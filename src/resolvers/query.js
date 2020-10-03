const { AuthenticationError } = require('apollo-server-express');

module.exports = {
  me: async (parent, args, { models, user }) => {
    if (!user) {
      throw new AuthenticationError('You must be signed in');
    }
    try {
      console.log(user);
      return await models.User.findById(user.id);
    } catch (err) {
      console.error(err);
    }
  },
  user: async (parent, { username }, { models, user }) => {
    if (!user) {
      throw new AuthenticationError('You must be signed in');
    }
    try {
      return models.User.findOne({ username });
    } catch (err) {
      console.error(err);
    }
  },
  users: async (parent, args, { models }) => {
    if (!user) {
      throw new AuthenticationError('You must be signed in');
    }
    try {
      return models.User.find({});
    } catch (err) {
      console.error(err);
    }
  },
  myMessages: async (parent, args, { models, user }) => {
    return models.Message.find({ author: user.id });
  },
};
