
const User = require('./User');
const Post = require('./Post');
const Vote = require('./Vote');

// create associations for user and post models
User.hasMany(Post, {
    foreignKey: 'user_id'
  });

Post.belongsTo(User, {
    foreignKey: 'user_id'
  });

// create associations for user, post, and vote models
User.belongsToMany(Post, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'user_id'
    });
  
Post.belongsToMany(User, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'post_id'
  });

module.exports = { User, Post, Vote };