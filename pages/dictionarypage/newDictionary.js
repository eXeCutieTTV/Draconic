//yoo new dictionary xd

const a = [];
const b = [];

const ALL_WORDS = Object.fromEntries(
    Object.entries({
        ...NOUNS,
        ...VERBS,
        ...ADJECTIVES,
        ...ADVERBS,
        ...AUXILIARIES,
        ...PREPOSITIONS,
        ...PARTICLES
    }).sort(([aKey], [bKey]) => aKey.localeCompare(bKey))
);

document.getElementByIdi

Object.entries(ALL_WORDS).forEach(([key, wordObj]) => {
    a.push(key);
    b.push(wordObj.word);
});
console.log(a);
console.log(b);
// was tired of full consolelog xd


function search_word(word, dec = "") {
    if (ALL_WORDS[word] !== undefined) return ALL_WORDS[word];
    return ALL_WORDS[word + dec];
}



// so my idea is to make Dictionary (page99) be searchfield (will make later) and a table with all words
// resultpage on the other hand will be automatically generated based on seached word
// wouldnt it be better to have it be updated instead? but have a premade template.
// hm ill think about that
// i can work w both though tbh.
// eh ill think still :dragon:
const searchBTN = document.getElementById('search_button');
const searchFLD = document.getElementById('search_field');


// main search function
function search() {
    const searchFLD = document.getElementById('search_field');
    const keyword = (searchFLD && searchFLD.value ? searchFLD.value.trim() : '').toLowerCase();
    console.log(keyword);

    for (let i = 0; i < 4; i++) {
        const thing = ALL_WORDS[keyword + [i]]
        if (thing) {
            console.log('yes');
        }

    }
}




// clone <p> element with keyword data
function cloneKeywordText() {
    const source = document.getElementById('keywordp');
    if (!source) return;

    const sourceText = source.textContent;

    for (let i = 1; i <= 100; i++) { // Adjust 100 to your max expected number
        const target = document.getElementById('keywordp' + i);
        if (target) {
            target.textContent = sourceText;
        }
    }
}

// clone <p> element with wordclass data
function cloneWordclassText() {
    const source = document.getElementById('wordclassp');
    if (!source) return;

    const sourceText = source.textContent;

    for (let i = 1; i <= 100; i++) { // Adjust 100 to your max expected number
        const target = document.getElementById('wordclassp' + i);
        if (target) {
            target.textContent = sourceText;
        }
    }
}

// Safely swap two element IDs using a temporary third ID to avoid duplicates.
// Call this to swap the button IDs and the field IDs.
function reverseSearchIdsOnSearch() {
    function swapSearchIds(idA, idB) {
        const a = document.getElementById(idA);
        const b = document.getElementById(idB);
        if (!a && !b) return;          // nothing to do
        if (!a && b) { b.id = idA; return; }
        if (a && !b) { a.id = idB; return; }

        // use a temporary id unlikely to collide
        const tmp = `__tmp_id_${Date.now()}_${Math.random().toString(36).slice(2)}`;
        a.id = tmp;        // step 1: move A out of the way
        b.id = idA;        // step 2: move B into A's original id
        const movedA = document.getElementById(tmp);
        if (movedA) movedA.id = idB; // step 3: restore A into B's original id
    }
    if (document.getElementById('search_button') && document.getElementById('unusedBtn')) {
        swapSearchIds('search_button', 'unusedBtn');
        swapSearchIds('search_field', 'unusedField');
    }
}

// === Search button click ===
searchBTN.addEventListener('click', () => {
    search(); // /\(/o.o\)/\ - Spooky the spider
});

// === Trigger search on Enter key ===
searchFLD.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault(); // prevent form submission
        search();
    }
});
/*
// search ids work when page doesnt exist from launch.
let searchListenersRetryHandle = null;

function wireSearchListeners() {
    const searchBTN = document.getElementById('search_button');
    const searchFLD = document.getElementById('search_field');
    if (searchBTN && searchFLD) {
        if (searchListenersRetryHandle !== null) {
            clearTimeout(searchListenersRetryHandle);
            searchListenersRetryHandle = null;
        }

        if (searchBTN.dataset.searchListenersBound === 'true' && searchFLD.dataset.searchListenersBound === 'true') {
            return;
        }

        // === Search button click ===
        searchBTN.addEventListener('click', () => {
            search(); // /\(/o.o\)/\ - Spooky the spider
        });

        // === Trigger search on Enter key ===
        searchFLD.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault(); // prevent form submission
                search();
            }
        });

        searchBTN.dataset.searchListenersBound = 'true';
        searchFLD.dataset.searchListenersBound = 'true';
        return;
    }

    if (searchListenersRetryHandle !== null) return;

    searchListenersRetryHandle = setTimeout(() => {
        searchListenersRetryHandle = null;
        wireSearchListeners();
    }, 100);
}

function startSearchListenerWiring() {
    wireSearchListeners();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startSearchListenerWiring);
} else {
    startSearchListenerWiring();
}
    */
