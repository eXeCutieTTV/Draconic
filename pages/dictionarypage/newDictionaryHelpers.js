const test = function test(word) {
    console.log(word);
}
const clearPageById = function clearPageById(id) {
    const page = document.getElementById(id);
    if (!page) return
    if (page) {
        page.remove();
        console.log('removed page by id: ' + id);
    }
}
const createPageById = function createPageById(id, html) {
    let page = document.getElementById(id);
    if (!page) {
        page = document.createElement('div');
    }

    page.id = id;
    page.className = 'page';

    const divWrapper = document.createElement('div');//for css
    divWrapper.id = "divWrapper";
    divWrapper.style.display = "flex";

    const leftDiv = document.createElement('div');
    leftDiv.id = `${id}.leftDiv`;
    leftDiv.style.display = "inline";
    leftDiv.style.flex = "0.8";
    leftDiv.style.marginRight = "20px";
    leftDiv.innerHTML = html;

    const rightDiv = document.createElement('div');
    rightDiv.id = `${id}.rigthDiv`;
    rightDiv.style.display = "inline";
    rightDiv.style.flex = "0.2";
    rightDiv.innerHTML = `
    <div id="searchDiv" style="margin-bottom:10px;">
        <input type="text" autocomplete="off" id="search_field" placeholder="Search..." />
        <button id="search_button">Search</button>
        <div id="tableSearchBtnWrapper">
            <!--<button id="tableSearchBtn">Table is seachable</button>-->
        </div>
    </div>
    `;

    const listDiv = document.createElement('div');
    listDiv.id = `listDiv`;

    rightDiv.appendChild(listDiv);
    divWrapper.appendChild(leftDiv);
    divWrapper.appendChild(rightDiv);

    page.appendChild(divWrapper);

    const pagewrapper = document.querySelector('.pages');

    if (!pagewrapper) {
        console.error("no div with class '.pages'");
        return;
    }

    pagewrapper.appendChild(page);
}
const openPageById = function openPageById(pageId, element) {

    const pageEl = document.getElementById(pageId);
    if (!pageEl) {
        if (pageId === 'page11999') return;
        console.error(`openPage: No element found with id "${pageId}"`);
        return;
    }
    pageEl.classList.add('active');
    // Hide all pages
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

    // Show selected page
    document.getElementById(pageId).classList.add('active');

    // Reset all tabs
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));

    // Highlight current tab
    if (element) {
        element.classList.add('active');
    }
    // If pageId number is above 1000, highlight a constant tab
    const match = pageId.match(/\d+/); // extract number from pageId
    if (match && parseInt(match[0], 10) > 1000) {
        const constantTab = document.getElementById('permatab'); // <-- your fixed tab's ID
        if (constantTab) {
            constantTab.classList.add('active');
        }
    }
}
const createDivById = function createDivById(id, wrapper, html) {
    let div = document.getElementById(id);
    if (!div) {
        div = document.createElement('div');
    }
    if (id.length > 0) {
        div.id = id;
    }
    div.innerHTML = html;

    const divwrapper = wrapper;

    if (!divwrapper) {
        console.error("no div wrapper");
        return;
    }

    divwrapper.appendChild(div);
}
const sliceKeywordNegative = function sliceKeywordNegative(keyword, x) {
    const slice1 = keyword.slice(0, -x);
    const slice2 = keyword.slice(-x);
    return { slice1, slice2 };

    // Example usage:
    //const { slice1, slice2 } = sliceKeyword("ækluu", 2);
    //console.log(slice1); // Output: ækl
    //console.log(slice2); // Output: uu
}
const sliceKeywordPositive = function sliceKeywordPositive(keyword, x) {
    const slice1 = keyword.slice(0, x);
    const slice2 = keyword.slice(x);
    return { slice1, slice2 };

    // Example usage:
    //const { slice1, slice2 } = sliceKeyword("ækluu", 2);
    //console.log(slice1); // Output: ækl
    //console.log(slice2); // Output: uu
}
const reverseSearchIdsOnSearch = function reverseSearchIdsOnSearch() {
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

const betterTrInsert = function betterTrInsert(id, html) {
    const tbody = document.getElementById(id);
    const tr = document.createElement('tr');
    tr.innerHTML = String(html);
    tbody.appendChild(tr);
}
const searchableTable = function searchableTable(wordclass) {//turns the tables into paramteres. such that the function becomes global and reusable.
    switch (wordclass) {
        case 'n':
            const nounTable1 = document.getElementById('Noun-Table-Directive');
            const nounTable2 = document.getElementById('Noun-Table-Recessive');

            nounTable1.querySelectorAll('td').forEach(td => {
                td.style.cursor = 'pointer';
                const tdWord = td.textContent;
                //console.log(keyword, td);
                td.addEventListener('click', () => {
                    // Use the clicked cell's word, not a shared variable
                    search(tdWord);
                });
            });
            nounTable2.querySelectorAll('td').forEach(td => {
                td.style.cursor = 'pointer';
                const tdWord = td.textContent;
                //console.log(keyword, td);
                td.addEventListener('click', () => {
                    // console.log(keyword);
                    search(tdWord);
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
                //console.log(td, keyword);

                td.addEventListener('click', () => {
                    search(tdWord);
                });
            });
            verbTable2.querySelectorAll('td').forEach(td => {
                td.style.cursor = 'pointer';
                const tdWord = td.textContent;
                //console.log(td, keyword);

                td.addEventListener('click', () => {
                    search(tdWord);
                });
            });
            break;
        default: console.warn('no wordclass');
    }
}

const nounTable = function nounTable(affix, declension, gender, number, Case, definition, wrapper, affixState, real_stem) {
    if (!affix || !declension || !gender || !number || !Case || !definition) return;

    const tbody = document.getElementById(`tbody-${affixState}`) || '';
    if (tbody === '') {
        const html = `
            <div style="margin-top:15px">
                <table>
                    <tr>
                        <thead>
                            <th class="infoCollum">...</th>
                            <th>Suffix</th>
                            <th>Declension</th>
                            <th>Gender</th>
                            <th>Number</th>
                            <th>Case</th>
                            <th>Definition</th>
                            <th>Stem</th>
                        </thead>
                    </tr>
                    <tbody id="tbody-${affixState}"></tbody>
                </table>
            </div>
        `;
        helperFunctions.standard.createDivById(`nounTable-${affixState}`, wrapper, html);
    }
    const html = `
        <tr>
            <th>Info</th>
            <td>${affix}</td>
            <td>${declension}</td>
            <td>${gender}</td>
            <td>${number}</td>
            <td>${Case}</td>
            <td>${definition}</td>
            <td>${real_stem}</td>
        </tr>
    `;
    helperFunctions.standard.betterTrInsert(`tbody-${affixState}`, html);
}
const verbTable = function verbTable(affix, gender, number, person, wrapper, affixState) {
    if (!affix || !gender || !number || !person || !wrapper) return;

    const tbody = document.getElementById(`tbody-${affixState}`) || '';

    if (tbody === '') {
        const html = `
            <div style="margin-top:15px">
                <table>
                    <thead>
                        <tr>
                            <th class="infoCollum">...</th>
                            <th>${affixState}</th>
                            <th>Gender</th>
                            <th>Number</th>
                            <th>Person</th>
                        </tr>
                    </thead>
                    <tbody id="tbody-${affixState}"></tbody>
                </table>
            </div>
        `;
        helperFunctions.standard.createDivById(`verbTable-${affixState}`, wrapper, html);
    }
    const html = `
        <tr>
            <th>Info</th>
            <td>${affix}</td>
            <td>${gender}</td>
            <td>${number}</td>
            <td>${person}</td>
        </tr>
    `;
    helperFunctions.standard.betterTrInsert(`tbody-${affixState}`, html);
}
const prepositionTable = function prepositionTable(affix, definition, notes, wrapper) {
    if (!affix || !definition || !notes) return;

    const tbody = document.getElementById(`tbody-preposition`) || '';
    if (tbody === '') {
        const html = `
            <div style="margin-top:15px">
                <table>
                    <thead>
                        <tr>
                            <th class="infoCollum">...</th>
                            <th>Preposition</th>
                            <th>Definition</th>
                            <th>Notes</th>
                        </tr>
                    </thead>
                    <tbody id="tbody-preposition"></tbody>
                </table>
            </div>
        `;
        helperFunctions.standard.createDivById('prepositionTable', wrapper, html);
    }
    const html = `
        <tr>
            <th>Info</th>
            <td>${affix}</td>
            <td>${definition}</td>
            <td>${notes}</td>
        </tr>
    `;
    helperFunctions.standard.betterTrInsert('tbody-preposition', html);
}
const particleTable = function particleTable(affix, definition, notes, wrapper) {
    if (!affix || !definition || !notes) return;

    const tbody = document.getElementById('tbody-particle') || '';
    if (tbody === '') {
        const html = `
            <div style="margin-top:15px">
                <table>
                    <thead>
                        <tr>
                            <th class="infoCollum">...</th>
                            <th>Particle</th>
                            <th>Definition</th>
                            <th>Notes</th>
                        </tr>
                    </thead>
                    <tbody id="tbody-particle"></tbody>
                </table>
            </div>
        `;
        helperFunctions.standard.createDivById('particleTable', wrapper, html);
    }
    const html = `
        <tr>
            <th>Info</th>
            <td>${affix}</td>
            <td>${definition}</td>
            <td>${notes}</td>
        </tr>
    `;
    helperFunctions.standard.betterTrInsert('tbody-particle', html);
}
const adjectiveTable = function adjectiveTable(affix, declension, gender, number, Case, wrapper, affixState) {
    if (!affix || !declension || !gender || !number || !Case) return;

    const tbody = document.getElementById(`tbody-${affixState}`) || '';
    if (tbody === '') {
        const html = `
            <div style="margin-top:15px">
                <table>
                    <tr>
                        <thead>
                            <th class="infoCollum">...</th>
                            <th>Suffix</th>
                            <th>Declension</th>
                            <th>Gender</th>
                            <th>Number</th>
                            <th>Case</th>
                        </thead>
                    </tr>
                    <tbody id="tbody-${affixState}"></tbody>
                </table>
            </div>
        `;
        helperFunctions.standard.createDivById(`adjectiveTable-${affixState}`, wrapper, html);
    }
    const html = `
        <tr>
            <th>Info</th>
            <td>${affix}</td>
            <td>${declension}</td>
            <td>${gender}</td>
            <td>${number}</td>
            <td>${Case}</td>
        </tr>
    `;
    helperFunctions.standard.betterTrInsert(`tbody-${affixState}`, html);
}
const determinerTable = function determinerTable(affix, gender, wrapper) {
    if (!affix || !gender) return;
    const tbody = document.getElementById('tbody-determiner') || '';
    if (tbody === '') {
        const html = `
            <div style="margin-top:15px">
                <table>
                    <thead>
                        <tr>
                            <th class="infoCollum">...</th>
                            <th>Suffix</th>
                            <th>Gender</th>
                        </tr>
                    </thead>
                    <tbody id="tbody-determiner"></tbody>
                </table>
            </div>
        `;
        helperFunctions.standard.createDivById('determinerTable', wrapper, html);
    }
    const html = `
        <tr>
            <th>Info</th>
            <td>${affix}</td>
            <td>${gender}</td>
        </tr>   
    `;
    helperFunctions.standard.betterTrInsert('tbody-determiner', html);
}

const resultTables = {
    nounTable,
    verbTable,
    prepositionTable,
    particleTable,
    adjectiveTable,
    determinerTable
}

const standard = {
    test,
    clearPageById,
    createPageById,
    openPageById,
    createDivById,
    sliceKeywordNegative,
    sliceKeywordPositive,
    reverseSearchIdsOnSearch,
    searchableTable,
    betterTrInsert,
    resultTables
}

const neoAffixChecker = function neoAffixChecker(word, map, isPrefix = false) {
    let tempArray = [];
    //decide if applied or unapplied suffix is used
    function appliedOrUnapplied(applied, unapplied, affixType) {
        let affixUsed = '';

        if (affixType === 'suffix') {
            if (applied && unapplied) {
                if (word.endsWith(applied)) {
                    affixUsed = applied;
                }
                else if (word.endsWith(unapplied)) {
                    affixUsed = unapplied;
                }
                else {
                    return null;
                }
            }
            else if (applied) {
                affixUsed = applied;
            }
            else if (unapplied) {
                affixUsed = unapplied;
            }
            if (!affixUsed) {
                return null;
            }
            else {
                return affixUsed;
            }
        } else if (affixType === 'prefix') {
            if (applied && unapplied) {
                if (word.startsWith(applied)) {
                    affixUsed = applied;
                }
                else if (word.startsWith(unapplied)) {
                    affixUsed = unapplied;
                }
                else {
                    return null;
                }
            }
            else if (applied) {
                affixUsed = applied;
            }
            else if (unapplied) {
                affixUsed = unapplied;
            }
            if (!affixUsed) {
                return null;
            }
            else {
                return affixUsed;
            }
        }
    }

    let arrayPrefixes;
    let arraySuffixes;
    let wordclass;
    if (isPrefix) {
        arrayPrefixes = AFFIXES.PREFIXES.match(word, map, true);
        wordclass = arrayPrefixes === null ? 'error' : arrayPrefixes[0].type; //when i search. look at l259 in other js. it does each thing. but it dies
        //console.log(arrayPrefixes);
    } else {// ⟅(^‿^)⟆ - Shelf the elf
        arraySuffixes = AFFIXES.SUFFIXES.match(word, map, true);
        wordclass = arraySuffixes === null ? 'error' : arraySuffixes[0].type;
        //console.log(arraySuffixes);
    }
    if (wordclass === 'error') return
    //console.log(wordclass);
    switch (wordclass) {
        case 'v':
            if (isPrefix) {
                for (const entries of arrayPrefixes) {
                    const paths = entries.paths;
                    const prefix = appliedOrUnapplied(entries.variants[0], entries.variants[1] || "doesn't distinguish", 'prefix');
                    const { slice1: usedPrefix, slice2: stem } = helperFunctions.standard.sliceKeywordPositive(word, prefix.length);

                    for (const path of paths) {
                        //console.log('path |', path);
                        const result = {
                            path: {
                                person: path[0],
                                number: path[1],
                                gender: path[2],
                            },
                            stem: stem,
                            prefix: prefix,
                            affixState: 'prefix',
                            wordclass: 'v',
                            short_path: helperFunctions.formatting.shorten_path('v', { number: path[1], person: path[0], gender: path[2] })
                        }
                        tempArray[stem] ? null : tempArray[stem] = [];
                        tempArray[stem].push(result);
                    }
                }
            } else {
                for (const entries of arraySuffixes) {
                    const paths = entries.paths;
                    const suffix = appliedOrUnapplied(entries.variants[0], entries.variants[1] || "doesn't distinguish", 'suffix');
                    const { slice1: stem, slice2: usedSuffix } = helperFunctions.standard.sliceKeywordNegative(word, suffix.length);

                    for (const path of paths) {
                        //console.log('path |', path);
                        const result = {
                            path: {
                                person: path[0],
                                number: path[1],
                                gender: path[2],
                            },
                            stem: stem,
                            suffix: suffix,
                            affixState: 'suffix',
                            wordclass: 'v',
                            short_path: helperFunctions.formatting.shorten_path('v', { number: path[1], person: path[0], gender: path[2] })
                        }
                        tempArray[stem] ? null : tempArray[stem] = [];
                        tempArray[stem].push(result);
                    }
                }
            }
            break;
        case 'n':
            for (const entries of arraySuffixes) {
                const paths = entries.paths;
                const suffix = appliedOrUnapplied(entries.variants[0], entries.variants[1] || "doesn't distinguish", 'suffix');
                const { slice1: stem, slice2: usedSuffix } = helperFunctions.standard.sliceKeywordNegative(word, suffix.length);

                for (const path of paths) {
                    //console.log('path |', path);
                    const result = {
                        stem: stem,
                        path: {
                            case: path[0],
                            gender: path[1],
                            number: path[2],
                            declension: path[3],
                        },
                        suffix: suffix,
                        affixState: 'suffix',
                        wordclass: 'n',
                        short_path: helperFunctions.formatting.shorten_path('n', { declension: path[3], number: path[2], gender: path[1], Case: path[0] })
                    }
                    tempArray[stem] ? null : tempArray[stem] = [];
                    tempArray[stem].push(result);
                }
            }
            break;
        case 'adj':
            for (const entries of arraySuffixes) {
                const paths = entries.paths;
                const suffix = appliedOrUnapplied(entries.variants[0], entries.variants[1] || "doesn't distinguish", 'suffix');
                const { slice1: stem, slice2: usedSuffix } = helperFunctions.standard.sliceKeywordNegative(word, suffix.length);

                for (const path of paths) {
                    //console.log('path |', path);
                    const result = {
                        stem: stem,
                        path: {
                            case: path[0],
                            gender: path[1],
                            number: path[2],
                            declension: path[3],
                        },
                        suffix: suffix,
                        affixState: 'suffix',
                        wordclass: 'adj',
                        short_path: helperFunctions.formatting.shorten_path('adj', { declension: path[3], number: path[2], gender: path[1], Case: path[0] })
                    }
                    tempArray[stem] ? null : tempArray[stem] = [];
                    tempArray[stem].push(result);
                }
            }
            break;
        case 'pp':
            for (const entries of Object.values(arrayPrefixes)) {
                const prefix = entries.word;
                const { slice1: usedPrefix, slice2: stem } = helperFunctions.standard.sliceKeywordPositive(word, prefix.length);

                const result = {
                    stem: stem,
                    prefix: prefix,
                    affixState: 'prefix',
                    wordclass: 'pp',
                    short_path: 'pp' + "." + prefix
                }
                tempArray[stem] ? null : tempArray[stem] = [];
                tempArray[stem].push(result);
            }
            break;
        case 'part':
            if (isPrefix) {
                for (const entries of Object.values(arrayPrefixes)) {
                    const prefix = entries.word;
                    const { slice1: usedPrefix, slice2: stem } = helperFunctions.standard.sliceKeywordPositive(word, prefix.length);

                    const result = {
                        stem: stem,
                        prefix: prefix,
                        affixState: 'prefix',
                        wordclass: 'part',
                        short_path: 'part' + "." + prefix
                    }
                    tempArray[stem] ? null : tempArray[stem] = [];
                    tempArray[stem].push(result);
                }
            } else {
                for (const entries of Object.values(arraySuffixes)) {
                    const suffix = entries.word;
                    const { slice1: stem, slice2: usedSuffix } = helperFunctions.standard.sliceKeywordNegative(word, suffix.length);

                    const result = {
                        stem: stem,
                        suffix: suffix,
                        affixState: 'suffix',
                        wordclass: 'part',
                        short_path: 'part' + "." + suffix
                    }
                    tempArray[stem] ? null : tempArray[stem] = [];
                    tempArray[stem].push(result);
                }
            }
            break;
        case 'det':
            for (const entries of Object.values(arraySuffixes)) {
                const suffix = entries.affix;
                const paths = entries.paths;
                console.log(entries, suffix);
                const { slice1: stem, slice2: usedSuffix } = helperFunctions.standard.sliceKeywordNegative(word, suffix.length);
                for (const path of paths) {
                    const result = {
                        stem: stem,
                        path: {
                            gender: path[0]
                        },
                        suffix: suffix,
                        affixState: 'suffix',
                        wordclass: 'det',
                        short_path: helperFunctions.formatting.shorten_path('det', { gender: path[0] }),
                    }
                    tempArray[stem] ? null : tempArray[stem] = [];
                    tempArray[stem].push(result);
                }
            }
            break;
        default: console.warn(`${wordclass} is not a valid wordclass`);
    }
    let count = 0;
    for (arr in tempArray) {
        count++;
        tempArray['arrayLength'] = count;
    }
    return tempArray;
}
const findStemWhenShortstem = function findStemWhenShortstem(short_stem) {
    const tempArray = [];
    const matches = DICTIONARY.ALL_WORDS.fetch(short_stem);
    for (const result of matches) {
        //console.log(result);
        if (result.word.length === short_stem.length + 1 && helperFunctions.formatting.isVowel_regex.test(result.word.slice(-1))) {
            tempArray.push(result.word);
        } else if (result.word === short_stem) {
            tempArray.push(result.word);
        }
    }
    return tempArray;
}

const matchtype2 = {
    findStemWhenShortstem,
    neoAffixChecker
}


const extraTableRow = function extraTableRow(word, declension, forms, defintion, notes) {
    // table row gen.
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

    // usage => for (let i = 0; i < rowAmount; i++) { extraTableRow(keyword or something custom); }
}

const matchtype3 = {
    extraTableRow,
}


const page97Base = function page97Base(word, wordclass) {
    let REGEX = /^[aeiouAEIOU]$/;
    let wordclass_article = '';
    const { slice1, slice2 } = helperFunctions.standard.sliceKeywordNegative(wordclass, (wordclass.length - 1));
    if (REGEX.test(slice1)) { wordclass_article = 'an'; } else { wordclass_article = 'a'; }
    //console.log(wordclass_article);

    let displayedWordclass = '';
    for (const key of Object.values(WORDCLASSES)) {
        if (key.SHORT === wordclass) {
            displayedWordclass = key.NAME;
            displayedWordclass = displayedWordclass.toLowerCase();
        }
    }
    let usedReferencePath = '';
    let usedReferencePageIndex = '';
    const localPageMap = {
        n: TABBAR_MAP.page3,
        v: TABBAR_MAP.page4,
        adv: TABBAR_MAP.page5,
        aux: TABBAR_MAP.page6,
        adj: TABBAR_MAP.page7,
        pp: TABBAR_MAP.page9,
    }
    for (const [index, map] of Object.entries(localPageMap)) {
        if (index === wordclass) {
            usedReferencePath = map.Path;
            usedReferencePageIndex = map.Page;
        }
    }

    const html = `
        <div class="outerdiv">
            <div id="leftdivdictionary" class="leftdivdictionary">
                <div class="keyworddiv"></div>
                <h2>
                    ${word}
                </h2>
                <p>${word} is ${wordclass_article} ${displayedWordclass}. Read more about ${displayedWordclass}s <a id='reference'>here</a>,
                or read the short outline in here.</p>
                <br><br>
                <p>The declention tables that would be relevant for ${word} can be seen bellow.</p>

                <div class="tablesContainer"></div>

                <div id="includeTarget">
                    <div id="leftleftdivdictionary"></div>
                    <div id="rightleftdivdictionary"></div>
                </div>
            </div>
            <div id="rightdivdictionary" class="rightdivdictionary">
                <!--<div class="pageSearch">
                    <input type="text" id="search_field" placeholder="Search..." />
                    <button id="search_button">Search</button>
                    <button id="tableSearchBtn">Table is seachable</button>
                    <div id="textBoxContainer"></div>
                </div>-->
            </div>
        </div>`;
    helperFunctions.standard.createPageById('page97', html);

    const reference = document.getElementById('reference');
    reference.href = '#';
    reference.onclick = function (ev) {
        ev.preventDefault();
        const tabElement = document.querySelector(`.tab-bar .tab:nth-child(${usedReferencePageIndex + 3})`);
        const elementToHighlight = tabElement || this;
        openPage(usedReferencePath, 'page' + usedReferencePageIndex, { runScripts: true, replace: false }, elementToHighlight);
        if (tabElement) tabElement.classList.add('active');
    }
}
const type1extraTableRow = function type1extraTableRow(word, declension, forms, definition, notes) {
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
const neoVerbTables = function neoVerbTables(isPrefix, word, wrapper) {

    const affixStateMap = {
        true: ['Prefix',],// ⟅(^‿^)⟆ - Shelf the elf
        false: ['Suffix', DICTIONARY.VERBS.SUFFIXES.MAP]
    } // ⟅(^‿^)⟆ - Shelf the elf


    function affixHandlerGenders(isPrefix, word, person, number, hasBorder = false) {
        let string = "";

        for (const gender of GENDERS.FLAT.NAME) {
            string += `<td${hasBorder ? " style = 'border-bottom: 1px solid var(--border)' " : ''}>${affixHandler(isPrefix, word, person, number, gender)}</td>\n`;
        }

        return string;
    }


    function affixHandler(isPrefix, word, person, number, gender) {// ⟅(^‿^)⟆ - Shelf the elf
        return isPrefix
            ? CHARACTERS.entriesToText(AFFIXES.connectSplit(DICTIONARY.VERBS.PREFIXES.MAP[person][number][gender], word, '')[0])
            : DICTIONARY.VERBS.SUFFIXES.MAP[person][number][gender];
    }

    const html = `
        <table id="Verb-Table-${isPrefix ? 'Prefix' : 'Suffix'}" style="margin-bottom: 10px;">
            <thead>
                <tr>
                    <th colSpan = 2>${affixStateMap[isPrefix][0]}</th>
                    <th>Exalted</th>
                    <th>Rational</th>
                    <th>Monstrous</th>
                    <th>Irrational</th>
                    <th>Magical</th>
                    <th>Mundane</th>
                    <th>Abstract</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th style = "width:86px" rowSpan = 3>Singular</th>
                    <th style = "width:14px">1.</th>
                    ${affixHandlerGenders(isPrefix, word, 1, IDS.NUMBERS.S)}
                </tr>
                <tr>
                    <th>2.</th>
                    ${affixHandlerGenders(isPrefix, word, 2, IDS.NUMBERS.S)} 
                </tr>
                <tr>
                    <th>3.</th>
                    ${affixHandlerGenders(isPrefix, word, 3, IDS.NUMBERS.S, true)} 
                </tr>
                <tr>
                    <th rowSpan = 3>Dual</th>
                    <th>1.</th>
                    ${affixHandlerGenders(isPrefix, word, 1, IDS.NUMBERS.D)}
                </tr>
                <tr>
                    <th>2.</th>
                    ${affixHandlerGenders(isPrefix, word, 2, IDS.NUMBERS.D)} 
                </tr>
                <tr>
                    <th>3.</th>
                    ${affixHandlerGenders(isPrefix, word, 3, IDS.NUMBERS.D, true)} 
                </tr>
                <tr>
                    <th rowSpan = 3>Plural</th>
                    <th>1.</th>
                    ${affixHandlerGenders(isPrefix, word, 1, IDS.NUMBERS.P)}
                </tr>
                <tr>
                    <th>2.</th>
                    ${affixHandlerGenders(isPrefix, word, 2, IDS.NUMBERS.P)} 
                </tr>
                <tr>
                    <th>3.</th>
                    ${affixHandlerGenders(isPrefix, word, 3, IDS.NUMBERS.P)} 
                </tr>
            </tbody>
        </table>
        `;
    helperFunctions.standard.createDivById('', wrapper, html);
}
const neoNounTables = function neoNounTables(declension, mood, wrapper, combinedGendersObject) {
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
            const entry = Object.entries(DICTIONARY.NOUNS.SUFFIXES.MAP[mooooood]);
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

    wrapper.appendChild(table);
}
const neoAdjectiveTables = function neoAdjectiveTables(declension, mood, wrapper) {
    const table = document.createElement('table');

    const moodMap = {
        1: 'Directive',
        2: 'Recessive'
    }
    table.id = `Adjective-Table-${moodMap[mood]}`;
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
    GENDERS.FLAT.NAME.forEach(gender => {
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
            const entry = Object.entries(DICTIONARY.NOUNS.SUFFIXES.MAP[mooooood]);
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
    });

    table.style = "margin-bottom: 10px";

    const tbody = document.createElement('tbody');
    table.appendChild(tbody);

    wrapper.appendChild(table);
}
const neoAdverbTables = function neoAdverbTables(wrapper, word, definition, elative, notes, wordclass) {
    const table = document.createElement('table');

    const html = `
    <div>
        <table>
            <tr>
                <th>Word</th>
                <th>Definition</th>
                <th>Elative</th>
                <th>Usage Notes</th>
                <th>Wordclass</th>
            </tr>
            <tr>
                <td>${word}</td>
                <td>${definition}</td>
                <td>${elative || '...'}</td>
                <td>${notes}</td>
                <td>${wordclass}</td>
            </tr>
        </table>
    </div>
    `;

    helperFunctions.standard.createDivById('', wrapper, html);

    const tbody = document.createElement('tbody');
    table.appendChild(tbody);

    wrapper.appendChild(table);
}
const neoDeterminerTables = function neoDeterminerTables(wrapper) {
    const map = DICTIONARY.DETERMINERS.SUFFIXES.MAP;
    const html = `
        <div style="margin-top:30px">
            <table id="Determiner-Table">
                <thead>
                    <tr>
                        <th class="infoCollum">Genders</th>
                        <th>Forms</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>Exalted</th>
                        <td>${map.Exalted}</td>
                    </tr>
                    <tr>
                        <th>Rational</th>
                        <td>${map.Rational}</td>
                    </tr>
                    <tr>
                        <th>Monstrous</th>
                        <td>${map.Monstrous}</td>
                    </tr>
                    <tr>
                        <th>Irrational</th>
                        <td style="border-bottom: black solid 1px">${map.Irrational}</td>
                    </tr>
                    <tr>
                        <th>Magical</th>
                        <td>${map.Magical}</td>
                    </tr>
                    <tr>
                        <th>Mundane</th>
                        <td>${map.Mundane}</td>
                    </tr>
                    <tr>
                        <th>Abstract</th>
                        <td>${map.Abstract}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;
    helperFunctions.standard.createDivById('', wrapper, html);
}

const matchtype1 = {
    type1extraTableRow,
    neoVerbTables,
    neoNounTables,
    neoAdjectiveTables,
    neoAdverbTables,
    neoDeterminerTables,
    page97Base
}


const populateSummaryTables = function populateSummaryTables(keyword, tables) {
    Object.keys(tables).forEach(tableId => {
        const table = document.getElementById(tableId);
        if (!table) return;
        const tds = table.querySelectorAll("td");
        tds.forEach(td => {
            // prefer original stored raw suffix (data-raw) if present 
            const textInCell = (td.dataset.raw && td.dataset.raw.trim()) ? td.dataset.raw : td.textContent.trim();

            // process raw
            let entries;
            if (tables[tableId]) entries = AFFIXES.connectSplit(textInCell, keyword, "");
            else entries = AFFIXES.connectSplit("", keyword, textInCell);
            td.innerHTML = `<strong>${CHARACTERS.entriesToText(entries[0])}</strong>${CHARACTERS.entriesToText(entries[1])}<strong>${CHARACTERS.entriesToText(entries[2])}</strong>`;
            // place keyword as prefix or suffix (you can change behavior per table)
        });
    });
}
const waitForElement = function waitForElement(selector, timeout = 5000) {
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

const tablegen = {
    populateSummaryTables,
    waitForElement
}


const keepDigitsOnly = function keepDigitsOnly(str) {
    return String(str).replace(/\D+/g, "");
}
const removeParensSpacesAndDigits = function removeParensSpacesAndDigits(str) {
    return String(str || "").replace(/[\d() \t\r\n]+/g, "");
}
const defsToSingleString = function defsToSingleString(gendersArray) {
    const gendersCombined = GENDERS.combine(gendersArray) // Key-value pairs
    let html = '';
    const arr = [];
    //console.log(gendersCombined);
    for (const [gender, def] of Object.entries(gendersCombined)) {
        //console.log(gender, def);
        for (const key of Object.values(GENDERS.MAP)) {
            if (key.NAME === gender) {
                //console.log(key.SHORT);
                arr.push({
                    gender: key.SHORT,
                    definition: def
                });
            }
        }
    }

    for (let i = 0; i < arr.length; i++) {
        const entry = arr[i];
        html += `(${entry.gender}) - ${entry.definition}.`;
        if (i < arr.length - 1) html += ' <br>';
    }
    return html;
}
const shorten_path = function shorten_path(wordclass, {
    aspect = 'Episodic',
    number = null,
    tense = 'Non-Past',
    gender = null,
    person = null,
    Case = null,
    declension = null
} = {}) {
    let result;
    const tempArray = [];
    switch (wordclass) {
        case 'v':
            //console.log(aspect, number, tense, gender, person);

            const mapArrayV = [IDS.ASPECT, IDS.NUMBERS, IDS.TENSE];
            mapArrayV.forEach(el => {
                for (const [short, long] of Object.entries(el)) {
                    if (aspect === long) {
                        tempArray.push(short);
                    }
                    if (tense === long) {
                        tempArray.push(short);
                    }
                    if (number === long) {
                        tempArray.push(short);
                    }
                }
            });

            for (entry of Object.values(GENDERS.MAP)) {
                if (entry.NAME === gender) {
                    tempArray.push(entry.SHORT);
                }
            }
            result = `${tempArray[0]}.${tempArray[3]}.${tempArray[1]}.${person}.${tempArray[2]}`;//aspect.gender.number.person.tense.
            break;
        case 'adj':
        case 'n':
            //console.log(declension, gender, Case, number);

            const mapArrayN = [IDS.MOODS, IDS.NUMBERS];
            for (el of mapArrayN) {
                for (const [short, long] of Object.entries(el)) {
                    if (number === long) {
                        tempArray.push(short);
                    }
                    if (Case === long) {
                        tempArray.push(short);
                    }
                }
            }

            for (entry of Object.values(GENDERS.MAP)) {
                if (entry.NAME === gender) {
                    tempArray.push(entry.SHORT);
                }
            }
            result = `${declension}.${tempArray[0]}.${tempArray[2]}.${tempArray[1]}`;//declension.case.gender.number
            break;
        case 'det':
            for (entry of Object.values(GENDERS.MAP)) {
                if (entry.NAME === gender) {
                    tempArray.push(entry.SHORT);
                }
            }
            result = `${tempArray[0]}`;//gender
            break;
        default: console.warn(`shorten_path: ${wordclass} is not a valid wordclass`);
            break;
    }

    const str = result.replace(/(?:\.undefined|\.null)/g, '');
    return str;
}
const isVowel_regex = /^[iīeēæyuūoōaāúûóôáâIĪEĒÆYUŪOŌAĀÚÛÓÔÁÂ]$/;
const isConsonant_regex = /^[tkqq̇'cfdszgχhlrɾmnŋTKQQ̇'CFDSZGΧHLRɾMNŊ]$/;

const formatting = {
    keepDigitsOnly,
    removeParensSpacesAndDigits,
    shorten_path,
    defsToSingleString,
    isVowel_regex,
    isConsonant_regex
}


const displayForms = function displayForms(allMatchesArray) {
    if (!allMatchesArray) return;

    const div = document.getElementById('listDiv');
    if (!div) return;

    const tempArray = {
        type1: [],
        type2: {
            one: [],
            two: [],
            three: []
        }
    };
    for (const [key, map] of Object.entries(allMatchesArray.type1)) {
        //console.log(key, map);
        if (key === 'v') {
            if (map.lur.length > 0) {
                //console.log(map.lur, map.regular);
                map.lur.forEach(el => {
                    el['wordclass'] = 'v';
                    el['verbType'] = 'lur';
                    tempArray.type1.push(el);
                });
            }
            if (map.regular.length > 0) {
                map.regular.forEach(el => {
                    el['wordclass'] = 'v';
                    el['verbType'] = 'regular';
                    tempArray.type1.push(el);
                });
            }
        } else {
            if (map.length > 0) {
                map.forEach(el => {
                    el['wordclass'] = key;
                    tempArray.type1.push(el);
                });
            }
        }
    }
    for (const [key, map] of Object.entries(allMatchesArray.type2)) {
        if (map.state) {
            if (map.affixAmount === 1) {
                for (const affix of Object.values(map.resultMap)) {
                    affix.key = key;
                    tempArray.type2.one.push(affix);
                }

            }
            if (map.affixAmount === 2) {
                const prefixes = Object.values(map.resultMap)[0];
                const suffixes = Object.values(map.resultMap)[1];

                for (const p of prefixes) {
                    p.key = key;
                    for (const s of suffixes) {
                        s.key = key;
                        tempArray.type2.two.push({
                            prefix: p,
                            suffix: s
                        });
                    }
                }

            }
            if (map.affixAmount === 3) {
                const part_pre = Object.values(map.resultMap)[0];
                const part_suf = Object.values(map.resultMap)[1];
                const suffix = Object.values(map.resultMap)[2];
                for (const p of part_pre) {
                    p.key = key;
                    for (const s of part_suf) {
                        s.key = key;
                        for (const ss of suffix) {
                            ss.key = key;
                            tempArray.type2.three.push({
                                particle_prefix: p,
                                particle_suffix: s,
                                suffix: ss
                            });
                        }
                    }
                }
            }
        }
    }
    console.log(tempArray);
    const keyword = allMatchesArray.keyword;

    const html = `
        <table>
            <thead>
                <tr>
                    <th style="cursor:pointer; user-select: none;" id="shortPathGuide">Maybe you were looking for:</th>
                </tr>
            </thead>
            <tbody id="listTbody"></tbody>
        </table>
    `;
    helperFunctions.standard.createDivById('', div, html);

    let tableTextState = 0;
    function fixTable() {
        for (const el of tempArray.type1) {
            console.log(el);
            const datastem = el.dic_stem || el.word;
            const htmlEach = `
                <td 
                    style="cursor:pointer; border-bottom: solid 1px black;"; 
                    data-verbType="${el.verbType || ''}"; 
                    data-wordclass="${el.wordclass}"; 
                    data-path="${el.short_path || '...'}"; 
                    data-key="${el.key || '...'}"; 
                    data-pausestate="false";
                    data-affix_amount="0";
                    data-stem="${datastem}";
                >${el.wordclass}.${el.short_path || '..'}</td>
            `;
            helperFunctions.standard.betterTrInsert("listTbody", htmlEach);

            const td = document.querySelector('#listTbody tr:last-child td:last-child');
            // ⟅(^‿^)⟆ - Shelf the elf
            td.style.cursor = 'pointer';

            function search() {
                let pageHtml = '';
                // ⟅(^‿^)⟆ - Shelf the elf

                switch (td.dataset.wordclass) {
                    case 'adj':

                        pageHtml = `
                            <div>
                                <div>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th class="infoCollum">Info</th>
                                                <th>Stem</th>
                                                <th>Wordclass</th>
                                                <th>Declension</th>
                                                <th>Forms</th>
                                                <th>Definition</th>
                                                <th>Notes</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th>...</th>
                                                <td>${el.word}</td>
                                                <td>${'Adjective'}</td>
                                                <td>${el.declension}</td>
                                                <td>${el.forms || '...'}</td>
                                                <td>${el.definition}</td>
                                                <td>${el.usage_notes || '...'}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div id="adjectiveTableWrapper" style="margin-top:50px;"></div>
                            </div>
                        `;
                        helperFunctions.standard.createPageById('page94', pageHtml);
                        const adjectiveTableWrapper = document.getElementById('adjectiveTableWrapper');
                        helperFunctions.matchtype1.neoAdjectiveTables(el.declension, 1, adjectiveTableWrapper);
                        helperFunctions.matchtype1.neoAdjectiveTables(el.declension, 2, adjectiveTableWrapper);

                        helperFunctions.tablegen.populateSummaryTables(keyword, { 'Adjective-Table-Directive': false, 'Adjective-Table-Recessive': false });
                        break;
                    case 'adv':
                        el.short_path = "stem";

                        pageHtml = `
                            <div>
                                <div>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th class="infoCollum">Info</th>
                                                <th>Stem</th>
                                                <th>Wordclass</th>
                                                <th>Forms</th>
                                                <th>Definition</th>
                                                <th>Notes</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th>...</th>
                                                <td>${el.word}</td>
                                                <td>${'Adverb'}</td>
                                                <td>${el.forms || '...'}</td>
                                                <td>${el.definition}</td>
                                                <td>${el.usage_notes || '...'}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        `;
                        helperFunctions.standard.createPageById('page94', pageHtml);
                        break;
                    case 'aux':
                        el.short_path = "stem";

                        pageHtml = `
                            <div>
                                <div>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th class="infoCollum">Info</th>
                                                <th>Stem</th>
                                                <th>Wordclass</th>
                                                <th>Forms</th>
                                                <th>Definition</th>
                                                <th>Notes</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th>...</th>
                                                <td>${el.word}</td>
                                                <td>${'Auxiliary'}</td>
                                                <td>${el.forms || '...'}</td>
                                                <td>${el.definition}</td>
                                                <td>${el.usage_notes || '...'}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div id="auxiliaryTableWrapper" style="margin-top:50px;"></div>
                            </div>
                        `;
                        helperFunctions.standard.createPageById('page94', pageHtml);
                        const auxiliaryTableWrapper = document.getElementById('auxiliaryTableWrapper');

                        helperFunctions.matchtype1.neoVerbTables(true, keyword, auxiliaryTableWrapper);
                        helperFunctions.tablegen.populateSummaryTables(keyword, { 'Verb-Table-Prefix': true, 'Verb-Table-Suffix': false });
                        break;
                    case 'con':
                        el.short_path = "stem";

                        pageHtml = `
                            <div>
                                <div>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th class="infoCollum">Info</th>
                                                <th>Stem</th>
                                                <th>Wordclass</th>
                                                <th>Definition</th>
                                                <th>Notes</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th>...</th>
                                                <td>${el.word}</td>
                                                <td>${'Conjunktion'}</td>
                                                <td>${el.definition}</td>
                                                <td>${el.usage_notes || '...'}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        `;
                        helperFunctions.standard.createPageById('page94', pageHtml);
                        break;
                    case 'det':
                        el.short_path = "stem";

                        pageHtml = `
                            <div>
                                <div>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th class="infoCollum">Info</th>
                                                <th>Stem</th>
                                                <th>Wordclass</th>
                                                <th>Definition</th>
                                                <th>Notes</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th>...</th>
                                                <td>${el.word}</td>
                                                <td>${'Determiner'}</td>
                                                <td>${el.definition}</td>
                                                <td>${el.usage_notes || '...'}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div id="determinerTableWrapper"></div>
                            </div>
                        `;
                        helperFunctions.standard.createPageById('page94', pageHtml);

                        const determinerTableWrapper = document.getElementById('determinerTableWrapper');
                        helperFunctions.matchtype1.neoDeterminerTables(determinerTableWrapper);
                        helperFunctions.tablegen.populateSummaryTables(keyword, { 'Determiner-Table': false });
                        break;
                    case 'n':
                        const NcombinedGendersObject = GENDERS.combine(el.genders) // Key-value pairs

                        pageHtml = `
                            <div>
                                <div>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th class="infoCollum">Info</th>
                                                <th>Stem</th>
                                                <th>Wordclass</th>
                                                <th>Declension</th>
                                                <th>Definition</th>
                                                <th>Notes</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th>...</th>
                                                <td>${el.word}</td>
                                                <td>${'Noun'}</td>
                                                <td>${el.declension}</td>
                                                <td>${helperFunctions.formatting.defsToSingleString(el.genders)}</td>
                                                <td>${el.usage_notes || '...'}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div id="nounTableWrapper" style="margin-top:50px";></div>
                            </div>
                        `;
                        helperFunctions.standard.createPageById('page94', pageHtml);
                        const nounTableWrapper = document.getElementById('nounTableWrapper');
                        helperFunctions.matchtype1.neoNounTables(el.declension, 1, nounTableWrapper, NcombinedGendersObject);
                        helperFunctions.matchtype1.neoNounTables(el.declension, 2, nounTableWrapper, NcombinedGendersObject);

                        helperFunctions.tablegen.populateSummaryTables(keyword, { 'Noun-Table-Directive': false, 'Noun-Table-Recessive': false });
                        break;
                    case 'part':
                        el.short_path = "stem";

                        pageHtml = `
                            <div>
                                <div>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th class="infoCollum">Info</th>
                                                <th>Stem</th>
                                                <th>Wordclass</th>
                                                <th>Definition</th>
                                                <th>Notes</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th>...</th>
                                                <td>${el.word}</td>
                                                <td>${'Particle'}</td>
                                                <td>${el.definition}</td>
                                                <td>${el.usage_notes || '...'}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        `;
                        helperFunctions.standard.createPageById('page94', pageHtml);
                        break;
                    case 'pp':
                        el.short_path = "stem";

                        pageHtml = `
                            <div>
                                <div>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th class="infoCollum">Info</th>
                                                <th>Stem</th>
                                                <th>Wordclass</th>
                                                <th>Definition</th>
                                                <th>Notes</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th>...</th>
                                                <td>${el.word}</td>
                                                <td>${'Preposition'}</td>
                                                <td>${el.definition}</td>
                                                <td>${el.usage_notes || '...'}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        `;
                        helperFunctions.standard.createPageById('page94', pageHtml);
                        break;
                    case 'v':
                        if (td.dataset.verbtype === 'lur') {
                            console.log('lur',el)

                            pageHtml = `
                                <div>
                                    <div>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th class="infoCollum">Info</th>
                                                    <th>Stem</th>
                                                    <th>Wordclass</th>
                                                    <th>Aspect</th>
                                                    <th>Tense</th>
                                                    <th>Definition</th>
                                                    <th>Notes</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th>...</th>
                                                    <td>${el.word}</td>
                                                    <td>${'Verb'}</td>
                                                    <td>${el.form.aspect}</td>
                                                    <td>${el.form.tense}</td>
                                                    <td>${'to be'}</td>
                                                    <td>${'verb is irregular'}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div id="verbTableWrapper" style="margin-top:50px;"></div>
                                </div>
                            `;
                            helperFunctions.standard.createPageById('page94', pageHtml);
                            const verbTableWrapper = document.getElementById('verbTableWrapper');
                        } else {
                            pageHtml = `
                                <div>
                                    <div>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th class="infoCollum">Info</th>
                                                    <th>Stem</th>
                                                    <th>Wordclass</th>
                                                    <th>Forms</th>
                                                    <th>Aspect</th>
                                                    <th>Tense</th>
                                                    <th>Definition</th>
                                                    <th>Notes</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th>...</th>
                                                    <td>${el.dic_stem}</td>
                                                    <td>${'Verb'}</td>
                                                    <td>${tostring(el.forms)}</td>
                                                    <td>${el.form.aspect}</td>
                                                    <td>${el.form.tense}</td>
                                                    <td>${el.definition}</td>
                                                    <td>${el.usage_notes || '...'}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div id="verbTableWrapper" style="margin-top:50px;"></div>
                                </div>
                            `;
                            helperFunctions.standard.createPageById('page94', pageHtml);
                            const verbTableWrapper = document.getElementById('verbTableWrapper');

                            helperFunctions.matchtype1.neoVerbTables(true, el.dic_stem, verbTableWrapper);
                            helperFunctions.matchtype1.neoVerbTables(false, el.dic_stem, verbTableWrapper);

                            helperFunctions.tablegen.populateSummaryTables(el.dic_stem, { 'Verb-Table-Prefix': true, 'Verb-Table-Suffix': false });
                        }
                        break;
                    default: console.warn(`${td.dataset.wordclass} is an invalid wordclass`);
                }
                helperFunctions.standard.openPageById('page94');
                // ⟅(^‿^)⟆ - Shelf the elf
            }
            td.addEventListener('click', () => {
                if (td.dataset.pausestate === "false") {
                    helperFunctions.standard.clearPageById('page97'); //type 1
                    helperFunctions.standard.clearPageById('page95'); //type 1.1
                    helperFunctions.standard.clearPageById('page96'); //type 2
                    helperFunctions.standard.clearPageById('page94'); //type 
                    search();

                    //moves the 'were you lf' table to result page.vv
                    let newDiv = document.getElementById('listDiv');
                    newDiv.appendChild(div);
                } else return;
            });
        }
        for (const [state, entry] of Object.entries(tempArray.type2)) {
            if (state === 'one') {
                for (const el of entry) {
                    //console.log(el);
                    const htmlEach = `
                        <td 
                            style="cursor:pointer; border-bottom: solid 1px black;"; 
                            data-wordclass="${el.wordclass}"; 
                            data-path="${el.short_path || '...'}"; 
                            data-key="${el.key || '...'}"; 
                            data-pausestate="false";
                            data-affix_amount="1";
                            data-stem="${el.stem}";
                        >${el.wordclass}.${el.short_path || '..'}</td>
                    `;
                    helperFunctions.standard.betterTrInsert("listTbody", htmlEach);

                    const td = document.querySelector('#listTbody tr:last-child td:last-child');
                    td.style.cursor = 'pointer';

                    function search() {
                        let pageHtml = '';
                        switch (td.dataset.wordclass) {
                            case 'v':
                                stemMap = DICTIONARY.ALL_WORDS.MAP[el.dic_stem] || [];
                                definition = stemMap.definition || '...';
                                notes = stemMap.usage_notes || '...';
                                console.log(el)
                                pageHtml = `
                                    <div>
                                        <div>
                                            <table>
                                                <tr>
                                                    <th class="infoCollum">...</th>
                                                    <th>Word</th>
                                                    <th>Stem</th>
                                                    <th>Wordclass</th>
                                                    <th>Forms</th>
                                                    <th>Aspect</th>
                                                    <th>Tense</th>
                                                    <th>Definition</th>
                                                    <th>Usage Notes</th>
                                                </tr>
                                                <tr>
                                                    <th>Info</th>
                                                    <td>${keyword}</td>
                                                    <td>${el.stem}</td>
                                                    <td>${'Verb'}</td>
                                                    <td>${tostring(stemMap.forms)}</td>
                                                    <td>${el.form.aspect}</td>
                                                    <td>${el.form.tense}</td>
                                                    <td>${definition}</td>
                                                    <td>${notes}</td>
                                                </tr>
                                            </table>
                                        </div>
                                        <div id="verbTableWrapper" style="margin-top:10px"></div>
                                        <div id="suffixtable" style="margin-top:50px"></div>
                                    </div>
                                `;
                                helperFunctions.standard.createPageById('page94', pageHtml);
                                const verbTableWrapper = document.getElementById('verbTableWrapper');
                                //helperFunctions.standard.resultTables.verbTable(el.prefix || el.suffix, el.path.gender, el.path.number, el.path.person, verbTableWrapper, el.affixState);


                                const suffixtable = document.getElementById('suffixtable');
                                el.affixState === 'prefix'
                                    ? (helperFunctions.standard.resultTables.verbTable(el.prefix, el.path.gender, el.path.number, el.path.person, verbTableWrapper, 'Prefix'), helperFunctions.matchtype1.neoVerbTables(false, keyword, suffixtable))
                                    : (helperFunctions.standard.resultTables.verbTable(el.suffix, el.path.gender, el.path.number, el.path.person, verbTableWrapper, 'Suffix'), helperFunctions.matchtype1.neoVerbTables(true, keyword, suffixtable));

                                helperFunctions.tablegen.populateSummaryTables(keyword, { 'Verb-Table-Prefix': true, 'Verb-Table-Suffix': false });
                                break;
                            case 'n':
                                stem = el.stem;
                                stemMap = DICTIONARY.ALL_WORDS.MAP[stem] || [];
                                notes = stemMap.usage_notes || '...';
                                pageHtml = `
                                    <div>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th class="infoCollum">...</th>
                                                    <th>Word</th>
                                                    <th>Stem</th>
                                                    <th>Declension</th>
                                                    <th>Usage_Notes</th>
                                                    <th>Wordclass</th>
                                                </tr>
                                            </thead>
                                            <tbody id="headerTbody">
                                                <tr>
                                                    <th>Info</th>
                                                    <td>${keyword}</td>
                                                    <td>${stem}</td>
                                                    <td>${stemMap.declension}</td>
                                                    <td>${notes}</td>
                                                    <td>${'Noun'}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div id="nounTable"></div>
                                `;
                                helperFunctions.standard.createPageById('page94', pageHtml);
                                const nounTable = document.getElementById('nounTable');
                                for (const result of el.stems_map) {
                                    function definition() {
                                        const entry = DICTIONARY.ALL_WORDS.MAP[result];
                                        for (const [gender, def] of Object.entries(entry.genders)) {
                                            if (gender === el.path.gender) {
                                                return def;
                                            }
                                        }
                                    }
                                    helperFunctions.standard.resultTables.nounTable(el.suffix, el.path.declension, el.path.gender, el.path.number, el.path.case, definition(), nounTable, 'suffix', result);
                                }
                                break;
                            case 'pp':
                                stem = el.stem;
                                stemMap = DICTIONARY.ALL_WORDS.MAP[stem] || [];
                                notes = stemMap.usage_notes || '...';
                                if (stemMap.type === 'n') {
                                    pageHtml = `
                                        <div>
                                            <div>
                                                <table>
                                                    <thead>
                                                        <tr>
                                                            <th class="infoCollum">...</th>
                                                            <th>Word</th>
                                                            <th>Stem</th>
                                                            <th>Declension</th>
                                                            <th>Wordclass</th>
                                                            <th>Definition</th>
                                                            <th>Usage Notes</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <th>Info</th>
                                                            <td>${keyword}</td>
                                                            <td>${stem}</td>
                                                            <td>${stemMap.declension}</td>
                                                            <td>${'Noun'}</td>
                                                            <td>${helperFunctions.formatting.defsToSingleString(stemMap.genders)}</td>
                                                            <td>${notes}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div id="prepositionTableWrapper" style="margin-bottom:25px"></div>
                                            <div id="prepositionTableSuffixes"></div>
                                        </div>
                                    `;
                                    helperFunctions.standard.createPageById('page94', pageHtml);
                                    const prepositionTableWrapper = document.getElementById('prepositionTableWrapper');

                                    const ppResultMap = DICTIONARY.ALL_WORDS.MAP[el.prefix];
                                    helperFunctions.standard.resultTables.prepositionTable(el.prefix, ppResultMap.definition, ppResultMap.usage_notes || '...', prepositionTableWrapper);

                                    const suffixesWrapper = document.getElementById('prepositionTableSuffixes');

                                    helperFunctions.matchtype1.neoNounTables(stemMap.declension, 1, suffixesWrapper, stemMap.genders);
                                    helperFunctions.matchtype1.neoNounTables(stemMap.declension, 2, suffixesWrapper, stemMap.genders);
                                    helperFunctions.tablegen.populateSummaryTables(keyword, { 'Noun-Table-Directive': false, 'Noun-Table-Recessive': false });
                                } else if (stemMap.type === 'det') {
                                    console.log(el.isRegular);

                                    stem = el.stem;
                                    stemMap = DICTIONARY.ALL_WORDS.MAP[stem] || [];
                                    definition = stemMap.definition || '...';
                                    notes = stemMap.usage_notes || '...';

                                    pageHtml = `
                                        <div>
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th class="infoCollum">...</th>
                                                        <th>Word</th>
                                                        <th>Stem</th>
                                                        <th>Definition</th>
                                                        <th>Usage Notes</th>
                                                        <th>Wordclass</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <th>Info</th>
                                                        <td>${keyword}</td>
                                                        <td>${stem}</td>
                                                        <td>${definition}</td>
                                                        <td>${notes}</td>
                                                        <td>${'Determiner'}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div id="determinersTableWrapper"></div>
                                        <div id="determinersSuffixTableWrapper"></div>
                                    `;
                                    helperFunctions.standard.createPageById('page94', pageHtml);
                                    const determinersTableWrapper = document.getElementById('determinersTableWrapper');
                                    const prepositionMap = DICTIONARY.ALL_WORDS.MAP[el.prefix];
                                    helperFunctions.standard.resultTables.prepositionTable(el.prefix, prepositionMap.definition, prepositionMap.usage_notes || '...', determinersTableWrapper);

                                    const determinersSuffixTableWrapper = document.getElementById('determinersSuffixTableWrapper');
                                    helperFunctions.matchtype1.neoDeterminerTables(determinersSuffixTableWrapper);
                                    helperFunctions.tablegen.populateSummaryTables(stem, { 'Determiner-Table': false });
                                }
                                break;
                            case 'part':

                                stem = el.stem;
                                stemMap = DICTIONARY.ALL_WORDS.MAP[stem] || [];
                                notes = stemMap.usage_notes || '...';


                                pageHtml = `
                                    <div>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th class="infoCollum">...</th>
                                                    <th>Stem</th>
                                                    <th>Declension</th>
                                                    <th>Definition</th>
                                                    <th>Usage_Notes</th>
                                                    <th>Wordclass</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th>Info</th>
                                                    <td>${stem}</td>
                                                    <td>${stemMap.declension}</td>
                                                    <td>${helperFunctions.formatting.defsToSingleString(stemMap.genders)}</td>
                                                    <td>${notes}</td>
                                                    <td>${'Noun'}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div id="particleTableWrapper"></div>
                                    <div style="margin-top:50px" id="suffixTableWrapper"></div>
                                `;
                                helperFunctions.standard.createPageById('page94', pageHtml);


                                const particleTableWrapper = document.getElementById('particleTableWrapper');
                                const particleMap = DICTIONARY.ALL_WORDS.MAP[el.suffix];
                                helperFunctions.standard.resultTables.particleTable(el.suffix, particleMap.definition, particleMap.usage_notes, particleTableWrapper);


                                const suffixTableWrapper = document.getElementById('suffixTableWrapper');
                                helperFunctions.matchtype1.neoNounTables(stemMap.declension, 1, suffixTableWrapper, stemMap.genders);
                                helperFunctions.matchtype1.neoNounTables(stemMap.declension, 2, suffixTableWrapper, stemMap.genders);
                                helperFunctions.tablegen.populateSummaryTables(keyword, { 'Noun-Table-Directive': false, 'Noun-Table-Recessive': false });
                                break;
                            case 'adj':

                                stem = el.stem;
                                stemMap = DICTIONARY.ALL_WORDS.MAP[stem] || [];
                                definition = stemMap.definition || '...';
                                notes = stemMap.usage_notes || '...';

                                pageHtml = `
                                    <div>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th class="infoCollum">...</th>
                                                    <th>Word</th>
                                                    <th>Stem</th>
                                                    <th>Definition</th>
                                                    <th>Usage Notes</th>
                                                    <th>Wordclass</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th>Info</th>
                                                    <td>${keyword}</td>
                                                    <td>${stem}</td>
                                                    <td>${definition}</td>
                                                    <td>${notes || '...'}</td>
                                                    <td>${'Adjective'}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div id="adjectiveTableWrapper"></div>
                                `;
                                helperFunctions.standard.createPageById('page94', pageHtml);
                                const adjectiveTableWrapper = document.getElementById('adjectiveTableWrapper');
                                helperFunctions.standard.resultTables.adjectiveTable(el.suffix, el.path.declension, el.path.gender, el.path.number, el.path.case, adjectiveTableWrapper, 'suffix');
                                break;
                            case 'aux':

                                stem = el.stem;
                                stemMap = DICTIONARY.ALL_WORDS.MAP[stem] || [];
                                definition = stemMap.definition || '...';
                                notes = stemMap.usage_notes || '...';

                                pageHtml = `
                                    <div>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th class="infoCollum">...</th>
                                                    <th>Word</th>
                                                    <th>Stem</th>
                                                    <th>Definition</th>
                                                    <th>Usage Notes</th>
                                                    <th>Wordclass</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th>Info</th>
                                                    <td>${keyword}</td>
                                                    <td>${stem}</td>
                                                    <td>${definition}</td>
                                                    <td>${notes}</td>
                                                    <td>${'Auxiliary'}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div id="auxilaryPrefixTableWrapper"></div>
                                `;
                                helperFunctions.standard.createPageById('page94', pageHtml);

                                const auxilaryPrefixTableWrapper = document.getElementById('auxilaryPrefixTableWrapper');
                                helperFunctions.standard.resultTables.verbTable(el.prefix, el.path.gender, el.path.number, el.path.person, auxilaryPrefixTableWrapper, 'Prefix');

                                break;
                            case 'det':
                                if (el.isRegular === false) {
                                    stem = el.word;
                                    definition = el.type;
                                    notes = 'Is irregular';
                                    pageHtml = `
                                        <div>
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th class="infoCollum">...</th>
                                                        <th>Word</th>
                                                        <th>Stem</th>
                                                        <th>Gender</th>
                                                        <th>Number</th>
                                                        <th>Definition</th>
                                                        <th>Usage Notes</th>
                                                        <th>Wordclass</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <th>Info</th>
                                                        <td>${keyword}</td>
                                                        <td>${stem}</td>
                                                        <td>${el.path.gender}</td>
                                                        <td>${el.path.number}</td>
                                                        <td>${definition}</td>
                                                        <td>${notes}</td>
                                                        <td>${'Determiner'}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div id="determinersTableWrapper"></div>
                                        <div id="determinersSuffixTableWrapper"></div>
                                    `;
                                    helperFunctions.standard.createPageById('page94', pageHtml);

                                    const determinersTableWrapper = document.getElementById('determinersTableWrapper');
                                    const prepositionMap = DICTIONARY.ALL_WORDS.MAP[el.pp.prefix];
                                    helperFunctions.standard.resultTables.prepositionTable(el.pp.prefix, prepositionMap.definition, prepositionMap.usage_notes || '...', determinersTableWrapper);

                                    const determinersSuffixTableWrapper = document.getElementById('determinersSuffixTableWrapper');
                                    helperFunctions.matchtype1.neoDeterminerTables(determinersSuffixTableWrapper);
                                    helperFunctions.tablegen.populateSummaryTables(stem, { 'Determiner-Table': false });
                                } else {

                                    stem = el.stem;
                                    stemMap = DICTIONARY.ALL_WORDS.MAP[stem] || [];
                                    definition = stemMap.definition || '...';
                                    notes = stemMap.usage_notes || '...';

                                    pageHtml = `
                                        <div>
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th class="infoCollum">...</th>
                                                        <th>Word</th>
                                                        <th>Stem</th>
                                                        <th>Definition</th>
                                                        <th>Usage Notes</th>
                                                        <th>Wordclass</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <th>Info</th>
                                                        <td>${keyword}</td>
                                                        <td>${stem}</td>
                                                        <td>${definition}</td>
                                                        <td>${notes}</td>
                                                        <td>${'Determiner'}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div id="determinersTableWrapper"></div>
                                    `;
                                    helperFunctions.standard.createPageById('page94', pageHtml);

                                    const determinersTableWrapper = document.getElementById('determinersTableWrapper');
                                    helperFunctions.standard.resultTables.determinerTable(el.suffix, el.path.gender, determinersTableWrapper);
                                }
                                break;
                            default: console.warn(`${td.dataset.wordclass} is an invalid wordclass`);
                                break;
                        }
                        helperFunctions.standard.openPageById('page94');
                    }

                    td.addEventListener('click', () => {
                        if (td.dataset.pausestate === "false") {
                            helperFunctions.standard.clearPageById('page97'); //type 1
                            helperFunctions.standard.clearPageById('page95'); //type 1.1
                            helperFunctions.standard.clearPageById('page96'); //type 2
                            helperFunctions.standard.clearPageById('page94'); //type 
                            search();

                            //moves the 'were you lf' table to result page.vv
                            let newDiv = document.getElementById('listDiv');
                            //console.log(div, newDiv);
                            newDiv.appendChild(div);
                        } else return;
                    });
                }
            }//if or elseif?vv
            if (state === 'two') {
                for (const el of entry) {
                    //console.log(el);
                    const prefix = el.prefix;
                    const suffix = el.suffix;

                    const htmlEach = `
                        <td 
                            style="cursor:pointer; border-bottom: solid 1px black;"; 
                            data-prefix_wordclass="${prefix.wordclass}";
                            data-prefix_path="${prefix.short_path || '...'}";
                            data-prefix_key="${prefix.key}";
                            data-suffix_wordclass="${suffix.wordclass}";
                            data-suffix_path="${suffix.short_path || '...'}";
                            data-suffix_key="${suffix.key || '...'}";
                            data-pausestate="false";
                            data-affix_amount="2";
                            data-stem="${suffix.stem}";
                        >${prefix.wordclass}.${prefix.short_path || '..'}<br>${suffix.wordclass}.${suffix.short_path}</td>
                    `;
                    helperFunctions.standard.betterTrInsert("listTbody", htmlEach);
                    console.log(el);
                    const td = document.querySelector('#listTbody tr:last-child td:last-child');
                    td.style.cursor = 'pointer';

                    function search() {
                        let pageHtml = '';
                        const keyword = allMatchesArray.keyword;
                        switch (td.dataset.suffix_wordclass) {
                            case 'v':
                                stem = suffix.stem;
                                console.log(suffix)
                                stemMap = DICTIONARY.ALL_WORDS.MAP[suffix.dic_stem] || [];
                                definition = stemMap.definition || '...';
                                notes = stemMap.usage_notes || '...';


                                pageHtml = `
                                    <div>
                                        <div>
                                            <table>
                                                <tr>
                                                    <th class="infoCollum">...</th>
                                                    <th>Word</th>
                                                    <th>Stem</th>
                                                    <th>Wordclass</th>
                                                    <th>Forms</th>
                                                    <th>Aspect</th>
                                                    <th>Tense</th>
                                                    <th>Definition</th>
                                                    <th>Usage Notes</th>
                                                </tr>
                                                <tr>
                                                    <th>Info</th>
                                                    <td>${keyword}</td>
                                                    <td>${suffix.stem}</td>
                                                    <td>${'Verb'}</td>
                                                    <td>${tostring(stemMap.forms)}</td>
                                                    <td>${suffix.form.aspect}</td>
                                                    <td>${suffix.form.tense}</td>
                                                    <td>${definition}</td>
                                                    <td>${notes}</td>
                                                </tr>
                                            </table>
                                        </div>
                                        <div id="verbTableWrapper-pref" style="margin-top:10px"></div>
                                        <div id="verbTableWrapper-suff" style="margin-top:10px"></div>
                                    </div>
                                `;
                                helperFunctions.standard.createPageById('page94', pageHtml);

                                verbTableWrapper_pref = document.getElementById('verbTableWrapper-pref');
                                helperFunctions.standard.resultTables.verbTable(prefix.prefix, prefix.path.gender, prefix.path.number, prefix.path.person, verbTableWrapper_pref, 'Prefix');

                                verbTableWrapper_suff = document.getElementById('verbTableWrapper-suff');
                                helperFunctions.standard.resultTables.verbTable(suffix.suffix, suffix.path.gender, suffix.path.number, suffix.path.person, verbTableWrapper_suff, 'Suffix');
                                break;
                            case 'n':
                                if (td.dataset.prefix_wordclass === 'pp') {
                                    stem = suffix.stems_map[0] || suffix.stem;
                                    stemMap = DICTIONARY.ALL_WORDS.MAP[stem] || [];
                                    notes = stemMap.usage_notes || '...';

                                    preposition = prefix.prefix;
                                    preposition_map = DICTIONARY.ALL_WORDS.MAP[preposition] || [];
                                    preposition_definition = preposition_map.definition || '...';
                                    preposition_notes = preposition_map.usage_notes || '...';

                                    pageHtml = `
                                        <div>
                                            <div>
                                                <table>
                                                    <tr>
                                                        <th class="infoCollum">...</th>
                                                        <th>Word</th>
                                                        <th>Stem</th>
                                                        <th>Wordclass</th>
                                                        <th>Usage Notes</th>
                                                    </tr>
                                                    <tr>
                                                        <th>Info</th>
                                                        <td>${keyword}</td>
                                                        <td>${stem}</td>
                                                        <td>${'Noun'}</td>
                                                        <td>${notes}</td>
                                                    </tr>
                                                </table>
                                            </div>
                                            <div id="prepositionTableWrapper" style="margin-top:10px"></div>
                                            <div id="nounTableWrapper" style="margin-top:10px"></div>
                                        </div>
                                    `;
                                    helperFunctions.standard.createPageById('page94', pageHtml);

                                    nounTableWrapper = document.getElementById('nounTableWrapper');
                                    path = suffix.path;
                                    for (const result of el.suffix.stems_map) {
                                        function definition() {
                                            const entry = DICTIONARY.ALL_WORDS.MAP[result];
                                            for (const [gender, def] of Object.entries(entry.genders)) {
                                                if (gender === path.gender) {
                                                    return def;
                                                }
                                            }
                                        }
                                        helperFunctions.standard.resultTables.nounTable(suffix.suffix, path.declension, path.gender, path.number, path.case, definition(), nounTableWrapper, 'suffix', result);
                                    }
                                    prepositionTableWrapper = document.getElementById('prepositionTableWrapper');
                                    helperFunctions.standard.resultTables.prepositionTable(preposition, preposition_definition, preposition_notes, prepositionTableWrapper);
                                } else if (td.dataset.prefix_wordclass === 'part') {
                                    stem = suffix.stem;
                                    stemMap = DICTIONARY.ALL_WORDS.MAP[stem] || [];
                                    notes = stemMap.usage_notes || '...';

                                    particle = prefix.suffix;
                                    particle_map = DICTIONARY.ALL_WORDS.MAP[particle] || [];
                                    particle_definition = particle_map.definition || '...';
                                    particle_notes = particle_map.usage_notes || '...';


                                    pageHtml = `
                                        <div>
                                            <div>
                                                <table>
                                                    <tr>
                                                        <th class="infoCollum">...</th>
                                                        <th>Word</th>
                                                        <th>Stem</th>
                                                        <th>Wordclass</th>
                                                        <th>Usage Notes</th>
                                                    </tr>
                                                    <tr>
                                                        <th>Info</th>
                                                        <td>${keyword}</td>
                                                        <td>${stem}</td>
                                                        <td>${'Noun'}</td>
                                                        <td>${notes}</td>
                                                    </tr>
                                                </table>
                                            </div>
                                            <div id="particleTableWrapper" style="margin-top:10px"></div>
                                            <div id="nounTableWrapper" style="margin-top:10px"></div>
                                        </div>
                                    `;
                                    helperFunctions.standard.createPageById('page94', pageHtml);

                                    nounTableWrapper = document.getElementById('nounTableWrapper');
                                    path = suffix.path;
                                    for (const result of el.suffix.stems_map) {
                                        function definition() {
                                            const entry = DICTIONARY.ALL_WORDS.MAP[result];
                                            for (const [gender, def] of Object.entries(entry.genders)) {
                                                if (gender === path.gender) {
                                                    return def;
                                                }
                                            }
                                        }
                                        helperFunctions.standard.resultTables.nounTable(suffix.suffix, path.declension, path.gender, path.number, path.case, definition(), nounTableWrapper, 'suffix', result);
                                    }
                                    particleTableWrapper = document.getElementById('particleTableWrapper');
                                    helperFunctions.standard.resultTables.particleTable(particle, particle_definition, particle_notes, particleTableWrapper);
                                }
                                break;
                            case 'adj':
                                stem = suffix.stem;
                                stemMap = DICTIONARY.ALL_WORDS.MAP[stem] || [];
                                definition = stemMap.definition || '...';
                                notes = stemMap.usage_notes || '...';

                                particle = prefix.suffix || prefix.prefix;
                                particle_map = DICTIONARY.ALL_WORDS.MAP[particle] || [];
                                particle_definition = particle_map.definition || '...';
                                particle_notes = particle_map.usage_notes || '...';
                                pageHtml = `
                                    <div>
                                        <div>
                                            <table>
                                                <tr>
                                                    <th class="infoCollum">...</th>
                                                    <th>Word</th>
                                                    <th>Stem</th>
                                                    <th>Wordclass</th>
                                                    <th>Usage Notes</th>
                                                </tr>
                                                <tr>
                                                    <th>Info</th>
                                                    <td>${keyword}</td>
                                                    <td>${stem}</td>
                                                    <td>${'Noun'}</td>
                                                    <td>${notes}</td>
                                                </tr>
                                            </table>
                                        </div>
                                        <div id="particleTableWrapper" style="margin-top:10px"></div>
                                        <div id="adjectiveTableWrapper" style="margin-top:10px"></div>
                                    </div>
                                `;
                                helperFunctions.standard.createPageById('page94', pageHtml);

                                adjectiveTableWrapper = document.getElementById('adjectiveTableWrapper');
                                path = suffix.path;
                                helperFunctions.standard.resultTables.adjectiveTable(suffix.suffix, path.declension, path.declension, path.number, path.case, adjectiveTableWrapper, 'suffix');

                                particleTableWrapper = document.getElementById('particleTableWrapper');
                                helperFunctions.standard.resultTables.particleTable(particle, particle_definition, particle_notes, particleTableWrapper);
                                break;
                            case 'part':
                                stem_prefix = prefix.stem;
                                stemMap_prefix = DICTIONARY.ALL_WORDS.MAP[stem_prefix] || [];
                                definition_prefix = stemMap_prefix.definition || '...';
                                notes_prefix = stemMap_prefix.usage_notes || '...';

                                stem_suffix = suffix.stem;
                                stemMap_suffix = DICTIONARY.ALL_WORDS.MAP[stem_suffix] || [];
                                definition_suffix = stemMap_suffix.definition || '...';
                                notes_suffix = stemMap_suffix.usage_notes || '...';

                                pageHtml = `
                                    <div>
                                        <div>
                                            <table>
                                                <tr>
                                                    <th class="infoCollum">...</th>
                                                    <th>Word</th>
                                                    <th>Stem</th>
                                                    <th>Definition</th>
                                                    <th>Wordclass</th>
                                                    <th>Usage Notes</th>
                                                </tr>
                                                <tr>
                                                    <th>Info</th>
                                                    <td>${keyword}</td>
                                                    <td>${stem_prefix}</td>
                                                    <td>${helperFunctions.formatting.defsToSingleString(stemMap_prefix.genders)}</td>
                                                    <td>${'Noun'}</td>
                                                    <td>${notes_prefix}</td>
                                                </tr>
                                            </table>
                                        </div>
                                        <div id="particleTableWrapper" style="margin-top:10px"></div>
                                        <div id="nounTableWrapper" style="margin-top:50px"></div>
                                    </div>
                                `;
                                helperFunctions.standard.createPageById('page94', pageHtml);

                                particleTableWrapper = document.getElementById('particleTableWrapper');
                                particle_prefix = prefix.prefix;
                                particleMap_prefix = DICTIONARY.ALL_WORDS.MAP[particle_prefix];
                                helperFunctions.standard.resultTables.particleTable(particle_prefix, particleMap_prefix.definition || '...', particleMap_prefix.usage_notes || '...', particleTableWrapper);

                                particle_suffix = suffix.suffix;
                                particleMap_suffix = DICTIONARY.ALL_WORDS.MAP[particle_suffix];
                                helperFunctions.standard.resultTables.particleTable(particle_suffix, particleMap_suffix.definition || '...', particleMap_suffix.usage_notes || '...', particleTableWrapper);

                                nounTableWrapper = document.getElementById('nounTableWrapper');

                                helperFunctions.matchtype1.neoNounTables(stemMap_prefix.declension, 1, nounTableWrapper, stemMap_prefix.genders);
                                helperFunctions.matchtype1.neoNounTables(stemMap_prefix.declension, 2, nounTableWrapper, stemMap_prefix.genders);
                                helperFunctions.tablegen.populateSummaryTables(keyword, { 'Noun-Table-Directive': false, 'Noun-Table-Recessive': false });
                                break;
                            case 'det':
                                stem = suffix.stem;
                                stemMap = DICTIONARY.ALL_WORDS.MAP[stem] || [];
                                definition = stemMap.definition || '...';
                                notes = stemMap.usage_notes || '...';

                                pageHtml = `
                                    <div>
                                        <div>
                                            <table>
                                                <tr>
                                                    <th class="infoCollum">...</th>
                                                    <th>Word</th>
                                                    <th>Stem</th>
                                                    <th>Definition</th>
                                                    <th>Wordclass</th>
                                                    <th>Usage Notes</th>
                                                </tr>
                                                <tr>
                                                    <th>Info</th>
                                                    <td>${keyword}</td>
                                                    <td>${stem}</td>
                                                    <td>${definition}</td>
                                                    <td>${'Determiner'}</td>
                                                    <td>${notes}</td>
                                                </tr>
                                            </table>
                                        </div>
                                        <div id="prepositionTableWrapper" style="margin-top:10px"></div>
                                        <div id="determinerTableWrapper" style="margin-top:10px"></div>
                                    </div>
                                `;
                                helperFunctions.standard.createPageById('page94', pageHtml);

                                prepositionTableWrapper = document.getElementById('prepositionTableWrapper');
                                preposition = prefix.prefix;
                                prepositionMap = DICTIONARY.ALL_WORDS.MAP[preposition];
                                helperFunctions.standard.resultTables.prepositionTable(preposition, prepositionMap.definition || '...', prepositionMap.usage_notes || '...', prepositionTableWrapper);

                                determinerTableWrapper = document.getElementById('determinerTableWrapper');
                                det_suffix = suffix.suffix;
                                helperFunctions.standard.resultTables.determinerTable(det_suffix, suffix.path.gender, determinerTableWrapper);
                                break;
                            default: console.warn(`${td.dataset.suffix_wordclass} is an invalid wordclass`);
                        }
                        helperFunctions.standard.openPageById('page94');
                    }

                    td.addEventListener('click', () => {
                        if (td.dataset.pausestate === "false") {
                            helperFunctions.standard.clearPageById('page97'); //type 1
                            helperFunctions.standard.clearPageById('page95'); //type 1.1
                            helperFunctions.standard.clearPageById('page96'); //type 2
                            helperFunctions.standard.clearPageById('page94'); //type 
                            search();

                            //moves the 'were you lf' table to result page.vv
                            let newDiv = document.getElementById('listDiv');
                            newDiv.appendChild(div);
                        } else return;
                    });
                }
            }
            if (state === 'three') {
                for (const el of entry) {
                    //console.log(el);
                    const particle_prefix = el.particle_prefix;
                    const particle_suffix = el.particle_suffix;
                    const suffix = el.suffix;

                    const htmlEach = `
                        <td 
                            style="cursor:pointer; border-bottom: solid 1px black;"; 
                            data-particle_suffix_wordclass="${particle_suffix.wordclass}"; 
                            data-particle_suffix_path="${particle_suffix.short_path || '...'}"; 
                            data-particle_suffix_key="${particle_suffix.key || '...'}"; 
                            data-particle_prefix_wordclass="${particle_prefix.wordclass}"; 
                            data-particle_prefix_path="${particle_prefix.short_path || '...'}"; 
                            data-particle_prefix_key="${particle_prefix.key || '...'}"; 
                            data-suffix_wordclass="${suffix.wordclass}"; 
                            data-suffix_path="${suffix.short_path || '...'}"; 
                            data-suffix_key="${suffix.key || '...'}"; 
                            data-pausestate="false";
                            data-affix_amount="3";
                            data-stem="${suffix.stem}";
                        >${particle_prefix.wordclass}.${particle_prefix.short_path || '..'}<br>
                        ${particle_suffix.wordclass}.${particle_suffix.short_path}<br>
                        ${suffix.wordclass}.${suffix.short_path}</td>
                    `;
                    helperFunctions.standard.betterTrInsert("listTbody", htmlEach);

                    const td = document.querySelector('#listTbody tr:last-child td:last-child');
                    td.style.cursor = 'pointer';


                    function search() {
                        let pageHtml = '';
                        const keyword = allMatchesArray.keyword;
                        switch (td.dataset.suffix_wordclass) {
                            case 'n':
                                stem = suffix.stems_map[0];
                                stemMap = DICTIONARY.ALL_WORDS.MAP[stem];
                                //console.log(stemMap);


                                pageHtml = `
                                    <div>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th class="infoCollum">...</th>
                                                    <th>Word</th>
                                                    <th>Stem</th>
                                                    <th>Usage Notes</th>
                                                    <th>Wordclass</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th>Info</th>
                                                    <td>${keyword}</td>
                                                    <td>${stem}</td>
                                                    <td>${'...'}</td>
                                                    <td id="wordclassTd">${'Noun'}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div id="particleWrapper" style="margin-top:10px;"></div>
                                    <div id="suffixWrapper" style="margin-top:10px;"></div>
                                `;
                                helperFunctions.standard.createPageById('page94', pageHtml);

                                particleWrapper = document.getElementById('particleWrapper');
                                part_pref = particle_prefix.prefix;
                                part_pref_map = DICTIONARY.ALL_WORDS.MAP[part_pref];

                                part_suff = particle_suffix.suffix;
                                part_suff_map = DICTIONARY.ALL_WORDS.MAP[part_suff];

                                helperFunctions.standard.resultTables.prepositionTable(part_pref, part_pref_map.definition, part_pref_map.usage_notes || '...', particleWrapper);
                                helperFunctions.standard.resultTables.prepositionTable(part_suff, part_suff_map.definition, part_suff_map.usage_notes || '...', particleWrapper);


                                suffixWrapper = document.getElementById('suffixWrapper');
                                path = suffix.path;
                                for (const result of el.suffix.stems_map) {
                                    function definition() {
                                        const entry = DICTIONARY.ALL_WORDS.MAP[result];
                                        for (const [gender, def] of Object.entries(entry.genders)) {
                                            if (gender === path.gender) {
                                                return def;
                                            }
                                        }
                                    }
                                    helperFunctions.standard.resultTables.nounTable(suffix.suffix, path.declension, path.gender, path.number, path.case, definition(), suffixWrapper, 'suffix', result);
                                }
                                break;
                            default: console.warn(`${td.dataset.suffix_wordclass} is an invalid wordclass`);
                        }
                        helperFunctions.standard.openPageById('page94');
                    }

                    td.addEventListener('click', () => {
                        if (td.dataset.pausestate === "false") {
                            helperFunctions.standard.clearPageById('page97'); //type 1
                            helperFunctions.standard.clearPageById('page95'); //type 1.1
                            helperFunctions.standard.clearPageById('page96'); //type 2
                            helperFunctions.standard.clearPageById('page94'); //type 
                            search();

                            //moves the 'were you lf' table to result page.vv
                            let newDiv = document.getElementById('listDiv');
                            newDiv.appendChild(div);
                        } else return;
                    });
                }
            }
        }
    }
    fixTable();

    const tbody = document.getElementById('listTbody');
    function displayGuide() {
        tbody.querySelectorAll('td').forEach(td => {
            td.style.cursor = 'text';
            // ⟅(^‿^)⟆ - Shelf the elf
            switch (td.dataset.affix_amount) {
                case '0':
                    switch (td.dataset.wordclass) {
                        case 'v':
                            td.textContent = "wordclass.aspect.tense";
                            console.log('v')
                            break;
                        case 'adj':
                        case 'n':
                            td.textContent = "wordclass.declension";
                            console.log('n')
                            break;
                        default:
                            td.textContent = "wordclass.stem";
                    }
                    break;
                case '1':
                    switch (td.dataset.key) {
                        case 'verbPrefix':
                        case 'verbSuffix':
                        case 'auxPrefix':
                            td.innerHTML = `wordclass.case.gender.number.person.tense`;
                            break;
                        case 'nounSuffix':
                        case 'adjSuffix':
                            td.innerHTML = `wordclass.declension.case.gender.number`;
                            break;
                        case 'ppPrefix':
                        case 'pPrefix':
                        case 'pSuffix':
                            td.innerHTML = `wordclass.word`;
                            break;
                        case 'detSuffix':
                            td.innerHTML = `wordclass.gender`;
                            break;
                        default: console.warn(`${td.dataset.key} is an invalid key`);
                    }
                    break;
                case '2':
                    switch (td.dataset.prefix_key) {
                        case 'verbBothAffixes':
                            td.innerHTML = `wordclass.case.gender.number.person.tense <br> wordclass.case.gender.number.person.tense`;
                            break;
                        case 'nounSuffixANDppPrefix':
                        case 'nounSuffixANDpPrefix':
                        case 'nounSuffixANDpSuffix':
                        case 'adjSuffixANDpSuffix':
                        case 'adjSuffixANDpPrefix':
                            td.innerHTML = `wordclass.word <br> wordclass.declension.case.gender.number`;
                            break;
                        case 'pSuffixANDpPrefix':
                            td.innerHTML = `wordclass.word <br> wordclass.word`;
                            break;
                        case 'detppPrefixANDSuffix':
                            td.innerHTML = `wordclass.word <br> wordclass.gender`;
                            break;
                        default: console.warn(`${td.dataset.prefix_key} is an invalid key`);
                    }
                    break;
                case '3':
                    switch (td.dataset.suffix_key) {
                        case 'pSuffixANDpPrefixANDnounSuffix':
                            td.innerHTML = `wordclass.word <br> wordclass.word <br> wordclass.declension.case.gender.number`;
                            break;
                        default: console.warn(`${td.dataset.suffix_key} is an invalid key`);
                    }
                    break;
                default: console.warn(`${td.dataset.affix_amount} is in invalid amount of affixes`);
            }
        });
    }
    function displayStem() {
        tbody.querySelectorAll('td').forEach(td => {
            td.style.cursor = 'text';
            td.textContent = td.dataset.stem;
            // ⟅(^‿^)⟆ - Shelf the elf
        });
    }

    const guideTh = document.getElementById('shortPathGuide');
    guideTh.addEventListener('click', () => {
        //console.log(tableTextState);
        if (tableTextState === 0) {
            displayGuide();
            tableTextState = 1;
        } else if (tableTextState === 1) {
            displayStem();
            tableTextState = 2;
        } else if (tableTextState === 2) {
            tbody.innerHTML = ``;
            fixTable();
            tableTextState = 0;
        }
    });
}

const final = {
    displayForms
}



const helperFunctions =
{
    standard,
    matchtype3,
    matchtype2,
    matchtype1,
    tablegen,
    formatting,
    final
}

function fix(word) {
    const entry = DICTIONARY.ALL_WORDS.MAP[word];
    const forms_raw = entry.forms;
    if (forms_raw === 'defective' || forms_raw === undefined || Array.isArray(forms_raw) || typeof (forms_raw) === 'object') return;
    function temp() {

        const temp_array = forms_raw
            .split(/\s*,\s*/)
            .map(s => s.trim())
            .filter(s => s.length);

        return temp_array;
    }
    const arr = temp();
    const result = {
        [`${IDS.ASPECT['E']}_${IDS.TENSE['NP']}`]: entry.word,
        [`${IDS.ASPECT['E']}_${IDS.TENSE['P']}`]: arr[0],
        [`${IDS.ASPECT['G']}_${IDS.TENSE['NP']}`]: arr[1],
        [`${IDS.ASPECT['G']}_${IDS.TENSE['P']}`]: arr[2]
    }
    entry.forms = result;
}
function find(wrd) {
    const entry = DICTIONARY.ALL_WORDS.MAP;
    for (const a of Object.values(entry)) {
        switch (a.type) {
            case 'v':
                for (const [form, word] of Object.entries(a.forms)) {
                    if (word === wrd) {
                        return [form, word, a.word];
                    }
                }
        }
    }
}
function tostring(forms_arr) {
    const str = `${forms_arr[`${IDS.ASPECT['E']}_${IDS.TENSE['NP']}`]}, ${forms_arr[`${IDS.ASPECT['E']}_${IDS.TENSE['P']}`]}, ${forms_arr[`${IDS.ASPECT['G']}_${IDS.TENSE['NP']}`]}, ${forms_arr[`${IDS.ASPECT['G']}_${IDS.TENSE['P']}`]}`;
    return str;
}
function morph(form) {
    switch (form) {
        case `${[`${IDS.ASPECT['E']}_${IDS.TENSE['NP']}`]}`: return { aspect: IDS.ASPECT['E'], tense: IDS.TENSE['NP'] };
        case `${[`${IDS.ASPECT['E']}_${IDS.TENSE['P']}`]}`: return { aspect: IDS.ASPECT['E'], tense: IDS.TENSE['P'] };
        case `${[`${IDS.ASPECT['G']}_${IDS.TENSE['NP']}`]}`: return { aspect: IDS.ASPECT['G'], tense: IDS.TENSE['NP'] };
        case `${[`${IDS.ASPECT['G']}_${IDS.TENSE['P']}`]}`: return { aspect: IDS.ASPECT['G'], tense: IDS.TENSE['P'] };
    }
}