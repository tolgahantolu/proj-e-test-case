// selecting elements
const input = document.querySelector("input");
const inputPlaceholder = document.querySelector(".navbar__placeholder");

input.addEventListener("focus", () => {
  inputPlaceholder.classList.add("d-none");
});
input.addEventListener("focusout", () => {
  inputPlaceholder.classList.remove("d-none");
  inputPlaceholder.classList.add("d-flex");
});
