// tab functionality
function openPage(url, pageId, opts, element) {
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
  // If pageId number is above 9999, highlight a constant tab
  const match = pageId.match(/\d+/); // extract number from pageId
  if (match && parseInt(match[0], 10) > 9999) {
    const constantTab = document.getElementById('permatab'); // <-- your fixed tab's ID
    if (constantTab) {
      constantTab.classList.add('active');
    }
  }

  // dynamic fetch html
  const _htmlFetchCache = new Map();
  function dynamicFetchHTML(url, pageId, opts, element) {
    const { runScripts = false, replace = true } = opts;
    const target = document.getElementById(pageId);
    if (!target) return Promise.reject(new Error(`No element with id "${pageId}"`));

    // If cached, use cached string (but still optionally run scripts)
    const cached = _htmlFetchCache.get(url);
    const applyHtml = html => {
      if (replace) target.innerHTML = html;
      else target.insertAdjacentHTML('beforeend', html);

      if (runScripts) {
        // Execute inline <script> tags safely (keeps external scripts as <script src> unchanged)
        // Inline scripts are executed in global scope.
        const temp = document.createElement('div');
        temp.innerHTML = html;
        temp.querySelectorAll('script').forEach(s => {
          if (!s.src) {
            const inline = document.createElement('script');
            inline.text = s.textContent;
            document.head.appendChild(inline);
            document.head.removeChild(inline);
          } else {
            // If you want to load external scripts, create a script element and wait for load.
            const ext = document.createElement('script');
            ext.src = s.src;
            ext.async = false;
            document.head.appendChild(ext);
            // do not remove external scripts automatically to preserve caching/behavior
          }
        });
      }
      return target;
    };

    if (cached) return Promise.resolve(applyHtml(cached));

    return fetch(url, { credentials: 'same-origin' })
      .then(res => {
        if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
        return res.text();
      })
      .then(html => {
        _htmlFetchCache.set(url, html);
        return applyHtml(html);
      });
  }
  function clearAllPages() {
    document.querySelectorAll('.page').forEach(el => {
      if (el.id === 'page98') return; // never clear page98
      el.textContent = '';
    });
  }
  clearAllPages(); // clear all pages
  dynamicFetchHTML(url, pageId, opts, element); // load page
}

function openPageAndScroll(url, pageId, opts, tabSelector, targetId) {
  const tabElement = document.querySelector(tabSelector);
  openPage(url, pageId, opts, tabElement);

  // Wait for the page to render before scrolling
  setTimeout(() => {
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    } else {
      console.warn(`No element found with id "${targetId}"`);
    }
  }, 100); // Adjust delay if needed
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

function deletealphabet() {
  document.getElementById("alphabet").textContent = ("");
};

// call on timeout to ensure html loaded
function alphabetOnTimeout() {
  setTimeout(() => {
    deletealphabet();
    generate_alphabet();
  }, 100);
}

function openPageOld(pageId, element) {

  const pageEl = document.getElementById(pageId);
  if (!pageEl) {
    if (pageId === 'page11999') return;
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
