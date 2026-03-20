const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const form = document.querySelector("#loginform");
const errorPassword = document.querySelector("#errorPassword");
const erroremail = document.querySelector("#erroremail");
const currentPage = window.location.pathname;
const ls = localStorage.getItem("isLoggedIn");

if (currentPage.includes("/login.html") && ls)
  window.location.href = "http://127.0.0.1:5500/WebD/frontend/dashboard.html";

let email = "";
let password = "";

emailInput.addEventListener("input", () => {
  email = emailInput.value.trim();

  if (email !== "") {
    erroremail.style.display = "none";
    emailInput.style.border = "none";
  }
});

passwordInput.addEventListener("input", () => {
  password = passwordInput.value.trim();

  if (password !== "") {
    errorPassword.style.display = "none";
    passwordInput.style.border = "none";
  }
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  console.log("email: ", email);
  console.log("Password: ", password);
  let isValid = true;
  if (email === "") {
    erroremail.style.display = "block";
    emailInput.style.border = "1px solid tomato";
    isValid = false;
  }

  if (password === "") {
    errorPassword.style.display = "block";
    passwordInput.style.border = "1px solid tomato";
    isValid = false;
  }

  if (isValid) {
    console.log("Form is Valid");

    const formData = {
      email,
      password,
    };
    console.log("Form data: ", formData);
  }

  try {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    console.log(data)
    alert(data.message);
    if (data.success) {
      const username = email.split("@")[0];
      console.log(username);
      localStorage.setItem("isLoggedIn", data.token);
      localStorage.setItem("username", username);
      window.location.href =
        "http://127.0.0.1:5500/WebD/frontend/dashboard.html";
    }
  } catch (error) {
    alert("Internal server error");
    console.log("error in login", error);
  }
});
