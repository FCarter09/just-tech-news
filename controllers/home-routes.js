
const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment, Vote } = require('../models');

// GET route for all posts
router.get('/', (req, res) => {
  console.log('======================');
 // data from post-routes.js in Post.findAll in GET route
  Post.findAll({
    attributes: [
      'id',
      'post_url',
      'title',
      'created_at',
      [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => {
      const posts = dbPostData.map(post => post.get({ plain: true })); // gets all posts(objects) data in array
      res.render('homepage', { posts }); // sends data to hompage.handlerbars
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// GET route for user login
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
    res.render('login');
  });

  // Get route for user logout
  router.get('/logout', (req, res) => {
    if (req.session.loggedIn) {
      req.session.loggedIn.destroy(() => {
        res.status(204).end();
      });
    }else{
      res.status(404).end();
    }
  });
  // router.get('/logout', (req, res) => {
  //   if (req.session.loggedIn) {
  //     res.redirect('/');
  //     return;
  //   }
  //     res.render('logout');
  // });

module.exports = router;

