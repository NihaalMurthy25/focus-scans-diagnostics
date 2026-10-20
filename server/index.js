import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ origin: process.env.CLIENT_ORIGIN || "http://localhost:5173" }));
app.use(express.json({ limit: "20kb" }));

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "carewell-demo-api" });
});

app.post("/api/login", (req, res) => {
  const { email, password, role } = req.body || {};
  const validEmail = typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validPassword = typeof password === "string" && password.length >= 6;
  const validRole = role === "doctor" || role === "customer";

  if (!validEmail || !validPassword || !validRole) {
    return res.status(400).json({
      message: "Enter a valid email, a password of at least 6 characters, and choose an account type."
    });
  }

  // Demo only: this endpoint does not authenticate against real accounts.
  return res.json({
    message: "Demo sign-in successful",
    user: { email, role }
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Carewell demo API listening on http://localhost:${PORT}`);
});