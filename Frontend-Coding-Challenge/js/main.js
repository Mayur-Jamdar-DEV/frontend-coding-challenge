// 1. Navbar toggler (header navigation)
document.addEventListener("DOMContentLoaded", function () {
  const toggler = document.getElementById("navbarToggler");
  const menu = document.getElementById("navbarSupportedContent");

  if (toggler && menu) {
    toggler.addEventListener("click", function () {
      menu.classList.toggle("show");
      toggler.setAttribute(
        "aria-expanded",
        menu.classList.contains("show") ? "true" : "false"
      );
    });
  }
});

// 2. Form validation (contact form)
$(function () {
  const inputs = document.querySelectorAll("input");
  const countrySelector = document.getElementById("country-selector");
  const submitButton = document.querySelector(".submit-btn");
  const form = document.querySelector("form");
  const touchedFields = {};

  if (!form) return;

  form.addEventListener("invalid", function (e) {
    e.preventDefault();
  }, true);

  inputs.forEach(input => {
    input.addEventListener("focus", () => {
      touchedFields[input.name] = true;
    });
    input.addEventListener("blur", (e) => {
      touchedFields[input.name] = true;
      toggleError(e.target);
    });
  });

  if (countrySelector) {
    countrySelector.addEventListener("focus", () => {
      touchedFields["country"] = true;
    });
    countrySelector.addEventListener("change", () => {
      touchedFields["country"] = true;
      toggleCountryError();
    });
  }

  inputs.forEach(input => {
    const label = next(input);
    if (input.hasAttribute("data-validation-msg")) {
      const msg = input.getAttribute("data-validation-msg");
      const span = document.createElement("span");
      span.classList.add("custom-error");
      span.style.display = "none";
      span.textContent = msg;
      label.parentNode.insertBefore(span, label.nextSibling);
    }
  });

  if (submitButton) {
    submitButton.onclick = function (e) {
      let isValid = true;
      let firstInvalid = null;

      inputs.forEach(input => {
        if (touchedFields[input.name]) {
          const errorSpan = next(input).nextSibling;
          const label = next(input);

          if (!input.value || input.validity.valid === false) {
            errorSpan.style.display = "block";
            input.classList.add("has-error");
            label.classList.add("has-error");
            input.parentElement.classList.add("has-error");
            isValid = false;
            if (!firstInvalid) firstInvalid = input;

            label.parentElement.classList.add("focused");
            label.classList.remove("bounce");
            void label.offsetWidth;
            label.classList.add("bounce");
          } else {
            errorSpan.style.display = "none";
            input.classList.remove("has-error");
            label.classList.remove("has-error");
            input.parentElement.classList.remove("has-error");
          }
        }
      });

      if (touchedFields["country"]) {
        toggleCountryError();
        if (!countrySelector.value) {
          isValid = false;
          if (!firstInvalid) countrySelector.focus();
        }
      }

      if (!isValid) {
        if (firstInvalid) firstInvalid.focus();
        e.preventDefault();
      }
    };
  }

  function toggleCountryError() {
    const countryError = $(".custom-error").last();
    if (!countrySelector.value) {
      countryError.show();
    } else {
      countryError.hide();
    }
  }

  $("input").focus(function () {
    $(this).parents(".form-group").addClass("focused");
  });

  $("input").blur(function () {
    $(this).parents(".form-group").removeClass("focused");
  });
});

function toggleError(input) {
  const msgSpan = next(input).nextSibling;
  msgSpan.style.display = (!input.value || input.validity.valid === false) ? "block" : "none";
}

function next(elem) {
  do {
    elem = elem.nextSibling;
  } while (elem && elem.nodeType !== 1);
  return elem;
}

// 3. Tooltip initialization (organize-section)
document.addEventListener("DOMContentLoaded", function () {
  const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
  [...tooltipTriggerList].forEach(
    (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
  );
});

// 4. Owl Carousel (testimonial slider)
$(document).ready(function () {
  $(".owl-carousel").owlCarousel({
    margin: 10,
    nav: true,
    dots: true,
    loop: true,
    navText: [
      "<div class='nav-btn prev-slide'></div>",
      "<div class='nav-btn next-slide'></div>",
    ],
    responsive: {
      0: { items: 1 },
      600: { items: 1, nav: false },
      1000: { items: 1 },
    },
    autoplay: true,
    autoplayTimeout: 10000,
    autoplayHoverPause: true,
  });
});

// 5. Video modal controls (watch-video section)
$('#samplevideo').on('shown.bs.modal', function () {
  const video = document.getElementById('video1');
  if (video) {
    video.currentTime = 0;
    video.play();
  }
});

$('#samplevideo').on('hidden.bs.modal', function () {
  const video = document.getElementById('video1');
  if (video) {
    video.pause();
    video.currentTime = 0;
  }
});

// 6. Google Analytics (footer)
(function (b, o, i, l, e, r) {
  b.GoogleAnalyticsObject = l;
  b[l] ||
    (b[l] = function () {
      (b[l].q = b[l].q || []).push(arguments);
    });
  b[l].l = +new Date();
  e = o.createElement(i);
  r = o.getElementsByTagName(i)[0];
  e.src = "//www.google-analytics.com/analytics.js";
  r.parentNode.insertBefore(e, r);
})(window, document, "script", "ga");
ga("create", "UA-XXXXX-X", "auto");
ga("send", "pageview");
