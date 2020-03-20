'use strict';
// userRouter

const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();
const userController = require('../controllers/userController');

router.get('/', userController.user_list_get);

router.get('/:id', userController.user_get);

router.post('/', upload.array(), (req, res) => {
  console.log(req.body);
  res.send('From this endpoint you can add users.');
});

router.put('/', (req, res) => {
  res.send('From this endpoint you can edit users.');
});

router.delete('/', (req, res) => {
  res.send('From this endpoint you can delete users.');
});

module.exports = router;
