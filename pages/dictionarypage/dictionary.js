// search field dropdown
let examples = [];

// Adjust this to where your file is served in the repository
const EXCEL_URL = '22-09-2025.xlsx';

// Helper to populate a datalist (optional)
function populateDatalist(items) {
    const dl = document.getElementById('examplesList');
    dl.innerHTML = '';
    items.forEach(v => {
        const opt = document.createElement('option');
        opt.value = v;
        dl.appendChild(opt);
    });
}

// Fetch the XLSX, parse and extract column A from row 2 onward
async function loadExamplesFromXlsx(url) { // so this is just for grabbing all the words from first column?
    const res = await fetch(url, { credentials: 'same-origin' });
    if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
    const arrayBuffer = await res.arrayBuffer(); // not used anywhere else
    const workbook = XLSX.read(arrayBuffer, { type: 'array' }); // move buffer here?

    const sheetName = workbook.SheetNames[0]; // not used anywhere else
    const worksheet = workbook.Sheets[sheetName]; // not used anywhere else

    // Convert to rows (array of arrays)
    const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1, raw: false });  // move here?

    // rows[0] is header (A1); collect column A starting at rows[1] (A2)
    const values = [];
    for (let r = 1; r < rows.length; r++) {
        const row = rows[r];
        if (!row) continue;
        const val = (row[0] ?? '').toString().trim();
        if (val) values.push(val);
    }

    // Optional: dedupe and trim to reasonable size
    examples = Array.from(new Set(values))
        .map(w => String(w).replace(/\s*\([1-4]\)\s*$/g, '').trim()) // remove " (n)"
        .filter(Boolean); // drop empty strings if any
    populateDatalist(examples);
    return examples;
}

// Kick off load (call this once on page load)
loadExamplesFromXlsx(EXCEL_URL)
    .then(list => console.log('Loaded examples:', list.length))
    .catch(err => console.error(err));

const input = document.getElementById('search_field');
const suggestions = document.getElementById('suggestions');

let highlighted = -1;

function showSuggestions(items) {
    suggestions.innerHTML = '';
    if (!items.length) {
        suggestions.hidden = true;
        return;
    }
    items.forEach((text, idx) => {
        const li = document.createElement('li');
        li.textContent = text;
        li.tabIndex = -1;
        li.setAttribute('role', 'option');
        li.style.padding = '6px 8px';
        li.style.cursor = 'pointer';
        li.addEventListener('mousedown', e => {
            // use mousedown so input doesn't lose focus before click handling
            e.preventDefault();
            selectSuggestion(text);
        });
        suggestions.appendChild(li);
    });
    highlighted = -1;
    suggestions.hidden = false;
}

function selectSuggestion(text) {
    input.value = text;
    suggestions.hidden = true;
    input.focus();
}

function filterExamples(q) {
    if (!q) return examples.slice(0, 5000); // show some examples when empty
    const low = q.toLowerCase();
    return examples.filter(w => w.toLowerCase().includes(low)).slice(0, 5000); // how many examples are shown?
}

input.addEventListener('input', () => {
    const list = filterExamples(input.value);
    showSuggestions(list);
});

input.addEventListener('keydown', (e) => {
    const items = suggestions.querySelectorAll('li');
    if (suggestions.hidden) return;
    if (e.key === 'ArrowDown') {
        e.preventDefault();
        highlighted = Math.min(highlighted + 1, items.length - 1);
        updateHighlight(items);
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        highlighted = Math.max(highlighted - 1, 0);
        updateHighlight(items);
    } else if (e.key === 'Enter') {
        if (highlighted >= 0 && items[highlighted]) {
            e.preventDefault();
            selectSuggestion(items[highlighted].textContent);
        } // /\(/o.o\)/\ - Spooky the spider
    } else if (e.key === 'Escape') {
        suggestions.hidden = true;
    }
});

