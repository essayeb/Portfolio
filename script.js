/* Rayen Essayeb — Portfolio JavaScript */

const portfolioConfig = {
  email: "malisia224@gmail.com",
  github: "https://github.com/essayeb",
  linkedin: "https://www.linkedin.com/in/rayen-essayeb-8613b0397/",

  projects: [
    {
      name: "Vote Palette",
      description:
        "A voting platform where participants choose colour palettes and explore voting results.",
      technologies: ["PHP", "MySQL", "CSS"],
      category: ["interactive", "web"],
      visual: "vote",
      symbol: "◉",
      url: "https://votepalette.ct.ws/results.php",
      status: "LIVE",
    },
    {
      name: "Vote Produit",
      description:
        "A product voting platform with participant choices and a results interface.",
      technologies: ["PHP", "MySQL", "JavaScript"],
      category: ["interactive", "web"],
      visual: "product",
      symbol: "◇",
      url: "https://voteproduit.gt.tc/index.php#",
      status: "LIVE",
    },
    {
      name: "Smart School",
      description: "A modern school management platform concept.",
      technologies: ["HTML", "CSS", "JavaScript"],
      category: ["web"],
      visual: "school",
      symbol: "▤",
      url: "https://essayeb.github.io/SmartSchool-/",
      status: "IN DEVELOPMENT",
    },
    {
      name: "Eventify",
      description:
        "An event discovery and management platform for finding and organizing events.",
      technologies: ["HTML", "CSS", "JavaScript"],
      category: ["web", "interactive"],
      visual: "event",
      symbol: "✳",
      url: "https://essayeb.github.io/Eventify/",
      status: "IN DEVELOPMENT",
    },
    {
      name: "CodeLearn",
      description:
        "An interactive programming platform for learning languages and practicing coding exercises.",
      technologies: ["HTML", "CSS", "JavaScript"],
      category: ["learning", "interactive"],
      visual: "code",
      symbol: "</>",
      url: "https://essayeb.github.io/CodeLearn/",
      status: "IN DEVELOPMENT",
    },
  ],
};

/* PROJECT CARDS */

const grid = document.querySelector("#projectsGrid");

function createProjectCard(project, index) {
  const card = document.createElement("article");
  card.className = "project-card";
  card.dataset.categories = project.category.join(" ");
  card.style.animationDelay = `${index * 55}ms`;

  const visual = document.createElement("div");
  visual.className = `project-visual visual-${project.visual}`;
  visual.setAttribute("aria-hidden", "true");

  const mock = document.createElement("div");
  mock.className = "mock-window";
  mock.innerHTML = `
      <div class="mock-bar"><i></i><i></i><i></i></div>
      <div class="mock-line short"></div>
      <div class="mock-line accent"></div>
      <div class="mock-line"></div>
      <div class="mock-blocks"><i></i><i></i><i></i></div>
    `;

  const symbol = document.createElement("span");
  symbol.className = "visual-symbol";
  symbol.textContent = project.symbol;

  visual.append(mock, symbol);

  const topline = document.createElement("div");
  topline.className = "project-topline";

  const category = document.createElement("span");
  category.className = "project-category";
  category.textContent = project.category.includes("learning")
    ? "LEARNING PROJECT"
    : project.category.includes("interactive")
    ? "INTERACTIVE WEB"
    : "WEB APPLICATION";

  const number = document.createElement("span");
  number.className = "project-number";
  number.textContent = String(index + 1).padStart(2, "0");

  topline.append(category, number);

  const body = document.createElement("div");
  body.className = "project-body";

  const title = document.createElement("h3");
  title.textContent = project.name;

  const description = document.createElement("p");
  description.textContent = project.description;

  const tech = document.createElement("div");
  tech.className = "project-tech";

  project.technologies.forEach((item) => {
    const tag = document.createElement("span");
    tag.textContent = item;
    tech.append(tag);
  });

  const actions = document.createElement("div");
  actions.className = "project-actions";

  const view = document.createElement("a");
  view.textContent = "View project ";

  const arrow = document.createElement("span");
  arrow.textContent = "↗";
  view.append(arrow);

  if (project.url) {
    view.href = project.url;
    view.target = "_blank";
    view.rel = "noopener noreferrer";
    view.setAttribute("aria-label", `View ${project.name}`);
  } else {
    view.href = "#";
    view.setAttribute("aria-disabled", "true");
    view.title = "Project not published yet.";
  }

  const status = document.createElement("span");
  status.className = "project-status";
  status.textContent = project.status;

  actions.append(view, status);
  body.append(title, description, tech, actions);
  card.append(visual, topline, body);

  return card;
}

