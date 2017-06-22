const html = require('bel');
const idbKeyval = require('idb-keyval');
const sanitizeHtml = require('sanitize-html');
const Annotation = require('../Annotation');
const Toast = require('../Toast');

const slice = arr => Array.prototype.slice.call(arr);

const SANITIZE_HTML_CONFIG = {
  allowedTags: sanitizeHtml.defaults.allowedTags.concat(['h1', 'h2', 'img'])
};

function Card(data, refEl) {
  let el;

  function willCollapse() {
    idbKeyval.set(`card-${data.slug}`, 1);
    el.className = 'Card is-expanded will-collapse';
    document.activeElement.blur();
    Toast(expand);
  }

  function expand() {
    idbKeyval.delete(`card-${data.slug}`);
    el.className = 'Card is-expanded';
  }

  const awarenessEl = html`<div class="Card-awareness u-richtext"></div>`;

  slice(refEl.children).reverse().forEach(node => {
    awarenessEl.insertBefore(node, awarenessEl.firstChild);
  });

  const contentEl = html`<div class="Card-content u-richtext"></div>`;

  contentEl.innerHTML = sanitizeHtml(data.text, SANITIZE_HTML_CONFIG);

  const aboutEl = html`<a>What does this do?</a>`;

  Annotation(null, aboutEl);

  el = html`
    <div class="Card is-collapsed">
      ${awarenessEl}
      ${contentEl}
      <div class="Card-controls--expanded">
        <button onclick=${willCollapse}>
          ${data.collapse || 'I\'ve got this'}
        </button>
        ${aboutEl}
      </div>
      <div class="Card-controls--collapsed">
        <button onclick=${expand}>
          <span><svg xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8">
            <path fill="none" stroke="#FFF" stroke-linecap="square" stroke-width="2" d="M2.243 2.243l4.1 4 3.9-3.802"/>
          </svg></span>
          ${data.expand || 'I need some background on this'}</button>
      </div>
    </div>
  `;

  idbKeyval.get(`card-${data.slug}`).then(value => {
    if (!value) {
      expand(data.slug);
    }
  });

  refEl.parentElement.insertBefore(el, refEl.nextSibling);
}

module.exports = Card;
