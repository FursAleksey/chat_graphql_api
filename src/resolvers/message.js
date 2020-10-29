module.exports = {
  author: async (message, args, { models }) => {
    return models.User.findById(message.author);
  },
  recipient: async (message, args, { models }) => {
    return models.User.findById(message.recipient);
  },
};
