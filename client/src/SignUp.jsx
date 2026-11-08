import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

const providerOptions = [
  { value: "doctor", label: "Doctor" },
  { value: "diagnostic_centre", label: "Diagnostic Centre" },
  { value: "pharmacy", label: "Pharmacy" }
];

const initialForm = {
  accountType: "medical_service_provider",
  providerType: "doctor",
  fullName: "",
  organisationName: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: ""
};

export default function SignUp({ onBackToLogin }) {
  const [formData, setFormData] = useState(initialForm);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const isProvider = formData.accountType === "medical_service_provider";

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
    setError("");
    setMessage("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");

    const email = formData.email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (isProvider && !formData.organisationName.trim()) {
      setError("Please enter the provider or organisation name.");
      return;
    }
    if (!isProvider && !formData.fullName.trim()) {
      setError("Please enter your full name.");
      return;
    }
    if (!email) {
      setError("Email address is required.");
      return;
    }
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address, e.g. name@example.com.");
      return;
    }
    if (formData.phone && !/^[+\d()\-\s]{7,20}$/.test(formData.phone)) {
      setError("Please enter a valid phone number.");
      return;
    }
    if (formData.password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const payload = {
      accountType: formData.accountType,
      providerType: isProvider ? formData.providerType : null,
      name: isProvider ? formData.organisationName.trim() : formData.fullName.trim(),
      fullName: isProvider ? null : formData.fullName.trim(),
      organisationName: isProvider ? formData.organisationName.trim() : null,
      email,
      phone: formData.phone.trim(),
      password: formData.password
    };

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Registration could not be completed.");
      setMessage(data.message || "Registration submitted successfully. You can now sign in.");
      setFormData(initialForm);
    } catch (err) {
      setError(err.message || "Could not reach the server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F4FAF7] px-4 py-8 sm:px-6 sm:py-10">
      <div className="mx-auto w-full max-w-2xl rounded-3xl border border-slate-100 bg-white p-6 shadow-xl sm:p-8 md:p-10">
        <div className="mb-8 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-care-700 text-white">
            <span className="text-2xl font-bold">M</span>
          </div>
          <h1 className="mt-4 text-3xl font-bold text-slate-900">Join Medigrids</h1>
          <p className="mt-2 text-sm text-slate-500 sm:text-base">Create an account to connect with the healthcare network.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <div>
            <label htmlFor="accountType" className="mb-2 block text-sm font-medium text-slate-800">Account category</label>
            <select id="accountType" name="accountType" value={formData.accountType} onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700">
              <option value="medical_service_provider">Medical Service Provider</option>
              <option value="general_public">General Public</option>
            </select>
          </div>

          {isProvider ? (
            <>
              <div>
                <label htmlFor="providerType" className="mb-2 block text-sm font-medium text-slate-800">Provider type</label>
                <select id="providerType" name="providerType" value={formData.providerType} onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700">
                  {providerOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="organisationName" className="mb-2 block text-sm font-medium text-slate-800">
                  Provider / organisation name
                </label>
                <input id="organisationName" type="text" name="organisationName" value={formData.organisationName} onChange={handleChange}
                  placeholder="Enter provider or organisation name" required
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700" />
              </div>
            </>
          ) : (
            <div>
              <label htmlFor="fullName" className="mb-2 block text-sm font-medium text-slate-800">Full name</label>
              <input id="fullName" type="text" name="fullName" value={formData.fullName} onChange={handleChange}
                placeholder="Enter your full name" autoComplete="name" required
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700" />
            </div>
          )}

          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-800">Email address</label>
            <input id="email" type="email" name="email" value={formData.email} onChange={handleChange}
              placeholder="you@example.com" autoComplete="email" required
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700" />
          </div>

          <div>
            <label htmlFor="phone" className="mb-2 block text-sm font-medium text-slate-800">Phone number <span className="font-normal text-slate-400">(optional)</span></label>
            <input id="phone" type="tel" name="phone" value={formData.phone} onChange={handleChange}
              placeholder="Enter phone number" autoComplete="tel"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700" />
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-medium text-slate-800">Password</label>
            <input id="password" type="password" name="password" value={formData.password} onChange={handleChange}
              placeholder="Create a password (minimum 8 characters)" autoComplete="new-password" required
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700" />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="mb-2 block text-sm font-medium text-slate-800">Confirm password</label>
            <input id="confirmPassword" type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange}
              placeholder="Re-enter your password" autoComplete="new-password" required
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700" />
          </div>

          {error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
          {message && <p role="status" className="rounded-lg bg-emerald-50 p-3 text-sm text-emerald-800">{message}</p>}

          <button type="submit" disabled={loading}
            className="w-full rounded-xl bg-emerald-800 py-3 font-semibold text-white transition hover:bg-emerald-900 disabled:cursor-wait disabled:opacity-70 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2">
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p className="mt-7 text-center text-sm text-slate-500">
          Already have an account?{" "}
          <button type="button" onClick={onBackToLogin} className="font-semibold text-emerald-800 hover:text-emerald-900">Sign In</button>
        </p>
        <p className="mt-6 text-center text-xs text-slate-400">© {new Date().getFullYear()} Medigrids</p>
      </div>
    </main>
  );
}
