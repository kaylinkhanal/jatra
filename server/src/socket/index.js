const initializeSocketIO = (io) => {
  return io.on("connection", (socket) => {
    console.log("a user connected");
  });
};

module.exports = initializeSocketIO;