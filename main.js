const burger = document.querySelector(".burger");
const nav = document.getElementById("main-nav");

burger.addEventListener("click", () => {
  burger.classList.toggle("open");
  nav.classList.toggle("open");
  burger.setAttribute("aria-expanded", nav.classList.contains("open"));
});

// Fade in for code.html

if (document.body.id === "code") {
  document.body.style.backgroundColor = "d9d9d9";

  document.addEventListener("DOMContentLoaded", () => {
    document.body.style.transition = "background-color 1.5s";
    document.body.style.backgroundColor = "black";
  });
}
