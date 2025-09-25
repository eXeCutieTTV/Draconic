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

function renderTable(data) {
    const container = document.getElementById("sheet-data");
    const table = document.createElement("table");

    data.forEach(row => {
        const tr = document.createElement("tr");

        const paddedRow = [];
        for (let i = 0; i < 5; i++) {
            paddedRow[i] = row[i] || "";
        }

        let word = paddedRow[0];
        const wordclass = paddedRow[1];
        let extractedNumber = "";

        if ((wordclass === "adj" || wordclass === "n") && /\(\d\)/.test(word)) {
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
    return str.replace(/[^a-z0-9_-]/gi, '_'); // replace anything not alphanumeric, underscore, or dash
}


// declension tables
// === Create the two summary tables ===
function createSummaryTables() {
    return new Promise((resolve, reject) => {
        const wordClass = getCurrentWordClass();
        
        switch (wordClass) {
            case 'n': 
                createNounSummaryTables().then(() => {
                    populateSummaryTables(keyword, { dirSummaryTable: false, recSummaryTable: false });
                    resolve();
                }).catch(reject);
                break;
            case 'v': 
                createVerbSummaryTables();
                // Wait a bit for tables to be created
                setTimeout(() => {
                    populateSummaryTables(keyword, { dictionaryVerbPrefixTable: true, dictionaryVerbSuffixTable: false });
                    resolve();
                }, 100);
                break;
            case 'adv': 
                createAdverbSummaryTables();
                resolve();
                break;
            case 'aux': 
                createAuxiliarySummaryTables();
                resolve();
                break;
            default:
                resolve();
                break;
        }
    });
}

// Helper function to get current word class from the displayed table
function getCurrentWordClass() {
    const cell5 = document.getElementById('cell5'); // wordclass is in cell5 (6th column)
    if (!cell5) return null;
    return cell5.textContent.trim();
}

// === Create noun summary tables (existing functionality) ===
function createNounSummaryTables() {
    return new Promise((resolve, reject) => {
        const leftleftdivdictionary = document.getElementById("leftleftdivdictionary");
        if (!leftleftdivdictionary) {
            return reject(new Error("leftleftdivdictionary element not found"));
        }

        const genders = ["Exhalted", "Rational", "Monstrous", "Irrational", "Abstract", "Magical", "Mundane"];
        const numbers = ["Singular", "Dual", "Plural"];

        // Remove existing table wrappers if they exist
        ["dirSummaryTablediv", "recSummaryTablediv"].forEach(id => {
            const oldWrapper = document.getElementById(id);
            if (oldWrapper) {
                oldWrapper.remove();
            }
        });

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
                setTimeout(() => {
                    processSuffixCellContent(cellsHtml, keyword);
                }, 50);
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
// keep parenthesis data?
//function processSuffixCellContent(cellText, keyword) {
//  const lastChar = normalizeGlyph(keyword.slice(-1));
//const match = cellText.match(/\(([^)]+)\)/);

// if (!match) return cellText.replace(/-/g, "");

//    const glyph = normalizeGlyph(match[1]);
//  const keywordIsVowel = isConlangVowel(lastChar);
//const glyphIsVowel = isConlangVowel(glyph);

//    if (keywordIsVowel === glyphIsVowel) {
//      return cellText.replace(/\([^)]+\)/, "").replace(/-/g, "");
//} else {
//     return cellText.replace(/\(([^)]+)\)/, "$1").replace(/-/g, "");
// }// replaced by lirox' entries_to_text thingy.
//}

function populateSummaryTables(keyword, tables) {
    Object.keys(tables).forEach(tableId => { // tables = {tableID: isPrefix, ...} //???
        const table = document.getElementById(tableId);
        if (!table) return;
        const tds = table.querySelectorAll("tbody td");
        tds.forEach(td => {
            // prefer original stored raw suffix (data-raw) if present 
            const textInCell = (td.dataset.raw && td.dataset.raw.trim()) ? td.dataset.raw : td.textContent.trim();
            // ^^^ turns out i mixed up raw and keyword
            console.log(td.innerHTML);

            // process raw
            let entries;
            if (tables[tableId]) entries = connect_split(textInCell, keyword, "");
            else entries = connect_split("", keyword, textInCell);
            td.innerHTML = `${entries_to_text(entries[0])}<strong>${entries_to_text(entries[1])}</strong>${entries_to_text(entries[2])}`;

            // place keyword as prefix or suffix (you can change behavior per table)

        });//actually. the logic is bit more complicated than that. it should first be, if letter in parenthesis is not opposite of last/first letter class in keyword, then letter in parenthesis disappears. NOW if vowels touch, then keyword vowel gets cut, same for consonant
    });
}
// === Create verb summary tables ===
function createVerbSummaryTables() {
    const leftleftdivdictionary = document.getElementById("leftleftdivdictionary");
    if (!leftleftdivdictionary) {
        console.error("leftleftdivdictionary element not found");
        return;
    }

    // Remove existing table wrappers if they exist
    ["verbPrefixTablediv", "verbSuffixTablediv"].forEach(id => {
        const oldWrapper = document.getElementById(id);
        if (oldWrapper) {
            oldWrapper.remove();
        }
    });

    // Create verb conjugation table
    const verbConjWrapper = document.createElement("div");
    verbConjWrapper.id = "verbPrefixTablediv";
    leftleftdivdictionary.appendChild(verbConjWrapper);

    const verbFormsWrapper = document.createElement("div");
    verbFormsWrapper.id = "verbSuffixTablediv";
    leftleftdivdictionary.appendChild(verbFormsWrapper);

    buildVerbTable("pages/dictionarypage/tables/subjectprefix.html",
        "verbPrefixTablediv",
        "verbPrefixTable",
        keyword,
        true);
    buildVerbTable("pages/dictionarypage/tables/objectsuffix.html",
        "verbSuffixTablediv",
        "verbSuffixTable",
        keyword,
        false);
}

// === Create adverb summary tables ===
function createAdverbSummaryTables() {
    const leftleftdivdictionary = document.getElementById("leftleftdivdictionary");
    if (!leftleftdivdictionary) {
        console.error("leftleftdivdictionary element not found");
        return;
    }

    // Remove existing table wrappers if they exist
    ["adverbFormsTablediv"].forEach(id => {
        const oldWrapper = document.getElementById(id);
        if (oldWrapper) {
            oldWrapper.remove();
        }
    });

    const adverbWrapper = document.createElement("div");
    adverbWrapper.id = "adverbFormsTablediv";
    leftleftdivdictionary.appendChild(adverbWrapper);

    buildAdverbTable("adverbFormsTable", "Adverb Forms", "adverbFormsTablediv");
}

// === Create auxiliary summary tables ===
function createAuxiliarySummaryTables() {
    const leftleftdivdictionary = document.getElementById("leftleftdivdictionary");
    if (!leftleftdivdictionary) {
        console.error("leftleftdivdictionary element not found");
        return;
    }

    // Remove existing table wrappers if they exist
    ["auxiliaryFormsTablediv"].forEach(id => {
        const oldWrapper = document.getElementById(id);
        if (oldWrapper) {
            oldWrapper.remove();
        }
    });

    const auxWrapper = document.createElement("div");
    auxWrapper.id = "auxiliaryFormsTablediv";
    leftleftdivdictionary.appendChild(auxWrapper);

    buildAuxiliaryTable("auxiliaryFormsTable", "Auxiliary Forms", "auxiliaryFormsTablediv");
}
// Define your  glyph classes
const conlangVowels = ["i", "ī", "e", "ē", "æ", "y", "u", "ū", "o", "ō", "a", "ā", "ú", "û", "ó", "ô", "á", "â"];
const conlangConsonants = ["t", "k", "q", "q̇", "'", "c", "f", "d", "s", "z", "g", "χ", "h", "l", "r", "ɾ", "m", "n", "ŋ"];
console.log(conlangVowels);
console.log(conlangConsonants);

// will redo -lirox
function normalizeGlyph(glyph) {
    return glyph.normalize("NFC").toLowerCase();
}

function isConlangVowel(char) {
    return text_to_entries(char)[0].properties.includes(window.REG.VOWEL);
}

function isConlangConsonant(char) {
    return text_to_entries(char)[0].properties.includes(window.REG.CONSONANT);
}

// yeet -lirox if it breaks - istg... xd

function buildVerbTable(sourcePath, containerId, tableId, searchedWord, isPrefix) { // ----
    fetch(sourcePath)
        .then(response => {
            if (!response.ok) throw new Error(`Failed to load ${sourcePath}: ${response.status}`);
            return response.text();
        })
        .then(html => {
            const container = document.getElementById(containerId);
            if (container) {
                container.innerHTML = html;

                setTimeout(() => {
                    const table = document.getElementById(tableId);
                    if (!table) {
                        console.warn(`Table with ID "${tableId}" not found.`);
                        return;
                    }

                    const cells = table.querySelectorAll("td");
                    cells.forEach(cell => {
                        let originalText = cell.textContent.trim(); // var for cell data
                        let cleanedText = entries_to_text(text_to_entries(originalText)); // 
                        cell.innerHTML = isPrefix
                            ? `${cleanedText}<strong>${searchedWord}</strong>` // cleanedtext should be the clean text - without (x) & -. seachedword is just an identyfier for the function.
                            : `<strong>${searchedWord}</strong>${cleanedText}`; // either sets keyword+affix or affix+keyword. and bold. it will. my verbtable is broken. brother. the js was working before xd, i just needed to call the function correctly...
                    });
                }, 0);
            }
        })
        .catch(error => {
            console.error("Error loading table:", error);
        });
}

// Helper function to build adverb tables
function buildAdverbTable(id, label, containerId) {
    const wrapper = document.createElement("div");
    const table = document.createElement("table");
    table.id = id;

    const thead = document.createElement("thead");
    const mergedRow = document.createElement("tr");
    const mergedCell = document.createElement("th");
    mergedCell.id = id + "-header";
    mergedCell.colSpan = 2;
    mergedCell.textContent = label;
    mergedRow.appendChild(mergedCell);
    thead.appendChild(mergedRow);

    const headerRow = document.createElement("tr");
    headerRow.innerHTML = `<th>Form</th><th>Value</th>`;
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");
    const forms = ["Base Form", "Elative Form"];
    forms.forEach(form => {
        const row = document.createElement("tr");
        row.innerHTML = `<th>${form}</th><td></td>`;
        tbody.appendChild(row);
    });
    table.appendChild(tbody);

    wrapper.appendChild(table);
    const container = document.getElementById(containerId);
    if (container) {
        container.appendChild(wrapper);
    }
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
    mergedCell.colSpan = 4;
    mergedCell.textContent = label;
    mergedRow.appendChild(mergedCell);
    thead.appendChild(mergedRow);

    const headerRow = document.createElement("tr");
    headerRow.innerHTML = `<th>Form</th><th>Episodic Past</th><th>Gnomic Non-Past</th><th>Gnomic Past</th>`;
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");
    const row = document.createElement("tr");
    row.innerHTML = `<th>Forms</th><td></td><td></td><td></td>`;
    tbody.appendChild(row);
    table.appendChild(tbody);

    wrapper.appendChild(table);
    const container = document.getElementById(containerId);
    if (container) {
        container.appendChild(wrapper);
    }
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
    const currentWordClass = getCurrentWordClass();

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
    const searchFieldSelector = `#${pageId} #search_field1`;
    const searchButtonSelector = `#${pageId} #search_button1`;

    Promise.all([
        waitForElement(searchFieldSelector),
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

    performSearch();
}

function performSearch() {
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
    openPage(targetPageId);

    // Wait for the page content to load, then setup the table
    waitForElement(`#${targetPageId} .tablesContainer`).then(pageContainer => {
        // Create and fill the table
        const table = createTable(keyword, pageContainer);
        fillTable(keyword, table);

        // Update keyword displays
        const keywordp = document.getElementById("keywordp");
        if (keywordp) {
            keywordp.innerHTML = keywordDisplay;
        }
        cloneKeywordText();

        // Load appropriate content based on word class
        const currentWordClass = getCurrentWordClass();
        loadWordClassContent(currentWordClass, targetPageId);

        // Create summary tables and populate them
        createSummaryTables().then(() => {
            // Run table loader for noun declensions
            runTableLoader();
            
            // Clear and refocus whichever field was used
            if (field1 && field1.value.trim() !== '') {
                field1.value = '';
                field1.focus();
            } else if (field2) {
                field2.value = '';
                field2.focus();
            }
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
        });
    }).catch(error => {
        console.error(`Failed to find page container for ${targetPageId}:`, error);
    });
}

// Load appropriate HTML content based on word class
function loadWordClassContent(wordClass, pageId) {
    const rightDiv = document.querySelector(`#${pageId} #rightleftdivdictionary`);
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

// put buttons on index.js?
// === Search button click ===
document.getElementById('search_button').addEventListener('click', () => {
    doSearch();
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