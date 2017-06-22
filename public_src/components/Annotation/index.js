const html = require('bel');
const idbKeyval = require('idb-keyval');
const sanitizeHtml = require('sanitize-html');

const SANITIZE_HTML_CONFIG = {
  allowedTags: sanitizeHtml.defaults.allowedTags.concat(['h1', 'h2', 'img'])
};
const NOOP = () => {};

const annotations = {};

function Annotation(data, refEl) {
  let el;

  function open() {
    el.classList.remove('is-closing');
    document.documentElement.classList.add('has-annotation');
    document.body.appendChild(el);
  }

  function close() {
    el.classList.add('is-closing');
    setTimeout(() => {
      if (el.parentElement) {
        el.parentElement.removeChild(el);
      }
      document.documentElement.classList.remove('has-annotation');
    }, 250);
  }

  function destroy() {
    idbKeyval.set(`annotation-${data.slug}`, 1);
    removeHighlight();
    close();
  }

  function removeHighlight() {
    refEl.className = 'is-removed';
    refEl.onclick = NOOP;
  }

  const contentEl = html`<div class="Annotation-content u-richtext"></div>`;

  contentEl.innerHTML = sanitizeHtml(data.text, SANITIZE_HTML_CONFIG);

  el = html`
    <div class="Annotation" onclick=${close}>
      <div class="Annotation-container" onclick=${event => event.stopPropagation()}>
        ${contentEl}
        <div class="Annotation-controls">
          <button class="Annotation-controls-remove" onclick=${destroy}>OK. I don’t need to see this again</button>
          <button class="Annotation-controls-close" onclick=${close}>Close this but keep the annotation</button>
        </div>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" onclick=${close}>
        <g fill="none" fill-rule="evenodd" stroke="#FFF" stroke-linecap="square" stroke-width="2">
          <path d="M2 12l5-5.127L2.248 2M12 12L7 6.873 11.752 2"/>
        </g>
      </svg>
    </div>
  `;

  idbKeyval.get(`annotation-${data.slug}`).then(value => {
    if (value) {
      removeHighlight();
    } else {
      refEl.onclick = open;
    }
  });
}

module.exports = Annotation;
