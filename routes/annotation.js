const express = require('express');
const router = express.Router();
const db = require('../lib/db');

/* GET annotations. */
router.get('/', (req, res, next) => {
  const slugs = (req.query.slugs || '').split(',');

  if (slugs.length === 0 || slugs[0].length === 0) {
    return next(new Error('No annotation slugs were provided'));
  }

  const inSlugs = slugs.map(slug => `"${slug}"`).join();
  
  db.then(conn => {
    conn.all(`SELECT slug, text FROM annotations WHERE slug IN (${inSlugs})`, (err, annotations) => {
      res.json(annotations);
    });
  }).catch(next);
});

module.exports = router;
