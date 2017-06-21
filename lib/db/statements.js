module.exports.INIT = `

CREATE TABLE IF NOT EXISTS stories
(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT,
  text TEXT
);

CREATE TABLE IF NOT EXISTS cards
(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT,
  text TEXT,
  collapse TEXT,
  expand TEXT
);

`;

module.exports.RESET = `

DELETE FROM stories;
DELETE FROM cards;
VACUUM;

INSERT INTO stories
(
  slug,
  text
)
VALUES
(
  "uber-ceo-steps-down",
  "${`
<h1>Uber CEO steps down</h1>
<p>Travis Kalanick, CEO of Uber Technologies has stepped down.</p>
<a data-card='travis-kalanick'>
  <h2 data-unaware>Unaware preamble</h2>
  <p data-aware>Aware reference</p>
</a>
<a data-card='ceo'></a>
<a data-card='uber-technologies'></a>
<p>Some more stuff...</p>
  `}"
);

INSERT INTO cards
(
  slug,
  text,
  collapse,
  expand
)
VALUES
(
  "travis-kalanick",
  "${`
<h1>Travis Kalanick</h1>
<p>Travis Kalanick is the founder and former Chief Executive Officer of Uber Technologies.</p>
<p>He stepped down in June 2017, following pressure from board members.</p>
  `}",
  NULL,
  NULL
),
(
  "ceo",
  "${`
<h1>CEO</h1>
<p>Chief Executive Officer</p>
  `}",
  NULL,
  NULL
),
(
  "uber-technologies",
  "${`
<h1>Uber Technologies</h1>
<p>A company which owns the ride-sharing service Uber, and food delivery service Uber Eats.</p>
  `}",
  "OK, I know what Uber is.",
  "Wait, who are Uber?"
);
`;
