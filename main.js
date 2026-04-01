const burger = document.querySelector(".burger");
const nav = document.getElementById("main-nav");

burger.addEventListener("click", () => {
  burger.classList.toggle("open");
  nav.classList.toggle("open");
  burger.setAttribute("aria-expanded", nav.classList.contains("open"));
});

document.querySelector("#code-link").addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "code.html";
});

if (window.location.pathname.includes("code.html")) {
  document.body.classList.add("dark-mode");
}
