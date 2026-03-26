const burger = document.querySelector(".burger");
const nav = document.getElementById("main-nav");

burger.addEventListener("click", () => {
  burger.classList.toggle("open");
  nav.classList.toggle("open");
  burger.setAttribute("aria-expanded", nav.classList.contains("open"));
});

document.querySelector("#code-link").addEventListener("click", (e) => {
  e.preventDefault();
  document.querySelector("nav").style.color = "white";
  document.body.style.transition = "background-color 2s";
  document.body.style.backgroundColor = "black";
  document.body.style.color = "white";
});
