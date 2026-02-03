// Add a class once the DOM is ready so styles can hook into it if needed.
document.addEventListener("DOMContentLoaded", function () {
  document.body.classList.add("is-ready");

  var root = document.documentElement;
  var audioCtx = null;
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
    themeToggle.textContent = theme === "dark" ? "☀️" : "🌜";
    if (window.localStorage) {
      localStorage.setItem("theme", theme);
    }
  }

  if (themeToggle) {
    var activeTheme = root.getAttribute("data-theme");
    themeToggle.setAttribute("aria-pressed", activeTheme === "dark" ? "true" : "false");
    themeToggle.textContent = activeTheme === "dark" ? "☀️" : "🌜";

    themeToggle.addEventListener("click", function () {
      var nextTheme = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      setTheme(nextTheme);
    });
  }

  function getAudioContext() {
    if (!audioCtx) {
      var Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) {
        return null;
      }
      audioCtx = new Ctx();
    }
    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }
    return audioCtx;
  }

  function playClickBeep() {
    var ctx = getAudioContext();
    if (!ctx) {
      return;
    }
    var osc = ctx.createOscillator();
    var gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.value = 900;
    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);

    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.07);
  }

  document.addEventListener("click", playClickBeep, true);

  var isProjectPage = window.location.pathname.indexOf("/projects/") !== -1;
  var prefix = isProjectPage ? "../" : "";
  var mobileNavMarkup =
    '<div class="mobile-nav" aria-label="Mobile" aria-hidden="true">' +
    '<a class="mobile-nav__item" href="' +
    prefix +
    'index.html#home">🏠 Home</a>' +
    '<a class="mobile-nav__item" href="' +
    prefix +
    'index.html#projects">💼 Work</a>' +
    '<a class="mobile-nav__item" href="' +
    prefix +
    'index.html#contact">📞 Contact</a>' +
    '<a class="mobile-nav__item" href="' +
    prefix +
    'index.html#resume">📄 Resume</a>' +
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

  var welcomeModal = document.querySelector(".welcome-modal");
  if (welcomeModal) {
    var hasSeenWelcome = window.localStorage
      ? localStorage.getItem("hasSeenWelcomeModal")
      : "true";

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
