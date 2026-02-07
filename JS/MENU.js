document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.getElementById('hamburgerBtn');
  const sideMenu = document.getElementById('sideMenu');
  const menuCloseBtn = document.getElementById('menuCloseBtn');
  const body = document.body;

  function openMenu() {
    hamburger.classList.add('active');
    sideMenu.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    sideMenu.setAttribute('aria-hidden', 'false');
    body.classList.add('menu-open');
  }

  function closeMenu() {
    hamburger.classList.remove('active');
    sideMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    sideMenu.setAttribute('aria-hidden', 'true');
    body.classList.remove('menu-open');
  }

  hamburger.addEventListener('click', function(e) {
    if (sideMenu.classList.contains('open')) closeMenu(); else openMenu();
  });

  // Close button click
  if (menuCloseBtn) {
    menuCloseBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      closeMenu();
    });
  }

  // Close on escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeMenu();
  });

  // Close when clicking outside the menu
  document.addEventListener('click', function(e) {
    if (!sideMenu.contains(e.target) && !hamburger.contains(e.target) && sideMenu.classList.contains('open')) {
      closeMenu();
    }
  });

  // Close menu when a link is clicked
  const menuLinks = sideMenu.querySelectorAll('a');
  menuLinks.forEach(function(link) {
    link.addEventListener('click', closeMenu);
  });

  // Toggle submenus
  const parentItems = document.querySelectorAll('.menu-item.has-children');
  parentItems.forEach(function(item) {
    const btn = item.querySelector('.menu-link');
    const submenu = item.querySelector('.submenu');
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const isOpen = item.classList.contains('open');
      if (isOpen) {
        item.classList.remove('open');
        // animate close
        submenu.style.maxHeight = null;
      } else {
        item.classList.add('open');
        // animate open to scrollHeight
        submenu.style.maxHeight = submenu.scrollHeight + 'px';
      }
    });
  });

  // Ensure submenu heights reset on resize
  window.addEventListener('resize', function() {
    parentItems.forEach(function(item) {
      const submenu = item.querySelector('.submenu');
      if (item.classList.contains('open')) {
        submenu.style.maxHeight = submenu.scrollHeight + 'px';
      } else {
        submenu.style.maxHeight = null;
      }
    });
  });
});