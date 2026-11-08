import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 4000;

// DEMO ONLY: accounts exist in memory and are cleared when the server restarts.
// Replace this with a database, password hashing, verification and session/JWT handling
// before using real users or any patient/medical information.
const demoAccounts = new Map();
const validAccountTypes = ["medical_service_provider", "general_public"];
const validProviderTypes = ["doctor", "diagnostic_centre", "pharmacy"];

app.use(cors({ origin: process.env.CLIENT_ORIGIN || "http://localhost:5173" }));
app.use(express.json({ limit: "20kb" }));

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "medigrids-demo-api" });
});

app.post("/api/register", (req, res) => {
  const body = req.body || {};
  const { accountType, providerType, name, email, phone, password } = body;
  const validEmail = typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
  const validPassword = typeof password === "string" && password.length >= 8;
  const validType = validAccountTypes.includes(accountType);
  const validProvider = accountType === "general_public" ||
    (accountType === "medical_service_provider" && validProviderTypes.includes(providerType));
  const validName = typeof name === "string" && name.trim().length > 0;

  if (!validEmail || !validPassword || !validType || !validProvider || !validName) {
    return res.status(400).json({ message: "Please provide valid account details and meet the password requirements." });
  }

  const normalizedEmail = email.trim().toLowerCase();
  const accountKey = `${normalizedEmail}:${accountType}:${providerType || "none"}`;
  if (demoAccounts.has(accountKey)) {
    return res.status(409).json({ message: "An account with these details already exists." });
  }

  demoAccounts.set(accountKey, {
    accountType,
    providerType: accountType === "medical_service_provider" ? providerType : null,
    name: name.trim(),
    email: normalizedEmail,
    phone: typeof phone === "string" ? phone.trim() : "",
    // Demo only. Never store plaintext passwords in a real application.
    password
  });

  return res.status(201).json({ message: "Demo account created. You can now sign in." });
});

app.post("/api/login", (req, res) => {
  const { email, password, accountType, providerType } = req.body || {};
  const validEmail = typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
  const validPassword = typeof password === "string" && password.length >= 8;
  const validType = validAccountTypes.includes(accountType);
  const validProvider = accountType === "general_public" ||
    (accountType === "medical_service_provider" && validProviderTypes.includes(providerType));

  if (!validEmail || !validPassword || !validType || !validProvider) {
    return res.status(400).json({ message: "Enter valid login details and select an account category." });
  }

  const normalizedEmail = email.trim().toLowerCase();
  const accountKey = `${normalizedEmail}:${accountType}:${providerType || "none"}`;
  const account = demoAccounts.get(accountKey);

  if (!account || account.password !== password) {
    return res.status(401).json({ message: "Invalid email, password or account category." });
  }

  const { password: _password, ...safeUser } = account;
  return res.json({ message: "Demo sign-in successful", user: safeUser });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Medigrids demo API listening on http://localhost:${PORT}`);
});
