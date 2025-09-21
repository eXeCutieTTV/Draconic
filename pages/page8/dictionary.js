// === Excel data ===
let pagess = {};
let workbookData = [];

// Helper: make a safe string for IDs/selectors
function safeIdPart(str) {
    return str.replace(/[^a-z0-9_-]/gi, '_'); // replace anything not alphanumeric, underscore, or dash
}

// declension tables
// === Create the two summary tables ===
function createSummaryTables() {
    const genders = ["Exhalted", "Rational", "Monstrous", "Irrational", "Abstract", "Magical", "Mundane"];
    const numbers = ["Singular", "Dual", "Plural"];

    function buildTable(id) {
        const table = document.createElement("table");
        table.id = id;
        table.border = "1";

        const thead = document.createElement("thead");
        const headerRow = document.createElement("tr");
        headerRow.innerHTML = `<th>Gender</th>` + numbers.map(n => `<th>${n}</th>`).join("");
        thead.appendChild(headerRow);
        table.appendChild(thead);

        const tbody = document.createElement("tbody");
        genders.forEach(gender => {
            const row = document.createElement("tr");
            row.innerHTML = `<th>${gender}</th>` + numbers.map(() => `<td></td>`).join("");
            tbody.appendChild(row);
        });
        table.appendChild(tbody);

        document.body.appendChild(table);
    }

    buildTable("dirSummaryTable");
    buildTable("recSummaryTable");
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
    const dirPromise = fetch(`pages/page8/tables/declensiontables/${stem}dir.html`)
        .then(res => res.text())
        .then(html => pasteFromHTML(html, rowNumber, gender, "dir"));

    const recPromise = fetch(`pages/page8/tables/declensiontables/${stem}rec.html`)
        .then(res => res.text())
        .then(html => pasteFromHTML(html, rowNumber, gender, "rec"));

    return Promise.all([dirPromise, recPromise]);
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
            const text = cell.textContent.trim();
            for (let i = 0; i < span; i++) {
                cells.push(text);
            }
        });

    console.log(`Pasting for ${gender} (${type}):`, cells);

    const summaryTableId = type === "dir" ? "dirSummaryTable" : "recSummaryTable";
    const summaryTable = document.getElementById(summaryTableId);
    if (!summaryTable) return;

    const summaryRows = Array.from(summaryTable.querySelectorAll("tbody tr"));
    const summaryRow = summaryRows.find(r =>
        r.querySelector("th").textContent.trim().toLowerCase() === gender.toLowerCase()
    );
    if (!summaryRow) return;

    const summaryCells = summaryRow.querySelectorAll("td");
    cells.forEach((val, idx) => {
        if (summaryCells[idx]) {
            summaryCells[idx].textContent = val;
        }
    });
}


// === Main loader ===
function runTableLoader() {
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
    });
}

// === Load Excel once ===
fetch('13-05-2025.xlsx')
    .then(response => response.arrayBuffer())
    .then(data => {
        const workbook = XLSX.read(data, { type: 'array' });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];

        // Build pagess from G5 to G332
        let pageNumber = 9999;
        for (let row = 5; row <= 332; row++) {
            const cell = sheet[`G${row}`];
            if (cell && cell.v) {
                const word = cell.v.toString().trim().toLowerCase();
                pagess[word] = `page${pageNumber}`;
                pageNumber--;
            }
        }

        // Build workbookData for table filling
        workbookData = XLSX.utils.sheet_to_json(sheet, {
            header: 1,
            blankrows: true,
            defval: ""
        });

        console.log('pagess mapping:', pagess);
    })
    .catch(err => console.error('Error loading Excel file:', err));

// === Create table inside a given container ===
function createTable(keyword, container) {
    // Remove any existing table in this container
    const existing = container.querySelector('table');
    if (existing) existing.remove();

    const table = document.createElement('table');
    table.id = 'resultTable'; // no keyword in ID

    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    const headers = ["Word", "Declension", "Definition", "Forms", "Usage Notes"];
    headers.forEach(text => {
        const th = document.createElement('th');
        th.textContent = text;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    const row = document.createElement('tr');

    // Create 5 cells with stable IDs (no keyword)
    for (let i = 0; i < 5; i++) {
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
    let foundRow = null;
    let startIndex = -1;
    const kw = String(keyword).toLowerCase();

    for (const row of workbookData) {
        const colIndex = row.findIndex(cell => String(cell).toLowerCase() === kw);
        if (colIndex !== -1) {
            foundRow = row;
            startIndex = colIndex;
            break;
        }
    }

    if (!foundRow) {
        alert('No matching row found.');
        return;
    }

    for (let i = 0; i < 5; i++) {
        const td = table.querySelector(`#cell${i}`);
        if (td) {
            const raw = String(foundRow[startIndex + i] ?? '');

            // Replace every "- " except the first one with "<br>- "
            let count = 0;
            const html = raw.replace(/-/g, () => {
                count += 1;
                return count === 1 ? '- ' : '<br>- ';
            });

            td.innerHTML = html;
        }
    }
}

let newSearchField = null;
let newSearchButton = null;
// === dosearch function ===
function doSearch() {
    // Prefer value from #search_field if not empty, else #search_field1
    let field1 = document.getElementById('search_field');
    let field2 = document.getElementById('search_field1');
    keywordDisplay = (field1?.value.trim() || field2?.value.trim());
    keyword = keywordDisplay.toLowerCase();

    if (!keyword || workbookData.length === 0) {
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
        pageDiv.innerHTML = `<include-html src="pages/page8/dictionary.html"></include-html>`;

        pagesWrap.appendChild(pageDiv); // append pageDiv in pagesWrap


        // includeEL
        const includeEl = pageDiv.querySelector('include-html');
        includeEl.addEventListener('html-included', () => {

            newSearchField = pageDiv.querySelector('.search_field');
            newSearchButton = pageDiv.querySelector('.search_button');
            if (newSearchField && newSearchButton) {
                newSearchButton.addEventListener('click', () => {
                    doSearchFromField(newSearchField);
                });


                newSearchField.addEventListener('keydown', (event) => {
                    if (event.key === 'Enter') {
                        event.preventDefault();
                        doSearchFromField(newSearchField);
                    }
                });
            }

        });


        newSearchField.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                doSearchFromField(newSearchField);
            }
        });

    }

    // Go to the correct page
    openPage(targetPageId);

    // Find that page's container
    const pageContainer = document.querySelector(`#${targetPageId} .tablesContainer`);
    if (!pageContainer) {
        console.error(`No .tablesContainer found inside #${targetPageId}`);
        return;
    }

    // Create and fill the table
    const table = createTable(keyword, pageContainer);
    fillTable(keyword, table);

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
}

// === Search button click ===
document.getElementById('search_button').addEventListener('click', () => {
    doSearch();
    field1 = document.getElementById('search_field1');
    keywordp.innerHTML = keyword; // set outererestp innerHTML
});
document.addEventListener('click', (e) => {
    if (e.target.id === 'search_button1') {
        doSearch();
        keywordp.innerHTML = keyword; // set outererestp innerHTML
    }
});

// === Trigger search on Enter key ===
document.getElementById('search_field').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault(); // prevent form submission
        doSearch();
        keywordp.innerHTML = keyword; // set outererestp innerHTML
    }

});