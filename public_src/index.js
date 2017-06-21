const slice = arr => Array.prototype.slice.call(arr);
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
      const cardEl = document.createElement('div');

      cardEl.className = 'Card';
      cardEl.innerHTML = card.text;

      refEl.parentElement.insertBefore(cardEl, refEl);
    })
  });
});
