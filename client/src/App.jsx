import React, { useState } from "react";
import {
  Activity, ArrowRight, Eye, EyeOff, HeartPulse, LockKeyhole,
  Mail, ShieldCheck, Stethoscope, UserRound, CalendarDays,
  ClipboardList, LogOut, CheckCircle2, Menu
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

function Brand() {
  return (
    <div className="flex items-center">
      <img
        src="/focus-logo.png"
        alt="Focus Scans and Diagnostics"
        className="h-auto w-[190px] max-w-full object-contain sm:w-[230px]"
      />
    </div>
  );
}

function LoginPage({ onLogin }) {
  const [role, setRole] = useState("customer");
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
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid email address to continue.");
      return;
    }
    if (password.length < 6) {
      setError("Your password must contain at least 6 characters.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role, remember })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Unable to sign in. Please try again.");
      onLogin(data.user);
    } catch (err) {
      setError(err.message || "Could not reach the server. Make sure the Node.js server is running.");
    } finally {
      setLoading(false);
    }
  }

  function handleForgot() {
    setNotice("Password reset is a demo-only feature and has not been connected yet.");
    setError("");
  }

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
            <div className="absolute -right-24 -top-20 h-80 w-80 rounded-full border-[1px] border-white/10" />
            <div className="absolute -right-8 -top-4 h-48 w-48 rounded-full border-[1px] border-white/10" />
            <div className="absolute -bottom-28 -left-20 h-80 w-80 rounded-full bg-white/[0.06]" />
            <div className="relative z-10">
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold text-white/90">
                <Activity size={15} /> Scans and diagnostics, made simpler
              </div>
              <h1 className="max-w-lg text-5xl font-bold leading-[1.12] tracking-tight xl:text-[3.5rem]">
                Better care starts with <span className="text-[#9ef0d6]">being connected.</span>
              </h1>
              <p className="mt-6 max-w-md text-base leading-7 text-white/75">
                One secure place to manage appointments, keep track of care, and stay connected with the people who matter to your health.
              </p>
            </div>

            <div className="relative z-10 space-y-4">
              <div className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-sm">
                <div className="flex items-start gap-4">
                  <div className="rounded-xl bg-white/15 p-3"><HeartPulse size={22} /></div>
                  <div>
                    <div className="font-semibold">Care that feels personal</div>
                    <div className="mt-1 text-sm leading-6 text-white/70">A simpler healthcare experience for every step of your journey.</div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/70">
                <div className="flex -space-x-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#146b59] bg-[#d3f4e8] text-xs font-bold text-care-800">D</div>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#146b59] bg-[#fbe5c7] text-xs font-bold text-amber-800">C</div>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#146b59] bg-[#dbeafe] text-xs font-bold text-blue-800">+</div>
                </div>
                Designed for doctors and customers alike
              </div>
            </div>
          </div>

          <div className="mx-auto w-full max-w-[470px]">
            <div className="mb-8 lg:hidden">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-care-50 px-3 py-1.5 text-xs font-semibold text-care-700">
                <Activity size={14} /> Scans and diagnostics, made simpler
              </div>
              <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
                Welcome to better care.
              </h1>
              <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">One place to stay connected to your healthcare journey.</p>
            </div>

            <div className="rounded-[1.75rem] border border-slate-100 bg-white p-6 shadow-[0_20px_65px_rgba(15,68,57,0.08)] sm:p-9">
              <div className="mb-7">
                <p className="text-sm font-bold text-care-700">WELCOME BACK</p>
                <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-[2rem]">Sign in to Focus</h2>
                <p className="mt-2 text-sm leading-6 text-slate-500">Choose your account type to continue securely.</p>
              </div>

              <div className="mb-6 grid grid-cols-2 gap-3 rounded-2xl bg-slate-50 p-1.5">
                <button type="button" onClick={() => setRole("customer")}
                  className={`flex min-h-[76px] items-center gap-3 rounded-xl border px-3 py-3 text-left transition-all ${role === "customer" ? "border-care-200 bg-white text-care-800 shadow-sm ring-1 ring-care-100" : "border-transparent text-slate-500 hover:bg-white/80"}`}>
                  <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${role === "customer" ? "bg-care-50 text-care-700" : "bg-white text-slate-500"}`}><UserRound size={20} /></span>
                  <span><span className="block text-sm font-bold">Customer</span><span className="mt-0.5 block text-[11px]">My healthcare</span></span>
                </button>
                <button type="button" onClick={() => setRole("doctor")}
                  className={`flex min-h-[76px] items-center gap-3 rounded-xl border px-3 py-3 text-left transition-all ${role === "doctor" ? "border-care-200 bg-white text-care-800 shadow-sm ring-1 ring-care-100" : "border-transparent text-slate-500 hover:bg-white/80"}`}>
                  <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${role === "doctor" ? "bg-care-50 text-care-700" : "bg-white text-slate-500"}`}><Stethoscope size={20} /></span>
                  <span><span className="block text-sm font-bold">Doctor</span><span className="mt-0.5 block text-[11px]">Care dashboard</span></span>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-semibold text-slate-700">Email address</label>
                  <div className="field-wrap">
                    <Mail size={18} className="shrink-0 text-slate-400" />
                    <input id="email" type="email" autoComplete="email" placeholder="you@example.com" value={email}
                      onChange={e => setEmail(e.target.value)} className="field-input" required />
                  </div>
                </div>
                <div>
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <label htmlFor="password" className="block text-sm font-semibold text-slate-700">Password</label>
                    <button type="button" onClick={handleForgot} className="text-xs font-bold text-care-700 hover:text-care-900">Forgot password?</button>
                  </div>
                  <div className="field-wrap">
                    <LockKeyhole size={18} className="shrink-0 text-slate-400" />
                    <input id="password" type={showPassword ? "text" : "password"} autoComplete="current-password"
                      placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)}
                      className="field-input" required minLength={6} />
                    <button type="button" aria-label={showPassword ? "Hide password" : "Show password"}
                      onClick={() => setShowPassword(v => !v)} className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700">
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <label className="flex cursor-pointer items-center gap-2.5 text-sm text-slate-500">
                  <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} className="h-4 w-4 rounded border-slate-300 accent-care-600" />
                  Keep me signed in
                </label>

                {error && <div role="alert" className="rounded-xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm leading-5 text-rose-700">{error}</div>}
                {notice && <div role="status" className="rounded-xl border border-amber-100 bg-amber-50 px-4 py-3 text-sm leading-5 text-amber-800">{notice}</div>}

                <button type="submit" disabled={loading}
                  className="flex min-h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-care-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-care-600/20 transition hover:bg-care-700 focus:outline-none focus:ring-4 focus:ring-care-100 disabled:cursor-wait disabled:opacity-70">
                  {loading ? "Signing you in..." : `Sign in as ${role === "doctor" ? "Doctor" : "Customer"}`}
                  {!loading && <ArrowRight size={17} />}
                </button>
              </form>
              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400">
                <ShieldCheck size={15} className="text-care-600" /> Your health journey deserves thoughtful care.
              </div>
            </div>
            <p className="mt-5 text-center text-xs leading-5 text-slate-400">Demo portal · Do not enter real patient or medical information.</p>
          </div>
        </section>

        <footer className="flex flex-col items-center justify-between gap-2 border-t border-slate-200/70 py-5 text-xs text-slate-400 sm:flex-row">
          <span>© {new Date().getFullYear()} Focus Scans and Diagnostics. Demo experience.</span>
          <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-care-500" /> Built for care, on every screen</span>
        </footer>
      </div>
    </main>
  );
}

