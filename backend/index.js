import express from "express";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log(email, password);

  if (!email || !password) {
    return res.status(401).json({
      success: false,
      message: "Email and password required",
    });
  }

  if (email === "shiva@gmail.com" && password === "1234") {
    return res.status(200).json({
      success: true,
      message: "Login successful",
    });
  }

  return res.status(401).json({
    success: false,
    message: "Invalid credentials",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
