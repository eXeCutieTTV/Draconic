// tab functionality
function openPage(pageId, element) {

  const pageEl = document.getElementById(pageId);
  if (!pageEl) {
    console.error(`openPage: No element found with id "${pageId}"`);
    return;
  }
  pageEl.classList.add('active');
  // Hide all pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

  // Show selected page
  document.getElementById(pageId).classList.add('active');

  // Reset all tabs
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));

  // Highlight current tab
  if (element) {
    element.classList.add('active');
  }
  // If pageId number is above 1000, highlight a constant tab
  const match = pageId.match(/\d+/); // extract number from pageId
  if (match && parseInt(match[0], 10) > 1000) {
    const constantTab = document.getElementById('permatab'); // <-- your fixed tab's ID
    if (constantTab) {
      constantTab.classList.add('active');
    }
  }
}

// import html function
class IncludeHTML extends HTMLElement {
  connectedCallback() {
    const src = this.getAttribute('src');
    if (src) {
      fetch(src)
        .then(r => r.text())
        .then(html => this.innerHTML = html);
    }
  }
}
customElements.define('include-html', IncludeHTML);


// get data from official sheet
let dictionaryData = [];

function loadDictionaryData() {
  const userKey = prompt("Enter your Google Sheets API key:");
  if (!userKey) {
    alert("API key is required to load the dictionary.");
    return;
  }

  const SHEET_ID = "168-Rzwk2OjxKJfHy-xNYvwPmDTi5Olv9KTgAs4v33HE";
  const RANGE = "Dictionary!A2:E8";
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(RANGE)}?key=${userKey}`;

  const container = document.getElementById("sheet-data");
  container.textContent = "Loading...";

  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      return response.json();
    })
    .then(data => {
      dictionaryData = data.values;

      if (!dictionaryData || dictionaryData.length === 0) {
        container.textContent = "No data found.";
        return;
      }

      const table = document.createElement("table");
      table.border = "1";

      dictionaryData.forEach(row => {
        const tr = document.createElement("tr");

        // Ensure row has at least 5 elements
        const paddedRow = [];
        for (let i = 0; i < 5; i++) {
          paddedRow[i] = row[i] || "";
        }

        // Extract word and number if applicable
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

        // Reordered cells: [word, number, meaning, extra, extra, wordclass]
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
    })
    .catch(error => {
      console.error("Failed to load sheet:", error);
      container.textContent = "Error loading sheet.";
    });
}
