const express = require("express");
const checkLogin = require("../app/middleware/checkLogin");
const commentsController = require('./../app/controllers/CommentsController');
const router = express.Router();
router.post('/',checkLogin,commentsController.postComment);
router.get('/:idPoduct',commentsController.getCommentsByIdProduct)
router.put('/:id',checkLogin,commentsController.updateComment);
router.delete('/:id',checkLogin,commentsController.deteteComment);

module.exports = router;
