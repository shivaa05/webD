const usernameInput = document.querySelector("#username");
const passwordInput = document.querySelector("#password");
const form = document.querySelector("#loginform");
const errorPassword = document.querySelector("#errorPassword");
const errorUsername = document.querySelector("#errorUsername");

let username = "";
let password = "";

usernameInput.addEventListener("input", () => {
  username = usernameInput.value.trim();

  if (username !== "") {
    errorUsername.style.display = "none";
    usernameInput.style.border = "none";
  }
});

passwordInput.addEventListener("input", () => {
  password = passwordInput.value.trim();

  if (password !== "") {
    errorPassword.style.display = "none";
    passwordInput.style.border = "none";
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  console.log("Username: ",username)
  console.log("Password: ",password)

  if (username === "") {
    errorUsername.style.display = "block";
    usernameInput.style.border = "1px solid tomato";
  }

  if (password === "") {
    errorPassword.style.display = "block";
    passwordInput.style.border = "1px solid tomato";
  }
});
