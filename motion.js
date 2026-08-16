document.documentElement.classList.add("motion-ready");

const targets = [
  ...document.querySelectorAll(".section-heading"),
  ...document.querySelectorAll(".project"),
  ...document.querySelectorAll(".background-grid > *"),
  ...document.querySelectorAll(".profile-grid > *"),
];

targets.forEach((element, index) => {
  element.classList.add("reveal");
  element.style.setProperty("--reveal-delay", `${(index % 2) * 90}ms`);
});

if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
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
    { threshold: 0.14, rootMargin: "0px 0px -7% 0px" },
  );

  targets.forEach((element) => observer.observe(element));
}
