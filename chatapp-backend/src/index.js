const express = require("express");
const app = express();
const socket = require("socket.io");
const cors = require("cors");
const { joinUser, getCurrentUser, userDisconnect } = require("./users");
const { v4: uuidv4 } = require("uuid");

app.use(express());
app.use(cors());

const port = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.send("connected");
});

const server = app.listen(
  port,
  console.log(`Server is running on the port no: ${port} `)
);

const createMessage = (user, text) => ({
  id: uuidv4(),
  userId: user.id,
  username: user.username,
  text,
});

const io = socket(server);

io.on("connection", (socket) => {
  socket.on("joinRoom", ({ username, roomname }) => {
    // create user
    const user = joinUser(socket.id, username, roomname);
    console.log(socket.id, "=id");
    socket.join(user.room);

    //display a welcome message to the user who have joined a room
    socket.emit("message", createMessage(user, `Welcome ${user.username}`));

    //displays a joined room message to all other room users except that particular user
    socket.broadcast
      .to(user.room)
      .emit(
        "message",
        createMessage(user, `${user.username} has joined the chat`)
      );
  });

  //user sending message
  socket.on("chat", (text) => {
    //gets the room user and the message sent
    const user = getCurrentUser(socket.id);

    io.to(user.room).emit("message", createMessage(user, text));
  });

  //when the user exits the room
  socket.on("disconnect", () => {
    //the user is deleted from array of users and a left room message displayed
    const user = userDisconnect(socket.id);

    if (user) {
      io.to(user.room).emit(
        "message",
        createMessage(user, `${user.username} has left the room`)
      );
    }
  });
});
