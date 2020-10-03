const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    recipient: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const MessageModel = mongoose.model('Message', MessageSchema);

module.exports = MessageModel;
