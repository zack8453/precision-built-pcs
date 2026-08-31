const year = document.querySelector('[data-year]');
if (year) year.textContent = new Date().getFullYear();

const toggle = document.querySelector('.mobile-toggle');
const links = document.querySelector('.nav-links');
if (toggle && links) {
  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    links.classList.remove('open');
    toggle.setAttribute('aria-expanded','false');
  }));
}

const form = document.querySelector('#quote-form');
const alertBox = document.querySelector('#form-alert');
if (form && alertBox) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const button = form.querySelector('button[type="submit"]');
    const original = button.innerHTML;
    button.disabled = true;
    button.innerHTML = '<span>Sending…</span>';
    alertBox.className = 'alert';
    alertBox.textContent = '';

    const data = Object.fromEntries(new FormData(form).entries());
    if (data._honey) { button.disabled = false; button.innerHTML = original; return; }

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        headers: {'Content-Type':'application/json','Accept':'application/json'},
        body: JSON.stringify(data)
      });
      const result = await response.json();
      if (!response.ok || result.success === false) throw new Error(result.message || 'Unable to send form');
      window.location.href = 'thank-you.html';
    } catch (error) {
      alertBox.className = 'alert error show';
      alertBox.textContent = 'The quote could not be sent. Please try again, or email zackerycarter83@gmail.com directly.';
      button.disabled = false;
      button.innerHTML = original;
    }
  });
}
