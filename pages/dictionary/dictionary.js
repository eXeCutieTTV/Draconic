// === Excel data ===
let pagess = {};
let workbookData = [];

// === Load Excel once ===
fetch('13-05-2025.xlsx')
    .then(response => response.arrayBuffer())
    .then(data => {
        const workbook = XLSX.read(data, { type: 'array' });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];

        // Build pagess from G5 to G332
        let pageNumber = 999;
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
    const existing = container.querySelector('table');
    if (existing) existing.remove();

    const table = document.createElement('table');
    table.id = `resultTable_${keyword}`;

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

    // Find or create the .pages wrapper
    let pagesWrap = document.querySelector('.pages');
    if (!pagesWrap) {
        pagesWrap = document.createElement('div');
        pagesWrap.className = 'pages';
        document.body.appendChild(pagesWrap);
    }

    // Create the page if it doesn't exist
    if (!document.getElementById(targetPageId)) {
        const pageDiv = document.createElement('div');
        pageDiv.id = targetPageId;
        pageDiv.className = 'page';
        pageDiv.innerHTML = `
            <h2>${keyword}</h2>
            <p>${keyword} is a noun</p>
            <div class="tablesContainer"></div>
        `;
        pagesWrap.appendChild(pageDiv);
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
});
