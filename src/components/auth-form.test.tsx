// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { AuthForm } from "@/components/auth-form";
import { authCopy } from "@/lib/auth-copy";

const mocks = vi.hoisted(() => ({
  push: vi.fn(),
  refresh: vi.fn(),
  createUser: vi.fn(),
  login: vi.fn(),
  google: vi.fn(),
  updateProfile: vi.fn(),
  verifyEmail: vi.fn(),
  resetPassword: vi.fn(),
  createSession: vi.fn(),
}));

vi.mock("next/navigation", () => ({ useRouter: () => ({ push: mocks.push, refresh: mocks.refresh }) }));
vi.mock("@/lib/firebase-client", () => ({ prepareFirebaseAuth: async () => ({ languageCode: "nl" }) }));
vi.mock("@/lib/auth-client", () => ({
  createServerSession: mocks.createSession,
  localizedAuthError: () => "Localized error",
}));
vi.mock("firebase/auth", () => ({
  createUserWithEmailAndPassword: mocks.createUser,
  signInWithEmailAndPassword: mocks.login,
  signInWithPopup: mocks.google,
  updateProfile: mocks.updateProfile,
  sendEmailVerification: mocks.verifyEmail,
  sendPasswordResetEmail: mocks.resetPassword,
  GoogleAuthProvider: class GoogleAuthProvider { setCustomParameters() {} },
}));

const firebaseUser = { displayName: "Google User", getIdToken: vi.fn() };

describe("AuthForm", () => {
  afterEach(cleanup);

  beforeEach(() => {
    vi.clearAllMocks();
    mocks.createUser.mockResolvedValue({ user: firebaseUser });
    mocks.login.mockResolvedValue({ user: firebaseUser });
    mocks.google.mockResolvedValue({ user: firebaseUser });
    mocks.createSession.mockResolvedValue({ status: "authenticated", user: {} });
  });

  it("logs in with email and routes to the account", async () => {
    render(<AuthForm locale="en" copy={authCopy.en} mode="login" />);
    fireEvent.change(screen.getByLabelText(authCopy.en.common.email), { target: { value: "person@example.sr" } });
    fireEvent.change(screen.getByLabelText(authCopy.en.common.password), { target: { value: "password123" } });
    fireEvent.click(screen.getByRole("button", { name: authCopy.en.login.submit }));
    await waitFor(() => expect(mocks.login).toHaveBeenCalled());
    expect(mocks.push).toHaveBeenCalledWith("/en/account");
  });

  it("creates a freelancer profile and routes to verification", async () => {
    mocks.createSession.mockResolvedValue({ status: "verification_required" });
    render(<AuthForm locale="nl" copy={authCopy.nl} mode="signup" />);
    fireEvent.change(screen.getByLabelText(authCopy.nl.common.name), { target: { value: "Amara Pinas" } });
    fireEvent.change(screen.getByLabelText(authCopy.nl.common.email), { target: { value: "amara@example.sr" } });
    fireEvent.change(screen.getByLabelText(authCopy.nl.common.password), { target: { value: "password123" } });
    fireEvent.click(screen.getByLabelText(authCopy.nl.common.freelancer));
    fireEvent.click(screen.getByRole("button", { name: authCopy.nl.signup.submit }));
    await waitFor(() => expect(mocks.createSession).toHaveBeenCalledWith(firebaseUser, expect.objectContaining({ displayName: "Amara Pinas", primaryRole: "freelancer", locale: "nl" })));
    expect(mocks.verifyEmail).toHaveBeenCalled();
    expect(mocks.push).toHaveBeenCalledWith("/nl/verify-email");
  });

  it("sends a password-reset email", async () => {
    render(<AuthForm locale="en" copy={authCopy.en} mode="forgot" />);
    fireEvent.change(screen.getByLabelText(authCopy.en.common.email), { target: { value: "person@example.sr" } });
    fireEvent.click(screen.getByRole("button", { name: authCopy.en.forgot.submit }));
    expect(await screen.findByText(authCopy.en.forgot.success)).toBeInTheDocument();
    expect(mocks.resetPassword).toHaveBeenCalled();
  });

  it("routes a first-time Google account to onboarding", async () => {
    mocks.createSession.mockResolvedValue({ status: "profile_required", user: {} });
    render(<AuthForm locale="en" copy={authCopy.en} mode="login" />);
    fireEvent.click(screen.getByRole("button", { name: authCopy.en.common.google }));
    await waitFor(() => expect(mocks.push).toHaveBeenCalledWith("/en/onboarding"));
  });
});
