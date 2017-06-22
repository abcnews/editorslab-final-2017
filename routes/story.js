const express = require('express');
const router = express.Router();
const db = require('../lib/db');

/* GET stories */
router.get('/', (req, res, next) => {
  db.then(conn => {
    conn.all('SELECT slug, text FROM stories ORDER BY slug', (err, stories) => {
      res.render('stories', {stories: stories});
    });
  }).catch(next);
});

/* GET story */
router.get('/:slug', (req, res, next) => {
  var slug = req.params['slug']

  db.then(conn => {
    conn.get(`SELECT slug, text FROM stories WHERE slug = "${slug}"`, (err, story) => {
      if (!story) {
        return next(new Error(`No story with slug "${slug}"`));
      }

      res.render('story', {story: story});
    });
  }).catch(next);
});

module.exports = router;
