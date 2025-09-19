// tab functionality
function openPage(pageId, element) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  
  // Show selected page
  document.getElementById(pageId).classList.add('active');

  // Reset all tabs
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));

  // Highlight current tab
  element.classList.add('active');
}

// import tables function
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