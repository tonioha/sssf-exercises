'use strict';
// userController

const userModel = require('../models/userModel');

const users = userModel.users;

const user_list_get = (req, res) => {
  const userCopy = [...users];
  for (let i = 0; i < userCopy.length; i++) {
    const user = userCopy[i];
    delete user.password;
  }
  res.json(userCopy);
};

const user_get = (req, res) => {
  const user = users.find((user) => user.id === req.params.id);
  delete user.password;
  res.json(user);
};

module.exports = {
  user_list_get,
  user_get,
};
