const mongoose = require('mongoose');

const schemas = require('../schemas');

const MessageModel = mongoose.model('Message', schemas.Message);

module.exports = MessageModel;
