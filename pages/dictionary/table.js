let workbookData = [];

// Load the Excel file from the same directory
fetch('13-05-2025.xlsx')
    .then(response => response.arrayBuffer())
    .then(data => {
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        workbookData = XLSX.utils.sheet_to_json(worksheet, {
            header: 1,
            blankrows: true,
            defval: ""   // fill empty cells with empty string
        });
    })
    .catch(err => console.error('Error loading Excel file:', err));

// Search button click event
document.getElementById('search_button').addEventListener('click', () => {
    const keyword = document.getElementById('search_field').value.trim().toLowerCase();

    // Create tables
    function createTable(keyword) {
        // Avoid duplicates: if table already exists, return it
        const existing = document.getElementById(`resultTable_${keyword}`);
        if (existing) return existing;

        const table = document.createElement('table');
        table.id = `resultTable_${keyword}`;

        // 1️⃣ Create the header row (constant names)
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');

        // Define your constant column names here:
        const headers = ["Word", "Declension", "Definition", "Forms", "Usage Notes"];
        headers.forEach(text => {
            const th = document.createElement('th');
            th.textContent = text;
            headerRow.appendChild(th);
        });

        thead.appendChild(headerRow);
        table.appendChild(thead);

        // 2️⃣ Create the body with one row of empty cells
        const tbody = document.createElement('tbody');
        const row = document.createElement('tr');

        for (let i = 0; i < 5; i++) {
            const cell = document.createElement('td');
            cell.id = `cell${i}_${keyword}`;
            row.appendChild(cell);
        }

        tbody.appendChild(row);
        table.appendChild(tbody);

        // 3️⃣ Append table to container
        document.getElementById('tablesContainer').appendChild(table);

        return table;
    }
    createTable(keyword)


    if (!keyword || workbookData.length === 0) {
        alert('Please enter a search term and ensure the file is loaded.');
        return;
    }

    // Build the table ID dynamically
    const tableId = `resultTable_${keyword}`;
    const table = document.getElementById(tableId);

    if (!table) {
        alert(`No table found with ID "${tableId}"`);
        return;
    }

    // Clear old values from this table's cells
    const cells = table.querySelectorAll('td');
    cells.forEach(cell => cell.textContent = '');

    let foundRow = null;
    let startIndex = -1;

    // Search for the keyword in the Excel data
    for (const row of workbookData) {
        const colIndex = row.findIndex(cell => String(cell).toLowerCase() === keyword);
        if (colIndex !== -1) {
            foundRow = row;
            startIndex = colIndex;
            break;
        }
    }

    if (foundRow) {
        // Fill the first 5 cells in this table
        for (let i = 0; i < 5; i++) {
            const cell = table.querySelector(`#cell${i}_${keyword}`);
            if (cell) {
                cell.textContent = foundRow[startIndex + i] ?? '';
            }
        }
    } else {
        alert('No matching row found.');
    }

    console.log("Found row:", foundRow);
    console.log("Start index:", startIndex);
    if (foundRow) {
        console.log("Cells to show:", foundRow.slice(startIndex, startIndex + 5));
    }
});