/* PROJECT FILTERING */

function renderProjects(filter = "all") {
  if (!grid) return;

  grid.replaceChildren();

  const filtered = portfolioConfig.projects.filter(
    (project) => filter === "all" || project.category.includes(filter)
  );

  filtered.forEach((project, index) => {
    grid.append(createProjectCard(project, index));
  });

  const count = document.querySelector('[data-filter="all"] span');

  if (count) {
    count.textContent = String(portfolioConfig.projects.length).padStart(
      2,
      "0"
    );
  }
}

document.querySelectorAll(".filter-button").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter-button").forEach((item) => {
      item.classList.toggle("active", item === button);
      item.setAttribute("aria-pressed", String(item === button));
    });

    renderProjects(button.dataset.filter);
  });
});

renderProjects();

/* MOBILE NAVIGATION */

const menuToggle = document.querySelector("#menuToggle");
const navLinks = document.querySelector("#navLinks");

menuToggle?.addEventListener("click", () => {
  const open = menuToggle.getAttribute("aria-expanded") !== "true";

  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute(
    "aria-label",
    open ? "Close navigation" : "Open navigation"
  );

  navLinks?.classList.toggle("open", open);
});

navLinks?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
    menuToggle?.setAttribute("aria-label", "Open navigation");
  });
});

/* CONTACT INFORMATION */

/* CONTACT INFORMATION */

const emailButton = document.querySelector("#emailButton");
const emailText = document.querySelector("#emailText");
const githubLink = document.querySelector("#githubLink");
const linkedinLink = document.querySelector("#linkedinLink");

const gmailURL = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
  portfolioConfig.email
)}`;

if (emailButton) {
  emailButton.href = gmailURL;
  emailButton.target = "_blank";
  emailButton.rel = "noopener noreferrer";
}

if (emailText) {
  emailText.href = gmailURL;
  emailText.target = "_blank";
  emailText.rel = "noopener noreferrer";
}

if (githubLink) {
  githubLink.href = portfolioConfig.github;
}

if (linkedinLink) {
  linkedinLink.href = portfolioConfig.linkedin;
}

/* DARK / LIGHT THEME */

const themeButton = document.createElement("button");

themeButton.className = "theme-toggle";
themeButton.type = "button";
themeButton.setAttribute("aria-label", "Switch to light theme");
themeButton.title = "Toggle light / dark theme";
themeButton.textContent = "☼";

document.body.append(themeButton);

const savedTheme = localStorage.getItem("rayen-portfolio-theme");

if (savedTheme === "light") {
  document.documentElement.dataset.theme = "light";
}

function updateThemeButton() {
  const light = document.documentElement.dataset.theme === "light";

  themeButton.textContent = light ? "☾" : "☼";

  themeButton.setAttribute(
    "aria-label",
    light ? "Switch to dark theme" : "Switch to light theme"
  );
}

updateThemeButton();

themeButton.addEventListener("click", () => {
  const light = document.documentElement.dataset.theme !== "light";

  if (light) {
    document.documentElement.dataset.theme = "light";
  } else {
    delete document.documentElement.dataset.theme;
  }

  localStorage.setItem("rayen-portfolio-theme", light ? "light" : "dark");

  updateThemeButton();
});

/* SCROLL TO TOP */

const toTop = document.querySelector("#toTop");

window.addEventListener(
  "scroll",
  () => {
    toTop?.classList.toggle("visible", window.scrollY > 550);
  },
  { passive: true }
);

toTop?.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

/* AUTOMATIC COPYRIGHT YEAR */

const year = document.querySelector("#year");

if (year) {
  year.textContent = new Date().getFullYear();
}

/* SECTION REVEAL ANIMATIONS */

if (
  "IntersectionObserver" in window &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches
) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
    }
  );

  document
    .querySelectorAll(
      ".section-heading, .about-grid, .education-card, .cert-card, .skill-card"
    )
    .forEach((element) => {
      element.classList.add("reveal");
      revealObserver.observe(element);
    });
}
