const html = require('bel');
const idbKeyval = require('idb-keyval');
const sanitizeHtml = require('sanitize-html');

const SANITIZE_HTML_CONFIG = {
  allowedTags: sanitizeHtml.defaults.allowedTags.concat(['h1', 'h2', 'img'])
};

function about(event) {
  event.preventDefault();
  alert('TODO');
}

function Card(data, refEl) {
  let el;

  function willCollapse() {
    idbKeyval.set(`card-${data.slug}`, 1);
    el.className = 'Card is-expanded will-collapse';
    document.activeElement.blur();
    // TODO: Popup
  }

  function expand() {
    idbKeyval.delete(`card-${data.slug}`);
    el.className = 'Card is-expanded';
  }

  const contentEl = html`<div class="Card-content u-richtext"></div>`;

  contentEl.innerHTML = sanitizeHtml(data.text, SANITIZE_HTML_CONFIG);

  el = html`
    <div class="Card is-collapsed">
      ${contentEl}
      <div class="Card-controls--expanded">
        <button onclick=${willCollapse}>${data.collapse || 'I\'ve got this'}</button>
        <a href="#" onclick=${about}>What does this do?</a>
      </div>
      <div class="Card-controls--collapsed">
        <button onclick=${expand}>
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8">
              <path fill="none" stroke="#FFF" stroke-linecap="square" stroke-width="2" d="M10 6L5.898 2 2 5.8"/>
            </svg>
          </span>
          ${data.expand || 'I need some background on this'}</button>
      </div>
    </div>
  `;

  idbKeyval.get(`card-${data.slug}`).then(value => {
    if (!value) {
      expand(data.slug);
    }
  });

  refEl.parentElement.insertBefore(el, refEl);
}

module.exports = Card;
