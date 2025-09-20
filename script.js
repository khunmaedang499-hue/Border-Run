// Simple hamburger toggle with accessibility
(function () {
  // รอให้ navbar ถูก inject เข้ามาก่อน (ในกรณีโหลดด้วย fetch)
  const init = () => {
    const btn = document.querySelector('.hamburger');
    const menu = document.getElementById('primary-menu');
    if (!btn || !menu) return;

    const toggle = (open) => {
      const willOpen = typeof open === 'boolean' ? open : !menu.classList.contains('is-open');
      menu.classList.toggle('is-open', willOpen);
      btn.classList.toggle('is-active', willOpen);
      btn.setAttribute('aria-expanded', String(willOpen));
      if (willOpen) {
        // โฟกัสลิงก์แรกในเมนูบนมือถือ
        const firstLink = menu.querySelector('a, button');
        if (firstLink) firstLink.focus();
      } else {
        btn.focus();
      }
    };

    btn.addEventListener('click', () => toggle());

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!menu.contains(e.target) && !btn.contains(e.target) && menu.classList.contains('is-open')) {
        toggle(false);
      }
    });

    // Close on Escape and trap simple focus inside when open
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) {
        toggle(false);
      }
      if (e.key === 'Tab' && menu.classList.contains('is-open')) {
        const focusables = menu.querySelectorAll('a, button');
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          last.focus(); e.preventDefault();
        } else if (!e.shiftKey && document.activeElement === last) {
          first.focus(); e.preventDefault();
        }
      }
    });
  };

  // ถ้าโหลด navbar แบบ fetch จะมาหลัง DOMContentLoaded เล็กน้อย ให้ลอง init ซ้ำ
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(init, 0));
  } else {
    setTimeout(init, 0);
  }
})();