function Dashboard({ user, onLogout }) {
  const doctor = user.role === "doctor";
  const cards = doctor
    ? [
        { icon: CalendarDays, title: "Appointments", value: "08", note: "Today's schedule" },
        { icon: UserRound, title: "My patients", value: "124", note: "Patient directory" },
        { icon: ClipboardList, title: "Care notes", value: "12", note: "Pending review" }
      ]
    : [
        { icon: CalendarDays, title: "Appointments", value: "02", note: "Upcoming visits" },
        { icon: ClipboardList, title: "Health records", value: "04", note: "Your saved records" },
        { icon: HeartPulse, title: "Care overview", value: "Good", note: "Your health space" }
      ];
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
          <p className="text-sm font-medium text-white/70">{doctor ? "DOCTOR WORKSPACE" : "CUSTOMER WORKSPACE"}</p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">{doctor ? "Welcome to your care dashboard." : "Welcome to your health space."}</h1>
          <p className="mt-3 max-w-2xl break-words text-sm leading-6 text-white/75">Signed in as {user.email}. This is a placeholder page for the {doctor ? "doctor" : "customer"} experience.</p>
        </div>
        <div className="mb-6 flex items-end justify-between">
          <div><h2 className="text-xl font-extrabold text-slate-900">Your overview</h2><p className="mt-1 text-sm text-slate-500">Sample content to help shape the next stage.</p></div>
          <span className="rounded-full bg-care-50 px-3 py-1.5 text-xs font-bold capitalize text-care-700">{user.role} portal</span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map(({ icon: Icon, title, value, note }) => (
            <div key={title} className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <div className="flex items-start justify-between"><div className="rounded-xl bg-care-50 p-3 text-care-700"><Icon size={21} /></div><span className="text-xs font-medium text-slate-400">Placeholder</span></div>
              <p className="mt-6 text-sm font-semibold text-slate-500">{title}</p>
              <p className="mt-1 text-3xl font-extrabold text-slate-900">{value}</p>
              <p className="mt-2 text-sm text-slate-400">{note}</p>
            </div>
          ))}
        </div>
        <div className="mt-7 rounded-2xl border border-dashed border-care-200 bg-white/70 p-6">
          <h3 className="font-bold text-slate-800">Next step</h3>
          <p className="mt-2 text-sm leading-6 text-slate-500">This page is intentionally a dummy dashboard. You can now replace these sample cards with real {doctor ? "appointments, patient workflows, and care tools" : "appointments, health records, and profile features"}.</p>
        </div>
      </div>
    </main>
  );
}

export default function App() {
  const [user, setUser] = useState(null);
  return user
    ? <Dashboard user={user} onLogout={() => setUser(null)} />
    : <LoginPage onLogin={setUser} />;
}