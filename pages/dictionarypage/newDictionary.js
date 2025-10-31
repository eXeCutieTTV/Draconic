function dictionaryPage() {

    //yoo new dictionary xd // /\(/o.o\)/\ - Spooky the spider


    const searchBTN = document.getElementById('search_button');
    const searchFLD = document.getElementById('search_field');

    // main search function
    function search(word) {
        let keyword = ((searchFLD && searchFLD.value ? searchFLD.value.trim() : '').toLowerCase()) || word;


        // vars for suffix detection
        let usedSuffix = '';
        let Suffixtype = '';
        let Suffixgender = '';
        let Suffixnumber = '';
        let Suffixstem = '';
        let Suffixperson = '';
        let Suffixdeclensions = '';

        // vars for prefix detection
        let usedPrefix = '';
        let Prefixtype = '';
        let Prefixgender = '';
        let Prefixnumber = '';
        let Prefixstem = '';
        let Prefixperson = '';
        let Prefixdeclension = '';


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
        }//HAHAHAHHAHAHAHAHHA. FUCK YOU COMMENT >:) :q

        //clear searchFLD
        if (searchFLD && searchFLD.value.trim() !== '') {
            searchFLD.value = '';
            searchFLD.blur();
        }

        function clearPageById(id) {
            const page = document.getElementById(id);
            if (!page) return
            if (page) {
                page.remove();
                console.log('removed page by id: ' + id);
            }
        }
        clearPageById('page97'); //type 1
        clearPageById('page96'); //type 2
        clearPageById('dictionaryTable');// clear english table



        //console.log('1', search_word(keyword), '2', search_word_by_definition(keyword), '3', ALL_WORDS);


        if (ALL_WORDS.fetch(keyword) && ALL_WORDS.fetch(keyword).length > 0) {//type 1
            const searchHandler = ALL_WORDS.fetch(keyword);
            console.log('searchHandler |', searchHandler);
            searchHandler.forEach(entry => { // what for is this search handler 
                const word = entry.word
                const wordclass = entry.type || '...';

                let combinedGendersObject = '';
                if (wordclass === 'n') {
                    combinedGendersObject = WORD_UTILS.combineGenders(entry.genders) // Key-value pairs
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
                        //console.log(NOUNS.SUFFIXES.MAP);
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
                                            const entry = Object.entries(NOUNS.SUFFIXES.MAP[mooooood]);
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
                                        1: { 1: 'Prefix', 2: VERBS.PREFIXES.MAP },
                                        2: { 1: 'Suffix', 2: VERBS.SUFFIXES.MAP }
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

        else if (neoPrefixChecker(keyword, VERBS.PREFIXES.FLAT_MATCHES) || (neoSuffixChecker(keyword, VERBS.SUFFIXES.FLAT_MATCHES) || neoSuffixChecker(keyword, NOUNS.SUFFIXES.FLAT_MATCHES))) {//type 2
            console.log('type2');

            if (usedPrefix.length > 0) {
                if (usedSuffix.length > 0) {
                    const prefixSettings = {
                        gender: Prefixgender || '',
                        number: Prefixnumber || '',
                        person: Prefixperson || '',
                        prefix: usedPrefix || '',
                        stem: Prefixstem || '',
                        declension: ((typeof Prefixdeclension !== 'undefined') ? Prefixdeclension : Prefixdeclensions) || ''
                    };

                    const buildSuffixSettings = (declensionValue) => ({
                        gender: Suffixgender,
                        number: Suffixnumber,
                        person: Suffixperson,
                        suffix: usedSuffix,
                        stem: Suffixstem,
                        declension: declensionValue || ''
                    });
                    console.log('prefix AND suffix');
                }
                if (usedSuffix.length === 0) {
                    const prefixSettings = {
                        gender: Prefixgender || '',
                        number: Prefixnumber || '',
                        person: Prefixperson || '',
                        prefix: usedPrefix || '',
                        stem: Prefixstem || '',
                        declension: Prefixdeclension || ''
                    };
                    if (Prefixtype === 'n' || Prefixtype === 'adj') {
                        affixPage(keyword, '', prefixSettings);
                        //affixPage(keyword, { gender: Suffixgebder, number: Suffixnumber, person: Suffixperson, suffix: usedSuffix, stem: Suffixstem, declension: el }, '');

                    } else {
                        affixPage(keyword, '', prefixSettings);
                        //console.log(affixPage(keyword, suffixSettings, ''));
                    }
                    console.log('ONLY prefix');
                }
            }
            if (usedPrefix.length === 0) {
                if (usedSuffix.length > 0) {
                    const buildSuffixSettings = (declensionValue) => ({
                        gender: Suffixgender,
                        number: Suffixnumber,
                        person: Suffixperson,
                        suffix: usedSuffix,
                        stem: Suffixstem,
                        declension: declensionValue || ''
                    });
                    if (Suffixtype === 'n' || Suffixtype === 'adj') {
                        Suffixdeclensions.forEach(el => {
                            console.log(el);
                            affixPage(keyword, buildSuffixSettings(el), '');
                            //affixPage(keyword, { gender: Suffixgebder, number: Suffixnumber, person: Suffixperson, suffix: usedSuffix, stem: Suffixstem, declension: el }, '');
                        });
                    } else {
                        const suffixSettings = buildSuffixSettings('');
                        affixPage(keyword, suffixSettings, '');
                        //console.log(affixPage(keyword, suffixSettings, ''));
                    }
                    console.log('ONLY suffix');
                }
            }
            /*
                        const buildSuffixSettings = (declensionValue) => ({
                            gender: Suffixgender,
                            number: Suffixnumber,
                            person: Suffixperson,
                            suffix: usedSuffix,
                            stem: Suffixstem,
                            declension: declensionValue || ''
                        });
            
                        if (usedPrefix.length > 0) {
                            console.log(prefix);
                            if (neoSuffixChecker(prefixKeyword, VERBS.SUFFIXES.FLAT_MATCHES) || neoSuffixChecker(prefixKeyword, NOUNS.SUFFIXES.FLAT_MATCHES)) {
                                const prefixSettings = {
                                    gender: Prefixgender || '',
                                    number: Prefixnumber || '',
                                    person: Prefixperson || '',
                                    prefix: usedPrefix || '',
                                    stem: Prefixstem || '',
                                    declension: ((typeof Prefixdeclension !== 'undefined') ? Prefixdeclension : Prefixdeclensions) || ''
                                };
                                if (Suffixtype === 'n' || Suffixtype === 'adj') {
                                    Suffixdeclensions.forEach(el => {
                                        console.log(el);
                                        affixPage(prefixKeyword, buildSuffixSettings(el), prefixSettings);
                                    });
                                } else {
                                    const suffixSettings = buildSuffixSettings('');
                                    affixPage(prefixKeyword, suffixSettings, prefixSettings);
                                    console.log(affixPage(prefixKeyword, suffixSettings, prefixSettings));
                                }
                            }
                        } else {
                            const prefixSettings = {
                                prefix: '',
                                gender: '',
                                number: '',
                                person: '',
                                stem: '',
                                declension: ''
                            };
                            if (Suffixtype === 'n' || Suffixtype === 'adj') {
                                Suffixdeclensions.forEach(el => {
                                    console.log(el);
                                    affixPage(keyword, buildSuffixSettings(el), prefixSettings);
                                });
                            } else {
                                const suffixSettings = buildSuffixSettings('');
                                affixPage(keyword, suffixSettings, prefixSettings);
                            }
                        }
                            */
            openPageOld('page96');
        }
        else {//type 3
            const searchHandler = ALL_WORDS.fetchByDefinition(keyword); // Array[]
            console.log('3', 'searchHandler |', searchHandler);
            searchHandler.forEach(entry => {

                // check for type === "n" then do for () {} else do normal thingi?
                if (entry.type === "n") {
                    for (const [gender, def] of Object.entries(WORD_UTILS.combineGenders(entry.genders))) {
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


        function neoSuffixChecker(keyword, map) {
            const array = WORD_UTILS.matchSuffix(keyword, map);
            console.log(array);
            if (!array) {
                return;
            }

            const suffixes = array[0] || [];
            Suffixtype = array[2];
            Suffixperson = array[3];
            Suffixgender = array[4];
            Suffixnumber = array[5];
            Suffixdeclensions = array[1] || [];
            console.log(Suffixdeclensions);
            const appliedSuffix = suffixes[0] || '';
            const unappliedSuffix = suffixes[1] || '';

            console.log(
                'Suffixtype | ', Suffixtype,
                'Suffixperson | ', Suffixperson,
                'Suffixgender | ', Suffixgender,
                'Suffixnumber | ', Suffixnumber)

            //which suffix is used? un- or applied?
            if (appliedSuffix && unappliedSuffix) {
                if (keyword.endsWith(appliedSuffix) && keyword.endsWith(unappliedSuffix)) {
                    usedSuffix = appliedSuffix;
                    console.log('both', usedSuffix);
                } else if (keyword.endsWith(unappliedSuffix)) {
                    usedSuffix = unappliedSuffix;
                    console.log('only one', usedSuffix);
                } else { return; }
            } else if (appliedSuffix) {
                usedSuffix = appliedSuffix;
            } else if (unappliedSuffix) {
                usedSuffix = unappliedSuffix;
            }

            if (!usedSuffix) {
                return;
            }

            const suffixLength = usedSuffix.length;
            const { slice1, slice2 } = sliceKeyword(keyword, suffixLength);
            Suffixstem = slice1;
            console.log(Suffixstem, usedSuffix); // worked earlier - havent changed anything:q

            return true;
        } //neoSuffixChecker('æklūrk', NOUNS_SUFFIXES_MAP);


        /*
        function affixPage(keyword, gender, number, person, suffix, stem, declension, prefix) {
                    let page = '';
                    page = document.getElementById('page96');
                    if (page != 'object') { page = document.createElement('div'); }
        
                    page.id = 'page96';
                    page.className = 'page';
                    const div = document.createElement('div');
        
                    if (!declension) { declension = '' }
        
                    div.innerHTML = `gender: ${gender}<br> number: ${number}<br> person: ${person}<br> suffix: ${suffix}<br> stem: ${stem}<br> declension: ${declension} <br> keyword: ${keyword}<br> prefix: ${prefix}`;
        
                    pagesWrap = document.querySelector('.pages');
                    pagesWrap.appendChild(page);
                    page.appendChild(div);
                }
        */

        function affixPage(keyword, suffixSettings = {}, prefixSettings = {}) {
            const normalize = (value) => {
                if (Array.isArray(value)) {
                    return value.join(', ');
                }
                return value ?? '';
            };

            const {
                gender: Suffixgender = '',
                number: Suffixnumber = '',
                person: Suffixperson = '',
                suffix: suffix = '',
                stem: Suffixstem = '',
                declension: Suffixdeclension = ''
            } = suffixSettings;

            const {
                gender: prefixGender = '',
                number: prefixNumber = '',
                person: prefixPerson = '',
                prefix: prefix = '',
                stem: prefixStem = '',
                declension: prefixDeclension = ''
            } = prefixSettings;

            const pageId = 'page96';
            let page = document.getElementById(pageId);
            if (!page) {
                page = document.createElement('div');
                page.id = pageId;
                page.className = 'page';
            }

            const div = document.createElement('div');

            const prefixLines = [
                `prefix: ${normalize(prefix)}`,
                `prefix stem: ${normalize(prefixStem)}`,
                `prefix declension: ${normalize(prefixDeclension)}`,
                `prefix gender: ${normalize(prefixGender)}`,
                `prefix number: ${normalize(prefixNumber)}`,
                `prefix person: ${normalize(prefixPerson)}`
            ];

            const suffixLines = [
                `suffix: ${normalize(suffix)}`,
                `suffix stem: ${normalize(Suffixstem)}`,
                `suffix declension: ${normalize(Suffixdeclension)}`,
                `suffix gender: ${normalize(Suffixgender)}`,
                `suffix number: ${normalize(Suffixnumber)}`,
                `suffix person: ${normalize(Suffixperson)}`
            ];

            const lines = [
                `keyword: ${normalize(keyword)}`,
                ...prefixLines,
                ...suffixLines
            ];

            div.innerHTML = lines.join('<br> ');

            const pagesWrap = document.querySelector('.pages');
            if (pagesWrap) {
                pagesWrap.appendChild(page);
                page.appendChild(div);
            }
        }
        reverseSearchIdsOnSearch();
    }

    function neoPrefixChecker(keyword, map) {
        const array = WORD_UTILS.matchPrefix(keyword, map);
        console.log(array);
        if (!array) {
            return;
        }
        const prefix = array[0];
        //Prefixtype = array[1];
        Prefixperson = array[1];
        Prefixgender = array[2];
        Prefixnumber = array[3];
        Prefixdeclension = array[1] || [];
        console.log(Prefixdeclension);

        console.log(
            'Prefixperson | ', Prefixperson,
            'Prefixgender | ', Prefixgender,
            'Prefixnumber | ', Prefixnumber
        )

        usedPrefix = prefix; // no variants

        if (!usedPrefix) {
            return;
        }

        const prefixLength = usedPrefix.length;
        const { slice1, slice2 } = sliceKeyword(keyword, prefixLength);
        Prefixstem = slice1;
        console.log(prefix, usedPrefix); // worked earlier - havent changed anything:q

        return true;

    } //neoPrefixChecker('xenæf', VERBS.PREFIXES.FLAT_MATCHES);


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

        //console.log('index |', Index);

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
                if (tables[tableId]) entries = WORD_UTILS.connectSplit(textInCell, keyword, "");
                else entries = WORD_UTILS.connectSplit("", keyword, textInCell);
                td.innerHTML = `<strong>${CHARACTERS.entriesToText(entries[0])}</strong>${CHARACTERS.entriesToText(entries[1])}<strong>${CHARACTERS.entriesToText(entries[2])}</strong>`;
                // place keyword as prefix or suffix (you can change behavior per table)
            });
        });
    }

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


    function keepDigitsOnly(str) {
        return String(str).replace(/\D+/g, "");
    }
    function removeParensSpacesAndDigits(str) {
        return String(str || "").replace(/[\d() \t\r\n]+/g, "");
    }
    // === Fill table from structured dictionary data ===


}//if(entry.animates && entry.gender === 'e'){genders='animates'}; if(entry.gender === 'r','mon','i'){return;}?




dictionaryPage(); // so constants arent redefined.
// this works as a wrapper function essentially^^

