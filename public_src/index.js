const idbKeyval = require('idb-keyval');
const Annotation = require('./components/Annotation');
const Card = require('./components/Card');

const slice = arr => Array.prototype.slice.call(arr);
const qs = document.querySelector.bind(document);
const qsa = document.querySelectorAll.bind(document);

const storyEl = qs('.Story');

if (storyEl) {
  Promise.resolve()
  .then(hideStory)
  .then(loadCards)
  .then(loadAnnotations)
  .then(checkFamiliarity)
  .then(showStory)
  .catch(showStory);
}

function hideStory() {
  return new Promise(resolve => {
    storyEl.classList.add('is-hidden');
    resolve();
  });
}

function loadCards() {
  return new Promise(resolve => {
    const cardRefs = slice(qsa('[data-card]')).reduce((memo, el) => {
      memo[el.getAttribute('data-card')] = el;

      return memo;
    }, {});

    const cardRefsKeys = Object.keys(cardRefs);

    if (cardRefsKeys.length) {
      const cardsURL = `/cards/?slugs=${cardRefsKeys.join()}`;

      fetch(cardsURL)
      .then(response => {
        response.json()
        .then(cards => {
          cards.forEach(card => {
            const refEl = cardRefs[card.slug];
          
            if (refEl) {
              Card(card, refEl);
            }
          });

          resolve();
        })
        .catch(resolve);
      })
      .catch(resolve);
    } else {
      resolve();
    }
  });
}

function loadAnnotations() {
  return new Promise(resolve => {
    const annotationRefs = slice(qsa('[data-annotation]')).reduce((memo, el) => {
      memo[el.getAttribute('data-annotation')] = el;

      return memo;
    }, {});

    const annotationRefsKeys = Object.keys(annotationRefs);

    if (annotationRefsKeys.length) {
      const annotationsURL = `/annotations/?slugs=${annotationRefsKeys.join()}`;

      fetch(annotationsURL)
      .then(response => {
        response.json()
        .then(annotations => {
          annotations.forEach(annotation => {
            const refEl = annotationRefs[annotation.slug];
            
            if (refEl) {
              Annotation(annotation, refEl);
            }
          });

          resolve();
        })
        .catch(resolve);
      })
      .catch(resolve);
    } else {
      resolve();
    }
  });
}

function checkFamiliarity() {
  return new Promise(resolve => {
    idbKeyval.keys()
    .then(keys => {
      const numCollapsedCards = keys.filter(key => key.indexOf('card-') > -1).length;

      if (numCollapsedCards > 2) {
        storyEl.classList.add('has-familiar-user');
      }
      
      resolve();
    })
    .catch(resolve);
  });
}

function showStory() {
  return new Promise(resolve => {
    storyEl.classList.remove('is-hidden');
    resolve();
  });
}
