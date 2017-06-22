module.exports.INIT = `

CREATE TABLE IF NOT EXISTS stories
(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT,
  text TEXT
);

CREATE TABLE IF NOT EXISTS annotations
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
DELETE FROM annotations;
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
<p>Here's a piece of text which contains some <a data-annotation='a'>highlighted text</a>, linked to an annotation.</p>
<a data-card='uber-technologies'></a>
<p>Here's a piece of text <a data-annotation='b'>which contains much longer highlighted text, wrapped over more than one line (on most devices)</a>, linked to an annotation.</p>
<p>Some more stuff...</p>
  `}"
);

INSERT INTO annotations
(
  slug,
  text
)
VALUES
(
  "a",
  "${`
<h1>Annotation A</h1>
<p>Travis Kalanick is the founder and former Chief Executive Officer of Uber Technologies.</p>
<p>He stepped down in June 2017, following pressure from board members.</p>
  `}"
),
(
  "b",
  "${`
<h1>Annotation B</h1>
<p>Travis Kalanick is the founder and former Chief Executive Officer of Uber Technologies.</p>
<p>He stepped down in June 2017, following pressure from board members.</p>
  `}"
),
(
  "travis-kalanick",
  "${`
<h1>Who is Travis Kalanick?</h1>
<p>He is the founder and former Chief Executive Officer of Uber Technologies.</p>
<p>He stepped down in June 2017, following pressure from board members.</p>
  `}"
),
(
  "alphabet",
  "${`
<h1>Alphabet</h1>
<p>Alphabet is Google's parent company.</p>
<p>It was formed when Google underwent a corporate restructuring in 2015 in an effort by the company to make it easier to run unrelated subsidiary companies independent of the Google brand.</p>
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
