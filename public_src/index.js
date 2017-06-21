const idbKeyval = require('idb-keyval');
const Card = require('./components/Card');

const slice = arr => Array.prototype.slice.call(arr);
const qs = document.querySelector.bind(document);
const qsa = document.querySelectorAll.bind(document);

const refs = slice(qsa('[data-card]')).reduce((memo, el) => {
  memo[el.getAttribute('data-card')] = el;

  return memo;
}, {});

const cardsURL = `/cards/?cards=${Object.keys(refs).join()}`;

fetch(cardsURL)
.then(response => {
  response.json().then(cards => {
    cards.forEach(card => {
      const refEl = refs[card.slug];
     
      refEl.parentElement.insertBefore(Card(card), refEl);
    });
  });
});

idbKeyval.keys().then(keys => {
  const numCollapsedCards = keys.filter(key => key.indexOf('card-') > -1).length;

  if (numCollapsedCards > 2) {
    qs('.Story').classList.add('has-familiar-user');
  }
});
