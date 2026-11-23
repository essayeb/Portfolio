/* Rayen Essayeb — JavaScript du portfolio */

const portfolioConfig = {
  email: "malisia224@gmail.com",
  github: "https://github.com/essayeb",
  linkedin: "https://www.linkedin.com/in/rayen-essayeb-8613b0397/",

  projects: [
    {
      name: "Smart School",
      description: "Un concept moderne de plateforme de gestion scolaire.",
      technologies: ["HTML", "CSS", "JavaScript"],
      category: ["web"],
      visual: "school",
      symbol: "▤",
      url: "https://essayeb.github.io/SmartSchool-/",
      status: "EN DÉVELOPPEMENT",
    },
    {
      name: "Eventify",
      description:
        "Une plateforme de découverte et de gestion d’événements permettant de trouver et d’organiser des événements.",
      technologies: ["HTML", "CSS", "JavaScript"],
      category: ["web", "interactive"],
      visual: "event",
      symbol: "✳",
      url: "https://essayeb.github.io/Eventify/",
      status: "EN DÉVELOPPEMENT",
    },
    {
      name: "CodeLearn",
      description:
        "Une plateforme interactive d’apprentissage de la programmation proposant des langages et des exercices pratiques.",
      technologies: ["HTML", "CSS", "JavaScript"],
      category: ["learning", "interactive"],
      visual: "code",
      symbol: "</>",
      url: "https://essayeb.github.io/CodeLearn/",
      status: "EN DÉVELOPPEMENT",
    },
    {
      name: "Vote Palette",
      description:
        "Une plateforme de vote permettant aux participants de choisir des palettes de couleurs et de consulter les résultats.",
      technologies: ["PHP", "MySQL", "CSS"],
      category: ["interactive", "web"],
      visual: "vote",
      symbol: "◉",
      url: "https://votepalette.ct.ws/index.php",
      status: "EN LIGNE",
    },
    {
      name: "Vote Produit",
      description:
        "Une plateforme de vote de produits permettant aux participants de faire leurs choix et de consulter les résultats.",
      technologies: ["PHP", "MySQL", "JavaScript"],
      category: ["interactive", "web"],
      visual: "product",
      symbol: "◇",
      url: "https://voteproduit.gt.tc/index.php#",
      status: "EN LIGNE",
    },
  ],
};

/* CARTES DES PROJETS */

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
    ? "PROJET D’APPRENTISSAGE"
    : project.category.includes("interactive")
    ? "APPLICATION WEB INTERACTIVE"
    : "APPLICATION WEB";

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
  view.textContent = "Voir le projet ";

  const arrow = document.createElement("span");
  arrow.textContent = "↗";
  view.append(arrow);

  if (project.url) {
    view.href = project.url;
    view.target = "_blank";
    view.rel = "noopener noreferrer";
    view.setAttribute("aria-label", `Voir le projet ${project.name}`);
  } else {
    view.href = "#";
    view.setAttribute("aria-disabled", "true");
    view.title = "Ce projet n’est pas encore publié.";
  }

  const status = document.createElement("span");
  status.className = "project-status";
  status.textContent = project.status;

  actions.append(view, status);
  body.append(title, description, tech, actions);
  card.append(visual, topline, body);

  return card;
}

/* FILTRAGE DES PROJETS */

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

/* NAVIGATION SUR MOBILE */

const menuToggle = document.querySelector("#menuToggle");
const navLinks = document.querySelector("#navLinks");

menuToggle?.addEventListener("click", () => {
  const open = menuToggle.getAttribute("aria-expanded") !== "true";

  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute(
    "aria-label",
    open ? "Fermer le menu de navigation" : "Ouvrir le menu de navigation"
  );

  navLinks?.classList.toggle("open", open);
});

navLinks?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
    menuToggle?.setAttribute("aria-label", "Ouvrir le menu de navigation");
  });
});

/* COORDONNÉES */

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

/* THÈME SOMBRE / CLAIR */

const themeButton = document.createElement("button");

themeButton.className = "theme-toggle";
themeButton.type = "button";
themeButton.setAttribute("aria-label", "Passer au thème clair");
themeButton.title = "Basculer entre le thème clair et le thème sombre";
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
    light ? "Passer au thème sombre" : "Passer au thème clair"
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

/* RETOUR EN HAUT DE PAGE */

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

/* ANNÉE AUTOMATIQUE DU DROIT D’AUTEUR */

const year = document.querySelector("#year");

if (year) {
  year.textContent = new Date().getFullYear();
}

/* ANIMATIONS D’APPARITION DES SECTIONS */

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


