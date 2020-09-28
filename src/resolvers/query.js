const messages = require('../messages');

module.exports = {
  messages: () => {
    return messages;
  },
  me: async (parent, args, { models, user }) => {
    try {
      console.log(user);
      return await models.User.findById(user.id);
    } catch (err) {
      console.error(err);
    }
  },
  user: async (parent, { username }, { models }) => {
    try {
      return models.User.findOne({ username });
    } catch (err) {
      console.error(err);
    }
  },
  users: async (parent, args, { models }) => {
    try {
      return models.User.find({});
    } catch (err) {
      console.error(err);
    }
  }
};
