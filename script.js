/* ================================
   Naushin Sayyed Portfolio JS
   ================================ */

const body = document.body;
const navbar = document.querySelector(".navbar");
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const themeBtn = document.getElementById("themeBtn");
const typingText = document.getElementById("typingText");


// --------------------------------
// Typing animation
// --------------------------------

const typingWords = [
    "Data Engineer • Data Analyst",
    "SQL • Python • Power BI",
    "Snowflake • DBT • AWS"
   
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
    const currentWord = typingWords[wordIndex];

    if (!deleting) {
        typingText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentWord.length) {
            deleting = true;
            setTimeout(typeEffect, 1400);
            return;
        }
    } else {
        typingText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
            deleting = false;
            wordIndex = (wordIndex + 1) % typingWords.length;
        }
    }

    setTimeout(typeEffect, deleting ? 35 : 75);
}

typeEffect();


// --------------------------------
// Mobile navigation
// --------------------------------

menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("show");

    const isOpen = navLinks.classList.contains("show");
    menuBtn.textContent = isOpen ? "✕" : "☰";
});

document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("show");
        menuBtn.textContent = "☰";
    });
});


// --------------------------------
// Navbar scroll effect
// --------------------------------

window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 40);
});


// --------------------------------
// Reveal elements on scroll
// --------------------------------

const revealObserver = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                revealObserver.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.12
    }
);

document.querySelectorAll(".reveal").forEach(element => {
    revealObserver.observe(element);
});


// --------------------------------
// Active navigation link
// --------------------------------

const sections = document.querySelectorAll("main section[id]");
const navItems = document.querySelectorAll(".nav-link");

const sectionObserver = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navItems.forEach(link => link.classList.remove("active"));

                const activeLink = document.querySelector(
                    `.nav-link[href="#${entry.target.id}"]`
                );

                if (activeLink) {
                    activeLink.classList.add("active");
                }
            }
        });
    },
    {
        rootMargin: "-35% 0px -55% 0px"
    }
);

sections.forEach(section => sectionObserver.observe(section));


// --------------------------------
// Dark / Light mode
// --------------------------------

const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "light") {
    body.classList.add("light");
    themeBtn.textContent = "☀️";
}

themeBtn.addEventListener("click", () => {
    body.classList.toggle("light");

    const isLight = body.classList.contains("light");

    themeBtn.textContent = isLight ? "☀️" : "🌙";
    localStorage.setItem(
        "portfolio-theme",
        isLight ? "light" : "dark"
    );
});


// --------------------------------
// Project details modal
// --------------------------------

const projectData = {
    cloudmart: {
        type: "DATA ENGINEERING",
        title: "CloudMart Analytics",
        description:
            "An end-to-end e-commerce data project using AWS S3, Snowflake, DBT Cloud, SQL and Power BI. The project focuses on moving raw data through ingestion, transformation and analytics stages to produce useful business insights.",
        tech: ["AWS S3", "Snowflake", "DBT Cloud", "SQL", "Power BI"]
    },

    sales: {
        type: "BUSINESS INTELLIGENCE",
        title: "Sales Performance Dashboard",
        description:
            "An interactive Power BI dashboard designed to analyze sales performance, trends and key business metrics. The dashboard focuses on making data easier to explore and communicate.",
        tech: ["Power BI", "Excel", "SQL"]
    },

    jobs: {
        type: "DATA ANALYTICS",
        title: "Job Analytics",
        description:
            "A job-market analytics project involving data cleaning, filtering, transformation and visualization. The project uses Python and Tableau to explore patterns within job-related data.",
        tech: ["Python", "Pandas", "NumPy", "Tableau"]
    },

    dbt: {
        type: "DATA TRANSFORMATION",
        title: "DBT + Snowflake Analytics",
        description:
            "A structured analytics project using DBT Cloud and Snowflake. It includes staging models, analytical marts, schema tests and SQL transformations designed to create reliable data models.",
        tech: ["DBT Cloud", "Snowflake", "SQL", "YAML"]
    }
};

const modal = document.getElementById("projectModal");
const modalOverlay = document.getElementById("modalOverlay");
const modalClose = document.getElementById("modalClose");
const modalType = document.getElementById("modalType");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalTech = document.getElementById("modalTech");

function openProjectModal(projectKey) {
    const project = projectData[projectKey];

    if (!project) return;

    modalType.textContent = project.type;
    modalTitle.textContent = project.title;
    modalDescription.textContent = project.description;

    modalTech.innerHTML = project.tech
        .map(tech => `<span>${tech}</span>`)
        .join("");

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    body.style.overflow = "hidden";
}

function closeProjectModal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    body.style.overflow = "";
}

document.querySelectorAll(".project-details-btn").forEach(button => {
    button.addEventListener("click", () => {
        openProjectModal(button.dataset.project);
    });
});

modalClose.addEventListener("click", closeProjectModal);
modalOverlay.addEventListener("click", closeProjectModal);

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeProjectModal();
    }
});


// --------------------------------
// Prevent empty project links
// --------------------------------

document.querySelectorAll('a[href="#"]').forEach(link => {
    link.addEventListener("click", event => {
        event.preventDefault();
        alert("Add your real project or dashboard link here.");
    });
});
