
let keywordDisplay = "";
let keyword = "";
let newSearchField = "";
let newSearchButton = "";

// === Excel data ===
let pagess = {};
let workbookData = [];

// Helper: make a safe string for IDs/selectors
function safeIdPart(str) {
    return str.replace(/[^a-z0-9_-]/gi, '_'); // replace anything not alphanumeric, underscore, or dash
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

    // import declension tables
    let identifier = "";
    let cell = "";


    // abstract
    identifier = "a."; // what you're looking for
    cell = document.getElementById('cell3');

    if (cell && cell.textContent.toLowerCase().includes(identifier.toLowerCase())) {
        console.log("yes");

        fetch("pages/page2/tables/declensiontables/abstractdir.html")
            .then(res => res.text())
            .then(html => {
                document.getElementById("leftleftdivdictionary").insertAdjacentHTML("beforeend", html);
            })
            .catch(err => console.error("Error loading HTML:", err));
        fetch("pages/page2/tables/declensiontables/abstractrec.html")
            .then(res => res.text())
            .then(html => {
                document.getElementById("rightleftdivdictionary").insertAdjacentHTML("beforeend", html);
            })
            .catch(err => console.error("Error loading HTML:", err));
    }
    // exhalted
    identifier = "e."; // what you're looking for
    cell = document.getElementById('cell3');

    if (cell && cell.textContent.toLowerCase().includes(identifier.toLowerCase())) {
        console.log("yes");

        fetch("pages/page2/tables/declensiontables/exhalteddir.html")
            .then(res => res.text())
            .then(html => {
                document.getElementById("leftleftdivdictionary").insertAdjacentHTML("beforeend", html);
            })
            .catch(err => console.error("Error loading HTML:", err));
        fetch("pages/page2/tables/declensiontables/exhaltedrec.html")
            .then(res => res.text())
            .then(html => {
                document.getElementById("rightleftdivdictionary").insertAdjacentHTML("beforeend", html);
            })
            .catch(err => console.error("Error loading HTML:", err));
    }
    // irrational
    identifier = "i."; // what you're looking for
    cell = document.getElementById('cell3');

    if (cell && cell.textContent.toLowerCase().includes(identifier.toLowerCase())) {
        console.log("yes");

        fetch("pages/page2/tables/declensiontables/irrationaldir.html")
            .then(res => res.text())
            .then(html => {
                document.getElementById("leftleftdivdictionary").insertAdjacentHTML("beforeend", html);
            })
            .catch(err => console.error("Error loading HTML:", err));
        fetch("pages/page2/tables/declensiontables/irrationalrec.html")
            .then(res => res.text())
            .then(html => {
                document.getElementById("rightleftdivdictionary").insertAdjacentHTML("beforeend", html);
            })
            .catch(err => console.error("Error loading HTML:", err));
    }
    // magical
    identifier = "mag."; // what you're looking for
    cell = document.getElementById('cell3');

    if (cell && cell.textContent.toLowerCase().includes(identifier.toLowerCase())) {
        console.log("yes");

        fetch("pages/page2/tables/declensiontables/magicaldir.html")
            .then(res => res.text())
            .then(html => {
                document.getElementById("leftleftdivdictionary").insertAdjacentHTML("beforeend", html);
            })
            .catch(err => console.error("Error loading HTML:", err));
        fetch("pages/page2/tables/declensiontables/magicalrec.html")
            .then(res => res.text())
            .then(html => {
                document.getElementById("rightleftdivdictionary").insertAdjacentHTML("beforeend", html);
            })
            .catch(err => console.error("Error loading HTML:", err));
    }
    // mundane
    identifier = "mun."; // what you're looking for
    cell = document.getElementById('cell3');

    if (cell && cell.textContent.toLowerCase().includes(identifier.toLowerCase())) {
        console.log("yes");

        fetch("pages/page2/tables/declensiontables/mundanedir.html")
            .then(res => res.text())
            .then(html => {
                document.getElementById("leftleftdivdictionary").insertAdjacentHTML("beforeend", html);
            })
            .catch(err => console.error("Error loading HTML:", err));
        fetch("pages/page2/tables/declensiontables/mundanerec.html")
            .then(res => res.text())
            .then(html => {
                document.getElementById("rightleftdivdictionary").insertAdjacentHTML("beforeend", html);
            })
            .catch(err => console.error("Error loading HTML:", err));
    }
    // rational
    identifier = "r."; // what you're looking for
    cell = document.getElementById('cell3');

    if (cell && cell.textContent.toLowerCase().includes(identifier.toLowerCase())) {
        console.log("yes");

        fetch("pages/page2/tables/declensiontables/rationaldir.html")
            .then(res => res.text())
            .then(html => {
                document.getElementById("leftleftdivdictionary").insertAdjacentHTML("beforeend", html);
            })
            .catch(err => console.error("Error loading HTML:", err));
        fetch("pages/page2/tables/declensiontables/rationalrec.html")
            .then(res => res.text())
            .then(html => {
                document.getElementById("rightleftdivdictionary").insertAdjacentHTML("beforeend", html);
            })
            .catch(err => console.error("Error loading HTML:", err));
    }
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
    }
});

// === Trigger search on Enter key ===
document.getElementById('search_field').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault(); // prevent form submission
        doSearch();
    }

});