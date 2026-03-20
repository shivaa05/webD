const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const phoneInput = document.querySelector("#phone");
const signupForm = document.querySelector(".signup");
const emailError = document.getElementById("emailError")
const passwordError = document.getElementById("passwordError")
const phoneError = document.getElementById("phoneError")

function isWeakPassword(password) {
  const minLength = 8;

  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const hasMinLength = password.length >= minLength;

  if (hasUppercase && hasLowercase && hasNumber && hasSpecial && hasMinLength) {
    return false;
  }

  return true;
}


signupForm.addEventListener("submit", async(e) => {
  e.preventDefault();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  const phone = phoneInput.value.trim();

  console.log(password)
  let isValid = true;
  // email validation
  if (email == "") {
    emailError.innerHTML = "Email is required";
    emailError.style.display = "block"
    isValid = false;
  }
  else if (!email.includes("@")) {
    isValid = false;
    emailError.innerHTML="Enter a valid email"
    emailError.style.display = "block"
  }
  else {
    emailError.style.display = "none"
  }

  // Password validation
  if (password == "") {
    passwordError.style.display = "block"
    passwordError.innerHTML = "Password is required";
    isValid = false;
  }
  else if (isWeakPassword(password)) {
    isValid = false;
    passwordError.style.display = "block"
    passwordError.innerHTML="Enter Strong password"
  }
  else {
    passwordError.style.display = "none"
  }

  // phone validation
  if (phone == ""){
    isValid = false;
    phoneError.style.display = "block";
    phoneError.innerHTML = "Phone number is required";
  }
  else if (phone.length != 10) {
    isValid = false
    phoneError.style.display="block"
    phoneError.innerHTML = "Enter a valid Phone number"
  } else {
    phoneError.style.display="none"
  }
  

  if (isValid) {
    console.log("object")
    const response = await fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password,phone }),
    });
    const data = await response.json();
    console.log(data)
    alert(data.message);
    if (data.success) {
      const username = email.split("@")[0];
      console.log(username);
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("username", username);
      window.location.href =
        "http://127.0.0.1:5500/WebD/frontend/dashboard.html";
    }
  }
});
