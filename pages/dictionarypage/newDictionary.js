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
    function search(word) {
        const searchFLD = document.getElementById('search_field');
        const keyType1 = (searchFLD && searchFLD.value ? searchFLD.value.trim() : '').toLowerCase();
        const keyType2 = word;
        const keyword = keyType1 || keyType2;
        if (keyword === keyType1) {
            console.log('1');
        } if (keyword === keyType2) { console.log('2'); }
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

        //clear searchFLD
        if (searchFLD && searchFLD.value.trim() !== '') {
            searchFLD.value = '';
            searchFLD.blur();
        }
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
    const matchType = 1;
    function ifTypeOne(keyword) {
        if (matchType == 1) {

            let pagesWrap = document.querySelector('.pages');
            if (!pagesWrap) {
                console.error("no div with class '.pages'");
                return;
            }

            // create pageDiv
            const pageDiv = document.createElement('div');
            pageDiv.id = 'page97';
            pageDiv.className = 'page';
            pageDiv.innerHTML = `
                <div class="outerdiv">
                    <div id="leftdivdictionary" class="leftdivdictionary">
                        <div class="keyworddiv"></div>
                        <h2>
                            <p id="keywordp">Keyword</p>
                        </h2>
                        <p class="inline" id="keywordp1">keyword</p>
                        <p class="inline"> is a</p>
                        <p class="inline" id="wordclassp">wordclass</p>.
                        <p class="inline"> Read more about
                        <p class="inline" id="wordclassp1">wordclass</p>s <a href="#"
                            onclick="event.preventDefault(); dictionaryPageReference()">here</a>,
                        or read the short outline in here.
                        </p>
                        <br><br>
                        <p class="inline">The declention tables that would be relevant for </p>
                        <p class="inline" id="keywordp2">keyword</p>
                        <p class="inline"> can be seen bellow.</p>

                        <div class="tablesContainer"></div>

                        <div id="includeTarget">
                            <div id="leftleftdivdictionary"></div>
                            <div id="rightleftdivdictionary"></div>
                        </div>
                    </div>
                    <div id="rightdivdictionary" class="rightdivdictionary">
                        <div class="pageSearch">
                            <input type="text" id="unusedField" placeholder="Search..." />
                            <button id="unusedBtn">Search</button>
                            <div id="textBoxContainer"></div>
                        </div>
                    </div>
                </div>`;

            pagesWrap.appendChild(pageDiv); // append pageDiv in pagesWrap



            // Wait for the page content to load, then setup the table (header table)
            waitForElement(`#page97 .tablesContainer`).then(pageContainer => {
                // Create and fill the table

                const table = createTable(keyword, pageContainer);
                const wordclass = ALL_WORDS[keyword].type;
                console.log(wordclass);
                fillTable(keyword, wordclass, table);

                // Update keyword <p>s
                const keywordp = document.getElementById("keywordp");
                if (keywordp) {
                    keywordp.innerHTML = keyword;
                }
                cloneKeywordText();

                // Update wordclass <p>s
                const wordclassp = document.getElementById("wordclassp");
                if (wordclassp) {
                    wordclassp.innerHTML = CurrentWordClassAsText;
                }
                cloneWordclassText();

                // Load appropriate content based on word class
                function loadWordClassContent(wordClass, pageId) {
                    const rightDiv = document.querySelector(`#${pageId} #textBoxContainer`);
                    if (!rightDiv) return;
                    console.log(wordClass);

                    let contentFile = '';
                    switch (wordClass) {
                        case 'n':
                            contentFile = 'pages/dictionarypage/text/nountextbox.html'; // nouns text
                            break;
                        case 'v':
                            contentFile = 'pages/dictionarypage/text/verbtextbox.html'; // verbs text
                            break;
                        case 'adv':
                            contentFile = 'pages/dictionarypage/text/adverbtextbox.html'; // adverbs text
                            break;
                        case 'aux':
                            contentFile = 'pages/dictionarypage/text/auxiliarytextbox.html'; // auxiliaries text
                            break;
                        case 'adj':
                            contentFile = 'pages/dictionarypage/text/adjectivetextbox.html'; // adjectives text
                            break;
                        default:
                            console.warn('wordclass could not be detected.'); // Default fallback text
                    }

                    // Load the appropriate content
                    rightDiv.innerHTML = `<include-html src="${contentFile}"></include-html>`;

                    // Trigger the include-html custom element to load the content
                    const includeElement = rightDiv.querySelector('include-html');
                    if (includeElement && includeElement.connectedCallback) {
                        includeElement.connectedCallback();
                    }
                }

                //const currentWordClass = getCurrentWordClass();
                loadWordClassContent(wordclass, targetPageId);

                console.log(wordclass);
                createSummaryTables(wordclass); // declensiontable
                runTableLoader(wordclass); // call your declension table logic here
                reverseSearchIdsOnSearch(); // fix searchfield & btn onpage

            }).catch(error => {
                console.error(`Error creating summary tables`, error);


            }).catch(error => {
                console.error(`Failed to find page container for page97:`, error);
            });


            openPageOld('page97');
            //matchType = 0;
        }
    } //ifTypeOne(keyword);
    // === runTableLoader ===
    function runTableLoader(wordclass) {
        // /\(/o.o\)/\ - Spooky the spider

        // Only run the existing noun declension logic for nouns
        if (wordclass !== 'n') {
            return;
        }

        loaded.clear();

        const cell3 = document.getElementById('cell3');
        const cell1 = document.getElementById('cell1');
        if (!cell3 || !cell1) return;

        const cellText = cell3.textContent.toLowerCase();
        const rowNumber = parseInt(cell1.textContent.trim(), 10);
        if (isNaN(rowNumber) || rowNumber <= 0) return;

        const loadPromises = [];

        for (const [groupId, stems] of Object.entries(groupMap)) {
            const pattern = new RegExp(`\\b${groupId}\\b`, "i");
            if (pattern.test(cellText)) {
                stems.forEach(stem => {
                    if (!loaded.has(stem)) {
                        loadPromises.push(loadTableFiles(rowNumber, stem));
                        loaded.add(stem);
                        setTimeout(() => {
                            console.log(stem, rowNumber, stem);
                        }, 1200);
                    }
                });
            }
        }

        for (const [id, stem] of Object.entries(tableMap)) {
            if (cellText.includes(id.toLowerCase()) && !loaded.has(stem)) {
                loadPromises.push(loadTableFiles(rowNumber, stem));
                loaded.add(stem);
            }
        }

        Promise.all(loadPromises).then(() => {
            console.log("Summary tables updated.");
            hideEmptySummaryRowsIn("dirSummaryTable");
            hideEmptySummaryRowsIn("recSummaryTable");
        });
    }
    function createSummaryTables(wordclass) {

        const keyword = dictionaryData.keyword.baseKeyword || dictionaryData.keyword.keyword;


        switch (wordclass) {
            case 'n':
                // === Create noun summary tables ===
                /*
                function createNounSummaryTables(inDivById, uniquePrefix = "") {
                    return new Promise((resolve, reject) => {
                        const DivId = document.getElementById(`${inDivById}`);
                        if (!DivId) {
                            return reject(new Error(`div by id ${DivId} not found`));
                        }
    
                        const genders = ["Exhalted", "Rational", "Monstrous", "Irrational", "Magical", "Mundane", "Abstract"];
                        const numbers = ["Singular", "Dual", "Plural"];
    
                        // internal builder that sets data-raw on each TD
                        function buildTable(id, label, containerId) {
                            const wrapper = document.createElement("div");
                            const table = document.createElement("table");
                            table.id = id;
    
                            const thead = document.createElement("thead");
    
                            // Merged header row
                            const mergedRow = document.createElement("tr");
                            const mergedCell = document.createElement("th");
                            mergedCell.id = id + "-header";
                            mergedCell.colSpan = 4;
                            mergedCell.textContent = label;
                            mergedRow.appendChild(mergedCell);
                            thead.appendChild(mergedRow);
    
                            // Column header row
                            const headerRow = document.createElement("tr");
                            headerRow.innerHTML = `<th class="GenderTh";>Gender</th>` + numbers.map(n => `<th>${n}</th>`).join("");
                            thead.appendChild(headerRow);
    
                            table.appendChild(thead);
    
                            const tbody = document.createElement("tbody");
                            Object.values(GENDERS).forEach(gender => {
                                const row = document.createElement("tr");
                                const cellsHtml = numbers.map(() => `<td data-raw=""></td>`).join("");
                                row.innerHTML = `<th>${gender.NAME}</th>` + cellsHtml;
                                tbody.appendChild(row);
                            });
                            table.appendChild(tbody);
    
                            wrapper.appendChild(table);
    
                            const container = document.getElementById(containerId);
                            if (!container) return;
                            container.appendChild(wrapper);
                        }
    
                        // create wrapper divs with unique IDs if prefix provided
                        const dirsummarytablefinalwrapper = document.createElement("div");
                        const recsummarytablefinalwrapper = document.createElement("div");
    
                        if (uniquePrefix) {
                            dirsummarytablefinalwrapper.id = `${uniquePrefix}-dirTableDiv`;
                            recsummarytablefinalwrapper.id = `${uniquePrefix}-recTableDiv`;
                            dirsummarytablefinalwrapper.className = "dirTableDivs";
                            recsummarytablefinalwrapper.className = "recTableDivs";
                        } else {
                            dirsummarytablefinalwrapper.id = "dirSummaryTablediv";
                            recsummarytablefinalwrapper.id = "recSummaryTablediv";
                        }
    
                        DivId.appendChild(dirsummarytablefinalwrapper);
                        DivId.appendChild(recsummarytablefinalwrapper);
    
                        const dirTableId = uniquePrefix ? `${uniquePrefix}-dirSummaryTable` : "dirSummaryTable";
                        const recTableId = uniquePrefix ? `${uniquePrefix}-recSummaryTable` : "recSummaryTable";
    
                        buildTable(dirTableId, "Directive", dirsummarytablefinalwrapper.id);
                        buildTable(recTableId, "Recessive", recsummarytablefinalwrapper.id);
    
                        // Allow a paint cycle so the DOM is actually available to queries/measurements
                        requestAnimationFrame(() => resolve());
                    });
                }*/ //legacy^^
                function createNounSummaryTables(inDivById, uniquePrefix = "") {
                    return new Promise((resolve, reject) => {
                        const DivId = document.getElementById(`${inDivById}`);
                        if (!DivId) {
                            return reject(new Error(`div by id ${DivId} not found`));
                        }

                        const numbers = ["Singular", "Dual", "Plural"];

                        // internal builder that sets data-raw on each TD
                        function buildTable(id, label, containerId) {
                            const wrapper = document.createElement("div");
                            const table = document.createElement("table");
                            table.id = id;

                            const thead = document.createElement("thead");

                            // Merged header row
                            const mergedRow = document.createElement("tr");
                            const mergedCell = document.createElement("th");
                            mergedCell.id = id + "-header";
                            mergedCell.colSpan = 4;
                            mergedCell.textContent = label;
                            mergedRow.appendChild(mergedCell);
                            thead.appendChild(mergedRow);

                            // Column header row
                            const headerRow = document.createElement("tr");
                            headerRow.innerHTML = `<th class="GenderTh";>Gender</th>` + numbers.map(n => `<th>${n}</th>`).join("");
                            thead.appendChild(headerRow);

                            table.appendChild(thead);

                            const tbody = document.createElement("tbody");
                            Object.values(GENDERS).forEach(gender => {
                                const row = document.createElement("tr");
                                const cellsHtml = numbers.map(() => `<td data-raw=""></td>`).join("");
                                row.innerHTML = `<th>${gender.NAME}</th>` + cellsHtml;
                                tbody.appendChild(row);
                            });
                            table.appendChild(tbody);

                            wrapper.appendChild(table);

                            const container = document.getElementById(containerId);
                            if (!container) return;
                            container.appendChild(wrapper);
                        }

                        // create wrapper divs with unique IDs if prefix provided
                        const dirsummarytablefinalwrapper = document.createElement("div");
                        const recsummarytablefinalwrapper = document.createElement("div");

                        if (uniquePrefix) {
                            dirsummarytablefinalwrapper.id = `${uniquePrefix}-dirTableDiv`;
                            recsummarytablefinalwrapper.id = `${uniquePrefix}-recTableDiv`;
                            dirsummarytablefinalwrapper.className = "dirTableDivs";
                            recsummarytablefinalwrapper.className = "recTableDivs";
                        } else {
                            dirsummarytablefinalwrapper.id = "dirSummaryTablediv";
                            recsummarytablefinalwrapper.id = "recSummaryTablediv";
                        }

                        DivId.appendChild(dirsummarytablefinalwrapper);
                        DivId.appendChild(recsummarytablefinalwrapper);

                        const dirTableId = uniquePrefix ? `${uniquePrefix}-dirSummaryTable` : "dirSummaryTable";
                        const recTableId = uniquePrefix ? `${uniquePrefix}-recSummaryTable` : "recSummaryTable";

                        buildTable(dirTableId, "Directive", dirsummarytablefinalwrapper.id);
                        buildTable(recTableId, "Recessive", recsummarytablefinalwrapper.id);

                        // Allow a paint cycle so the DOM is actually available to queries/measurements
                        requestAnimationFrame(() => resolve());
                    });
                }
                createNounSummaryTables("leftleftdivdictionary");
                setTimeout(() => {
                    populateSummaryTables(keyword, { dirSummaryTable: false, recSummaryTable: false });
                }, 100);
                CurrentWordClassAsText = "noun";
                dictionaryPageReference = () => openPageOld('page3', document.querySelector('.tab-bar .tab:nth-child(5)'));
                break;

            case 'v':
                // === Create verb summary tables ===
                function createVerbSummaryTables() {
                    const leftleftdivdictionary = document.getElementById("leftleftdivdictionary");
                    if (!leftleftdivdictionary) {
                        console.error("leftleftdivdictionary element not found");
                        return;
                    }

                    // Create verb conjugation table
                    const verbConjWrapper = document.createElement("div");
                    verbConjWrapper.id = "verbPrefixTablediv";
                    leftleftdivdictionary.appendChild(verbConjWrapper);

                    const verbFormsWrapper = document.createElement("div");
                    verbFormsWrapper.id = "verbSuffixTablediv";
                    leftleftdivdictionary.appendChild(verbFormsWrapper);
                    function buildVerbTable(sourcePath, containerId) {
                        fetch(sourcePath)
                            .then(response => {
                                if (!response.ok) throw new Error(`Failed to load ${sourcePath}: ${response.status}`);
                                return response.text();
                            })
                            .then(html => {
                                const container = document.getElementById(containerId);
                                if (container) {
                                    container.innerHTML = html;
                                }
                            })
                            .catch(error => {
                                console.error("Error loading table:", error);
                            });
                    }// this is really just a fetch and paste. should it be kept, just for consistency with the other builders, or directly implemented in createVerbSummaryTables?
                    buildVerbTable("pages/dictionarypage/tables/subjectprefix.html", "verbPrefixTablediv");
                    buildVerbTable("pages/dictionarypage/tables/objectsuffix.html", "verbSuffixTablediv");
                }
                createVerbSummaryTables();
                setTimeout(() => {
                    populateSummaryTables(keyword, { dictionaryVerbPrefixTable: true, dictionaryVerbSuffixTable: false });
                }, 100);
                CurrentWordClassAsText = "verb";
                dictionaryPageReference = () => openPageOld('page4', document.querySelector('.tab-bar .tab:nth-child(6)'));
                break;

            case 'adv':
                // === Create adverb summary tables ===
                function createAdverbSummaryTables() {
                    const leftleftdivdictionary = document.getElementById("leftleftdivdictionary");
                    if (!leftleftdivdictionary) {
                        console.error("leftleftdivdictionary element not found");
                        return;
                    }

                    const adverbWrapper = document.createElement("div");
                    adverbWrapper.id = "adverbFormsTablediv";
                    leftleftdivdictionary.appendChild(adverbWrapper);
                    // Helper function to build adverb tables
                    function buildAdverbTable(id, label, containerId) {
                        const wrapper = document.createElement("div");
                        const table = document.createElement("table");
                        table.id = id;

                        // fixed column width via colgroup
                        const colgroup = document.createElement("colgroup");
                        const col1 = document.createElement("col");
                        col1.style.width = "120px";
                        const col2 = document.createElement("col");
                        colgroup.append(col1, col2);
                        table.appendChild(colgroup);

                        const thead = document.createElement("thead");
                        const mergedRow = document.createElement("tr");
                        const mergedCell = document.createElement("th");
                        mergedCell.id = id + "-header";
                        mergedCell.colSpan = 2;
                        mergedCell.textContent = label;
                        mergedRow.appendChild(mergedCell);
                        thead.appendChild(mergedRow);
                        table.appendChild(thead);

                        const tbody = document.createElement("tbody");
                        const forms = ["Base Form", "Elative Form"];
                        forms.forEach((form) => {
                            const formz = form;
                            // create a safe id fragment from the form text
                            const safe = formz.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9\-_]/g, '').toLowerCase();
                            const rowIdBase = `${id}-${safe}`;

                            const row = document.createElement("tr");

                            const th = document.createElement("th");
                            th.textContent = form;

                            const td = document.createElement("td");
                            td.id = `${rowIdBase}`; // e.g. "myTable-base-form-0-value"

                            row.appendChild(th);
                            row.appendChild(td);
                            tbody.appendChild(row);
                        });
                        table.appendChild(tbody);

                        wrapper.appendChild(table);
                        const container = document.getElementById(containerId);
                        if (container) container.appendChild(wrapper);
                    }
                    buildAdverbTable("adverbFormsTable", "Adverb Forms", "adverbFormsTablediv");
                    // populate the created td
                    const baseSource = document.getElementById("cell0");
                    const elativeSource = document.getElementById("cell3");

                    const baseTd = document.getElementById(`adverbFormsTable-base-form`);
                    const elativeTd = document.getElementById(`adverbFormsTable-elative-form`);

                    if (baseTd && baseSource) baseTd.textContent = baseSource.textContent;
                    if (elativeTd && elativeSource) elativeTd.textContent = elativeSource.textContent;
                }
                createAdverbSummaryTables();
                CurrentWordClassAsText = "adverb";
                dictionaryPageReference = () => openPageOld('page5', document.querySelector('.tab-bar .tab:nth-child(7)'));
                break;

            case 'aux':
                // === Create auxiliary summary tables ===
                function createAuxiliarySummaryTables() {
                    const leftleftdivdictionary = document.getElementById("leftleftdivdictionary");
                    if (!leftleftdivdictionary) {
                        console.error("leftleftdivdictionary element not found");
                        return;
                    } // /\(/o.o\)/\ - Spooky the spider

                    const auxWrapper = document.createElement("div");
                    auxWrapper.id = "auxiliaryFormsTablediv";
                    leftleftdivdictionary.appendChild(auxWrapper);
                    // Helper function to build auxiliary tables
                    function buildAuxiliaryTable(id, label, containerId) {
                        const wrapper = document.createElement("div");
                        const table = document.createElement("table");
                        table.id = id;

                        const thead = document.createElement("thead");
                        const mergedRow = document.createElement("tr");
                        const mergedCell = document.createElement("th");
                        mergedCell.id = id + "-header";
                        mergedCell.colSpan = 5;
                        mergedCell.textContent = label;
                        mergedRow.appendChild(mergedCell);
                        thead.appendChild(mergedRow);


                        const headerRow = document.createElement("tr");
                        // keep the visible header texts
                        const headers = ["Form", "Episodic Non-Past", "Episodic Past", "Gnomic Non-Past", "Gnomic Past"];
                        headers.forEach(h => {
                            const th = document.createElement("th");
                            th.textContent = h;
                            headerRow.appendChild(th);
                        });
                        thead.appendChild(headerRow);
                        table.appendChild(thead);

                        const tbody = document.createElement("tbody");
                        const row = document.createElement("tr");

                        // first cell is the row label
                        const thLabel = document.createElement("th");
                        thLabel.textContent = "Forms";
                        row.appendChild(thLabel);

                        // create a TD for each remaining header and assign an id derived from the header text
                        headers.slice(1).forEach(hdr => {
                            const td = document.createElement("td");
                            // sanitize header text to form a valid id fragment
                            const safe = hdr.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9\-_]/g, '').toLowerCase();
                            td.id = `${id}-${safe}`;
                            row.appendChild(td);
                        });

                        tbody.appendChild(row);
                        table.appendChild(tbody);

                        wrapper.appendChild(table);
                        const container = document.getElementById(containerId);
                        if (container) container.appendChild(wrapper);
                    }
                    buildAuxiliaryTable("auxiliaryFormsTable", "Auxiliary Forms", "auxiliaryFormsTablediv");
                    // populate the created td
                    const EpiNonSource = document.getElementById("cell0");
                    const tripleSource = document.getElementById("cell3");

                    const EpiNonTd = document.getElementById(`auxiliaryFormsTable-episodic-non-past`);
                    const EpiPastTd = document.getElementById(`auxiliaryFormsTable-episodic-past`);
                    const GnoNonTd = document.getElementById(`auxiliaryFormsTable-gnomic-non-past`);
                    const GnoPastTd = document.getElementById(`auxiliaryFormsTable-gnomic-past`);

                    // copy single-value sources
                    if (EpiNonTd && EpiNonSource) EpiNonTd.textContent = EpiNonSource.textContent;
                    if (EpiPastTd && tripleSource) {
                        EpiPastTd.textContent = tripleSource.textContent;
                    }
                    // split cell3 into three parts and populate the three target TDs
                    if (tripleSource) {
                        const parts = tripleSource.textContent.split(",").map(s => s.trim());
                        if (GnoNonTd) GnoNonTd.textContent = parts[1] ?? "";
                        if (GnoPastTd) GnoPastTd.textContent = parts[2] ?? "";
                        if (EpiPastTd && parts[0] != null) EpiPastTd.textContent = parts[0];
                    }
                    const isDefective = EpiPastTd.textContent.trim();
                    if (isDefective === "defective") {
                        const EpiNonText = EpiNonTd.textContent.trim();
                        console.log(`${EpiNonText} is defective`);
                        EpiPastTd.textContent = `${EpiNonText}`;
                        GnoNonTd.textContent = `${EpiNonText}`;
                        GnoPastTd.textContent = `${EpiNonText}`;
                    }
                }
                createAuxiliarySummaryTables();
                CurrentWordClassAsText = "auxiliary";
                dictionaryPageReference = () => openPageOld('page6', document.querySelector('.tab-bar .tab:nth-child(8)'));
                break;

            case 'pp':
                // === Create preposition summary tables ===
                function createPrepositionSummaryTables() {
                    const leftleftdivdictionary = document.getElementById("leftleftdivdictionary");
                    if (!leftleftdivdictionary) {
                        console.error("leftleftdivdictionary element not found");
                        return;
                    }

                    const ppWrapper = document.createElement("div");
                    ppWrapper.id = "prepositionFormsTablediv";
                    leftleftdivdictionary.appendChild(ppWrapper);
                    // Helper function to build auxiliary tables
                    function buildPrepositionTable(id, label, containerId) {
                        const wrapper = document.createElement("div");
                        const table = document.createElement("table");
                        table.id = id;

                        const thead = document.createElement("thead");
                        const mergedRow = document.createElement("tr");
                        const mergedCell = document.createElement("th");
                        mergedCell.id = id + "-header";
                        mergedCell.colSpan = 5;
                        mergedCell.textContent = label;
                        mergedRow.appendChild(mergedCell);
                        thead.appendChild(mergedRow);


                        const headerRow = document.createElement("tr");
                        // keep the visible header texts
                        const headers = ["Form", "Episodic Non-Past", "Episodic Past", "Gnomic Non-Past", "Gnomic Past"];
                        headers.forEach(h => {
                            const th = document.createElement("th");
                            th.textContent = h;
                            headerRow.appendChild(th);
                        });
                        thead.appendChild(headerRow);
                        table.appendChild(thead);

                        const tbody = document.createElement("tbody");
                        const row = document.createElement("tr");

                        // first cell is the row label
                        const thLabel = document.createElement("th");
                        thLabel.textContent = "Forms";
                        row.appendChild(thLabel);

                        // create a TD for each remaining header and assign an id derived from the header text
                        headers.slice(1).forEach(hdr => {
                            const td = document.createElement("td");
                            // sanitize header text to form a valid id fragment
                            const safe = hdr.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9\-_]/g, '').toLowerCase();
                            td.id = `${id}-${safe}`;
                            row.appendChild(td);
                        });

                        tbody.appendChild(row);
                        table.appendChild(tbody);

                        wrapper.appendChild(table);
                        const container = document.getElementById(containerId);
                        if (container) container.appendChild(wrapper);
                    }
                    buildPrepositionTable("prepositionFormsTable", "Preposition Forms", "prepositionFormsTablediv");
                    // populate the created td
                    const EpiNonSource = document.getElementById("cell0");
                    const tripleSource = document.getElementById("cell3");

                    const EpiNonTd = document.getElementById(`auxiliaryFormsTable-episodic-non-past`);
                    const EpiPastTd = document.getElementById(`auxiliaryFormsTable-episodic-past`);
                    const GnoNonTd = document.getElementById(`auxiliaryFormsTable-gnomic-non-past`);
                    const GnoPastTd = document.getElementById(`auxiliaryFormsTable-gnomic-past`);

                    // copy single-value sources
                    if (EpiNonTd && EpiNonSource) EpiNonTd.textContent = EpiNonSource.textContent;
                    if (EpiPastTd && tripleSource) {
                        EpiPastTd.textContent = tripleSource.textContent;
                    }
                    // split cell3 into three parts and populate the three target TDs
                    if (tripleSource) {
                        const parts = tripleSource.textContent.split(",").map(s => s.trim());
                        if (GnoNonTd) GnoNonTd.textContent = parts[1] ?? "";
                        if (GnoPastTd) GnoPastTd.textContent = parts[2] ?? "";
                        if (EpiPastTd && parts[0] != null) EpiPastTd.textContent = parts[0];
                    }
                }
                createPrepositionSummaryTables();
                CurrentWordClassAsText = "preposition";
                dictionaryPageReference = () => openPageOld('page0', document.querySelector('.tab-bar .tab:nth-child(0)'));
                break;

            case 'part':
                // === Create particle summary tables ===
                function createParticleSummaryTables() {
                    const leftleftdivdictionary = document.getElementById("leftleftdivdictionary");
                    if (!leftleftdivdictionary) {
                        console.error("leftleftdivdictionary element not found");
                        return;
                    }

                    const ppWrapper = document.createElement("div");
                    ppWrapper.id = "particleFormsTablediv";
                    leftleftdivdictionary.appendChild(ppWrapper);
                    // Helper function to build auxiliary tables
                    function buildParticleTable(id, label, containerId) {
                        const wrapper = document.createElement("div");
                        const table = document.createElement("table");
                        table.id = id;

                        const thead = document.createElement("thead");
                        const mergedRow = document.createElement("tr");
                        const mergedCell = document.createElement("th");
                        mergedCell.id = id + "-header";
                        mergedCell.colSpan = 5;
                        mergedCell.textContent = label;
                        mergedRow.appendChild(mergedCell);
                        thead.appendChild(mergedRow);


                        const headerRow = document.createElement("tr");
                        // keep the visible header texts
                        const headers = ["Form", "Episodic Non-Past", "Episodic Past", "Gnomic Non-Past", "Gnomic Past"];
                        headers.forEach(h => {
                            const th = document.createElement("th");
                            th.textContent = h;
                            headerRow.appendChild(th);
                        });
                        thead.appendChild(headerRow);
                        table.appendChild(thead);

                        const tbody = document.createElement("tbody");
                        const row = document.createElement("tr");

                        // first cell is the row label
                        const thLabel = document.createElement("th");
                        thLabel.textContent = "Forms";
                        row.appendChild(thLabel);

                        // create a TD for each remaining header and assign an id derived from the header text
                        headers.slice(1).forEach(hdr => {
                            const td = document.createElement("td");
                            // sanitize header text to form a valid id fragment
                            const safe = hdr.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9\-_]/g, '').toLowerCase();
                            td.id = `${id}-${safe}`;
                            row.appendChild(td);
                        });

                        tbody.appendChild(row);
                        table.appendChild(tbody);

                        wrapper.appendChild(table);
                        const container = document.getElementById(containerId);
                        if (container) container.appendChild(wrapper);
                    } // /\(/o.o\)/\ - Spooky the spider
                    buildParticleTable("particleFormsTable", "Particle Forms", "particleFormsTablediv");
                    // populate the created td
                    const EpiNonSource = document.getElementById("cell0");
                    const tripleSource = document.getElementById("cell3");

                    const EpiNonTd = document.getElementById(`auxiliaryFormsTable-episodic-non-past`);
                    const EpiPastTd = document.getElementById(`auxiliaryFormsTable-episodic-past`);
                    const GnoNonTd = document.getElementById(`auxiliaryFormsTable-gnomic-non-past`);
                    const GnoPastTd = document.getElementById(`auxiliaryFormsTable-gnomic-past`);

                    // copy single-value sources
                    if (EpiNonTd && EpiNonSource) EpiNonTd.textContent = EpiNonSource.textContent;
                    if (EpiPastTd && tripleSource) {
                        EpiPastTd.textContent = tripleSource.textContent;
                    }
                    // split cell3 into three parts and populate the three target TDs
                    if (tripleSource) {
                        const parts = tripleSource.textContent.split(",").map(s => s.trim());
                        if (GnoNonTd) GnoNonTd.textContent = parts[1] ?? "";
                        if (GnoPastTd) GnoPastTd.textContent = parts[2] ?? "";
                        if (EpiPastTd && parts[0] != null) EpiPastTd.textContent = parts[0];
                    }
                }
                createParticleSummaryTables();
                CurrentWordClassAsText = "particle";
                dictionaryPageReference = () => openPageOld('page0', document.querySelector('.tab-bar .tab:nth-child(0)'));
                break;

            case 'adj':
                // === Create adjective summary tables ===
                function createAdjectiveSummaryTables() {
                    const leftleftdivdictionary = document.getElementById("leftleftdivdictionary");
                    if (!leftleftdivdictionary) {
                        console.error("leftleftdivdictionary element not found");
                        return;
                    }

                    const ppWrapper = document.createElement("div");
                    ppWrapper.id = "adjectiveFormsTablediv";
                    leftleftdivdictionary.appendChild(ppWrapper);
                    // Helper function to build adjective tables
                    function buildAdjectiveTable(id, label, containerId) {
                        const wrapper = document.createElement("div");
                        const table = document.createElement("table");
                        table.id = id;

                        const thead = document.createElement("thead");
                        const mergedRow = document.createElement("tr");
                        const mergedCell = document.createElement("th");
                        mergedCell.id = id + "-header";
                        mergedCell.colSpan = 5;
                        mergedCell.textContent = label;
                        mergedRow.appendChild(mergedCell);
                        thead.appendChild(mergedRow);


                        const headerRow = document.createElement("tr");
                        // keep the visible header texts
                        const headers = ["Form", "Episodic Non-Past", "Episodic Past", "Gnomic Non-Past", "Gnomic Past"];
                        headers.forEach(h => {
                            const th = document.createElement("th");
                            th.textContent = h;
                            headerRow.appendChild(th);
                        });
                        thead.appendChild(headerRow);
                        table.appendChild(thead);

                        const tbody = document.createElement("tbody");
                        const row = document.createElement("tr");

                        // first cell is the row label
                        const thLabel = document.createElement("th");
                        thLabel.textContent = "Forms";
                        row.appendChild(thLabel); // /\(/o.o\)/\ - Spooky the spider

                        // create a TD for each remaining header and assign an id derived from the header text
                        headers.slice(1).forEach(hdr => {
                            const td = document.createElement("td");
                            // sanitize header text to form a valid id fragment
                            const safe = hdr.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9\-_]/g, '').toLowerCase();
                            td.id = `${id}-${safe}`;
                            row.appendChild(td);
                        });

                        tbody.appendChild(row);
                        table.appendChild(tbody);

                        wrapper.appendChild(table);
                        const container = document.getElementById(containerId);
                        if (container) container.appendChild(wrapper);
                    }
                    buildAdjectiveTable("adjectiveFormsTable", "Adjective Forms", "adjectiveFormsTablediv");
                    // populate the created td
                    const EpiNonSource = document.getElementById("cell0");
                    const tripleSource = document.getElementById("cell3");

                    const EpiNonTd = document.getElementById(`auxiliaryFormsTable-episodic-non-past`);
                    const EpiPastTd = document.getElementById(`auxiliaryFormsTable-episodic-past`);
                    const GnoNonTd = document.getElementById(`auxiliaryFormsTable-gnomic-non-past`);
                    const GnoPastTd = document.getElementById(`auxiliaryFormsTable-gnomic-past`);

                    // copy single-value sources
                    if (EpiNonTd && EpiNonSource) EpiNonTd.textContent = EpiNonSource.textContent;
                    if (EpiPastTd && tripleSource) {
                        EpiPastTd.textContent = tripleSource.textContent;
                    }
                    // split cell3 into three parts and populate the three target TDs
                    if (tripleSource) {
                        const parts = tripleSource.textContent.split(",").map(s => s.trim());
                        if (GnoNonTd) GnoNonTd.textContent = parts[1] ?? "";
                        if (GnoPastTd) GnoPastTd.textContent = parts[2] ?? "";
                        if (EpiPastTd && parts[0] != null) EpiPastTd.textContent = parts[0];
                    } // /\(/o.o\)/\ - Spooky the spider
                }
                createAdjectiveSummaryTables();
                CurrentWordClassAsText = "adjective";
                dictionaryPageReference = () => openPageOld('page7', document.querySelector('.tab-bar .tab:nth-child(9)'));
                break;
        }
    } // /\(/o.o\)/\ - Spooky the spider

    // Helper function to wait for element to exist
    function waitForElement(selector, timeout = 5000) {
        return new Promise((resolve, reject) => {
            const startTime = Date.now();

            function check() {
                const element = document.querySelector(selector);
                if (element) {
                    resolve(element);
                } else if (Date.now() - startTime > timeout) {
                    reject(new Error(`Element ${selector} not found within ${timeout}ms`));
                } else {
                    setTimeout(check, 50);
                }
            }

            check();
        });
    }
    // === Create table inside a given container ===
    function createTable(keyword, container) {
        // Remove any existing table in this container
        const existing = container.querySelector('table');
        if (existing) existing.remove();

        const table = document.createElement('table');
        table.id = 'resultTable'; // no keyword in ID

        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        const headers = ["Word", "Declension", "Definition", "Forms", "Usage Notes", "Word Class"];
        headers.forEach(text => {
            const th = document.createElement('th');
            th.textContent = text;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);

        const tbody = document.createElement('tbody');
        const row = document.createElement('tr');

        // Create 6 cells with stable IDs (no keyword) - added one for word class
        for (let i = 0; i < 6; i++) {
            const td = document.createElement('td');
            td.id = `cell${i}`;
            row.appendChild(td);
        }

        tbody.appendChild(row);
        table.appendChild(tbody);

        container.appendChild(table);
        return table;
    }

    function fillTable(keyword, wordclass, table) {
        if (!table) return;

        const entry = resolveDictionaryEntry(wordclass, keyword);
        if (!entry) {
            alert("No matching row found.");
            console.warn("fillTable(): no entry found for", { keyword, wordclass });
            return;
        }

        const cellValues = deriveTableCellValues(entry, keyword, wordclass);

        cellValues.forEach((value, index) => {
            const td = table.querySelector(`#cell${index}`);
            if (!td) return;

            const normalized = String(value || "");
            if (!normalized) {
                td.textContent = "";
                return;
            }

            let dashCount = 0;
            const html = normalized.replace(/-/g, () => {
                dashCount += 1;
                return dashCount === 1 ? "- " : "<br>- ";
            });

            td.innerHTML = html;
        });
    }
}//if(entry.animates && entry.gender === 'e'){genders='animates'}; if(entry.gender === 'r','mon','i'){return;}?




dictionaryPage(); // so constants arent redefined.
// this works as a wrapper function essentially^^
