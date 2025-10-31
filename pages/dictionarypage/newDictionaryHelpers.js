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
        page.id = id;
        page.className = 'page';
    }
    page.innerHTML = html;

    const pagewrapper = document.querySelector('.pages');

    if (!pagewrapper) {
        console.error("no div with class '.pages'");
        return;
    }

    pagewrapper.appendChild(page);
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
const sliceKeyword = function sliceKeyword(keyword, x) {
    const slice1 = keyword.slice(0, -x);
    const slice2 = keyword.slice(-x);
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

const standard = {
    test,
    clearPageById,
    createPageById,
    createDivById,
    sliceKeyword,
    reverseSearchIdsOnSearch
}

const neoSuffixChecker = function neoSuffixChecker(keyword, map, resultArray) {
    const array = WORD_UTILS.matchSuffix(keyword, map);
    if (!array) return null;

    const suffixes = array[0] || [];
    const Suffixtype = array[2];
    const Suffixperson = array[3];
    const Suffixgender = array[4];
    const Suffixnumber = array[5];
    const Suffixdeclensions = array[1] || [];

    const appliedSuffix = suffixes[0] || '';
    const unappliedSuffix = suffixes[1] || '';

    let usedSuffix = '';
    if (appliedSuffix && unappliedSuffix) {
        if (keyword.endsWith(appliedSuffix) && keyword.endsWith(unappliedSuffix)) {
            usedSuffix = appliedSuffix;
        } else if (keyword.endsWith(unappliedSuffix)) {
            usedSuffix = unappliedSuffix;
        } else return null;
    } else if (appliedSuffix) usedSuffix = appliedSuffix;
    else if (unappliedSuffix) usedSuffix = unappliedSuffix;
    if (!usedSuffix) return null;

    const suffixLength = usedSuffix.length;
    const { slice1, slice2 } = helperFunctions.standard.sliceKeyword(keyword, suffixLength);
    const Suffixstem = slice1;

    const result = {
        Suffixtype,
        Suffixperson,
        Suffixgender,
        Suffixnumber,
        Suffixdeclensions,
        appliedSuffix,
        unappliedSuffix,
        usedSuffix,
        Suffixstem,
        slice2
    };

    // push into provided array if it is a real array
    if (Array.isArray(resultArray)) resultArray.push(result);

    // also return the result so caller can use it immediately
    return result;
};

const neoPrefixChecker = function neoPrefixChecker(keyword, map, resultArray) {
    const array = WORD_UTILS.matchPrefix(keyword, map);
    console.log(array);
    if (!array) {
        return;
    }
    const prefix = array[0];
    //const Prefixtype = array[1];
    const Prefixperson = array[1];
    const Prefixgender = array[2];
    const Prefixnumber = array[3];
    const Prefixdeclension = array[1] || [];
    console.log(Prefixdeclension);

    console.log(
        'Prefixperson | ', Prefixperson,
        'Prefixgender | ', Prefixgender,
        'Prefixnumber | ', Prefixnumber
    )

    const usedPrefix = prefix; // no variants

    if (!usedPrefix) {
        return;
    }

    const prefixLength = usedPrefix.length;
    const { slice1, slice2 } = helperFunctions.standard.sliceKeyword(keyword, prefixLength);
    const Prefixstem = slice1;
    console.log(prefix, usedPrefix); // worked earlier - havent changed anything:q


    const result = {
        Prefixperson,
        Prefixgender,
        Prefixnumber,
        Prefixdeclension,
        usedPrefix,
        Prefixstem,
        slice2
    }
    // push into provided array if it is a real array
    if (Array.isArray(resultArray)) resultArray.push(result);

    return result;
    //neoPrefixChecker('xenæf', VERBS.PREFIXES.FLAT_MATCHES);
}

const affixHelpers = {
    neoSuffixChecker,
    neoPrefixChecker
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
const matchtype1 = {
    type1extraTableRow
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
            if (tables[tableId]) entries = WORD_UTILS.connectSplit(textInCell, keyword, "");
            else entries = WORD_UTILS.connectSplit("", keyword, textInCell);
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
const formatting = {
    keepDigitsOnly,
    removeParensSpacesAndDigits
}

const helperFunctions =
{
    standard,
    affixHelpers,
    matchtype3,
    matchtype1,
    tablegen
}