function updateHighlight(items) {
    items.forEach((li, i) => {
        if (i === highlighted) {
            li.style.background = '#0366d6';
            li.style.color = '#fff';
            li.scrollIntoView({ block: 'nearest' });
        } else {
            li.style.background = '';
            li.style.color = '';
        }
    });
}

// hide suggestions when clicking outside
document.addEventListener('click', (e) => {
    if (!e.composedPath().includes(input) && !e.composedPath().includes(suggestions)) {
        suggestions.hidden = true;
    }
});



// loadDictionaryData
let dictionaryData = [];

function loadDictionaryData() {
    const APIfield = document.getElementById("api_field");

    if (APIfield && APIfield.value) {
        const userKey = APIfield.value.trim();
        if (userKey) {
            loadFromGoogleSheets(userKey);
            console.log("loaded from official sheet");
        } else {
            loadFromExcelFile("22-09-2025.xlsx");
            console.log("loaded from excel file(may be outdated)");
        }
    } else {
        loadFromExcelFile("22-09-2025.xlsx");
        console.log("loaded from excel file(may be outdated)");
    }
}

// loadFromGoogleSheets
function loadFromGoogleSheets(apiKey) {
    const SHEET_ID = "168-Rzwk2OjxKJfHy-xNYvwPmDTi5Olv9KTgAs4v33HE";
    const RANGE = "Dictionary!A2:E999";
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(RANGE)}?key=${apiKey}`;

    const container = document.getElementById("sheet-data");
    container.textContent = "Loading...";

    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            return response.json();
        })
        .then(data => {
            dictionaryData = data.values;
            renderTable(dictionaryData);
        })
        .catch(error => {
            console.error("Failed to load sheet:", error);
            container.textContent = "Error loading sheet.";
        });
}

// loadFromExcelFile
function loadFromExcelFile(filename) {
    const container = document.getElementById("sheet-data");
    container.textContent = "Loading local Excel file…";

    fetch(filename)
        .then(response => response.arrayBuffer())
        .then(data => {
            const workbook = XLSX.read(data, { type: "array" });
            const sheet = workbook.Sheets[workbook.SheetNames[0]];
            const json = XLSX.utils.sheet_to_json(sheet, { header: 1 });
            dictionaryData = json.slice(1); // skip header row
            renderTable(dictionaryData);
        })
        .catch(error => {
            console.error("Failed to load Excel file:", error);
            container.textContent = "Error loading local file.";
        });
}

// show dictionary printout
function showDictionaryPrintout() {
    openPageOld('page98');
}
setTimeout(() => {
    console.log("'showDictionaryPrintout();' to go to dictionary print page")
}, 250); // mention the command in the console, so you know how to find the dictionary list. also, on delay, so its at the bottom of the console.

function renderTable(data) {
    const container = document.getElementById("sheet-data");
    const table = document.createElement("table");
    table.id = "sheet-data-table";

    data.forEach(row => {
        const tr = document.createElement("tr");

        const paddedRow = [];
        for (let i = 0; i < 5; i++) {
            paddedRow[i] = row[i] || "";
        }

        let word = paddedRow[0];
        const wordclass = paddedRow[1];
        let extractedNumber = "";

        if ((wordclass === "adj" || wordclass === "n") && /\(\d\)/.test(word)) { // /\(/o.o\)/\ - Spooky the spider
            const match = word.match(/\((\d)\)/);
            if (match) {
                extractedNumber = match[1];
                word = word.replace(/\(\d\)/, "").trim();
            }
        }
        const cells = [
            word,
            extractedNumber,
            paddedRow[2],
            paddedRow[3],
            paddedRow[4],
            wordclass
        ];

        cells.forEach(cell => {
            const td = document.createElement("td");
            td.textContent = cell;
            tr.appendChild(td);
        });

        table.appendChild(tr);
    });

    container.innerHTML = "";
    container.appendChild(table);

    // Build pagess and workbookData from table
    buildFromDictionaryTable();

    // Continue with declension logic
    processDictionaryTable();
}

// Helper: make a safe string for IDs/selectors (words containing the ax symbol can now still be converted into ids)
function safeIdPart(str) {
    return str.replace(/[^a-z0-9_-]/gi, '_'); // replace anything not alphanumeric, underscore, or dash '_'
}



function declensionsInDictionary() {
    // give dictionary table cells unique ids. // i need ${word} to be the textcontent of the first cell in the row. this is to make unique ids. // remember that the ax symbol (') isnt allowed as an id, and needs a fix. its somewhere else too.
    function newids() {
        const table = document.getElementById('sheet-data-table');
        if (!table) return;
        table.querySelectorAll('tr').forEach((tr, rowIdx) => {
            const first = tr.querySelector('td');
            const word = first ? entries_to_rom(text_to_entries(first.textContent.trim().replace(/`/g, "_ax_").replace(/'/g, "_ax_"))).replace(/[^\w-]+/g, '-') || 'cell' : 'row' + rowIdx;
            tr.querySelectorAll('td').forEach((td, cellIdx) => {
                td.id = `${word}-dicCell-${cellIdx}`;
            });
        });
    } // remember that entries_to_rom is used.
    newids();

    // expanded tables for affix searchability
    const table = document.getElementById('sheet-data-table');
    table.querySelectorAll('tr').forEach((tr, rowIdx) => {
        const first = tr.querySelector('td');
        const word = first ? entries_to_rom(text_to_entries(first.textContent.trim().replace(/`/g, "_ax_").replace(/'/g, "_ax_"))).replace(/[^\w-]+/g, '-') || 'cell' : 'row' + rowIdx;
        tr.querySelectorAll('td').forEach(td => {
            if (td.id === `${word}-dicCell-5`) {
                const wordclass = document.getElementById(`${word}-dicCell-5`).textContent;
                switch (wordclass) {
                    case 'n':
                        console.log("noun");
                        break;
                    case 'v':
                        console.log("verb");
                        break;
                    case 'adj':
                        console.log("adjective");
                        break;
                    case 'adv':
                        console.log("adverb");
                        break;
                    case 'aux':
                        console.log("auxiliary");
                        break;
                    case 'pp':
                        console.log("preposition");
                        break;
                    case 'part':
                        console.log("particle");
                        break;
                }
            }
        });
    })
}


// dictionary tables
// === Create the summary tables ===
let CurrentWordClassAsText = "";
let dictionaryPageReference = "";

// if page with number between 10000 and 12000 exists, then delete it.
function removePageDivsExceptKeyword(keyword, start, end) {
    const keepId = `page${keyword}`;
    let removed = 0;

    // normalize numeric bounds and cap to reasonable limits
    start = Math.max(0, Number(start) || 0);
    end = Math.min(10000000, Number(end) || 0);
    if (end < start) return 0;

    for (let i = start; i <= end; i++) {
        const id = `page${i}`;
        if (id === keepId) continue;
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.tagName && el.tagName.toUpperCase() !== 'DIV') continue;
        el.remove();
        removed++;
    }

    return removed;
}

function createSummaryTables() {

    switch (getCurrentWordClass()) {
        case 'n':
            createNounSummaryTables("leftleftdivdictionary");
            setTimeout(() => {
                populateSummaryTables(keyword, { dirSummaryTable: false, recSummaryTable: false });
            }, 100);
            CurrentWordClassAsText = "noun";
            dictionaryPageReference = () => openPageOld('page3', document.querySelector('.tab-bar .tab:nth-child(5)'));
            break;

        case 'v':
            createVerbSummaryTables();
            setTimeout(() => {
                populateSummaryTables(keyword, { dictionaryVerbPrefixTable: true, dictionaryVerbSuffixTable: false });
            }, 100);
            CurrentWordClassAsText = "verb";
            dictionaryPageReference = () => openPageOld('page4', document.querySelector('.tab-bar .tab:nth-child(6)'));
            break;

        case 'adv':
            createAdverbSummaryTables();
            CurrentWordClassAsText = "adverb";
            dictionaryPageReference = () => openPageOld('page5', document.querySelector('.tab-bar .tab:nth-child(7)'));
            break;

        case 'aux':
            createAuxiliarySummaryTables();
            CurrentWordClassAsText = "auxiliary";
            dictionaryPageReference = () => openPageOld('page6', document.querySelector('.tab-bar .tab:nth-child(8)'));
            break;

        case 'pp':
            createPrepositionSummaryTables();
            CurrentWordClassAsText = "preposition";
            dictionaryPageReference = () => openPageOld('page0', document.querySelector('.tab-bar .tab:nth-child(0)'));
            break;

        case 'part':
            createParticleSummaryTables();
            CurrentWordClassAsText = "particle";
            dictionaryPageReference = () => openPageOld('page0', document.querySelector('.tab-bar .tab:nth-child(0)'));
            break;

        case 'adj':
            createAdjectiveSummaryTables();
            CurrentWordClassAsText = "adjective";
            dictionaryPageReference = () => openPageOld('page7', document.querySelector('.tab-bar .tab:nth-child(9)'));
            break;
    }
} // /\(/o.o\)/\ - Spooky the spider

// Helper function to get current word class from the displayed table
function getCurrentWordClass() {
    const cell5 = document.getElementById('cell5'); // wordclass is in cell5 (6th column)
    if (!cell5) return null;
    return cell5.textContent.trim();
}

// populateSummaryTables
function populateSummaryTables(keyword, tables) {
    Object.keys(tables).forEach(tableId => {
        const table = document.getElementById(tableId);
        if (!table) return;
        const tds = table.querySelectorAll("tbody td");
        tds.forEach(td => {
            // prefer original stored raw suffix (data-raw) if present 
            const textInCell = (td.dataset.raw && td.dataset.raw.trim()) ? td.dataset.raw : td.textContent.trim();
            console.log(td.innerHTML);

            // process raw
            let entries;
            if (tables[tableId]) entries = connect_split(textInCell, keyword, "");
            else entries = connect_split("", keyword, textInCell);
            td.innerHTML = `<strong>${entries_to_text(entries[0])}</strong>${entries_to_text(entries[1])}<strong>${entries_to_text(entries[2])}</strong>`;
            // place keyword as prefix or suffix (you can change behavior per table)
        });
    });
}

// === Create noun summary tables (existing functionality) ===
function createNounSummaryTables(inDivById) {
    return new Promise((resolve, reject) => {
        const leftleftdivdictionary = document.getElementById(inDivById);
        if (!inDivById) {
            return reject(new Error(`div by id ${inDivById} not found`));
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
            headerRow.innerHTML = `<th>Gender</th>` + numbers.map(n => `<th>${n}</th>`).join("");
            thead.appendChild(headerRow);

            table.appendChild(thead);

            const tbody = document.createElement("tbody");
            genders.forEach(gender => {
                const row = document.createElement("tr");
                const cellsHtml = numbers.map(() => `<td data-raw=""></td>`).join("");
                row.innerHTML = `<th>${gender}</th>` + cellsHtml;
                tbody.appendChild(row);
            });
            table.appendChild(tbody);

            wrapper.appendChild(table);

            const container = document.getElementById(containerId);
            if (!container) return;
            container.appendChild(wrapper);
        }

        // create wrapper divs and attach them
        const dirsummarytablefinalwrapper = document.createElement("div");
        const recsummarytablefinalwrapper = document.createElement("div");
        dirsummarytablefinalwrapper.id = "dirSummaryTablediv";
        recsummarytablefinalwrapper.id = "recSummaryTablediv";
        leftleftdivdictionary.appendChild(dirsummarytablefinalwrapper);
        leftleftdivdictionary.appendChild(recsummarytablefinalwrapper);

        buildTable("dirSummaryTable", "Directive", "dirSummaryTablediv");
        buildTable("recSummaryTable", "Recessive", "recSummaryTablediv");

        // Allow a paint cycle so the DOM is actually available to queries/measurements
        requestAnimationFrame(() => resolve());
    });
}

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

    buildVerbTable("pages/dictionarypage/tables/subjectprefix.html", "verbPrefixTablediv");
    buildVerbTable("pages/dictionarypage/tables/objectsuffix.html", "verbSuffixTablediv");
}

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

    buildAdverbTable("adverbFormsTable", "Adverb Forms", "adverbFormsTablediv");
    // populate the created td
    const baseSource = document.getElementById("cell0");
    const elativeSource = document.getElementById("cell3");

    const baseTd = document.getElementById(`adverbFormsTable-base-form`);
    const elativeTd = document.getElementById(`adverbFormsTable-elative-form`);

    if (baseTd && baseSource) baseTd.textContent = baseSource.textContent;
    if (elativeTd && elativeSource) elativeTd.textContent = elativeSource.textContent;
}

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

// Define your  glyph classes
const conlangVowels = ["i", "ī", "e", "ē", "æ", "y", "u", "ū", "o", "ō", "a", "ā", "ú", "û", "ó", "ô", "á", "â"];
const conlangConsonants = ["t", "k", "q", "q̇", "'", "c", "f", "d", "s", "z", "g", "χ", "h", "l", "r", "ɾ", "m", "n", "ŋ"];
console.log(`Vowels = ${conlangVowels}`);
console.log(`Consonants = ${conlangConsonants}`);

// will redo -lirox
// function isConlangVowel(char) {
//     return text_to_entries(char)[0].properties.includes(window.REG.VOWEL);
// }

// function isConlangConsonant(char) {
//     return text_to_entries(char)[0].properties.includes(window.REG.CONSONANT);
// } // unused

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

// === Map of identifiers to stems ===
const tableMap = {
    "a.": "abstract",
    "e.": "exhalted",
    "i.": "irrational",
    "mag.": "magical",
    "mon.": "monstrous",
    "mun.": "mundane",
    "r.": "rational"
};

const groupMap = {
    all: ["magical", "mundane", "abstract", "exhalted", "monstrous", "irrational", "rational"],
    animates: ["exhalted", "monstrous", "irrational", "rational"],
    inanimates: ["magical", "mundane", "abstract"]
};

const loaded = new Set();

// === Fetch a stem's dir/rec tables and paste into summary ===
function loadTableFiles(stem, rowNumber, gender) {
    const dirPromise = fetch(`pages/dictionarypage/tables/declensiontables/${stem}dir.html`)
        .then(res => res.text())
        .then(html => pasteFromHTML(html, rowNumber, gender, "dir"));

    const recPromise = fetch(`pages/dictionarypage/tables/declensiontables/${stem}rec.html`)
        .then(res => res.text())
        .then(html => pasteFromHTML(html, rowNumber, gender, "rec"));

    return Promise.all([dirPromise, recPromise]);
}

// === Normalize text and hide empty rows ===
function normalizeText(s) {
    return (s || "").replace(/\u00a0/g, " ").trim();

}

function hideEmptySummaryRowsIn(summaryTableId) {
    const table = document.getElementById(summaryTableId);
    if (!table) return;

    const rows = table.querySelectorAll("tbody tr");
    rows.forEach(row => {
        const cells = Array.from(row.querySelectorAll("td"));
        const hasData = cells.some(td => {
            const text = td.textContent.replace(/\u00a0/g, " ").trim();
            return text !== "";
        });

        // Force visibility for filled rows, hide empty ones
        row.style.display = hasData ? "table-row" : "none";
    });
}

// === Extract the correct row from fetched HTML and paste into summary table ===
function pasteFromHTML(html, rowNumber, gender, type) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    const table = doc.querySelector("table");
    if (!table) return;

    const allRows = Array.from((table.querySelector("tbody") || table).querySelectorAll("tr"));
    const dataRows = allRows.slice(2); // skip first two header rows
    const targetRow = dataRows[rowNumber - 1];
    if (!targetRow) return;

    // Expand colspans so we always get 3 values
    let cells = [];
    Array.from(targetRow.cells)
        .slice(1) // skip label
        .forEach(cell => {
            const span = parseInt(cell.getAttribute("colspan") || "1", 10);
            const text = normalizeText(cell.textContent);
            for (let i = 0; i < span; i++) {
                cells.push(text);
            }
        });

    const summaryTableId = type === "dir" ? "dirSummaryTable" : "recSummaryTable";
    const summaryTable = document.getElementById(summaryTableId);
    if (!summaryTable) return;

    const summaryRows = Array.from(summaryTable.querySelectorAll("tbody tr"));
    const summaryRow = summaryRows.find(r =>
        normalizeText(r.querySelector("th").textContent).toLowerCase() === gender.toLowerCase()
    );
    if (!summaryRow) return;

    const summaryCells = summaryRow.querySelectorAll("td");
    cells.forEach((val, idx) => {
        if (summaryCells[idx]) {
            summaryCells[idx].textContent = val;
        }
    });

    // Hide all empty rows in this summary table
    hideEmptySummaryRowsIn(summaryTableId);
}

// processDictionaryTable
function processDictionaryTable() {
    if (!dictionaryData || dictionaryData.length === 0) {
        console.warn("No dictionary data available.");
        return;
    }

    dictionaryData.forEach((row, index) => {
        const paddedRow = [];
        for (let i = 0; i < 5; i++) {
            paddedRow[i] = row[i] || "";
        }

        let word = paddedRow[0];
        const wordclass = paddedRow[1];
        let extractedNumber = "";

        if ((wordclass === "n") && /\(\d\)/.test(word)) {
            const match = word.match(/\((\d)\)/);
            if (match) {
                extractedNumber = match[1];
                word = word.replace(/\(\d\)/, "").trim();
            }
        }

        const stemPrefix = paddedRow[4]; // assuming column 5 holds the identifier like "mag.", "r.", etc.
        const stem = tableMap[stemPrefix];
        const gender = paddedRow[3]; // assuming column 4 holds gender
        const rowNumber = parseInt(extractedNumber, 10);

        if (stem && gender && rowNumber) {
            loadTableFiles(stem, rowNumber, gender);
        }
    });
}

// === runTableLoader ===
function runTableLoader() {
    const currentWordClass = getCurrentWordClass(); // /\(/o.o\)/\ - Spooky the spider

    // Only run the existing noun declension logic for nouns
    if (currentWordClass !== 'n') {
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
                    loadPromises.push(loadTableFiles(stem, rowNumber, stem));
                    loaded.add(stem);
                }
            });
        }
    }

    for (const [id, stem] of Object.entries(tableMap)) {
        if (cellText.includes(id.toLowerCase()) && !loaded.has(stem)) {
            loadPromises.push(loadTableFiles(stem, rowNumber, stem));
            loaded.add(stem);
        }
    }

    Promise.all(loadPromises).then(() => {
        console.log("Summary tables updated.");
        hideEmptySummaryRowsIn("dirSummaryTable");
        hideEmptySummaryRowsIn("recSummaryTable");
    });
}

// === Build pagess and workbookData from dictionaryData ===
function buildFromDictionaryTable() {
    if (!dictionaryData || dictionaryData.length === 0) {
        console.warn("No dictionary data available.");
        return;
    }

    pagess = {};
    workbookData = [];

    let pageNumber = 10000; // Start counting up from 10000

    dictionaryData.forEach((row, index) => {
        const paddedRow = [];
        for (let i = 0; i < 5; i++) {
            paddedRow[i] = row[i] || "";
        }

        const wordRaw = paddedRow[0];
        const word = wordRaw.replace(/\(\d\)/, "").trim().toLowerCase();

        if (word) {
            pagess[word] = `page${pageNumber}`;
            pageNumber++; // Count upward
        }

        workbookData.push(paddedRow);
    });

    console.log("pagess mapping:", pagess);
    console.log("workbookData:", workbookData);
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

// === Fill table from Excel data ===
function fillTable(keyword, table) {
    const kw = String(keyword).toLowerCase();
    const sourceTable = document.querySelector("#sheet-data table");
    if (!sourceTable) {
        alert("Source table not found.");
        return;
    }

    const rows = Array.from(sourceTable.querySelectorAll("tbody tr, tr")); // support both tbody and flat tables
    let foundRow = null;

    for (const row of rows) {
        const cells = Array.from(row.querySelectorAll("td"));
        if (cells.length < 6) continue; // Now expecting 6 cells including word class

        const word = cells[0].textContent.trim().toLowerCase();
        if (word === kw) {
            foundRow = cells;
            break;
        }
    }

    if (!foundRow) {
        alert("No matching row found.");
        return;
    }

    for (let i = 0; i < 6; i++) { // Now filling 6 cells including word class
        const td = table.querySelector(`#cell${i}`);
        if (td) {
            const raw = foundRow[i].textContent;

            let count = 0;
            const html = raw.replace(/-/g, () => {
                count += 1;
                return count === 1 ? "- " : "<br>- ";
            });

            td.innerHTML = html;
        }
    }
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

// Helper function to setup search functionality for a page
function setupPageSearchHandlers(pageId) {
    const searchFieldSelector = `#${pageId} #search_field1`; // those are not used anywhere else
    const searchButtonSelector = `#${pageId} #search_button1`;

    Promise.all([
        waitForElement(searchFieldSelector), // move them here?
        waitForElement(searchButtonSelector)
    ]).then(([searchField, searchButton]) => {
        // Remove any existing listeners to prevent duplicates
        const newSearchButton = searchButton.cloneNode(true);
        searchButton.parentNode.replaceChild(newSearchButton, searchButton);

        const newSearchField = searchField.cloneNode(true);
        searchField.parentNode.replaceChild(newSearchField, searchField);

        // Add click listener to button
        newSearchButton.addEventListener('click', (e) => {
            e.preventDefault();
            doSearchFromPage(pageId);
        });

        // Add enter key listener to field
        newSearchField.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                doSearchFromPage(pageId);
            }
        });

        console.log(`Search handlers setup for ${pageId}`);
    }).catch(error => {
        console.error(`Failed to setup search handlers for ${pageId}:`, error);
    });
}

// Function to handle search from a specific page
function doSearchFromPage(pageId) {
    const searchField = document.querySelector(`#${pageId} #search_field1`);
    if (!searchField) return;
    // /\(/o.o\)/\ - Spooky the spider
    const searchTerm = searchField.value.trim();
    if (!searchTerm) return;

    // Update the global search field and trigger search
    const mainSearchField = document.getElementById('search_field');
    if (mainSearchField) {
        mainSearchField.value = searchTerm;
    }

    doSearch();
}

// === dosearch function ===
function doSearch() {
    // Auto-load dictionary data if not already loaded
    if (!dictionaryData || dictionaryData.length === 0) {
        loadDictionaryData();
        // Wait for data to load before continuing
        const checkDataLoaded = setInterval(() => {
            if (dictionaryData && dictionaryData.length > 0) {
                clearInterval(checkDataLoaded);
                performSearch();
            }
        }, 100);
        return;
    }

    performSearch(); // why am i doing this twice? line 958
}

function performSearch() {
    // Always clear existing tables first

    // Prefer value from #search_field if not empty, else #search_field1
    let field1 = document.getElementById('search_field');
    let field2 = document.getElementById('search_field1');
    keywordDisplay = (field1?.value.trim() || field2?.value.trim());
    keyword = keywordDisplay.toLowerCase();

    if (!keyword || dictionaryData.length === 0) {
        alert('Please enter a search term and ensure the file is loaded.');
        return;
    }

    const targetPageId = pagess[keyword];
    if (!targetPageId) {
        alert('No page found for that word.');
        return;
    }
    // remove page10000..page12000 except page matching current keyword variable
    const removedCount = removePageDivsExceptKeyword(keyword, 10000, 12000);
    console.log('removed', removedCount, 'dictionary pages');

    // Find or create the .pages wrapper
    let pagesWrap = document.querySelector('.pages');
    if (!pagesWrap) {
        pagesWrap = document.createElement('div');
        pagesWrap.className = 'pages';
        document.body.appendChild(pagesWrap);
    }

    // Create the page if it doesn't exist
    const existingPage = document.getElementById(targetPageId);
    if (!existingPage) {
        // create pageDiv
        const pageDiv = document.createElement('div');
        pageDiv.id = targetPageId;
        pageDiv.className = 'page';
        pageDiv.innerHTML = `<include-html src="pages/dictionarypage/dictionary.html"></include-html>`;

        pagesWrap.appendChild(pageDiv); // append pageDiv in pagesWrap

        // Setup search handlers for the new page after a short delay
        setTimeout(() => {
            setupPageSearchHandlers(targetPageId);
        }, 100);
    }

    // Go to the correct page
    openPageOld(targetPageId);

    // Wait for the page content to load, then setup the table
    waitForElement(`#${targetPageId} .tablesContainer`).then(pageContainer => {
        // Create and fill the table
        const table = createTable(keyword, pageContainer);
        fillTable(keyword, table);

        // Update keyword <p>s
        const keywordp = document.getElementById("keywordp");
        if (keywordp) {
            keywordp.innerHTML = keywordDisplay;
        }
        cloneKeywordText();

        // Update wordclass <p>s
        setTimeout(() => {
            const wordclassp = document.getElementById("wordclassp");
            if (wordclassp) {
                wordclassp.innerHTML = CurrentWordClassAsText;
            }
            cloneWordclassText();
        }, 0);

        // Load appropriate content based on word class
        const currentWordClass = getCurrentWordClass();
        loadWordClassContent(currentWordClass, targetPageId);

        // Clear and refocus whichever field was used
        if (field1 && field1.value.trim() !== '') {
            field1.value = '';
            field1.focus();
        } else if (field2) {
            field2.value = '';
            field2.focus();
        }

        runTableLoader(); // call your declension table logic here
        createSummaryTables(); // declensiontable

    }).catch(error => {
        console.error("Error creating summary tables:", error);

        // Clear and refocus even if there's an error
        if (field1 && field1.value.trim() !== '') {
            field1.value = '';
            field1.focus();
        } else if (field2) {
            field2.value = '';
            field2.focus();
        }

    }).catch(error => {
        console.error(`Failed to find page container for ${targetPageId}:`, error);
    });
}

// Load appropriate HTML content based on word class
function loadWordClassContent(wordClass, pageId) {
    const rightDiv = document.querySelector(`#${pageId} #textBoxContainer`);
    if (!rightDiv) return;

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
        default:
            contentFile = 'pages/dictionarypage/text/nountextbox.html'; // Default fallback text
    }

    // Load the appropriate content
    rightDiv.innerHTML = `<include-html src="${contentFile}"></include-html>`;

    // Trigger the include-html custom element to load the content
    const includeElement = rightDiv.querySelector('include-html');
    if (includeElement && includeElement.connectedCallback) {
        includeElement.connectedCallback();
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

// put buttons on index.js?
// === Search button click ===
document.getElementById('search_button').addEventListener('click', () => {
    doSearch(); // /\(/o.o\)/\ - Spooky the spider
});

document.addEventListener('click', (e) => {
    if (e.target.id === 'search_button1') {
        doSearch();
    }
});

// === Trigger search on Enter key ===
document.getElementById('search_field').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault(); // prevent form submission
        doSearch();
    }
});