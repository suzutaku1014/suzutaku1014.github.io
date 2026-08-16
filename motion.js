document.documentElement.classList.add("motion-ready");

const navigation = document.querySelector(".nav");
const updateNavigation = () => navigation?.classList.toggle("is-scrolled", window.scrollY > 48);
updateNavigation();
window.addEventListener("scroll", updateNavigation, { passive: true });

const targets = [
  ...document.querySelectorAll(".section-heading"),
  ...document.querySelectorAll(".about-grid > *"),
  ...document.querySelectorAll(".project"),
  ...document.querySelectorAll(".experience-grid > *"),
  ...document.querySelectorAll(".skill-group"),
  ...document.querySelectorAll(".profile-intro > *"),
  ...document.querySelectorAll(".timeline-item"),
  ...document.querySelectorAll(".contact-grid > *"),
];

targets.forEach((element, index) => {
  element.classList.add("reveal");
  element.style.setProperty("--reveal-delay", `${(index % 3) * 70}ms`);
});

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!("IntersectionObserver" in window) || reducedMotion) {
  targets.forEach((element) => element.classList.add("is-visible"));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -7% 0px" },
  );

  targets.forEach((element) => observer.observe(element));
}
