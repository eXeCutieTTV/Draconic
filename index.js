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

function openPageAndScroll(pageId, tabSelector, targetId) {
  const tabElement = document.querySelector(tabSelector);
  openPage(pageId, tabElement);

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

function deletealphabet () {
  document.getElementById("alphabet").textContent = ("");
};