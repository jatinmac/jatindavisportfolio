document.addEventListener("DOMContentLoaded", function () {
  document.body.classList.add("is-ready");

  var root = document.documentElement;
  var themeToggle = document.querySelector(".theme-toggle");
  var storedTheme = window.localStorage ? localStorage.getItem("theme") : null;

  if (storedTheme === "light" || storedTheme === "dark") {
    root.setAttribute("data-theme", storedTheme);
  } else {
    root.setAttribute("data-theme", "light");
  }

  function setTheme(theme) {
    if (!themeToggle) {
      return;
    }

    root.setAttribute("data-theme", theme);
    themeToggle.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
    themeToggle.setAttribute(
      "aria-label",
      theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
    );
    themeToggle.textContent = theme === "dark" ? "☀️" : "🌙";

    if (window.localStorage) {
      localStorage.setItem("theme", theme);
    }
  }

  if (themeToggle) {
    setTheme(root.getAttribute("data-theme"));
    themeToggle.addEventListener("click", function () {
      var nextTheme = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      setTheme(nextTheme);
    });
  }

  var isProjectPage = window.location.pathname.indexOf("/projects/") !== -1;
  var prefix = isProjectPage ? "../" : "";
  var mobileNavMarkup =
    '<div class="mobile-nav" aria-label="Mobile" aria-hidden="true">' +
    '<a class="mobile-nav__item" href="' +
    prefix +
    'index.html#home">Home</a>' +
    '<a class="mobile-nav__item" href="' +
    prefix +
    'index.html#projects">Work</a>' +
    '<a class="mobile-nav__item" href="' +
    prefix +
    'index.html#contact">Contact</a>' +
    '<a class="mobile-nav__item" href="' +
    prefix +
    'index.html#resume">Resume</a>' +
    "</div>";

  var navs = document.querySelectorAll(".site-nav");
  Array.prototype.forEach.call(navs, function (siteNav) {
    var navToggle = siteNav.querySelector(".nav-toggle");
    if (!navToggle) {
      return;
    }

    if (!siteNav.querySelector(".mobile-nav")) {
      siteNav.insertAdjacentHTML("beforeend", mobileNavMarkup);
    }

    var mobileNav = siteNav.querySelector(".mobile-nav");
    navToggle.setAttribute("aria-expanded", "false");

    navToggle.addEventListener("click", function () {
      var isOpen = siteNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      if (mobileNav) {
        mobileNav.setAttribute("aria-hidden", isOpen ? "false" : "true");
      }
    });

    if (mobileNav) {
      mobileNav.addEventListener("click", function (event) {
        var target = event.target;
        if (target && target.matches("a")) {
          siteNav.classList.remove("is-open");
          navToggle.setAttribute("aria-expanded", "false");
          mobileNav.setAttribute("aria-hidden", "true");
        }
      });
    }
  });

  var animatedItems = document.querySelectorAll(
    ".hero, .about, .split, .contact, .site-footer, .experience, .education-item, .project-hero, .project-section"
  );

  Array.prototype.forEach.call(animatedItems, function (item) {
    item.setAttribute("data-animate", "");
  });

  if ("IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" }
    );

    Array.prototype.forEach.call(animatedItems, function (item) {
      revealObserver.observe(item);
    });
  } else {
    Array.prototype.forEach.call(animatedItems, function (item) {
      item.classList.add("is-visible");
    });
  }

  function updateScrollEffects() {
    var doc = document.documentElement;
    var scrollTop = window.scrollY || doc.scrollTop;
    var maxScroll = doc.scrollHeight - window.innerHeight;
    var progress = maxScroll > 0 ? Math.min(scrollTop / maxScroll, 1) : 0;
    var heroShift = Math.min(scrollTop * -0.03, 0);

    root.style.setProperty("--scroll-progress", progress.toFixed(4));
    root.style.setProperty("--hero-shift", heroShift.toFixed(2));
  }

  updateScrollEffects();
  window.addEventListener("scroll", updateScrollEffects, { passive: true });
  window.addEventListener("resize", updateScrollEffects);

  var welcomeModal = document.querySelector(".welcome-modal");
  if (welcomeModal) {
    var hasSeenWelcome = window.localStorage ? localStorage.getItem("hasSeenWelcomeModal") : "true";

    function hideWelcomeModal() {
      welcomeModal.classList.remove("is-visible");
      welcomeModal.setAttribute("aria-hidden", "true");
    }

    function showWelcomeModal() {
      welcomeModal.classList.add("is-visible");
      welcomeModal.setAttribute("aria-hidden", "false");
      if (window.localStorage) {
        localStorage.setItem("hasSeenWelcomeModal", "true");
      }
      var closeButton = welcomeModal.querySelector(".welcome-modal__close");
      if (closeButton) {
        closeButton.focus();
      }
    }

    if (hasSeenWelcome !== "true") {
      showWelcomeModal();
    }

    welcomeModal.addEventListener("click", function (event) {
      var target = event.target;
      if (target && target.hasAttribute("data-modal-close")) {
        hideWelcomeModal();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        hideWelcomeModal();
      }
    });
  }
});
