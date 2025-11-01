function dictionaryPage() {

    //yoo new dictionary xd // /\(/o.o\)/\ - Spooky the spider


    const searchBTN = document.getElementById('search_button');
    const searchFLD = document.getElementById('search_field');

    // main search function
    function search(word) {
        let keyword = ((searchFLD && searchFLD.value ? searchFLD.value.trim() : '').toLowerCase()) || word;


        // vars for suffix detection
        let suffixData = []; //<-- probably only need this now

        // vars for prefix detection
        let prefixData = []; //<-- probably only need this now

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

        helperFunctions.standard.clearPageById('page97'); //type 1
        helperFunctions.standard.clearPageById('page96'); //type 2
        helperFunctions.standard.clearPageById('dictionaryTable'); //type 3



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

                    const html = `
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
                    helperFunctions.standard.createPageById('page97', html);

                    const tableSearchable = document.getElementById('tableSearchBtn');


                    // Wait for the page content to load, then setup the table (header table)
                    helperFunctions.tablegen.waitForElement(`#page97 .tablesContainer`).then(pageContainer => {
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
                                const row = helperFunctions.matchtype1.type1extraTableRow(
                                    entry.word || '...',
                                    entry.declension || '...',
                                    gender || '...',
                                    def || '...',
                                    entry.usage_notes || '...')
                                newFillTable(row, entry.word, entry.declension, def, gender, entry.usage_notes, entry.type);
                            }
                        } else {
                            const row = helperFunctions.matchtype1.type1extraTableRow(
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
                                helperFunctions.tablegen.populateSummaryTables(keyword, { 'Noun-Table-Directive': false, 'Noun-Table-Recessive': false });



                                break;
                            case 'v':
                                function neoVerbTables(affixState) {

                                    const wrapper = document.getElementById('leftleftdivdictionary');
                                    const affixStateMap = {
                                        1: { 1: 'Prefix', 2: VERBS.PREFIXES.MAP },
                                        2: { 1: 'Suffix', 2: VERBS.SUFFIXES.MAP }
                                    }
                                    const html = `
                                    <table id="Verb-Table-${affixStateMap[affixState][1]}" style="margin-bottom: 10px;">
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
                                    helperFunctions.standard.createDivById('', wrapper, html);
                                }
                                neoVerbTables(1);
                                neoVerbTables(2);

                                helperFunctions.tablegen.populateSummaryTables(keyword, { 'Verb-Table-Prefix': true, 'Verb-Table-Suffix': false });
                                break
                        }
                        tableSearchable.addEventListener('click', () => {
                            console.log(wordclass);
                            searchableTable(wordclass);
                        });
                    });
                }
                openPageOld('page97')
            });
        }

        else if (helperFunctions.affixHelpers.neoPrefixChecker(keyword, VERBS.PREFIXES.FLAT_MATCHES, prefixData) || (helperFunctions.affixHelpers.neoSuffixChecker(keyword, VERBS.SUFFIXES.FLAT_MATCHES, suffixData) || helperFunctions.affixHelpers.neoSuffixChecker(keyword, NOUNS.SUFFIXES.FLAT_MATCHES, suffixData))) {//type 2
            console.log('type2');




            let hasPrefix = (prefixData.length > 0 ? true : false);
            let hasSuffix = (suffixData.length > 0 ? true : false);

            if (hasPrefix) {
                const array = prefixData[0].Prefixdeclension;
                const prefixGender = array[3];
                const prefixNumber = array[2];
                const prefixPerson = array[1];
                const prefix = array[0];

                console.log(//empty?? wtf. why empty :sob:vv

                    prefixGender,
                    prefixNumber,
                    prefixPerson,
                    prefix,
                    array

                );
            }
            if (hasSuffix) {
                const array = suffixData[0];
                const suffixDeclensions = array.Suffixdeclensions;
                for (declension of Object.values(suffixDeclensions)) {
                    const suffixDeclension = declension;
                    const suffixGender = array.Suffixgender;
                    const suffixNumber = array.Suffixnumber;
                    const suffixPerson = array.Suffixperson;
                    const suffixType = array.Suffixtype;
                    const suffix = array.usedSuffix;

                    console.log(
                        suffixDeclension,
                        suffixGender,
                        suffixNumber,
                        suffixPerson,
                        suffixType,
                        suffix
                    );

                    const html = `
                        suffixDeclension, ${suffixDeclension} <br>
                        suffixGender, ${suffixGender} <br>
                        suffixNumber, ${suffixNumber} <br>
                        suffixPerson, ${suffixPerson} <br>
                        suffixType, ${suffixType} <br>
                        suffix, ${suffix}`;

                    helperFunctions.standard.createPageById('page96', html);

                }
                console.log(array);
            }
            console.log(hasPrefix, hasSuffix);
            // so whats not workin. type 2 logic.
            // logic to deduce if we have only prefix, only suffix, or both - and display data on affixpage.

            /*
            if (usedPrefix.length > 0) {
                if (usedSuffix.length > 0) {
                    const prefixSettings = {
                        gender: Prefixgender || '',
                        number: Prefixnumber || '',
                        person: Prefixperson || '',
                        prefix: usedPrefix || '',
                        stem: Prefixstem || '',
                        declension: Prefixdeclension || ''
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
                if (usedSuffix.length === 0 && ALL_WORDS) {
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
            }*/

            openPageOld('page96');
        }
        else {//type 3
            const searchHandler = ALL_WORDS.fetchByDefinition(keyword); // Array[]
            console.log('3', 'searchHandler |', searchHandler);
            searchHandler.forEach(entry => {

                // check for type === "n" then do for () {} else do normal thingi?
                if (entry.type === "n") {
                    for (const [gender, def] of Object.entries(WORD_UTILS.combineGenders(entry.genders))) {
                        helperFunctions.matchtype3.extraTableRow(entry.word, `n ${entry.declension}`, gender, def, entry.usage_notes || '...');

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
                    helperFunctions.matchtype3.extraTableRow(word, wordclassText, forms, definition, usage_notes);
                }
            });
        }

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
        helperFunctions.standard.reverseSearchIdsOnSearch();
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


    //evenlisteners vv
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
}
dictionaryPage(); // so constants arent redefined.
// this works as a wrapper function essentially^^

