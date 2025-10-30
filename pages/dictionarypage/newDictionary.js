function dictionaryPage() {

    //yoo new dictionary xd

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
    /*
        function search_word(word, dec = "") {
            if (ALL_WORDS[word] !== undefined) return ALL_WORDS[word];
            return ALL_WORDS[word + dec];
        }
    */


    const searchBTN = document.getElementById('search_button');
    const searchFLD = document.getElementById('search_field');

    // main search function
    function search(word) {
        let keyword = ((searchFLD && searchFLD.value ? searchFLD.value.trim() : '').toLowerCase()) || word;
        let matchType = 0;
        const typeOnePage = document.getElementById('page97');
        if (typeOnePage) {
            typeOnePage.remove();
        }

        const temporary1 = ALL_WORDS[keyword];
        console.log('Current keyword |', keyword, temporary1); // bro wtf is this variable naming xd. its temporary1. got it :b

        function bkjlcdfkjbacsfksjbsdkabjc() {
            /*  
                why cant i close thisadscasdcawdasdawdcadacagkbjgagjbkjbgæsfcækjbgscdfækjibgfscækijbgf
                æze-
                aze-
                fenlly-
                ħá-
                ħáŋ-
                ho-
                hu-
                huz-
                kxā-
                kxæ-
                lleŋ-
                lloq̇-
                ly-
                ō-
                qa-
                qē-
                qēru-
                q̇ū-
                qχok-
                sæχ-
                saχ-
                sī-
                sil-
                thū-
                tre-
                ū-
                all prepositions^^
                        
                        
                i- prefix to turn nouns into adjectives
                -nyl to turn adjectives into adverbs
                -ûl
                -ūn
                -ān
                -ōn
                particles^^
                        
                -hyn	
                -hyf	
                -ħó	
                -llīl	
                -huχ	
                -thok	
                -hoq̇
                ^^ unique determiner suffixes. (only for determiners).
                        
                noun suffixes
                        
                verb prefixes
                verb suffixes
                        
                i think this is it.^^
                        
                raw exact match
            */
        }//HAHAHAHHAHAHAHAHHA. FUCK YOU COMMENT >:)

        //clear searchFLD
        if (searchFLD && searchFLD.value.trim() !== '') {
            searchFLD.value = '';
            searchFLD.blur();
        }
        const nounFormCache = new Map();
        const verbFormCache = new Map();
        const EMPTY_FORM_SET = Object.freeze(new Set());
        const failedFormGenerators = new Set();

        // clear english table
        if (document.getElementById('dictionaryTable')) { document.getElementById('dictionaryTable').remove() }



        //helper
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
        //helper
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
        //helper
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
        //helper
        function getNounForms(wordObj) {
            return collectForms(TEMP_noun_forms_list, nounFormCache, wordObj, 'noun');
        }
        //helper
        function getVerbForms(wordObj) {
            return collectForms(TEMP_verb_forms_list, verbFormCache, wordObj, 'verb');
        }
        //helper
        function findDirectMatchKey(word) {
            for (const [key, wordObj] of Object.entries(ALL_WORDS)) {
                if (wordObj?.word === word) return key;
            }
            return undefined;
        }
        //helper
        function findNounKeys(word) {
            if (!word) return undefined;
            for (const [key, wordObj] of Object.entries(NOUNS)) {
                if (!wordObj?.word) continue;
                if (word === wordObj.word) return [key];
                if (getNounForms(wordObj).has(word)) return [key];
            }
            return undefined;
        }
        //helper
        function findVerbKeys(word) {
            if (!word) return undefined;
            for (const [key, wordObj] of Object.entries(VERBS)) {
                if (!wordObj?.word) continue;
                if (word === wordObj.word) return [key];
                if (getVerbForms(wordObj).has(word)) return [key];
            }
            return undefined;
        }
        //helper
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
        //helper
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
        //helper
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
        //helper
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

        const chain = trace_origin(keyword);
        const baseKey = chain?.[chain.length - 1];
        const baseEntry = baseKey ? ALL_WORDS[baseKey] : undefined;
        const prefixes = (chain ?? []).slice(0, -1).map(key =>
            PREPOSITIONS?.[key]?.word ??
            PARTICLES?.[key]?.word ??
            key // fallback if you stored the literal string
        );

        //console.log('1', search_word(keyword), '2', search_word_by_definition(keyword), '3', ALL_WORDS);


        console.log('baseEntry |', baseEntry);// pref/word
        console.log('prefixes |', prefixes, 'baseKey |', baseKey, 'chain |', chain);

        if (prefixes.length > 0) {//type 2
            console.log('type2');
        }
        else if (prefixes.length == 0 && ALL_WORDS[keyword]) {//type 1
            const searchHandler = search_word(keyword);
            console.log('searchHandler |', searchHandler);
            searchHandler.forEach(entry => {
                const word = entry.word
                const wordclass = entry.type || '...';

                let combinedGendersObject = '';
                if (wordclass === 'n') {
                    combinedGendersObject = combine_genders(searchHandler[0].genders) // Key-value pairs
                }
                if (word === keyword) {
                    console.log('clean match |', keyword);

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
                                ${keyword}
                            </h2>
                            <p>${keyword} is a ${wordclass} Read more about ${wordclass}s <a href="#"
                                onclick="event.preventDefault(); dictionaryPageReference()">here</a>,
                            or read the short outline in here.</p>
                            <br><br>
                            <p>The declention tables that would be relevant for ${keyword} can be seen bellow.</p>

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
                                <button id="tableSearchBtn">Table is seachable</button>
                                <div id="textBoxContainer"></div>
                            </div>
                        </div>
                    </div>`;

                    pagesWrap.appendChild(pageDiv); // append pageDiv in pagesWrap
                    const tableSearchable = document.getElementById('tableSearchBtn');


                    // Wait for the page content to load, then setup the table (header table)
                    waitForElement(`#page97 .tablesContainer`).then(pageContainer => {
                        // Create and fill the table
                        //console.log(NOUN_SUFFIXES);
                        //const table = createTable(keyword, pageContainer);//just copy english table logic??
                        //console.log(wordclass);
                        //fillTable(keyword, wordclass, table);
                        function newFillTable(row, word, declension, definition, forms, usage_notes, type) {
                            if (!row) return;

                            const cells = row.querySelectorAll('td');
                            const getCell = index => cells[index] || null;

                            switch (wordclass) {
                                case 'n':


                                    const ncell0 = getCell(0);
                                    const ncell1 = getCell(1);
                                    const ncell2 = getCell(2);
                                    const ncell3 = getCell(3);
                                    const ncell4 = getCell(4);
                                    const ncell5 = getCell(5);

                                    if (ncell0) ncell0.innerHTML = word || '...';
                                    if (ncell1) ncell1.innerHTML = declension || '...';
                                    if (ncell2) ncell2.innerHTML = definition || '...';
                                    if (ncell3) ncell3.innerHTML = forms || '...';
                                    if (ncell4) ncell4.innerHTML = usage_notes || '...';
                                    if (ncell5) ncell5.innerHTML = type || '...';

                                    break;
                                default://case n and then default. or just if n, else.
                                    const vcell0 = getCell(0);
                                    const vcell1 = getCell(1);
                                    const vcell2 = getCell(2);
                                    const vcell3 = getCell(3);
                                    const vcell4 = getCell(4);
                                    const vcell5 = getCell(5);

                                    if (vcell0) vcell0.innerHTML = word || '...';
                                    if (vcell1) vcell1.innerHTML = declension || '...';
                                    if (vcell2) vcell2.innerHTML = definition || '...';
                                    if (vcell3) vcell3.innerHTML = forms || '...';
                                    if (vcell4) vcell4.innerHTML = usage_notes || '...';
                                    if (vcell5) vcell5.innerHTML = type || '...';

                                    break;
                            }
                        }
                        if (wordclass === 'n') {

                            for (const [gender, def] of Object.entries(combinedGendersObject)) {
                                const row = type1extraTableRow(
                                    entry.word || '...',
                                    entry.declension || '...',
                                    gender || '...',
                                    def || '...',
                                    entry.usage_notes || '...')
                                newFillTable(row, entry.word, entry.declension, def, gender, entry.usage_notes, entry.type);
                            }
                        } else {
                            const row = type1extraTableRow(
                                entry.word || '...',
                                entry.declension || '...',
                                entry.forms || '...',
                                entry.definition || '...',
                                entry.usage_notes || '...')
                            newFillTable(row, entry.word, entry.declension, entry.definition, entry.forms, entry.usage_notes, entry.type);
                        }
                        switch (wordclass) {
                            case 'n':
                                function neoNounTables(declension, mood) {
                                    const tableWrap = document.getElementById('leftleftdivdictionary')
                                    const table = document.createElement('table');

                                    const moodMap = {
                                        1: 'Directive',
                                        2: 'Recessive'
                                    }
                                    table.id = `Noun-Table-${moodMap[mood]}`;
                                    //th
                                    const thead = document.createElement('thead');
                                    const headerRow = document.createElement('tr');
                                    const headers = [moodMap[mood], "Singular", "Dual", "Plural"];
                                    headers.forEach(text => {
                                        const th = document.createElement('th');
                                        th.textContent = text;
                                        headerRow.appendChild(th);
                                        th.id = `neoSummaryHeader-${text}`;
                                    });
                                    thead.appendChild(headerRow);
                                    table.appendChild(thead);

                                    //rows
                                    for (const [gender, def] of Object.entries(combinedGendersObject)) {
                                        const trd = document.createElement('tr');
                                        const rowth = document.createElement('th');
                                        rowth.textContent = gender;
                                        trd.appendChild(rowth);
                                        const map = {
                                            1: 'Singular',
                                            2: 'Dual',
                                            3: 'Plural'
                                        }

                                        for (let i = 0; i < (headers.length - 1); i++) {
                                            const td = document.createElement('td');
                                            td.textContent = 'placeholder';
                                            if (i === 0) {
                                                td.className = `neoSummarytd-${map[1]}`
                                            }
                                            else if (i === 1) {
                                                td.className = `neoSummarytd-${map[2]}`
                                            }
                                            else if (i === 2) {
                                                td.className = `neoSummarytd-${map[3]}`
                                            }
                                            const mooooood = moodMap[mood];
                                            //inner
                                            const entry = Object.entries(NOUN_SUFFIXES[mooooood]);
                                            for (const [gndr, array] of entry) {
                                                if (gndr === gender) {
                                                    const numberKey = map[i + 1];
                                                    const cellValue = array[numberKey] && array[numberKey][declension];
                                                    if (cellValue !== undefined) {
                                                        td.textContent = cellValue;
                                                    }
                                                }
                                            }
                                            trd.appendChild(td);

                                        }
                                        table.appendChild(trd);
                                    }

                                    table.style = "margin-bottom: 10px";

                                    const tbody = document.createElement('tbody');
                                    table.appendChild(tbody);

                                    tableWrap.appendChild(table);
                                }
                                neoNounTables(entry.declension, 1);
                                neoNounTables(entry.declension, 2);

                                //const dirTable = document.getElementById('Noun-Table-Directive');
                                //const recTable = document.getElementById('Noun-Table-Recessive');
                                populateSummaryTables(keyword, { 'Noun-Table-Directive': false, 'Noun-Table-Recessive': false });



                                break;
                            case 'v':
                                function neoVerbTables(affixState) {

                                    const affixStateMap = {
                                        1: { 1: 'Prefix', 2: VERB_SUBJECT_PREFIXES },
                                        2: { 1: 'Suffix', 2: VERB_OBJECT_SUFFIXES }
                                    }
                                    console.log(affixStateMap[affixState][2]);
                                    const div = document.createElement('div');
                                    div.innerHTML = `
                                    <table id="Verb-Table-${affixStateMap[affixState][1]}">
                                        <tr>
                                            <th colSpan = 2>${affixStateMap[affixState][1]}</th>
                                            <th>Exalted</th>
                                            <th>Rational</th>
                                            <th>Monstrous</th>
                                            <th>Irrational</th>
                                            <th>Magical</th>
                                            <th>Mundane</th>
                                            <th>Abstract</th>
                                        </tr>
                                        <tr>
                                            <th rowSpan = 3>Singular</th>
                                            <th>1.</th>
                                            <td>${affixStateMap[affixState][2][1].Singular['Exalted']}</td>
                                            <td>${affixStateMap[affixState][2][1].Singular['Rational']}</td>
                                            <td>${affixStateMap[affixState][2][1].Singular['Monstrous']}</td>
                                            <td>${affixStateMap[affixState][2][1].Singular['Irrational']}</td>
                                            <td>${affixStateMap[affixState][2][1].Singular['Magical']}</td>
                                            <td>${affixStateMap[affixState][2][1].Singular['Mundane']}</td>
                                            <td>${affixStateMap[affixState][2][1].Singular['Abstract']}</td>
                                        </tr>
                                        <tr>
                                            <th>2.</th>
                                            <td>${affixStateMap[affixState][2][2].Singular['Exalted']}</td>
                                            <td>${affixStateMap[affixState][2][2].Singular['Rational']}</td>
                                            <td>${affixStateMap[affixState][2][2].Singular['Monstrous']}</td>
                                            <td>${affixStateMap[affixState][2][2].Singular['Irrational']}</td>
                                            <td>${affixStateMap[affixState][2][2].Singular['Magical']}</td>
                                            <td>${affixStateMap[affixState][2][2].Singular['Mundane']}</td>
                                            <td>${affixStateMap[affixState][2][2].Singular['Abstract']}</td>
                                        </tr>
                                        <tr>
                                            <th>3.</th>
                                            <td style = "border-bottom: 1px solid var(--border)">${affixStateMap[affixState][2][3].Singular['Exalted']}</td>
                                            <td style = "border-bottom: 1px solid var(--border)">${affixStateMap[affixState][2][3].Singular['Rational']}</td>
                                            <td style = "border-bottom: 1px solid var(--border)">${affixStateMap[affixState][2][3].Singular['Monstrous']}</td>
                                            <td style = "border-bottom: 1px solid var(--border)">${affixStateMap[affixState][2][3].Singular['Irrational']}</td>
                                            <td style = "border-bottom: 1px solid var(--border)">${affixStateMap[affixState][2][3].Singular['Magical']}</td>
                                            <td style = "border-bottom: 1px solid var(--border)">${affixStateMap[affixState][2][3].Singular['Mundane']}</td>
                                            <td style = "border-bottom: 1px solid var(--border)">${affixStateMap[affixState][2][3].Singular['Abstract']}</td>
                                        </tr>
                                        <tr>
                                            <th rowSpan = 3>Dual</th>
                                            <th>1.</th>
                                            <td>${affixStateMap[affixState][2][1].Dual['Exalted']}</td>
                                            <td>${affixStateMap[affixState][2][1].Dual['Rational']}</td>
                                            <td>${affixStateMap[affixState][2][1].Dual['Monstrous']}</td>
                                            <td>${affixStateMap[affixState][2][1].Dual['Irrational']}</td>
                                            <td>${affixStateMap[affixState][2][1].Dual['Magical']}</td>
                                            <td>${affixStateMap[affixState][2][1].Dual['Mundane']}</td>
                                            <td>${affixStateMap[affixState][2][1].Dual['Abstract']}</td>
                                        </tr>
                                        <tr>
                                            <th>2.</th>
                                            <td>${affixStateMap[affixState][2][2].Dual['Exalted']}</td>
                                            <td>${affixStateMap[affixState][2][2].Dual['Rational']}</td>
                                            <td>${affixStateMap[affixState][2][2].Dual['Monstrous']}</td>
                                            <td>${affixStateMap[affixState][2][2].Dual['Irrational']}</td>
                                            <td>${affixStateMap[affixState][2][2].Dual['Magical']}</td>
                                            <td>${affixStateMap[affixState][2][2].Dual['Mundane']}</td>
                                            <td>${affixStateMap[affixState][2][2].Dual['Abstract']}</td>
                                        </tr>
                                        <tr>
                                            <th>3.</th>
                                            <td style = "border-bottom: 1px solid var(--border)">${affixStateMap[affixState][2][3].Dual['Exalted']}</td>
                                            <td style = "border-bottom: 1px solid var(--border)">${affixStateMap[affixState][2][3].Dual['Rational']}</td>
                                            <td style = "border-bottom: 1px solid var(--border)">${affixStateMap[affixState][2][3].Dual['Monstrous']}</td>
                                            <td style = "border-bottom: 1px solid var(--border)">${affixStateMap[affixState][2][3].Dual['Irrational']}</td>
                                            <td style = "border-bottom: 1px solid var(--border)">${affixStateMap[affixState][2][3].Dual['Magical']}</td>
                                            <td style = "border-bottom: 1px solid var(--border)">${affixStateMap[affixState][2][3].Dual['Mundane']}</td>
                                            <td style = "border-bottom: 1px solid var(--border)">${affixStateMap[affixState][2][3].Dual['Abstract']}</td>
                                        </tr>
                                        <tr>
                                            <th rowSpan = 3>Plural</th>
                                            <th>1.</th>
                                            <td>${affixStateMap[affixState][2][1].Plural['Exalted']}</td>
                                            <td>${affixStateMap[affixState][2][1].Plural['Rational']}</td>
                                            <td>${affixStateMap[affixState][2][1].Plural['Monstrous']}</td>
                                            <td>${affixStateMap[affixState][2][1].Plural['Irrational']}</td>
                                            <td>${affixStateMap[affixState][2][1].Plural['Magical']}</td>
                                            <td>${affixStateMap[affixState][2][1].Plural['Mundane']}</td>
                                            <td>${affixStateMap[affixState][2][1].Plural['Abstract']}</td>
                                        </tr>
                                        <tr>
                                            <th>2.</th>
                                            <td>${affixStateMap[affixState][2][2].Plural['Exalted']}</td>
                                            <td>${affixStateMap[affixState][2][2].Plural['Rational']}</td>
                                            <td>${affixStateMap[affixState][2][2].Plural['Monstrous']}</td>
                                            <td>${affixStateMap[affixState][2][2].Plural['Irrational']}</td>
                                            <td>${affixStateMap[affixState][2][2].Plural['Magical']}</td>
                                            <td>${affixStateMap[affixState][2][2].Plural['Mundane']}</td>
                                            <td>${affixStateMap[affixState][2][2].Plural['Abstract']}</td>
                                        </tr>
                                        <tr>
                                            <th>3.</th>
                                            <td>${affixStateMap[affixState][2][3].Plural['Exalted']}</td>
                                            <td>${affixStateMap[affixState][2][3].Plural['Rational']}</td>
                                            <td>${affixStateMap[affixState][2][3].Plural['Monstrous']}</td>
                                            <td>${affixStateMap[affixState][2][3].Plural['Irrational']}</td>
                                            <td>${affixStateMap[affixState][2][3].Plural['Magical']}</td>
                                            <td>${affixStateMap[affixState][2][3].Plural['Mundane']}</td>
                                            <td>${affixStateMap[affixState][2][3].Plural['Abstract']}</td>
                                        </tr>
                                    </table>
                                    `;
                                    div.style = "margin-bottom: 10px"
                                    const wrapper = document.getElementById('leftleftdivdictionary');
                                    wrapper.appendChild(div);
                                }
                                neoVerbTables(1);
                                neoVerbTables(2);

                                populateSummaryTables(keyword, { 'Verb-Table-Prefix': true, 'Verb-Table-Suffix': false });
                                break
                        }
                        tableSearchable.addEventListener('click', () => {
                            console.log(wordclass);
                            searchableTable(wordclass);
                        });
                        // Update keyword <p>s
                        const keywordp = document.getElementById("keywordp");
                        if (keywordp) {
                            keywordp.innerHTML = keyword;
                        }
                        cloneKeywordText();

                        // Update wordclass <p>s
                        const wordclassp = document.getElementById("wordclassp");
                        if (wordclassp) {
                            wordclassp.innerHTML = wordclass;
                        }
                        cloneWordclassText();

                    });
                }
                openPageOld('page97')
            });
        }
        else {//type 3
            const searchHandler = search_word_by_definition(keyword); // Array[]
            console.log('3', 'searchHandler |', searchHandler);
            const combinedGendersObject = combine_genders(searchHandler[0].genders) // Key-value pairs 
            console.log('combined |', combinedGendersObject)
            searchHandler.forEach(entry => {

                // check for type === "n" then do for () {} else do normal thingi?
                if (entry.type === "n") {
                    for (const [gender, def] of Object.entries(combinedGendersObject)) {
                        extraTableRow(entry.word, `n ${entry.declension}`, gender, def, entry.usage_notes || '...');

                    }
                } else {
                    const type = entry.type || '...';
                    const word = entry.word || '...';
                    const declension = entry.declension || '';
                    const forms = entry.forms || '...';
                    const usage_notes = entry.usage_notes || '...';
                    const definition = entry.definition || def || '...';


                    let wordclassText = '';
                    if (declension) {
                        wordclassText = `${type} ` + declension;
                    } else (wordclassText = type);

                    //console.log(word, wordclassText, forms, definition, usage_notes);// <-- works.
                    extraTableRow(word, wordclassText, forms, definition, usage_notes);// <-- works not.
                }
            });
        }
    }


    function type1extraTableRow(word, declension, forms, definition, notes) {
        let table = document.getElementById('type1TopTable');
        if (!table) {
            table = document.createElement('table');
            table.id = 'type1TopTable';

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
            table.appendChild(tbody);
        }

        const tbody = table.querySelector('tbody');
        const row = document.createElement('tr');
        for (let i = 0; i < 6; i++) {
            const td = document.createElement('td');
            td.textContent = '...';
            row.appendChild(td);
        }
        if (tbody) {
            tbody.appendChild(row);
        }

        const cellValues = [word, declension, definition, forms, notes, '...'];
        cellValues.forEach((value, index) => {
            const td = row.children[index];
            if (td) {
                td.textContent = value || '...';
            }
        });

        const container = document.querySelector('.tablesContainer');
        if (container && !container.contains(table)) {
            container.appendChild(table);
        }

        return row;
    }
    // table row gen.
    function extraTableRow(word, declension, forms, defintion, notes) {

        let table = document.getElementById('dictionaryTable');
        if (!table) {
            table = document.createElement('table');
            table.id = 'dictionaryTable';
            const trh = document.createElement('tr');
            trh.innerHTML = `
                <th style="width:12%">Word</th>
                <th style="width:7%">Wordclass</th>
                <th style="width:7%">Forms</th>
                <th style="width:30%">Definition</th>
                <th style="width:30%">Notes</th>
                <th style="width:7%">...</th>
            `;
            table.appendChild(trh);
        }

        const Index = table.rows.length;
        //td rows
        const trd = document.createElement('tr');
        trd.innerHTML = `
            <td id="td1-${Index}">${word}</td>
            <td id="td2-${Index}">${declension}</td>
            <td id="td3-${Index}">${forms}</td>
            <td id="td4-${Index}">${defintion}</td>
            <td id="td5-${Index}">${notes}</td>
            <td id="td6-${Index}"; style="cursor:pointer"><strong>search</strong></td>
            `;

        trd.id = `trd-${Index}`;
        const td6 = trd.querySelector('td:last-child');
        const td1 = trd.querySelector('td:first-child');
        td6.addEventListener('click', () => search(td1.textContent));

        table.appendChild(trd);

        document.querySelector('#tableWrapper').appendChild(table);

        console.log('index |', Index);

    }
    // usage => for (let i = 0; i < rowAmount; i++) { extraTableRow(keyword or something custom); }

    //on-page button toggler
    function searchableTable(wordclass) {
        switch (wordclass) {
            case 'n':
                const nounTable1 = document.getElementById('Noun-Table-Directive');
                const nounTable2 = document.getElementById('Noun-Table-Recessive');

                nounTable1.querySelectorAll('td').forEach(td => {
                    td.style.cursor = 'pointer';
                    const tdWord = td.textContent;
                    keyword = tdWord;
                    //console.log(keyword, td);
                    td.addEventListener('click', () => {

                        //console.log(keyword);
                        search(keyword);
                    });
                });
                nounTable2.querySelectorAll('td').forEach(td => {
                    td.style.cursor = 'pointer';
                    const tdWord = td.textContent;
                    keyword = tdWord;
                    //console.log(keyword, td);
                    td.addEventListener('click', () => {

                        // console.log(keyword);
                        search(keyword);
                    });
                });
                break;
            case 'v':
                const verbTable1 = document.getElementById('Verb-Table-Prefix');
                const verbTable2 = document.getElementById('Verb-Table-Suffix');
                //console.log(verbTable1, verbTable2);

                verbTable1.querySelectorAll('td').forEach(td => {
                    td.style.cursor = 'pointer';
                    const tdWord = td.textContent;
                    keyword = tdWord;
                    //console.log(td, keyword);

                    td.addEventListener('click', () => {
                        search(keyword);
                    });
                });
                verbTable2.querySelectorAll('td').forEach(td => {
                    td.style.cursor = 'pointer';
                    const tdWord = td.textContent;
                    keyword = tdWord;
                    //console.log(td, keyword);

                    td.addEventListener('click', () => {
                        search(keyword);
                    });
                });
                break;
            default: console.warn('no wordclass');
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

    function sliceKeyword(keyword, x) {
        const slice1 = keyword.slice(0, -x);
        const slice2 = keyword.slice(-x);
        return { slice1, slice2 };
    }
    // Example usage:
    //const { slice1, slice2 } = sliceKeyword("ækluu", 2);
    //console.log(slice1); // Output: ækl
    //console.log(slice2); // Output: uu

    function checkSuffixMatch(keyword, map) {
        if (!map || typeof map !== 'object') return;
        for (const person of Object.values(map)) {
            for (const key of Object.values(person)) {
                for (const suff of Object.values(key)) {
                    if (keyword.endsWith(suff)) {
                        const length = suff.length;
                        const { slice1: stem, slice2: suffix } = sliceKeyword(keyword, length);
                        console.log('matchmatchmatch ' + suff, suff.length, stem, suffix);
                    }
                }
            }
        }
    } checkSuffixMatch('æfllul', VERB_OBJECT_SUFFIXES);
/*
    for (const key of Object.values(ALL_SUFFIX_STATES)) {
        for (const asd of Object.values(key)) {
            for (const qwe of Object.values(asd)) {
                for (const awe of Object.values(qwe)) {
                    if (typeof awe != 'object') {
                        console.log(awe, 'awe');
                    } else {

                        for (const zxc of Object.values(awe)) {
                            console.log(zxc, 'zxc')

                        }
                    }
                }
            }
        }
    }
*/
/*
const ALL_SUFFIX_STATES = {
    'NOUNS_APPLIED': {
        [MOODS.D]: {
            [GENDERS.E.NAME]: {
                [NUMBERS.S]: { 1: "ēn", 2: "æn", 3: "ēn", 4: "ħán" },
                [NUMBERS.D]: { 1: "ēχen", 2: "yχen", 3: "oχen", 4: "ħóχħon" },
                [NUMBERS.P]: { 1: "illyn", 2: "ān", 3: "ē'yn", 4: "q̇yn" }
            },
            [GENDERS.R.NAME]: {
                [NUMBERS.S]: { 1: "ēf", 2: "axef", 3: "lef", 4: "lef" },
                [NUMBERS.D]: { 1: "eχef", 2: "hyf", 3: "oχef", 4: "oχef" },
                [NUMBERS.P]: { 1: "yf", 2: "hyf", 3: "'yf", 4: "'yf" }
            },
            [GENDERS.MON.NAME]: {
                [NUMBERS.S]: { 1: "ô", 2: "ô", 3: "ô", 4: "ô" },
                [NUMBERS.D]: { 1: "yħq̇ô", 2: "q̇ô", 3: "q̇ô", 4: "ûq̇ô" },
                [NUMBERS.P]: { 1: "oħô", 2: "q̇ô", 3: "q̇ô", 4: "ûq̇ô" }
            },
            [GENDERS.I.NAME]: {
                [NUMBERS.S]: { 1: "llūl", 2: "cūl", 3: "cūl", 4: "cūl" },
                [NUMBERS.D]: { 1: "ællūl", 2: "'illūl", 3: "'illūl", 4: "'illūl" },
                [NUMBERS.P]: { 1: "ællūl", 2: "'illūl", 3: "'illūl", 4: "'illūl" } // /\(/o.o\)/\ - Spooky the spider
            },
            [GENDERS.MAG.NAME]: {
                [NUMBERS.S]: { 1: "ōχ", 2: "huχ", 3: "huχ", 4: "q̇ħúχ" },
                [NUMBERS.D]: { 1: "uχ", 2: "'ūχ", 3: "'ūχ", 4: "'ūχ" },
                [NUMBERS.P]: { 1: "uχ", 2: "'ūχ", 3: "'ūχ", 4: "'ūχ" }
            },
            [GENDERS.MUN.NAME]: {
                [NUMBERS.S]: { 1: "erk", 2: "tyk", 3: "tyk", 4: "árk" },
                [NUMBERS.D]: { 1: "ōrk", 2: "ōrk", 3: "ōrk", 4: "'urk" },
                [NUMBERS.P]: { 1: "ōrk", 2: "ōrk", 3: "ōrk", 4: "'urk" }
            },
            [GENDERS.A.NAME]: {
                [NUMBERS.S]: { 1: "yq̇", 2: "oq̇", 3: "oq̇", 4: "úħáq̇" },
                [NUMBERS.D]: { 1: "āq̇", 2: "ōq̇", 3: "ōq̇", 4: "ūq̇" },
                [NUMBERS.P]: { 1: "āq̇", 2: "ōq̇", 3: "ōq̇", 4: "ūq̇" }
            }
        },
        [MOODS.R]: {
            [GENDERS.E.NAME]: {
                [NUMBERS.S]: { 1: "oħân", 2: "ħân", 3: "ēqân", 4: "qân" },
                [NUMBERS.D]: { 1: "ħân", 2: "ōn", 3: "on", 4: "ħûn" },
                [NUMBERS.P]: { 1: "illyrn", 2: "ōrn", 3: "ē'yrn", 4: "q̇yrn" }
            },
            [GENDERS.R.NAME]: {
                [NUMBERS.S]: { 1: "oħâf", 2: "ħâf", 3: "oqâf", 4: "oqâf" },
                [NUMBERS.D]: { 1: "īllyf", 2: "'ūllef", 3: "yf", 4: "yf" },
                [NUMBERS.P]: { 1: "īllyf", 2: "'ūllef", 3: "ūlef", 4: "'ūlef" }
            },
            [GENDERS.MON.NAME]: {
                [NUMBERS.S]: { 1: "oħô", 2: "qâħó", 3: "qâħó", 4: "ô" },
                [NUMBERS.D]: { 1: "ūħó", 2: "q̇ô", 3: "q̇ô", 4: "ûq̇ô" },
                [NUMBERS.P]: { 1: "ōq̇ô", 2: "q̇ô", 3: "q̇ô", 4: "ûq̇ô" }
            },
            [GENDERS.I.NAME]: {
                [NUMBERS.S]: { 1: "llūl", 2: "qâllūl", 3: "qâllūl", 4: "qâllūl" },
                [NUMBERS.D]: { 1: "yll'ūl", 2: "'llūl", 3: "'llūl", 4: "'llūl" },
                [NUMBERS.P]: { 1: "yll'ūl", 2: "'ūcūl", 3: "'ūcūl", 4: "'ūcūl" }
            },
            [GENDERS.MAG.NAME]: {
                [NUMBERS.S]: { 1: "ōħúχħ", 2: "yq̇ħôχ", 3: "yq̇ħôχ", 4: "q̇ħôχ" },
                [NUMBERS.D]: { 1: "alluχ", 2: "ylūrχ", 3: "ylūrχ", 4: "'ūrχ" },
                [NUMBERS.P]: { 1: "alluχ", 2: "ylūrχ", 3: "ylūrχ", 4: "'ūrχ" }
            },
            [GENDERS.MUN.NAME]: {
                [NUMBERS.S]: { 1: "oħárk	", 2: "ħárk	", 3: "ħárk	", 4: "q̇ħárk" },
                [NUMBERS.D]: { 1: "ōrk", 2: "ōrk", 3: "ōrk", 4: "'urk	" },
                [NUMBERS.P]: { 1: "ōrk", 2: "ōrk", 3: "ōrk", 4: "'urk	" }
            },  // /\(/o.o\)/\ - Spooky the spider
            [GENDERS.A.NAME]: {
                [NUMBERS.S]: { 1: "aħôq̇", 2: "yq̇ħôq̇", 3: "yq̇ħôq̇", 4: "áq̇ħôq̇" },
                [NUMBERS.D]: { 1: "āq̇", 2: "ōq̇", 3: "ōq̇", 4: "ūq̇" },
                [NUMBERS.P]: { 1: "āq̇", 2: "ōq̇", 3: "ōq̇", 4: "ūq̇" }
            }
        }
    },
    'NOUNS_UNAPPLIED': {
        [MOODS.D]: {
            [GENDERS.E.NAME]: {
                [NUMBERS.S]: { 1: "ēn", 2: "æn", 3: "ēn", 4: "ħán" },
                [NUMBERS.D]: { 1: "χen", 2: "χen", 3: "χen", 4: "ħóχħon" },
                [NUMBERS.P]: { 1: "illyn", 2: "ān", 3: "ē'yn", 4: "q̇yn" }
            },
            [GENDERS.R.NAME]: {
                [NUMBERS.S]: { 1: "ēf", 2: "xef", 3: "lef", 4: "lef" },
                [NUMBERS.D]: { 1: "eχef", 2: "hyf", 3: "χef", 4: "χef" },
                [NUMBERS.P]: { 1: "yf", 2: "hyf", 3: "'yf", 4: "'yf" }
            },
            [GENDERS.MON.NAME]: {
                [NUMBERS.S]: { 1: "ô", 2: "ô", 3: "ô", 4: "ô" },
                [NUMBERS.D]: { 1: "yħq̇ô", 2: "q̇ô", 3: "q̇ô", 4: "ûq̇ô" },
                [NUMBERS.P]: { 1: "oħô", 2: "q̇ô", 3: "q̇ô", 4: "ûq̇ô" }
            },
            [GENDERS.I.NAME]: {
                [NUMBERS.S]: { 1: "llūl", 2: "cūl", 3: "cūl", 4: "cūl" },
                [NUMBERS.D]: { 1: "llūl", 2: "illūl", 3: "illūl", 4: "illūl" },
                [NUMBERS.P]: { 1: "llūl", 2: "illūl", 3: "illūl", 4: "illūl" } // /\(/o.o\)/\ - Spooky the spider
            },
            [GENDERS.MAG.NAME]: {
                [NUMBERS.S]: { 1: "χ", 2: "huχ", 3: "huχ", 4: "q̇ħúχ" },
                [NUMBERS.D]: { 1: "uχ", 2: "'ūχ", 3: "'ūχ", 4: "ūχ" },
                [NUMBERS.P]: { 1: "uχ", 2: "'ūχ", 3: "'ūχ", 4: "ūχ" }
            },
            [GENDERS.MUN.NAME]: {
                [NUMBERS.S]: { 1: "rk", 2: "tyk", 3: "tyk", 4: "rk" },
                [NUMBERS.D]: { 1: "ōrk", 2: "ōrk", 3: "ōrk", 4: "urk" },
                [NUMBERS.P]: { 1: "ōrk", 2: "ōrk", 3: "ōrk", 4: "urk" }
            },
            [GENDERS.A.NAME]: {
                [NUMBERS.S]: { 1: "q̇", 2: "q̇", 3: "q̇", 4: "ħáq̇" },
                [NUMBERS.D]: { 1: "āq̇", 2: "ōq̇", 3: "ōq̇", 4: "ūq̇" },
                [NUMBERS.P]: { 1: "āq̇", 2: "ōq̇", 3: "ōq̇", 4: "ūq̇" }
            }
        },
        [MOODS.R]: {
            [GENDERS.E.NAME]: {
                [NUMBERS.S]: { 1: "oħân", 2: "ħân", 3: "ēqân", 4: "qân" },
                [NUMBERS.D]: { 1: "ħân", 2: "n", 3: "on", 4: "ħûn" },
                [NUMBERS.P]: { 1: "illyrn", 2: "rn", 3: "ē'yrn", 4: "q̇yrn" }
            },
            [GENDERS.R.NAME]: {
                [NUMBERS.S]: { 1: "oħâf", 2: "ħâf", 3: "qâf", 4: "qâf" },
                [NUMBERS.D]: { 1: "īllyf", 2: "ūllef", 3: "yf", 4: "yf" },
                [NUMBERS.P]: { 1: "īllyf", 2: "ūllef", 3: "ūlef", 4: "'ūlef" }
            },
            [GENDERS.MON.NAME]: {
                [NUMBERS.S]: { 1: "oħô", 2: "qâħó", 3: "qâħó", 4: "ô" },
                [NUMBERS.D]: { 1: "ūħó", 2: "q̇ô", 3: "q̇ô", 4: "ûq̇ô" },
                [NUMBERS.P]: { 1: "ōq̇ô", 2: "q̇ô", 3: "q̇ô", 4: "ûq̇ô" }
            },
            [GENDERS.I.NAME]: {
                [NUMBERS.S]: { 1: "llūl", 2: "qâllūl", 3: "qâllūl", 4: "qâllūl" },
                [NUMBERS.D]: { 1: "ll'ūl", 2: "llūl", 3: "llūl", 4: "llūl" },
                [NUMBERS.P]: { 1: "ll'ūl", 2: "ūcūl", 3: "ūcūl", 4: "ūcūl" }
            },
            [GENDERS.MAG.NAME]: {
                [NUMBERS.S]: { 1: "ħúχħ", 2: "q̇ħôχ", 3: "q̇ħôχ", 4: "q̇ħôχ" },
                [NUMBERS.D]: { 1: "lluχ", 2: "lūrχ", 3: "lūrχ", 4: "ūrχ" },
                [NUMBERS.P]: { 1: "lluχ", 2: "lūrχ", 3: "lūrχ", 4: "ūrχ" }
            },
            [GENDERS.MUN.NAME]: {
                [NUMBERS.S]: { 1: "ħárk	", 2: "ħárk	", 3: "ħárk	", 4: "q̇ħárk" },
                [NUMBERS.D]: { 1: "ōrk", 2: "ōrk", 3: "ōrk", 4: "urk	" },
                [NUMBERS.P]: { 1: "ōrk", 2: "ōrk", 3: "ōrk", 4: "urk	" }
            },  // /\(/o.o\)/\ - Spooky the spider
            [GENDERS.A.NAME]: {
                [NUMBERS.S]: { 1: "aħôq̇", 2: "q̇ħôq̇", 3: "q̇ħôq̇", 4: "áq̇ħôq̇" },
                [NUMBERS.D]: { 1: "āq̇", 2: "ōq̇", 3: "ōq̇", 4: "ūq̇" },
                [NUMBERS.P]: { 1: "āq̇", 2: "ōq̇", 3: "ōq̇", 4: "ūq̇" }
            }
        }
    },
    'VERBS_APPLIED': {
        1: {
            [NUMBERS.S]: { [GENDERS.E.NAME]: "on", [GENDERS.R.NAME]: "yf", [GENDERS.MON.NAME]: "uħó", [GENDERS.I.NAME]: "llul", [GENDERS.MAG.NAME]: "uχ", [GENDERS.MUN.NAME]: "ur", [GENDERS.A.NAME]: "yq̇" },
            [NUMBERS.D]: { [GENDERS.E.NAME]: "'æ­n", [GENDERS.R.NAME]: "'æf", [GENDERS.MON.NAME]: "'ô", [GENDERS.I.NAME]: "'allūl", [GENDERS.MAG.NAME]: "'ōχ", [GENDERS.MUN.NAME]: "'ar", [GENDERS.A.NAME]: "yq̇" },
            [NUMBERS.P]: { [GENDERS.E.NAME]: "'æ­n", [GENDERS.R.NAME]: "'æf", [GENDERS.MON.NAME]: "'ô", [GENDERS.I.NAME]: "'allūl", [GENDERS.MAG.NAME]: "'ōχ", [GENDERS.MUN.NAME]: "'ar", [GENDERS.A.NAME]: "yq̇" }
        },
        2: {
            [NUMBERS.S]: { [GENDERS.E.NAME]: "un", [GENDERS.R.NAME]: "uf", [GENDERS.MON.NAME]: "uħó", [GENDERS.I.NAME]: "llul", [GENDERS.MAG.NAME]: "uχ", [GENDERS.MUN.NAME]: "ur", [GENDERS.A.NAME]: "uq̇" },
            [NUMBERS.D]: { [GENDERS.E.NAME]: "onēn", [GENDERS.R.NAME]: "nef", [GENDERS.MON.NAME]: "áħó", [GENDERS.I.NAME]: "állul", [GENDERS.MAG.NAME]: "ónōχ", [GENDERS.MUN.NAME]: "ár", [GENDERS.A.NAME]: "ħóq̇" },
            [NUMBERS.P]: { [GENDERS.E.NAME]: "ħen", [GENDERS.R.NAME]: "ħáf", [GENDERS.MON.NAME]: "áħó", [GENDERS.I.NAME]: "állul", [GENDERS.MAG.NAME]: "ónōχ", [GENDERS.MUN.NAME]: "ár", [GENDERS.A.NAME]: "ħóq̇" }
        },
        3: {
            [NUMBERS.S]: { [GENDERS.E.NAME]: "tón", [GENDERS.R.NAME]: "ħyf", [GENDERS.MON.NAME]: "oħó", [GENDERS.I.NAME]: "llul", [GENDERS.MAG.NAME]: "ħuχ", [GENDERS.MUN.NAME]: "ur", [GENDERS.A.NAME]: "úq̇" },
            [NUMBERS.D]: { [GENDERS.E.NAME]: "q̇ân", [GENDERS.R.NAME]: "yq̇ħáf", [GENDERS.MON.NAME]: "ħó", [GENDERS.I.NAME]: "úcul", [GENDERS.MAG.NAME]: "ħúχ", [GENDERS.MUN.NAME]: "úr", [GENDERS.A.NAME]: "uq̇" },
            [NUMBERS.P]: { [GENDERS.E.NAME]: "tun", [GENDERS.R.NAME]: "if", [GENDERS.MON.NAME]: "ħó", [GENDERS.I.NAME]: "úcul", [GENDERS.MAG.NAME]: "ħúχ", [GENDERS.MUN.NAME]: "úr", [GENDERS.A.NAME]: "uq̇" }
        }
    },
    'VERBS_UNAPPLIED': {
        1: {
            [NUMBERS.S]: { [GENDERS.E.NAME]: "n", [GENDERS.R.NAME]: "f", [GENDERS.MON.NAME]: "ħó", [GENDERS.I.NAME]: "llul", [GENDERS.MAG.NAME]: "(u)χ", [GENDERS.MUN.NAME]: "r", [GENDERS.A.NAME]: "q̇" },
            [NUMBERS.D]: { [GENDERS.E.NAME]: "æ­n", [GENDERS.R.NAME]: "æf", [GENDERS.MON.NAME]: "ô", [GENDERS.I.NAME]: "allūl", [GENDERS.MAG.NAME]: "ōχ", [GENDERS.MUN.NAME]: "ar", [GENDERS.A.NAME]: "q̇" },
            [NUMBERS.P]: { [GENDERS.E.NAME]: "æ­n", [GENDERS.R.NAME]: "æf", [GENDERS.MON.NAME]: "ô", [GENDERS.I.NAME]: "allūl", [GENDERS.MAG.NAME]: "ōχ", [GENDERS.MUN.NAME]: "ar", [GENDERS.A.NAME]: "q̇" }
        },
        2: {
            [NUMBERS.S]: { [GENDERS.E.NAME]: "n", [GENDERS.R.NAME]: "f", [GENDERS.MON.NAME]: "ħó", [GENDERS.I.NAME]: "llul", [GENDERS.MAG.NAME]: "χ", [GENDERS.MUN.NAME]: "r", [GENDERS.A.NAME]: "q̇" },
            [NUMBERS.D]: { [GENDERS.E.NAME]: "nēn", [GENDERS.R.NAME]: "nef", [GENDERS.MON.NAME]: "ħó", [GENDERS.I.NAME]: "llul", [GENDERS.MAG.NAME]: "nōχ", [GENDERS.MUN.NAME]: "r", [GENDERS.A.NAME]: "ħóq̇" },
            [NUMBERS.P]: { [GENDERS.E.NAME]: "ħen", [GENDERS.R.NAME]: "ħáf", [GENDERS.MON.NAME]: "ħó", [GENDERS.I.NAME]: "llul", [GENDERS.MAG.NAME]: "nōχ", [GENDERS.MUN.NAME]: "r", [GENDERS.A.NAME]: "ħóq̇" }
        },
        3: {
            [NUMBERS.S]: { [GENDERS.E.NAME]: "tón", [GENDERS.R.NAME]: "ħyf", [GENDERS.MON.NAME]: "ħó", [GENDERS.I.NAME]: "llul", [GENDERS.MAG.NAME]: "ħuχ", [GENDERS.MUN.NAME]: "r", [GENDERS.A.NAME]: "q̇" },
            [NUMBERS.D]: { [GENDERS.E.NAME]: "ân", [GENDERS.R.NAME]: "q̇ħáf", [GENDERS.MON.NAME]: "ħó", [GENDERS.I.NAME]: "cul", [GENDERS.MAG.NAME]: "ħúχ", [GENDERS.MUN.NAME]: "r", [GENDERS.A.NAME]: "q̇" },
            [NUMBERS.P]: { [GENDERS.E.NAME]: "tun", [GENDERS.R.NAME]: "if", [GENDERS.MON.NAME]: "ħó", [GENDERS.I.NAME]: "cul", [GENDERS.MAG.NAME]: "ħúχ", [GENDERS.MUN.NAME]: "r", [GENDERS.A.NAME]: "q̇" }
        }
    },
}
*/

    // Example usage:
    //checkKeywordEnding(map, 'æfasd'); // Logs: Match found: "asd" is the ending of "æfasd"
    //checkKeywordEnding(map, 'æfqwe'); // Logs: Match found: "qwe" is the ending of "æfqwe"





    // copied from legacy.vv


    // populateSummaryTables
    function populateSummaryTables(keyword, tables) {
        Object.keys(tables).forEach(tableId => {
            const table = document.getElementById(tableId);
            if (!table) return;
            const tds = table.querySelectorAll("td");
            tds.forEach(td => {
                // prefer original stored raw suffix (data-raw) if present 
                const textInCell = (td.dataset.raw && td.dataset.raw.trim()) ? td.dataset.raw : td.textContent.trim();
                //console.log(td.dataset.raw); // wtf is dataset.raw?
                // console.log(td.innerHTML);

                // process raw
                let entries;
                if (tables[tableId]) entries = connect_split(textInCell, keyword, "");
                else entries = connect_split("", keyword, textInCell);
                td.innerHTML = `<strong>${entries_to_text(entries[0])}</strong>${entries_to_text(entries[1])}<strong>${entries_to_text(entries[2])}</strong>`;
                // place keyword as prefix or suffix (you can change behavior per table)
            });
        });
    }


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
                            <button id="tableSearchBtn">Table is seachable</button>
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
                console.log(wordclass, table);
                //fillTable(keyword, wordclass, table);

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

    function keepDigitsOnly(str) {
        return String(str).replace(/\D+/g, "");
    }
    function removeParensSpacesAndDigits(str) {
        return String(str || "").replace(/[\d() \t\r\n]+/g, "");
    }
    // === Fill table from structured dictionary data ===
    function resolveDictionaryEntry(wordclass, keyword) {
        if (!dictionaryData) return null;

        const normalizedClass = String(wordclass || "").trim().toLowerCase();
        const collectionKey = WORDCLASS_COLLECTION_MAP[normalizedClass] || normalizedClass;
        const collection = dictionaryData[collectionKey];
        if (!collection) return null;

        const attempts = new Set([
            keyword,
            String(keyword || "").trim(),
            String(keyword || "").trim().toLowerCase(),
            removeParensSpacesAndDigits(keyword)
        ]);

        for (const key of attempts) {
            if (!key) continue;
            const candidate = collection[key];
            if (candidate) return candidate;
        }

        if (Array.isArray(collection)) {
            const lowered = String(keyword || "").trim().toLowerCase();
            return collection.find(entry => {
                if (!entry || typeof entry !== "object") return false;
                const entryKey = String(entry.keyword || "").trim().toLowerCase();
                return entryKey === lowered;
            }) || null;
        }

        return null;
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
