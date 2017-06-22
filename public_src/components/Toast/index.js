const html = require('bel');
const idbKeyval = require('idb-keyval');
const sanitizeHtml = require('sanitize-html');

function Toast(undoFn) {
  let el;

  function open() {
    document.body.appendChild(el);
    setTimeout(close, 4000);
  }

  function undo() {
    close();
    undoFn();
  }

  function close() {
    if (el.parentElement) {
      el.parentElement.removeChild(el);
    }
  }

  el = html`
    <div class="Toast">
      OK. We won’t repeat this in future articles about this story.
      <button onclick=${undo}>Undo</button>
    </div>
  `;

  open();
}

module.exports = Toast;
