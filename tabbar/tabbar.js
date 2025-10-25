window.addEventListener('DOMContentLoaded', () => {
  const page = parent.document.getElementById('page');
  const tabbar = document.getElementById('tab-bar');

  let current_src = "";

  function openPage(src, el) {
    if (src == current_src) return;
    if (page) page.src = src;
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    if (el) el.classList.add('active');
    current_src = src
  }

  const tabs = [
    ['pages/welcomepage/welcome.html', 'Welcome'],
    ['pages/dictionary.html', 'Dictionary'],
    ['https://supduzz.github.io/Draconic/shared/alphabet/alphabet.html', '1. Alphabet'],
    ['pages/phonology.html', '2. Phonology'],
    ['pages/nouns/nouns.html', '3. Nouns'],
    ['pages/verbs.html', '4. Verbs'],
    ['pages/adverbs.html', '5. Adverbs'],
    ['pages/auxilaries.html', '6. Auxilaries'],
    ['pages/adjectives.html', '7. Adjectives'],
    ['pages/animacy.html', '8. Animacy & Agency'],
    ['pages/games.html', '9. Games']
  ];

  tabbar.innerHTML = tabs.map(([src, name], i) => `<div class="tab${i === 0 ? ' active' : ''}" data-src="${src}">${name}</div>`).join('');

  tabbar.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => openPage(tab.dataset.src, tab));
  });

  openPage(tabs[0][0], tabbar.querySelector('.tab'));
});
