const darkMode = document.querySelector('[data-js="darkMode"]');

darkMode.addEventListener("click", () => {
  if (darkMode.checked) {
    document.body.classList.add("dark-mode");
  } else {
    document.body.classList.remove("dark-mode");
  }
});
