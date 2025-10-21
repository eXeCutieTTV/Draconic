// dynamic fetch html
const _htmlFetchCache = new Map();

function loadHtmlInto(targetId, url, opts = {}) {
  const { runScripts = false, replace = true } = opts;
  const target = document.getElementById(targetId);
  if (!target) return Promise.reject(new Error(`No element with id "${targetId}"`));

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