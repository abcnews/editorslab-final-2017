const idbKeyval = require('idb-keyval');
const Annotation = require('./components/Annotation');
const Card = require('./components/Card');

const slice = arr => Array.prototype.slice.call(arr);
const qs = document.querySelector.bind(document);
const qsa = document.querySelectorAll.bind(document);

const annotationRefs = slice(qsa('[data-annotation]')).reduce((memo, el) => {
  memo[el.getAttribute('data-annotation')] = el;

  return memo;
}, {});

const annotationRefsKeys = Object.keys(annotationRefs);

if (annotationRefsKeys.length) {
  const annotationsURL = `/annotations/?slugs=${annotationRefsKeys.join()}`;

  fetch(annotationsURL)
  .then(response => {
    response.json().then(annotations => {
      annotations.forEach(annotation => {
        const refEl = annotationRefs[annotation.slug];
        
        if (refEl) {
          Annotation(annotation, refEl);
        }
      });
    });
  });
}

const cardRefs = slice(qsa('[data-card]')).reduce((memo, el) => {
  memo[el.getAttribute('data-card')] = el;

  return memo;
}, {});

const cardRefsKeys = Object.keys(cardRefs);

if (cardRefsKeys.length) {
  const cardsURL = `/cards/?slugs=${cardRefsKeys.join()}`;

  fetch(cardsURL)
  .then(response => {
    response.json().then(cards => {
      cards.forEach(card => {
        const refEl = cardRefs[card.slug];
      
        if (refEl) {
          Card(card, refEl);
        }
      });
    });
  });
}

idbKeyval.keys().then(keys => {
  const numCollapsedCards = keys.filter(key => key.indexOf('card-') > -1).length;

  if (numCollapsedCards > 2) {
    qs('.Story').classList.add('has-familiar-user');
  }
});
