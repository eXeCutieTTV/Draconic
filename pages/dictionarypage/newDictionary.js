function dictionaryPage() {

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
        console.log('Current keyword |', keyword);
        /*
                let matchType = 0;
                let array = '';
                for (let i = 0; i < 5; i++) {
                    if (i === 0) {//not nouns/adj
                        const thing = ALL_WORDS[keyword]
                        if (thing) {
                            array = thing;
                            matchType = 1
                            console.log('yes1');
                        } else {
                            matchType = 3
                        }
                    }
                    else if (i > 0) {//nouns/adj
                        const thing = ALL_WORDS[keyword + [i]]
                        if (thing) {
                            array = thing;
                            matchType = 2;
                            console.log('yes2');
                        }
                    }
        
                }
        
                if (matchType == 1) {
                    const wordclass = array.type;
                    switch (wordclass) {
                        case 'v': console.log('verb')
                            break;
                        case 'adv': console.log('adverb')
                            break;
                        case 'aux': console.log('auxilary')
                            break;
                        case 'pp': console.log('preposition')
                            break;
                        case 'part': console.log('particle')
                            break;
                        case 'det': console.log('determiner')
                            break;
                        case 'con': console.log('conjunction')
                            break;
                        default: console.warn('no match in main wordclass switchcase')
                    }
        
                    console.log('yes3', array, wordclass)
                } else if (matchType == 2) {
                    const wordclass = array.type;
                    switch (wordclass) {
                        case 'n': console.log('noun')
                            break;
                        case 'adj': console.log('adjective')
                            break;
                        default: console.warn('no match in wordclass switchcase for nouns/adjs')
                    }
                    console.log('yes4', array, wordclass)
                } else if (matchType == 3) {
                    // check verb prefixes
                    FLAT_VERB_SUBJECT_PREFIXES.forEach(prefix => {
                        const testo = entries_to_text(connect_prefix(keyword, prefix));
                        console.log(testo);
                        if (testo) { console.log('yes5') }
                    });
        
                }
        */
        // this^^ works for detecting raw words.
        // we need to be able to detect affixed words. whats the idea you have, that 'doesnt require us to generate every form in an array'?
        // first check for prefix, it could be either a verb, a noun with preposition or something else
        // hm
        // where is the search help thingi? the examples[]? maybe pages\dictionarypage\searchSuggestions.js
        // currently its giving errors when visiting the page multiple times, because constants get redefined. can you clear the constants or something somehow?
        // iframes could fix that xd
        // im not saying that we 100% dont want iframes, i just didnt really see the point, when we're loading the pages dynamically. only the welcome page exists on launch.
        // but you can do the iframe thing inside each page i suppose? idk. 
        // lets do that later though.
        // where is array of prefixes for verbs? do we need to make one, or do you have in api?
        // i need to mak
        //alf


        function TEMP_noun_forms_list(noun) {
            return FLAT_NOUN_SUFFIXES.map(s => entries_to_text(connect_suffix(noun.word, s)));
        }

        function TEMP_verb_forms_list(noun) {
            return FLAT_VERB_OBJECT_SUFFIXES.map(s => entries_to_text(connect_suffix(noun.word, s)));
        }

        function trace_origin(text) {
            let keys = []

            Object.entries(ALL_WORDS).forEach(([key, wordObj]) => {
                if (text === wordObj.word) return [key];
            });
            // this looks if the text is a raw word

            Object.entries(PREPOSITIONS).forEach(([key, wordObj]) => {
                if (text.startsWith(wordObj.word)) {
                    keys.push(key);
                    text = text.slice(wordObj.word.length)
                }
            })
            // then this looks for prepositions, is there is, then it probably is a noun

            Object.entries(NOUNS).forEach(([key, wordObj]) => {
                TEMP_noun_forms_list(wordObj.word).forEach((noun) => {
                    if (text === noun) {
                        keys.push(key)
                        return keys
                    }
                })
            });

            Object.entries(VERBS).forEach(([key, wordObj]) => {
                TEMP_verb_forms_list(wordObj.word).forEach((noun) => {
                    if (text === noun) {
                        keys.push(key)
                        return keys
                    }
                })
            });


            FLAT_VERB_SUBJECT_PREFIXES.forEach((prefix) => {
                if (text.startsWith(prefix)) {
                    text = text.slice(prefix.length)
                    // its either a verb or auxiliary
                    Object.entries(VERBS).forEach(([key, wordObj]) => {
                        TEMP_verb_forms_list(wordObj.word).forEach((noun) => {
                            if (text === noun) {
                                keys.push(key)
                                return keys
                            }
                        })
                    });

                    // check for all verb and aux forms
                }
            });

            Object.entries(NOUNS).forEach(([key, wordObj]) => {
                if (TEMP_noun_forms_list(wordObj.word).includes(text)) return key;
            });
        }//still undefined. ALL_WORDS i mean. idk how thats possible tho tbh...
        const uiuaa = trace_origin(keyword);
        console.log(uiuaa);
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
}




dictionaryPage(); // so constants arent redefined.
// this works as a wrapper function essentially^^