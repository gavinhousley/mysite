const burger = document.querySelector(".burger");
const nav = document.getElementById("main-nav");

burger.addEventListener("click", () => {
  burger.classList.toggle("open");
  nav.classList.toggle("open");
  burger.setAttribute("aria-expanded", nav.classList.contains("open"));
});
