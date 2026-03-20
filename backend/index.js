import express from "express";
import cors from "cors";
import fs from "fs/promises";
import jwt from "jsonwebtoken";

const app = express();
const PORT = 3000;

const JWT_TOKEN = "secret_key";

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
    const token = jwt.sign({ email }, JWT_TOKEN, { expiresIn: "7d" });
    return res.status(200).json({
      success: true,
      token,
      message: "Login successful",
    });
  }

  return res.status(401).json({
    success: false,
    message: "Invalid credentials",
  });
});

let users = {};
async function readUser() {
  try {
    const data = await fs.readFile("./data/user.json", "utf-8");
    users = JSON.parse(data);
  } catch (err) {
    console.error(err);
  }
}

async function writeUser(newUser) {
  try {
    const data = await fs.readFile("./data/user.json", "utf-8");
    const users = JSON.parse(data);

    Object.assign(users, newUser);

    await fs.writeFile(
      "./data/user.json",
      JSON.stringify(users, null, 2),
      "utf-8",
    );
  } catch (err) {
    console.error(err);
  }
}

app.post("/signup", async (req, res) => {
  const { email, password, phone } = req.body;
  if (!email || !password || !phone) {
    return res.status(401).json({
      success: false,
      message: "All fields are required",
    });
  }

  await readUser();

  if (email in users) {
    return res.status(400).json({
      success: false,
      message: "Email already exist",
    });
  }

  const user = { [email]: { email, phone, password } };
  await writeUser(user);
  return res.status(201).json({
    success: true,
    message: "user registered successfully",
    user,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
