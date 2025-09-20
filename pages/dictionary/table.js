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
    const tableBody = document.querySelector('#resultTable tbody');
    tableBody.innerHTML = '';

    if (!keyword || workbookData.length === 0) {
        alert('Please enter a search term and ensure the file is loaded.');
        return;
    }

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
        // Build exactly 5 cells from the match to the right
        const cellsToShow = [];
        for (let i = 0; i < 5; i++) {
            cellsToShow.push(foundRow[startIndex + i] ?? "");
        }

        // Always target the existing <tbody>
        const tableBody = document.querySelector('#resultTable tbody');
        tableBody.innerHTML = ''; // clear old rows

        // Create the row and cells
        const tr = document.createElement('tr');
        cellsToShow.forEach(cell => {
            const td = document.createElement('td');
            td.textContent = String(cell ?? ""); // ensures <td></td> for empty cells
            tr.appendChild(td);
        });

        // Append the row to the <tbody>
        tableBody.appendChild(tr);

        // Debug: check what was inserted
        console.log('Inserted row:', tableBody.innerHTML);
    } else {
        alert('No matching row found.');
    }


    console.log(workbookData);
    console.log("Found row:", foundRow);
    console.log("Start index:", startIndex);
    console.log("Cells to show:", foundRow.slice(startIndex, startIndex + 5));
});