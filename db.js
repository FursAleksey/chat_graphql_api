const mongoose = require('mongoose');

module.exports = {
  connect: (DB_HOST) => {
    mongoose
      .connect(DB_HOST, {
        useNewUrlParser: true,
        useFindAndModify: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log('MongoDB connected successfully');
      })
      .catch((err) => {
        console.error(err);
        console.log('Something went wrong');
      });
  },
  disconnect: () => {
    mongoose
      .disconnect()
      .then(() => {
        console.log('MongoDB disconnected successfully');
      })
      .catch((err) => {
        console.error(err);
        console.log('Something went wrong');
      });
  },
};
