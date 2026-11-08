import React, { useState } from "react";
import SignUp from "./SignUp";
import {
  Activity, ArrowRight, Eye, EyeOff, HeartPulse, LockKeyhole,
  Mail, ShieldCheck, Stethoscope, UserRound, CalendarDays,
  ClipboardList, LogOut, CheckCircle2, Building2, Pill
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

const providerTypes = [
  { value: "doctor", label: "Doctor", description: "Individual medical professionals", Icon: Stethoscope },
  { value: "diagnostic_centre", label: "Diagnostic Centre", description: "Labs and diagnostic facilities", Icon: Building2 },
  { value: "pharmacy", label: "Pharmacy", description: "Pharmacies and medicine providers", Icon: Pill }
];

function Brand() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-care-700 text-white">
        <HeartPulse size={25} />
      </div>
      <div>
        <div className="text-2xl font-extrabold tracking-tight text-care-900">Medigrids</div>
        <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">Connected healthcare</div>
      </div>
    </div>
  );
}

export function LoginPage({ onLogin, onSignUp }) {
  const [accountType, setAccountType] = useState("general_public");
  const [providerType, setProviderType] = useState("doctor");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setNotice("");
    const trimmedEmail = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmedEmail, password, accountType, providerType: accountType === "medical_service_provider" ? providerType : null, remember })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Unable to sign in. Please try again.");
      onLogin(data.user);
    } catch (err) {
      setError(err.message || "Could not reach the server. Please check that the API is running.");
    } finally {
      setLoading(false);
    }
  }

  const selectedProvider = providerTypes.find((item) => item.value === providerType);

  return (
    <main className="min-h-screen bg-[#f5faf8] px-4 py-5 sm:px-6 lg:px-10 lg:py-8">
      <div className="mx-auto flex min-h-[calc(100vh-2.5rem)] max-w-7xl flex-col">
        <header className="flex items-center justify-between">
          <Brand />
          <div className="hidden items-center gap-2 rounded-full border border-care-100 bg-white px-4 py-2 text-xs font-semibold text-slate-600 sm:flex">
            <ShieldCheck size={16} className="text-care-600" /> Private & secure experience
          </div>
        </header>

        <section className="my-auto grid flex-1 items-center gap-10 py-8 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16 lg:py-12">
          <div className="relative hidden min-h-[620px] overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#10463d] via-[#126b59] to-[#19a78a] p-10 text-white shadow-soft lg:flex lg:flex-col lg:justify-between xl:p-14">
            <div className="absolute -right-24 -top-20 h-80 w-80 rounded-full border border-white/10" />
            <div className="absolute -bottom-28 -left-20 h-80 w-80 rounded-full bg-white/[0.06]" />
            <div className="relative z-10">
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold text-white/90">
                <Activity size={15} /> One connected healthcare network
              </div>
              <h1 className="max-w-lg text-5xl font-bold leading-[1.12] tracking-tight xl:text-[3.5rem]">
                Better care starts with <span className="text-[#9ef0d6]">being connected.</span>
              </h1>
              <p className="mt-6 max-w-md text-base leading-7 text-white/75">
                A shared healthcare platform connecting medical service providers and the general public.
              </p>
            </div>
            <div className="relative z-10 rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-white/15 p-3"><HeartPulse size={22} /></div>
                <div>
                  <div className="font-semibold">One platform, connected services</div>
                  <div className="mt-1 text-sm leading-6 text-white/70">For doctors, diagnostic centres, pharmacies and individuals.</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mx-auto w-full max-w-[500px]">
            <div className="mb-8 lg:hidden">
              <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">Welcome to Medigrids.</h1>
              <p className="mt-2 text-sm leading-6 text-slate-500">One place to connect your healthcare journey.</p>
            </div>
            <div className="rounded-[1.75rem] border border-slate-100 bg-white p-6 shadow-[0_20px_65px_rgba(15,68,57,0.08)] sm:p-9">
              <div className="mb-7">
                <p className="text-sm font-bold text-care-700">WELCOME BACK</p>
                <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-[2rem]">Sign in to Medigrids</h2>
                <p className="mt-2 text-sm leading-6 text-slate-500">Select your account category to continue.</p>
              </div>

              <div className="mb-5 grid grid-cols-2 gap-3">
                <button type="button" onClick={() => { setAccountType("general_public"); setError(""); }}
                  className={`rounded-xl border p-3 text-left transition ${accountType === "general_public" ? "border-care-300 bg-care-50 text-care-900 ring-1 ring-care-100" : "border-slate-200 text-slate-600 hover:bg-slate-50"}`}>
                  <UserRound size={20} className="mb-2" />
                  <span className="block text-sm font-bold">General Public</span>
                  <span className="mt-1 block text-xs text-slate-500">Patient / Individual</span>
                </button>
                <button type="button" onClick={() => { setAccountType("medical_service_provider"); setError(""); }}
                  className={`rounded-xl border p-3 text-left transition ${accountType === "medical_service_provider" ? "border-care-300 bg-care-50 text-care-900 ring-1 ring-care-100" : "border-slate-200 text-slate-600 hover:bg-slate-50"}`}>
                  <HeartPulse size={20} className="mb-2" />
                  <span className="block text-sm font-bold">Medical Service Provider</span>
                  <span className="mt-1 block text-xs text-slate-500">Healthcare organisation</span>
                </button>
              </div>

              {accountType === "medical_service_provider" && (
                <div className="mb-6">
                  <label htmlFor="providerType" className="mb-2 block text-sm font-semibold text-slate-700">Provider type</label>
                  <select id="providerType" value={providerType} onChange={(e) => setProviderType(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none focus:border-care-600 focus:ring-2 focus:ring-care-100">
                    {providerTypes.map((type) => <option key={type.value} value={type.value}>{type.label}</option>)}
                  </select>
                  <p className="mt-2 text-xs text-slate-500">{selectedProvider.description}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-semibold text-slate-700">Email address</label>
                  <div className="field-wrap">
                    <Mail size={18} className="shrink-0 text-slate-400" />
                    <input id="email" type="email" autoComplete="email" placeholder="you@example.com" value={email}
                      onChange={(e) => { setEmail(e.target.value); setError(""); }} className="field-input" required />
                  </div>
                </div>
                <div>
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <label htmlFor="password" className="block text-sm font-semibold text-slate-700">Password</label>
                    <button type="button" onClick={() => { setNotice("Password reset is not connected yet."); setError(""); }} className="text-xs font-bold text-care-700 hover:text-care-900">Forgot password?</button>
                  </div>
                  <div className="field-wrap">
                    <LockKeyhole size={18} className="shrink-0 text-slate-400" />
                    <input id="password" type={showPassword ? "text" : "password"} autoComplete="current-password" placeholder="Enter your password" value={password}
                      onChange={(e) => { setPassword(e.target.value); setError(""); }} className="field-input" required minLength={6} />
                    <button type="button" aria-label={showPassword ? "Hide password" : "Show password"} onClick={() => setShowPassword((v) => !v)} className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700">
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                <label className="flex cursor-pointer items-center gap-2.5 text-sm text-slate-500">
                  <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="h-4 w-4 rounded border-slate-300 accent-care-600" />
                  Keep me signed in
                </label>
                {error && <div role="alert" className="rounded-xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm leading-5 text-rose-700">{error}</div>}
                {notice && <div role="status" className="rounded-xl border border-amber-100 bg-amber-50 px-4 py-3 text-sm leading-5 text-amber-800">{notice}</div>}
                <button type="submit" disabled={loading} className="flex min-h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-care-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-care-600/20 transition hover:bg-care-700 disabled:cursor-wait disabled:opacity-70">
                  {loading ? "Signing you in..." : "Sign in"} {!loading && <ArrowRight size={17} />}
                </button>
              </form>
              <div className="mt-6 text-center text-sm text-slate-500">
                Don't have an account?{" "}
                <button type="button" onClick={onSignUp} className="font-bold text-care-700 hover:text-care-900">Create an account</button>
              </div>
              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400">
                <ShieldCheck size={15} className="text-care-600" /> Your information should be handled securely.
              </div>
            </div>
            <p className="mt-5 text-center text-xs leading-5 text-slate-400">Demo portal · Do not enter real patient or medical information.</p>
          </div>
        </section>
        <footer className="flex flex-col items-center justify-between gap-2 border-t border-slate-200/70 py-5 text-xs text-slate-400 sm:flex-row">
          <span>© {new Date().getFullYear()} Medigrids. All rights reserved.</span>
          <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-care-500" /> Connected healthcare</span>
        </footer>
      </div>
    </main>
  );
}

function Dashboard({ user, onLogout }) {
  const provider = user.accountType === "medical_service_provider";
  const providerLabel = providerTypes.find((item) => item.value === user.providerType)?.label;
  return (
    <main className="min-h-screen bg-[#f5faf8]">
      <header className="border-b border-slate-100 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Brand />
          <button onClick={onLogout} className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-700">
            <LogOut size={16} /><span className="hidden sm:inline">Sign out</span>
          </button>
        </div>
      </header>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="mb-9 rounded-3xl bg-gradient-to-r from-care-900 to-care-600 p-7 text-white sm:p-10">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold"><CheckCircle2 size={14} /> Demo sign-in successful</div>
          <p className="text-sm font-medium text-white/70">{provider ? "MEDICAL SERVICE PROVIDER" : "GENERAL PUBLIC"}</p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">Welcome to Medigrids.</h1>
          <p className="mt-3 max-w-2xl break-words text-sm leading-6 text-white/75">Signed in as {user.email}. Account: {provider ? providerLabel : "General Public"}.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {(provider ? [
            { icon: CalendarDays, title: "Appointments", value: "—", note: "Provider schedule" },
            { icon: UserRound, title: "Service users", value: "—", note: "Connected users" },
            { icon: ClipboardList, title: "Provider profile", value: "—", note: "Organisation details" }
          ] : [
            { icon: CalendarDays, title: "Appointments", value: "—", note: "Your upcoming visits" },
            { icon: ClipboardList, title: "Health records", value: "—", note: "Your saved records" },
            { icon: HeartPulse, title: "Care overview", value: "—", note: "Your health space" }
          ]).map(({ icon: Icon, title, value, note }) => (
            <div key={title} className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <div className="rounded-xl bg-care-50 p-3 text-care-700 inline-flex"><Icon size={21} /></div>
              <p className="mt-6 text-sm font-semibold text-slate-500">{title}</p>
              <p className="mt-1 text-3xl font-extrabold text-slate-900">{value}</p>
              <p className="mt-2 text-sm text-slate-400">{note}</p>
            </div>
          ))}
        </div>
        <p className="mt-7 rounded-2xl border border-dashed border-care-200 bg-white/70 p-6 text-sm leading-6 text-slate-500">This is a placeholder dashboard. Real provider and patient workflows still need to be implemented.</p>
      </div>
    </main>
  );
}

export default function App() {
  const [user, setUser] = useState(null);
  const [showSignUp, setShowSignUp] = useState(false);
  if (user) return <Dashboard user={user} onLogout={() => setUser(null)} />;
  if (showSignUp) return <SignUp onBackToLogin={() => setShowSignUp(false)} />;
  return <LoginPage onLogin={setUser} onSignUp={() => setShowSignUp(true)} />;
}
