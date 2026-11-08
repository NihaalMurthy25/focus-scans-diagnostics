import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SignUp from "./SignUp";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("Medigrids signup", () => {
  it("shows Medical Service Provider and General Public as account categories", () => {
    render(<SignUp onBackToLogin={vi.fn()} />);
    expect(screen.getByLabelText(/account category/i)).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Medical Service Provider" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "General Public" })).toBeInTheDocument();
  });

  it("shows Doctor, Diagnostic Centre and Pharmacy for providers", () => {
    render(<SignUp onBackToLogin={vi.fn()} />);
    const providerSelect = screen.getByLabelText(/provider type/i);
    expect(providerSelect).toHaveValue("doctor");
    expect(screen.getByRole("option", { name: "Diagnostic Centre" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Pharmacy" })).toBeInTheDocument();
  });

  it("shows the individual name field for General Public", async () => {
    const user = userEvent.setup();
    render(<SignUp onBackToLogin={vi.fn()} />);
    await user.selectOptions(screen.getByLabelText(/account category/i), "general_public");
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.queryByLabelText(/provider type/i)).not.toBeInTheDocument();
  });

  it("validates required provider name before sending a request", async () => {
    const user = userEvent.setup();
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    render(<SignUp onBackToLogin={vi.fn()} />);
    await user.click(screen.getByRole("button", { name: /create account/i }));
    expect(await screen.findByRole("alert")).toHaveTextContent(/provider or organisation name/i);
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("rejects invalid email addresses", async () => {
    const user = userEvent.setup();
    render(<SignUp onBackToLogin={vi.fn()} />);
    await user.type(screen.getByLabelText(/provider or organisation name/i), "City Diagnostics");
    await user.type(screen.getByLabelText(/email address/i), "bad-email");
    await user.type(screen.getByLabelText(/^password$/i), "password123");
    await user.type(screen.getByLabelText(/confirm password/i), "password123");
    await user.click(screen.getByRole("button", { name: /create account/i }));
    expect(await screen.findByRole("alert")).toHaveTextContent(/valid email/i);
  });

  it("rejects mismatched passwords", async () => {
    const user = userEvent.setup();
    render(<SignUp onBackToLogin={vi.fn()} />);
    await user.type(screen.getByLabelText(/provider or organisation name/i), "City Diagnostics");
    await user.type(screen.getByLabelText(/email address/i), "test@example.com");
    await user.type(screen.getByLabelText(/^password$/i), "password123");
    await user.type(screen.getByLabelText(/confirm password/i), "different123");
    await user.click(screen.getByRole("button", { name: /create account/i }));
    expect(await screen.findByRole("alert")).toHaveTextContent(/passwords do not match/i);
  });

  it.each(["doctor", "diagnostic_centre", "pharmacy"])("submits a %s provider registration", async (providerType) => {
    const user = userEvent.setup();
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: async () => ({ message: "Demo account created. You can now sign in." })
    });
    render(<SignUp onBackToLogin={vi.fn()} />);
    await user.selectOptions(screen.getByLabelText(/provider type/i), providerType);
    await user.type(screen.getByLabelText(/provider or organisation name/i), "Medigrids Test Provider");
    await user.type(screen.getByLabelText(/email address/i), `${providerType}@example.com`);
    await user.type(screen.getByLabelText(/^password$/i), "password123");
    await user.type(screen.getByLabelText(/confirm password/i), "password123");
    await user.click(screen.getByRole("button", { name: /create account/i }));

    await waitFor(() => expect(fetchSpy).toHaveBeenCalled());
    const [, options] = fetchSpy.mock.calls[0];
    expect(options.method).toBe("POST");
    expect(JSON.parse(options.body)).toMatchObject({
      accountType: "medical_service_provider",
      providerType,
      email: `${providerType}@example.com`
    });
    expect(await screen.findByRole("status")).toHaveTextContent(/account created/i);
  });

  it("shows an API error when registration fails", async () => {
    const user = userEvent.setup();
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: false,
      json: async () => ({ message: "Email already registered." })
    });
    render(<SignUp onBackToLogin={vi.fn()} />);
    await user.type(screen.getByLabelText(/provider or organisation name/i), "City Diagnostics");
    await user.type(screen.getByLabelText(/email address/i), "test@example.com");
    await user.type(screen.getByLabelText(/^password$/i), "password123");
    await user.type(screen.getByLabelText(/confirm password/i), "password123");
    await user.click(screen.getByRole("button", { name: /create account/i }));
    expect(await screen.findByRole("alert")).toHaveTextContent(/email already registered/i);
  });

  it("returns to login when Sign In is clicked", async () => {
    const user = userEvent.setup();
    const onBackToLogin = vi.fn();
    render(<SignUp onBackToLogin={onBackToLogin} />);
    await user.click(screen.getByRole("button", { name: /^sign in$/i }));
    expect(onBackToLogin).toHaveBeenCalledOnce();
  });
});

import { LoginPage } from "./App";

describe("Medigrids login", () => {
  it("offers General Public and Medical Service Provider account categories", () => {
    render(<LoginPage onLogin={vi.fn()} onSignUp={vi.fn()} />);
    expect(screen.getByRole("button", { name: /general public/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /medical service provider/i })).toBeInTheDocument();
  });

  it("shows provider type choices when Medical Service Provider is selected", async () => {
    const user = userEvent.setup();
    render(<LoginPage onLogin={vi.fn()} onSignUp={vi.fn()} />);
    await user.click(screen.getByRole("button", { name: /medical service provider/i }));
    expect(screen.getByLabelText(/provider type/i)).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Doctor" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Diagnostic Centre" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Pharmacy" })).toBeInTheDocument();
  });

  it("does not submit when email is invalid", async () => {
    const user = userEvent.setup();
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    render(<LoginPage onLogin={vi.fn()} onSignUp={vi.fn()} />);
    await user.type(screen.getByLabelText(/email address/i), "invalid-email");
    await user.type(screen.getByLabelText(/^password$/i), "password123");
    await user.click(screen.getByRole("button", { name: /sign in/i }));
    expect(await screen.findByRole("alert")).toHaveTextContent(/valid email/i);
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("sends selected provider category and type to login API", async () => {
    const user = userEvent.setup();
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: async () => ({ user: { email: "doctor@example.com", accountType: "medical_service_provider", providerType: "doctor" } })
    });
    const onLogin = vi.fn();
    render(<LoginPage onLogin={onLogin} onSignUp={vi.fn()} />);
    await user.click(screen.getByRole("button", { name: /medical service provider/i }));
    await user.selectOptions(screen.getByLabelText(/provider type/i), "doctor");
    await user.type(screen.getByLabelText(/email address/i), "doctor@example.com");
    await user.type(screen.getByLabelText(/^password$/i), "password123");
    await user.click(screen.getByRole("button", { name: /sign in/i }));
    await waitFor(() => expect(fetchSpy).toHaveBeenCalled());
    const [, options] = fetchSpy.mock.calls[0];
    expect(JSON.parse(options.body)).toMatchObject({
      accountType: "medical_service_provider",
      providerType: "doctor",
      email: "doctor@example.com"
    });
    await waitFor(() => expect(onLogin).toHaveBeenCalled());
  });
});
