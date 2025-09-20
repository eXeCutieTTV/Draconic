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
        const cellsToShow = foundRow.slice(startIndex, startIndex + 5); // get 5 cells

        const tr = document.createElement('tr');
        cellsToShow.forEach(cell => {
            const td = document.createElement('td');
            td.textContent = cell ?? ""; // ensures <td></td> for empty cells
            tr.appendChild(td);
        });
        tableBody.appendChild(tr);
    } else {
        alert('No matching row found.');
    }
});

console.log(workbookData);
