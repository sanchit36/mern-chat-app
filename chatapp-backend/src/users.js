const cUsers = [];

// joins the user to the specific chatroom
function joinUser(id, username, room) {
  const pUser = { id, username, room };
  cUsers.push(pUser);
  return pUser;
}

// Gets a particular user id to return the current user
function getCurrentUser(id) {
  return cUsers.find((user) => user.id === id);
}

// called when the user leaves the chat and its user object deleted from array
function userDisconnect(id) {
  const index = cUsers.findIndex((user) => user.id === id);

  if (index !== -1) {
    return cUsers.splice(index, 1)[0];
  }
}

module.exports = {
  joinUser,
  getCurrentUser,
  userDisconnect,
};
