const express = require('express');
const router = express.Router();
const db = require('../lib/db');

/* GET cards. */
router.get('/', (req, res, next) => {
  const slugs = (req.query.slugs || '').split(',');

  if (slugs.length === 0 || slugs[0].length === 0) {
    return next(new Error('No card slugs were provided'));
  }

  const inSlugs = slugs.map(slug => `"${slug}"`).join();
  
  db.then(conn => {
    conn.all(`SELECT slug, text, expand, collapse FROM cards WHERE slug IN (${inSlugs})`, (err, cards) => {
      res.json(cards);
    });
  }).catch(next);
});

module.exports = router;
