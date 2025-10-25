function searchSuggestionsLogic() {

    //suggestions logic.
    // search field dropdown
    let examples = [];

    // Adjust this to where your file is served in the repository
    const EXCEL_URL = 'assets/22-09-2025.xlsx';

    // Helper to populate a datalist (optional)
    function populateDatalist(items) {
        const dl = document.getElementById('examplesList');
        if (!dl) return; // datalist is optional; skip if not present
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
}
searchSuggestionsLogic(); // so constants arent redefined.