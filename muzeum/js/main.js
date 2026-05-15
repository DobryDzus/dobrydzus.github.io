const burger = document.querySelector(".burger");
const nav = document.querySelector(".site-nav");
const navLinks = document.querySelectorAll(".site-nav a");

if (burger && nav) {
  burger.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    burger.setAttribute("aria-expanded", String(isOpen));
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    nav?.classList.remove("open");
    burger?.setAttribute("aria-expanded", "false");
  });
});

const countdown = document.querySelector(".countdown");
const targetAttr = countdown?.getAttribute("data-target");
const targetDate = targetAttr ? new Date(targetAttr) : new Date();

if (!targetAttr) {
  targetDate.setDate(targetDate.getDate() + 12);
}

timerTick();
setInterval(timerTick, 1000);

function timerTick() {
  const now = new Date();
  const diff = Math.max(targetDate - now, 0);

  const seconds = Math.floor(diff / 1000) % 60;
  const minutes = Math.floor(diff / (1000 * 60)) % 60;
  const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  setText("days", days);
  setText("hours", hours);
  setText("minutes", minutes);
  setText("seconds", seconds);
}

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) {
    el.textContent = String(value).padStart(2, "0");
  }
}

const track = document.querySelector(".carousel-track");
const slides = document.querySelectorAll(".carousel-slide");
const dots = document.querySelectorAll(".dot");
let currentSlide = 0;

function updateCarousel(index) {
  if (!track) return;
  currentSlide = (index + slides.length) % slides.length;
  track.style.transform = `translateX(-${currentSlide * 100}%)`;
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === currentSlide);
  });
}

document.querySelector(".carousel-btn.prev")?.addEventListener("click", () => {
  updateCarousel(currentSlide - 1);
});

document.querySelector(".carousel-btn.next")?.addEventListener("click", () => {
  updateCarousel(currentSlide + 1);
});

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => updateCarousel(index));
});

const steps = document.querySelectorAll(".step");
steps.forEach((btn) => {
  btn.addEventListener("click", () => {
    const input = btn.parentElement?.querySelector("input");
    if (!input) return;
    const step = Number(btn.dataset.step || 0);
    const next = Math.min(20, Math.max(1, Number(input.value) + step));
    input.value = String(next);
  });
});

const accordionItems = document.querySelectorAll(".accordion-item");
accordionItems.forEach((item) => {
  item.addEventListener("click", () => {
    const panel = item.nextElementSibling;
    const isOpen = panel?.classList.contains("open");

    accordionItems.forEach((other) => {
      const otherPanel = other.nextElementSibling;
      other.setAttribute("aria-expanded", "false");
      otherPanel?.classList.remove("open");
      other.querySelector(".chevron")?.replaceChildren("v");
    });

    if (!isOpen) {
      item.setAttribute("aria-expanded", "true");
      panel?.classList.add("open");
      item.querySelector(".chevron")?.replaceChildren("^");
    }
  });
});

const form = document.getElementById("booking-form");
const statusEl = document.getElementById("form-status");

if (form) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(form);

    try {
      const response = await fetch(form.getAttribute("action") || "form.php", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (statusEl) {
        statusEl.textContent = data.message || "Booking submitted.";
      }
      if (data.ok) {
        form.reset();
      }
    } catch (error) {
      if (statusEl) {
        statusEl.textContent = "Submission failed. Please try again.";
      }
    }
  });
}

const revealItems = document.querySelectorAll(
  ".section, .hero, .banner, .site-footer, .premium-info, .carousel"
);

revealItems.forEach((item, index) => {
  item.classList.add("reveal");
  if (index % 3 === 1) {
    item.classList.add("reveal-delay-1");
  }
  if (index % 3 === 2) {
    item.classList.add("reveal-delay-2");
  }
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealItems.forEach((item) => revealObserver.observe(item));

const expositionsList = document.getElementById("expositions-list");
const expositionsStatus = document.getElementById("expositions-status");

if (expositionsList) {
  fetch("exhibitions.php")
    .then((response) => response.json())
    .then((result) => {
      if (result.ok && result.data) {
        expositionsList.innerHTML = result.data
          .map((item) => {
            return `
              <article class="card">
                <img class="card-image" src="${item.image}" alt="${item.title}" />
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                <div class="card-meta">
                  <span>${item.category}</span>
                  <span>${item.price}</span>
                </div>
                <a class="outline" href="#visit">learn more</a>
              </article>
            `;
          })
          .join("");
        if (expositionsStatus) {
          expositionsStatus.textContent = "";
        }
      } else {
        throw new Error("Invalid format");
      }
    })
    .catch(() => {
      if (expositionsStatus) {
        expositionsStatus.textContent = "Unable to load expositions.";
      }
    });
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const next = text[i + 1];

    if (char === '"' && inQuotes && next === '"') {
      current += '"';
      i += 1;
    } else if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === "," && !inQuotes) {
      row.push(current.trim());
      current = "";
    } else if ((char === "\n" || char === "\r") && !inQuotes) {
      if (current || row.length) {
        row.push(current.trim());
        rows.push(row);
        row = [];
        current = "";
      }
    } else {
      current += char;
    }
  }

  if (current || row.length) {
    row.push(current.trim());
    rows.push(row);
  }

  return rows.filter((line) => line.length && line.some((cell) => cell.length));
}
