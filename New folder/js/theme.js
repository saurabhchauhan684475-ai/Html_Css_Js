/* QueueSetu dark / light mode toggle.
   Mirrors the pattern used in i18n.js: persist the choice in
   localStorage, apply it as an attribute on <html>, and inject a
   small control into the topbar on every page. */
(function () {
  const KEY = 'queuesetu-theme';

  function prefersDark() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  function apply(theme) {
    localStorage.setItem(KEY, theme);
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    document.querySelectorAll('.js-theme-toggle').forEach(btn => {
      btn.textContent = theme === 'dark' ? '☀️' : '🌙';
      btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
      btn.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
    });
  }

  function setup() {
    const saved = localStorage.getItem(KEY) || (prefersDark() ? 'dark' : 'light');

    const topbar = document.querySelector('.topbar-inner');
    if (topbar && !document.getElementById('themeToggle')) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.id = 'themeToggle';
      btn.className = 'theme-toggle js-theme-toggle';
      btn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
        apply(current === 'dark' ? 'light' : 'dark');
      });
      // Sit right after the language switcher if present, else append.
      const langSwitcher = document.getElementById('languageSwitcher');
      if (langSwitcher && langSwitcher.parentElement === topbar) {
        langSwitcher.insertAdjacentElement('afterend', btn);
      } else {
        topbar.appendChild(btn);
      }
    }

    apply(saved);
  }

  window.qsSetTheme = apply;

  // Apply immediately (before DOMContentLoaded) to avoid a flash of the
  // wrong theme, then run setup() once the topbar exists in the DOM.
  const early = localStorage.getItem(KEY) || (prefersDark() ? 'dark' : 'light');
  if (early === 'dark') document.documentElement.setAttribute('data-theme', 'dark');

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setup);
  } else {
    setup();
  }
})();
