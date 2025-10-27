function dictionaryPage() {

    //yoo new dictionary xd
    const a = [];
    const b = [];
    const z = {
        a,
        b
    }

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


    Object.entries(ALL_WORDS).forEach(([key, wordObj, definition, genders]) => {
        a.push(key);
        b.push(wordObj.word);
    });
    console.log(z);
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
        const ascdascdc = ALL_WORDS[keyword];
        console.log('Current keyword |', keyword, ascdascdc);
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
        /*
            // MY FUCKING GOD
            // so it can start both with preposition and particle? alr
            // only the i- paarticle.
            // verbs can start with particle or preposition? //my assumption would be yes to prepositions.  fuck //nope. nouns and determiners only.
            // with verbs, we need to make sure to have it be an if else if. such that we dont accidently count raw words that just happen to start with the same letters as those of the prefixes, as verbs. so if it isnt in raw, then check verb prefixes.
                    
                    
                    
            // æze-
            // aze-
            // fenlly-
            // ħá-
            // ħáŋ-
            // ho-
            // hu-
            // huz-
            // kxā-
            // kxæ-
            // lleŋ-
            // lloq̇-
            // ly-
            // ō-
            // qa-
            // qē-
            // qēru-
            // q̇ū-
            // qχok-
            // sæχ-
            // saχ-
            // sī-
            // sil-
            // thū-
            // tre-
            // ū-
            // all prepositions^^
                    
                    
            // i- prefix to turn nouns into adjectives
            // -nyl to turn adjectives into adverbs
            // -ûl
            // -ūn
            // -ān
            // -ōn
            // particles^^
                    
            // -hyn	
            // -hyf	
            // -ħó	
            // -llīl	
            // -huχ	
            // -thok	
            // -hoq̇
            // ^^ unique determiner suffixes. (only for determiners).
                    
            // noun suffixes
                    
            // verb prefixes
            // verb suffixes
                    
            // i think this is it.^^
                    
            // raw exact match
        */

        const nounFormCache = new Map();
        const verbFormCache = new Map();
        const EMPTY_FORM_SET = Object.freeze(new Set());
        const failedFormGenerators = new Set();



        if (document.getElementById('dictionaryTable')) { document.getElementById('dictionaryTable').remove() }




        function collectForms(generator, cache, entry, label) {
            const baseWord = typeof entry === 'string' ? entry : entry?.word;
            if (!baseWord) return EMPTY_FORM_SET;
            if (cache.has(baseWord)) return cache.get(baseWord);

            const forms = new Set([baseWord]);
            try {
                const generated = generator(entry) || [];
                generated.forEach(form => {
                    if (typeof form !== 'string') return;
                    const candidate = form.trim();
                    if (candidate) forms.add(candidate);
                });
            } catch (err) {
                if (label && !failedFormGenerators.has(label)) {
                    console.warn(`trace_origin: failed to build ${label} forms`, err);
                    failedFormGenerators.add(label);
                }
            }

            cache.set(baseWord, forms);
            return forms;
        }

        function TEMP_noun_forms_list(noun) {
            const word = typeof noun === 'string' ? noun : noun?.word;
            if (!word) return [];
            if (typeof connect_suffix !== 'function' || typeof entries_to_text !== 'function') return [];

            let suffixes = [];
            if (typeof FLAT_NOUN_SUFFIXES !== 'undefined') {
                suffixes = FLAT_NOUN_SUFFIXES;
            } else if (typeof NOUN_SUFFIXES !== 'undefined') {
                suffixes = Object.values(NOUN_SUFFIXES || {})
                    .flatMap(mask => Object.values(mask || {}))
                    .flatMap(genderMap => Object.values(genderMap || {}))
                    .flatMap(numberMap => Object.values(numberMap || {}))
                    .flatMap(caseMap => Object.values(caseMap || {}));
            }

            if (!Array.isArray(suffixes) || !suffixes.length) return [];

            return suffixes
                .map(suffix => {
                    try {
                        return entries_to_text(connect_suffix(word, suffix));
                    } catch {
                        return null;
                    }
                })
                .filter(Boolean);
        }

        function TEMP_verb_forms_list(verb) {
            const word = typeof verb === 'string' ? verb : verb?.word;
            if (!word) return [];
            if (typeof connect_suffix !== 'function' || typeof entries_to_text !== 'function') return [];

            let suffixes = [];
            if (typeof FLAT_VERB_OBJECT_SUFFIXES !== 'undefined') {
                suffixes = FLAT_VERB_OBJECT_SUFFIXES;
            } else if (typeof VERB_OBJECT_SUFFIXES !== 'undefined') {
                if (Array.isArray(VERB_OBJECT_SUFFIXES)) {
                    suffixes = VERB_OBJECT_SUFFIXES;
                } else {
                    suffixes = Object.values(VERB_OBJECT_SUFFIXES || {})
                        .flatMap(mask => Object.values(mask || {}))
                        .flatMap(formMap => Object.values(formMap || {}));
                }
            }

            if (!Array.isArray(suffixes) || !suffixes.length) return [];

            return suffixes
                .map(suffix => {
                    try {
                        return entries_to_text(connect_suffix(word, suffix));
                    } catch {
                        return null;
                    }
                })
                .filter(Boolean);
        }

        function getNounForms(wordObj) {
            return collectForms(TEMP_noun_forms_list, nounFormCache, wordObj, 'noun');
        }

        function getVerbForms(wordObj) {
            return collectForms(TEMP_verb_forms_list, verbFormCache, wordObj, 'verb');
        }

        function findDirectMatchKey(word) {
            for (const [key, wordObj] of Object.entries(ALL_WORDS)) {
                if (wordObj?.word === word) return key;
            }
            return undefined;
        }

        function findNounKeys(word) {
            if (!word) return undefined;
            for (const [key, wordObj] of Object.entries(NOUNS)) {
                if (!wordObj?.word) continue;
                if (word === wordObj.word) return [key];
                if (getNounForms(wordObj).has(word)) return [key];
            }
            return undefined;
        }

        function findVerbKeys(word) {
            if (!word) return undefined;
            for (const [key, wordObj] of Object.entries(VERBS)) {
                if (!wordObj?.word) continue;
                if (word === wordObj.word) return [key];
                if (getVerbForms(wordObj).has(word)) return [key];
            }
            return undefined;
        }

        function normaliseVerbPrefix(entry) {
            if (!entry) return '';
            if (typeof entry === 'string') return entry;
            if (typeof entry === 'object') {
                if (typeof entry.word === 'string') return entry.word;
                if (typeof entry.prefix === 'string') return entry.prefix;
                if (typeof entry.text === 'string') return entry.text;
            }
            return '';
        }

        function matchPrefixCollection(sourceText, collection, resolveRest) {
            if (!collection) return undefined;

            const isArrayCollection = Array.isArray(collection);
            const rawEntries = isArrayCollection
                ? Array.from(collection.entries())
                : Object.entries(collection);
            const entries = rawEntries
                .map(([key, value]) => {
                    const prefix = typeof value === 'string'
                        ? value
                        : (typeof value?.word === 'string' ? value.word : '');
                    const entryKey = isArrayCollection
                        ? (prefix || String(key))
                        : key;
                    return [entryKey, prefix];
                })
                .filter(([, prefix]) => prefix.length > 0)
                .sort((a, b) => b[1].length - a[1].length);

            for (const [key, prefix] of entries) {
                if (!prefix) continue;
                const candidates = prefix.endsWith('-')
                    ? [prefix, prefix.slice(0, -1)]
                    : [prefix];

                let remainder = null;
                for (const candidate of candidates) {
                    if (!candidate) continue;
                    if (!sourceText.startsWith(candidate)) continue;
                    remainder = sourceText.slice(candidate.length);
                    break;
                }

                if (remainder === null) continue;

                const nextKeys = resolveRest(remainder);
                if (!nextKeys) continue;
                return [key, ...(Array.isArray(nextKeys) ? nextKeys : [nextKeys])];
            }

            return undefined;
        }

        function matchVerbSubjectPrefix(sourceText) {
            let prefixesSource = [];
            if (typeof FLAT_VERB_SUBJECT_PREFIXES !== 'undefined') {
                prefixesSource = Array.isArray(FLAT_VERB_SUBJECT_PREFIXES)
                    ? FLAT_VERB_SUBJECT_PREFIXES
                    : Object.values(FLAT_VERB_SUBJECT_PREFIXES || {});
            }
            const prefixes = prefixesSource
                .map(normaliseVerbPrefix)
                .filter(prefix => typeof prefix === 'string' && prefix.length > 0)
                .sort((a, b) => b.length - a.length);

            for (const prefix of prefixes) {
                if (!prefix) continue;
                const candidates = prefix.endsWith('-')
                    ? [prefix, prefix.slice(0, -1)]
                    : [prefix];

                let remainder = null;
                for (const candidate of candidates) {
                    if (!candidate) continue;
                    if (!sourceText.startsWith(candidate)) continue;
                    remainder = sourceText.slice(candidate.length);
                    break;
                }

                if (remainder === null) continue;

                const verbKeys = findVerbKeys(remainder);
                if (verbKeys) {
                    return [prefix, ...verbKeys];
                }
            }

            return undefined;
        }

        function trace_origin(text) {
            if (!text) return undefined;

            const directKey = findDirectMatchKey(text);
            if (directKey) return [directKey];

            const prepositionNoun = matchPrefixCollection(text, PREPOSITIONS, remainder => {
                const particleChain = matchPrefixCollection(remainder, PARTICLES, inner => findNounKeys(inner));
                if (particleChain) return particleChain;
                return findNounKeys(remainder);
            });
            if (prepositionNoun) return prepositionNoun;

            const particleNoun = matchPrefixCollection(text, PARTICLES, remainder => findNounKeys(remainder));
            if (particleNoun) return particleNoun;

            const subjectPrefVerb = matchVerbSubjectPrefix(text);
            if (subjectPrefVerb) return subjectPrefVerb;

            const nounKeys = findNounKeys(text);
            if (nounKeys) return nounKeys;

            const verbKeys = findVerbKeys(text);
            if (verbKeys) return verbKeys;

            return undefined;
        }
        function trace_definition(text) {
            if (typeof text !== 'string') return [];
            const needle = text.trim().toLowerCase();
            if (!needle) return [];
            const matches = [];
            for (const [key, entry] of Object.entries(ALL_WORDS)) {
                if (!entry) continue;
                const entryType = (entry.type || '').toLowerCase();
                if (entryType === 'n' || entryType === 'noun') {
                    //console.log(entryType);
                    const genders = entry.genders && typeof entry.genders === 'object' ? entry.genders : {};
                    for (const [genderName, rawValue] of Object.entries(genders)) {
                        const values = Array.isArray(rawValue) ? rawValue : [rawValue];
                        for (const candidate of values) {
                            const candidateText = typeof candidate === 'string' ? candidate.trim() : '';
                            if (!candidateText) continue;
                            if (!candidateText.toLowerCase().includes(needle)) continue;
                            matches.push({//noun
                                key,
                                word: entry.word || '...',
                                type: entryType || '...',
                                gender: genderName || '...',
                                definition: candidateText || '...',
                                declension: entry.declension || '...'
                            });
                            break;
                        }
                    }
                    continue;
                }

                const defSources = new Set();
                if (typeof entry.defenition === 'string') defSources.add(entry.defenition);
                if (Array.isArray(entry.defenition)) {
                    for (const value of entry.defenition) {
                        if (typeof value === 'string') defSources.add(value);
                    }
                }
                if (typeof entry.definition === 'string') defSources.add(entry.definition);
                if (Array.isArray(entry.definition)) {
                    for (const value of entry.definition) {
                        if (typeof value === 'string') defSources.add(value);
                    }
                }
                for (const defSource of defSources) {
                    const defText = typeof defSource === 'string' ? defSource.trim() : '';
                    if (!defText) continue;
                    if (!defText.toLowerCase().includes(needle)) continue;
                    matches.push({//not noun/adj
                        key,
                        word: entry.word,
                        type: entryType,
                        definition: defText,
                    });
                    break;
                }
            }
            return matches;
        }

        const chain = trace_origin(keyword);
        const baseKey = chain?.[chain.length - 1];
        const baseEntry = baseKey ? ALL_WORDS[baseKey] : undefined;
        const prefixes = (chain ?? []).slice(0, -1).map(key =>
            PREPOSITIONS?.[key]?.word ??
            PARTICLES?.[key]?.word ??
            key // fallback if you stored the literal string
        );



        if (trace_definition(keyword)) {
            const origin = trace_definition(keyword);
            origin.forEach(entry => {
                //console.log(entry);



                const genders = entry.gender || '...';
                const word = entry.word || '...';
                const declension = entry.declension || ALL_WORDS[entry.key].declension || '';
                const forms = entry.forms || ALL_WORDS[entry.key].forms || genders || '...';
                const definition = entry.definition || '...';
                const notes = entry.usage_notes || ALL_WORDS[entry.key].usage_notes || '...';
                const wordclass = entry.type || '...';

                let wordclassText = '';
                if (declension) {
                    wordclassText = `${wordclass} ` + declension;
                } else (wordclassText = wordclass);
                //console.log(chain, entry, prefixes, entry.gender);
                const uniqueId = (word + '-' + wordclass + '-' + declension + '-' + genders);
                extraTableRow(word, wordclassText, forms, definition, notes, uniqueId)


            });
            let genderGroups = [];
            function groupedGenders(key) {
                const map = {
                    1: 'Exalted',
                    2: 'Rational',
                    3: 'Monstrous',
                    4: 'Irrational',
                    5: 'Magical',
                    6: 'Mundane',
                    7: 'Abstract'
                };

                // safely get genders object
                const genders = ALL_WORDS[key].genders || {};
                // collect values in numeric order 1..7
                const values = [];
                for (let i = 1; i <= 7; i++) {
                    values[i] = genders[map[i]]; // keep 1-based index to match your map
                    //console.log(`${map[i]}:`, values[i]);
                }

                // helper: compare values treating undefined/null/empty as not equal
                const same = (a, b) => a !== undefined && a !== null && a !== '' && a === b;

                // check 1===2===3===4
                if (same(values[1], values[2]) && same(values[2], values[3]) && same(values[3], values[4])) {
                    genderGroups.push({
                        definition: values[1],
                        key,
                        word: ALL_WORDS[key].word,
                        group: 'Animates'
                    })
                }

                // check 5===6===7
                if (same(values[5], values[6]) && same(values[6], values[7])) {
                    genderGroups.push({
                        definition: values[5],
                        key,
                        word: ALL_WORDS[key].word,
                        group: 'Inanimates'
                    })
                }
                if (genderGroups.length > 0) { console.log(genderGroups); if (genderGroups[0].group === 'Animates') { console.log('animates') } }

            }
            //groupedGenders(entry.key);
            function hideIfGrouped() {
                if (genderGroups[0].group === 'Animates') {
                    const tr1 = document.getElementsByClassName('dictionaryTable-1');
                    const tr2 = document.getElementsByClassName('dictionaryTable-2');
                    const tr3 = document.getElementsByClassName('dictionaryTable-3');
                    const tr4 = document.getElementsByClassName('dictionaryTable-4');

                    tr2.remove();
                    tr3.remove();
                    tr4.remove();

                    tr1.id = `test`;
                }
            }
            //hideIfGrouped();
        }
    }

    let table = '';
    // Monotonic row id to avoid collisions when rows are removed
    let rowId = 0;
    // table row gen.
    function extraTableRow(word, declension, forms, defintion, notes, IdIdentifier) {

        table = document.getElementById('dictionaryTable');
        if (!table) { table = document.createElement('table'); }// create/get depends on if it exists - doesnt conflict.

        //header row
        const trh = document.createElement('tr');

        const th1 = document.createElement('th');
        const th2 = document.createElement('th');
        const th3 = document.createElement('th');
        const th4 = document.createElement('th');
        const th5 = document.createElement('th');
        const th6 = document.createElement('th');



        trh.id = trh;
        if (!document.getElementById(trh)) {

            trh.appendChild(th1);
            trh.appendChild(th2);
            trh.appendChild(th3);
            trh.appendChild(th4);
            trh.appendChild(th5);
            trh.appendChild(th6);

            table.appendChild(trh);

            th1.textContent = 'Word';
            th2.textContent = 'Wordclass';
            th3.textContent = 'Forms';
            th4.textContent = 'Definition';
            th5.textContent = 'Notes';
            th6.textContent = '...';

            th1.style.width = '12%';
            th2.style.width = '7%';
            th3.style.width = '7%';
            th4.style.width = '30%';
            th5.style.width = '30%';
            th6.style.width = '7%';

            table.id = 'dictionaryTable';
        }

        //td rows
        const trd = document.createElement('tr');

        const td1 = document.createElement('td');
        const td2 = document.createElement('td');
        const td3 = document.createElement('td');
        const td4 = document.createElement('td');
        const td5 = document.createElement('td');
        const td6 = document.createElement('td');

        td1.innerHTML = word;
        td2.innerHTML = declension;
        td3.innerHTML = forms;
        td4.innerHTML = defintion;
        td5.innerHTML = notes;
        td6.innerHTML = `<strong>search</strong>`;

        // Use a monotonic counter for stable, unique IDs (not table.rows.length)
        rowId += 1;
        const Index = rowId;
        trd.id = ('tr-' + Index);
        trd.className = 'dictionaryTable-' + Index;
        /*
                td1.id = `td1-${IdIdentifier}`;
                td2.id = `td2-${IdIdentifier}`;
                td3.id = `td3-${IdIdentifier}`;
                td4.id = `td4-${IdIdentifier}`;
                td5.id = `td5-${IdIdentifier}`;
                td6.id = `td6-${IdIdentifier}`;
        */

        td1.id = `td1-${Index}`;
        td2.id = `td2-${Index}`;
        td3.id = `td3-${Index}`;
        td4.id = `td4-${Index}`;
        td5.id = `td5-${Index}`;
        td6.id = `td6-${Index}`;


        //td6
        td6.style.cursor = 'pointer';
        td6.addEventListener('click', (e) => {
            search(td1.innerHTML);
        });

        trd.appendChild(td1);
        trd.appendChild(td2);
        trd.appendChild(td3);
        trd.appendChild(td4);
        trd.appendChild(td5);
        trd.appendChild(td6);

        table.appendChild(trd);

        const wrap = document.querySelector('#tableWrapper');
        wrap.appendChild(table);

        function fixTable() {
            // Find the nearest existing previous row (accounts for rows removed earlier)
            let prevIndex = Index - 1;
            while (prevIndex > 0 && !document.getElementById('tr-' + prevIndex)) {
                prevIndex--;
            }

            if (prevIndex > 0) {
                const definitionCellAbove = document.getElementById('td4-' + prevIndex);
                const formsCellAbove = document.getElementById('td3-' + prevIndex);
                const trAbove = document.getElementById('tr-' + prevIndex);

                if (definitionCellAbove && formsCellAbove && trAbove) {
                    if (definitionCellAbove.textContent === td4.textContent) {
                        const currentHTML = td3.innerHTML;
                        td3.innerHTML = `${formsCellAbove.innerHTML}<br>${currentHTML}`;
                        // Remove the merged row
                        trAbove.remove();
                    }
                }
            }
        } fixTable();
    }
    // usage => for (let i = 0; i < rowAmount; i++) { extraTableRow(keyword or something custom); }


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


}//if(entry.animates && entry.gender === 'e'){genders='animates'}; if(entry.gender === 'r','mon','i'){return;}?




dictionaryPage(); // so constants arent redefined.
// this works as a wrapper function essentially^^
