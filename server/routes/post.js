const router = require('express').Router();
const { body } = require('express-validator/check');

const postController = require('../controllers/post');
const { isAuth, isInRole } = require('../middleware/is-auth');

router.get('/all', postController.getApprovedPosts);
router.get('/pending', isInRole('Admin'), postController.getPendingPosts);

router.post('/create', [
  body('title')
    .trim()
    .not().isEmpty()
    .isLength({ min: 5 })
    .withMessage('Please enter a valid title- minimum 5 chararcters.'),
  body('content')
    .trim()
    .not().isEmpty()
    .isLength({ min: 50 })
    .withMessage('Please enter a valid content- minimum 50 chararcters.'),
  body('imageUrl')
    .not().isEmpty()
    .matches(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png|jpeg)/)
    .withMessage('Please provide a valid image URL.'),
],
isAuth, postController.postCreatePost);

router.get('/details/:postId', postController.getPostById);

router.put('/update/:postId', [
  body('title')
    .trim()
    .not().isEmpty()
    .isLength({ min: 5 })
    .withMessage('Please enter a valid title- minimum 5 chararcters.'),
  body('content')
    .trim()
    .not().isEmpty()
    .isLength({ min: 50 })
    .withMessage('Please enter a valid content- minimum 50 chararcters.'),
  body('imageUrl')
    .not().isEmpty()
    .matches(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png|jpeg)/)
    .withMessage('Please provide a valid image URL.'),
],
isAuth || isInRole('Admin'), postController.updatePost);
router.put('/approve/:postId', isInRole('Admin'), postController.approvePost);

router.delete('/delete/:postId', isAuth || isInRole('Admin'), postController.deletePost);

router.post('/like/:postId' , isAuth, postController.likePost);
router.post('/hate/:postId' , isAuth, postController.hatePost);

module.exports = router;