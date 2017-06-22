const html = require('bel');
const idbKeyval = require('idb-keyval');
const sanitizeHtml = require('sanitize-html');

const SANITIZE_HTML_CONFIG = {
  allowedTags: sanitizeHtml.defaults.allowedTags.concat(['h1', 'h2', 'img'])
};

const cards = {};

function Card(data) {
  const contentEl = html`<div class="Card-content u-richtext"></div>`;

  contentEl.innerHTML = sanitizeHtml(data.text, SANITIZE_HTML_CONFIG);

  const el = html`
    <div class="Card is-collapsed">
      ${contentEl}
      <div class="Card-controls--expanded">
        <button onclick=${willCollapse.bind(null, data.slug)}>I've got this</button>
        <a href="#" onclick=${about}>What does this do?</a>
      </div>
      <div class="Card-controls--collapsed">
        <button onclick=${expand.bind(null, data.slug)}>
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8">
              <path fill="none" stroke="#FFF" stroke-linecap="square" stroke-width="2" d="M10 6L5.898 2 2 5.8"/>
            </svg>
          </span>
          I need some background on this</button>
      </div>
    </div>
  `;

  cards[data.slug] = el;

  idbKeyval.get(`card-${data.slug}`).then(value => {
    if (!value) {
      expand(data.slug);
    }
  });

  return el;
}

function willCollapse(slug) {
  idbKeyval.set(`card-${slug}`, 1);
  cards[slug].className = 'Card is-expanded will-collapse';
  document.activeElement.blur();
  // TODO: Popup
}

function expand(slug) {
  idbKeyval.delete(`card-${slug}`);
  cards[slug].className = 'Card is-expanded';
}

function about(event) {
  event.preventDefault();
  alert('TODO');
}

module.exports = Card;
