console.log("Script loaded");

const btn = document.getElementById('search_button');
console.log("Button element:", btn);

if (btn) {
    btn.addEventListener('click', () => {
        console.log("Button clicked!");
    });
}
// === Page mapping ===
const pagess = {
    "ax": "page999",
    "æf": "page998",
    "æklū": "page997",
    "āfu": "page996",
    "afuχ": "page995"
    // add more mappings here
};

// === Excel data store ===
let workbookData = [];

// === Load Excel once ===
fetch('13-05-2025.xlsx')
    .then(response => response.arrayBuffer())
    .then(data => {
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        workbookData = XLSX.utils.sheet_to_json(worksheet, {
            header: 1,
            blankrows: true,
            defval: "" // fill empty cells with empty string
        });
    })
    .catch(err => console.error('Error loading Excel file:', err));

// === Create table inside a given container ===
function createTable(keyword, container) {
    // Remove any existing table in this container
    const existing = container.querySelector('table');
    if (existing) existing.remove();

    const table = document.createElement('table');
    table.id = `resultTable_${keyword}`;

    // Header row
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

    // Body row
    const tbody = document.createElement('tbody');
    const row = document.createElement('tr');
    for (let i = 0; i < 5; i++) {
        const cell = document.createElement('td');
        cell.id = `cell${i}_${keyword}`;
        row.appendChild(cell);
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

    for (const row of workbookData) {
        const colIndex = row.findIndex(cell => String(cell).toLowerCase() === keyword);
        if (colIndex !== -1) {
            foundRow = row;
            startIndex = colIndex;
            break;
        }
    }

    if (foundRow) {
        for (let i = 0; i < 5; i++) {
            const cell = table.querySelector(`#cell${i}_${keyword}`);
            if (cell) {
                cell.textContent = foundRow[startIndex + i] ?? '';
            }
        }
    } else {
        alert('No matching row found.');
    }
}

// === Search button click ===
document.getElementById('search_button').addEventListener('click', () => {
    const keyword = document.getElementById('search_field').value.trim().toLowerCase();

    if (!keyword || workbookData.length === 0) {
        alert('Please enter a search term and ensure the file is loaded.');
        return;
    }

    const targetPageId = pagess[keyword];
    if (!targetPageId) {
        alert('No page found for that word.');
        return;
    }

    // 1️⃣ Go to the correct page (no tab highlighting)
    openPage(targetPageId);

    // 2️⃣ Find that page's container
    const pageContainer = document.querySelector(`#${targetPageId} .tablesContainer`);
    if (!pageContainer) {
        console.error(`No .tablesContainer found inside #${targetPageId}`);
        return;
    }
    console.log("Target page ID:", targetPageId);
    console.log("Page element:", document.getElementById(targetPageId));
    console.log("Container element:", document.querySelector(`#${targetPageId} .tablesContainer`));

    // 3️⃣ Create table (replaces old one if exists)
    const table = createTable(keyword, pageContainer);

    // 4️⃣ Fill table from Excel
    fillTable(keyword, table);
});

