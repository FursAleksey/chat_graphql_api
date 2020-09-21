const messages = require("../messages");

module.exports = {
  newMessage: (parent, { content }) => {
    const message = {
      id: messages.length + 1,
      content,
    };

    messages.push(message);
    return message;
  },
};
