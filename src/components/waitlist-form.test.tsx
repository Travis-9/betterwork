// @vitest-environment jsdom

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { WaitlistForm } from "@/components/waitlist-form";
import { copy } from "@/lib/i18n";

describe("WaitlistForm", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("submits a client registration and shows success", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      json: async () => ({ status: "created" }),
    });
    vi.stubGlobal("fetch", fetchMock);

    render(<WaitlistForm locale="nl" copy={copy.nl.form} />);
    fireEvent.change(screen.getByLabelText(copy.nl.form.summaryLabel), {
      target: { value: "Ik zoek hulp voor een nieuwe bedrijfswebsite." },
    });
    fireEvent.change(screen.getByLabelText(copy.nl.form.emailLabel), {
      target: { value: "owner@example.sr" },
    });
    fireEvent.click(screen.getByRole("button", { name: copy.nl.form.submit }));

    expect(await screen.findByText(copy.nl.form.successTitle)).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledOnce();
  });

  it("switches to the freelancer role before submission", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      json: async () => ({ status: "duplicate" }),
    });
    vi.stubGlobal("fetch", fetchMock);

    render(<WaitlistForm locale="en" copy={copy.en.form} />);
    fireEvent.click(screen.getByRole("button", { name: copy.en.form.freelancer }));
    fireEvent.change(screen.getByLabelText(copy.en.form.summaryLabel), {
      target: { value: "I want to find local design and branding projects." },
    });
    fireEvent.change(screen.getByLabelText(copy.en.form.emailLabel), {
      target: { value: "designer@example.sr" },
    });
    fireEvent.click(screen.getByRole("button", { name: copy.en.form.submit }));

    await waitFor(() => expect(fetchMock).toHaveBeenCalledOnce());
    const [, options] = fetchMock.mock.calls[0];
    expect(JSON.parse(options.body)).toMatchObject({
      role: "freelancer",
      locale: "en",
    });
    expect(await screen.findByText(copy.en.form.duplicateTitle)).toBeInTheDocument();
  });
});
