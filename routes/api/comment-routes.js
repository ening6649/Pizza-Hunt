const router = require('express').Router();
const {
  addComment,
  removeComment,
  addReply,
  removeReply
} = require('../../controllers/comment-controller');

// /api/comments/<pizzaId>
router.route('/:pizzaId').post(addComment);
// need both above and below to delete a comment, because 
// ..need to know which pizza the comment is from after deleting a comment
// /api/comments/<pizzaId>/<commentId>
router
  .route('/:pizzaId/:commentId')
  // put route because we are not creating a new reploy resource
  // ..only updating the existing comment resource
  .put(addReply)
  .delete(removeComment);

// /api/comments/<pizzaId>/<commentId>/<replyId>
// must create a new route to removeReply because need the id
// ..of the individual reply, not just its parent
router.route('/:pizzaId/:commentId/:replyId').delete(removeReply);

module.exports = router;
