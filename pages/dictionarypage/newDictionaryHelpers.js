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

    const tbody = document.getElementById('tbody') || '';
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
                    <tbody id="tbody"></tbody>
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
    helperFunctions.standard.betterTrInsert('tbody', html);
}

const particleTable = function particleTable(affix, definition, notes, wrapper) {
    if (!affix || !definition || !notes) return;

    const tbody = document.getElementById('tbody') || '';
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
                    <tbody id="tbody"></tbody>
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
    helperFunctions.standard.betterTrInsert('tbody', html);
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

const resultTables = {
    nounTable,
    verbTable,
    prepositionTable,
    particleTable,
    adjectiveTable
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

                    if (DICTIONARY.ALL_WORDS.MAP[stem] && suffix === usedSuffix) {
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
                    short_path: ''//no path for pps
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
    } // show me


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

const matchtype1 = {
    type1extraTableRow,
    neoVerbTables,
    neoNounTables,
    neoAdjectiveTables,
    neoAdverbTables,
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
            //console.log(td.dataset.raw); // wtf is dataset.raw?
            // console.log(td.innerHTML);

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
    }

    return result;
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
        type2: []
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
            //console.log('hello world', map.state, map.affixAmount);
            //console.log(key, map);
            if (map.affixAmount === 1) {

            } else if (map.affixAmount === 2) {
                for (const [prefix, suffix] of Object.entries(map.resultMap)) {
                    //console.log(prefix, suffix);
                    for (const result of Object.values(prefix)) {
                        if (typeof (result) === 'object') {
                            //console.log(result);
                            tempArray.type2.push(result);
                        }
                    }
                    for (const result of Object.values(suffix)) {
                        if (typeof (result) === 'object') {
                            //console.log(result);
                            tempArray.type2.push(result);
                        }
                    }
                }
            }
        }/*
        return;
        if (map.state) {
            for (el of map.resultMap) {
                el['key'] = key;
                tempArray.type2.push(el);
            }
        }*/
    }
    console.log(tempArray);

    const html = `
        <table>
            <thead>
                <tr>
                    <th style="cursor:pointer"; id="shortPathGuide">Maybe you were looking for:</th>
                </tr>
            </thead>
            <tbody id="listTbody"></tbody>
        </table>
    `;
    helperFunctions.standard.createDivById('', div, html);

    let tableTextState = 0;
    function fixTable() {
        tableTextState = 1;

        tempArray.type1.forEach(el => {
            const htmlEach = `
                <td 
                    style="cursor:pointer"; 
                    data-verbType="${el.verbType || ''}"; 
                    data-wordclass="${el.wordclass}"; 
                    data-path="${el.short_path || '...'}"; 
                    data-pausestate="false";
                >${el.wordclass}.${el.short_path || '..'}</td>
            `;
            helperFunctions.standard.betterTrInsert("listTbody", htmlEach);

            const td = document.querySelector('#listTbody tr:last-child td:last-child');
            // ⟅(^‿^)⟆ - Shelf the elf

            function search() {
                let pageHtml = '';
                // ⟅(^‿^)⟆ - Shelf the elf

                switch (td.dataset.wordclass) {
                    case 'v':
                        if (el.verbType === 'lur') {
                            console.log('is lur type');
                            pageHtml = `
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Word</th>
                                            <th>Aspect</th>
                                            <th>Gender</th>
                                            <th>Number</th>
                                            <th>Person</th>
                                            <th>Tense</th>
                                            <th>Wordclass</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>${el.word}</td>
                                            <td>${el.path.aspect}</td>
                                            <td>${el.path.gender}</td>
                                            <td>${el.path.number}</td>
                                            <td>${el.path.person}</td>
                                            <td>${el.path.tense}</td>
                                            <td>${el.wordclass /* need to get the whole word. */}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            `;
                        } else if (el.verbType === 'regular') {
                            console.log('is regular type');
                            pageHtml = `
                                <table style="margin-bottom:10px;">
                                    <thead>
                                        <tr>
                                            <th>Word</th>
                                            <th>Definition</th>
                                            <th>Forms</th>
                                            <th>Usage Notes</th>
                                            <th>Wordclass</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>${el.word}</td>
                                            <td>${el.definition}</td>
                                            <td>${el.forms}</td>
                                            <td>${el.usage_notes || '...'}</td>
                                            <td>${el.wordclass}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div id="tableDiv"></div>
                            `;
                            helperFunctions.tablegen.waitForElement(`.page #tableDiv`).then(tableWrapper => {
                                //console.log(tableWrapper);
                                helperFunctions.matchtype1.neoVerbTables(1, el.word, tableWrapper);
                                helperFunctions.matchtype1.neoVerbTables(2, el.word, tableWrapper);

                                helperFunctions.tablegen.populateSummaryTables(el.word, { 'Verb-Table-Prefix': true, 'Verb-Table-Suffix': false });
                            });
                        }
                        break;
                    case 'pn':
                        pageHtml = `
                            <table>
                                <thead>
                                    <tr>
                                        <th>Word</th>
                                        <th>Case</th>
                                        <th>Gender</th>
                                        <th>Number</th>
                                        <th>Person</th>
                                        <th>Wordclass</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>${el.word}</td>
                                        <td>${el.path.case}</td>
                                        <td>${el.path.gender}</td>
                                        <td>${el.path.number}</td>
                                        <td>${el.path.person}</td>
                                        <td>${el.wordclass}</td>
                                    </tr>
                                </tbody>
                            </table>
                        `;
                        break;
                    case 'cor':
                        pageHtml = `
                            <table>
                                <thead>
                                    <tr>
                                        <th>Word</th>
                                        <th>Case</th>
                                        <th>Gender</th>
                                        <th>Wordclass</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>${el.word}</td>
                                        <td>${el.path.case}</td>
                                        <td>${el.path.gender}</td>
                                        <td>${el.wordclass}</td>
                                    </tr>
                                </tbody>
                            </table>
                        `;
                        break;
                    case 'det':
                        pageHtml = `
                            <table>
                                <thead>
                                    <tr>
                                        <th>Word</th>
                                        <th>Gender</th>
                                        <th>Number</th>
                                        <th>Wordclass</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>${el.word}</td>
                                        <td>${el.path.gender}</td>
                                        <td>${el.path.number}</td>
                                        <td>${el.wordclass}</td>
                                    </tr>
                                </tbody>
                            </table>
                        `;
                        break;

                    default: console.warn(`${td.dataset.wordclass} is an invalid wordclass`);
                        break;
                }

                helperFunctions.standard.createPageById('page94', pageHtml);
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
                    //console.log(div, newDiv);
                    newDiv.appendChild(div);
                } else return;
            });
        });//<-- change to for loop, instead of .forEach
        for (const el of tempArray.type2) {
            //console.log(el, el.affixState);
            const htmlEach = `
                <td 
                    style="cursor:pointer"; 
                    data-wordclass="${el.wordclass}"; 
                    data-path="${el.short_path || '...'}"; 
                    data-pausestate="false";
                >${el.wordclass}.${el.short_path || '..'}</td>
            `;
            helperFunctions.standard.betterTrInsert("listTbody", htmlEach);

            const td = document.querySelector('#listTbody tr:last-child td:last-child');
            function search() {
                console.log('hello world');
                helperFunctions.standard.createPageById('page94', 'pageHtml');
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
    }
    fixTable();

    const tbody = document.getElementById('listTbody');
    function displayGuide() {
        tableTextState = 2;

        tbody.querySelectorAll('td').forEach(td => {
            if (td.dataset.pausestate === "false") {
                td.dataset.pausestate = "true";
                td.style.cursor = 'text';
            } else if (td.dataset.pausestate === "true") {
                td.dataset.pausestate = "false";
                td.style.cursor = 'pointer';
            }
            // ⟅(^‿^)⟆ - Shelf the elf
            switch (td.dataset.wordclass) {
                case 'v':
                    if (td.dataset.verbtype === "lur") {
                        td.textContent = "Verb.Aspect.Gender.Number.Person.Tense";
                    } else if (td.dataset.verbtype === "regular") {
                        td.textContent = "Verb.Stem";
                    }
                    break;
                case 'pn':
                    td.textContent = "Pronoun.Case.Gender.Number.Person";
                    break;
                case 'cor':
                    td.textContent = "Correlative.Type.Case.Gender";
                    break;
                case 'det':
                    td.textContent = "Determiner.Type.Number.Gender";
                    break;
                case 'adj':
                    td.textContent = "Adjective.Stem";
                    break;
                case 'adv':
                    td.textContent = "Adverb.Stem";
                    break;
                case 'aux':
                    td.textContent = "Auxilary.Stem";
                    break;
                case 'con':
                    td.textContent = "Conjunction.Stem";
                    break;
                case 'n':
                    td.textContent = "Noun.Stem";
                    break;
                case 'part':
                    td.textContent = "Particle.Stem";
                    break;
                case 'pp':
                    td.textContent = "Preposition.Stem";
                    break;
                default:
                    td.textContent = td.dataset.wordclass;
                    break;
            }
        });
    }

    const guideTh = document.getElementById('shortPathGuide');
    guideTh.addEventListener('click', () => {
        if (tableTextState === 1) {
            displayGuide()
        } else if (tableTextState === 2) {
            tbody.innerHTML = ``;
            fixTable();
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