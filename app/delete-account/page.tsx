"use client";

import React, { useState } from "react";
import type { Metadata } from "next";
import { Trash2, AlertTriangle, Mail, CheckCircle2 } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { HighlightUnderline } from "@/components/ui/HighlightUnderline";



const REASONS = [
  "No longer using the app",
  "Privacy concerns",
  "Found a better alternative",
  "Technical issues",
  "Other",
];

const SUPPORT_EMAIL = "support@screentoskill.com";

function buildMailtoLink({
  email,
  reason,
  details,
}: {
  email: string;
  reason: string;
  details: string;
}) {
  const subject = `Account Deletion Request - ${email}`;
  const bodyLines = [
    "A user has requested account deletion via the ScreenToSkill website.",
    "",
    `Account email: ${email}`,
    `Reason: ${reason}`,
    `Additional details: ${details || "N/A"}`,
    "",
    `Submitted: ${new Date().toLocaleString()}`,
  ];
  const body = bodyLines.join("\n");

  return `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
}

export default function DeleteAccountPage() {
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("");
  const [details, setDetails] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !reason || !confirmed) {
      setError("Please fill in all required fields and confirm you understand this action.");
      return;
    }

    setError("");

    // Opens the user's default mail client (or Gmail, if it's their
    // registered mailto handler) pre-filled with the deletion request,
    // addressed to the support team.
    const mailtoLink = buildMailtoLink({ email, reason, details });
    window.location.href = mailtoLink;

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Section id="delete-account" tone="subtle" bordered className="bg-[#FBFDFF]/80 dark:bg-slate-950/40">
        <Container>
          <div className="max-w-xl mx-auto bg-[#EBF8F4] dark:bg-emerald-950/40 border border-[#d2efe4] dark:border-emerald-900/60 rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-center">
            <div className="w-14 h-14 mx-auto rounded-full bg-[#E2F7F2] dark:bg-teal-500/15 flex items-center justify-center text-[#0D9488] dark:text-teal-300 mb-5 shadow-xs">
              <CheckCircle2 className="w-7 h-7 stroke-[2]" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-[#0D1B15] dark:text-emerald-50 tracking-tight leading-[1.15] mb-3">
              Request <HighlightUnderline>Received</HighlightUnderline>
            </h1>
            <p className="text-xs sm:text-sm text-[#1F5441]/85 dark:text-emerald-200/80 leading-relaxed font-normal">
              Your email client should have opened with a pre-filled deletion
              request addressed to our support team. Please hit{" "}
              <span className="font-medium">Send</span> in your mail app to
              complete the request for{" "}
              <span className="font-medium">{email}</span>. Our team will
              verify and process it within 30 days.
            </p>
            <p className="text-xs text-[#1F5441]/60 dark:text-emerald-200/60 mt-4">
              Nothing opened?{" "}
              <a
                href={buildMailtoLink({ email, reason, details })}
                className="text-[#0284C7] dark:text-sky-300 font-medium hover:underline"
              >
                Click here to open it again
              </a>
              , or email us directly at{" "}
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="text-[#0284C7] dark:text-sky-300 font-medium hover:underline"
              >
                {SUPPORT_EMAIL}
              </a>
              .
            </p>
          </div>
        </Container>
      </Section>
    );
  }

  return (
    <Section id="delete-account" tone="subtle" bordered className="bg-[#FBFDFF]/80 dark:bg-slate-950/40">
      <Container>
        {/* Header card */}
        <div className="bg-[#EBF8F4] dark:bg-emerald-950/40 border border-[#d2efe4] dark:border-emerald-900/60 rounded-2xl sm:rounded-3xl p-6 sm:p-10 lg:p-12 relative overflow-hidden mb-10 sm:mb-14">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-[#FDE8E8] dark:bg-red-500/15 flex items-center justify-center text-[#DC2626] dark:text-red-300 shrink-0 shadow-xs">
              <Trash2 className="w-5.5 h-5.5 stroke-[2]" />
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-[2.25rem] font-display font-bold text-[#0D1B15] dark:text-emerald-50 tracking-tight leading-[1.15]">
              Delete Your <HighlightUnderline>Account</HighlightUnderline>
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-[#1F5441]/85 dark:text-emerald-200/80 leading-relaxed font-normal max-w-2xl">
            We&apos;re sorry to see you go. Submit the form below to request
            permanent deletion of your ScreenToSkill parent account, along
            with all linked child profiles and learning progress data.
          </p>
        </div>

        <div className="max-w-xl mx-auto">
          {/* Warning notice */}
          <div className="flex items-start space-x-4 mb-10">
            <div className="w-12 h-12 rounded-full bg-[#FEF3E2] dark:bg-amber-500/15 flex items-center justify-center text-[#B45309] dark:text-amber-300 shrink-0 shadow-xs">
              <AlertTriangle className="w-5 h-5 stroke-[2]" />
            </div>
            <div className="space-y-1 pt-0.5 text-left">
              <h3 className="font-display font-bold text-[#0D0F12] dark:text-slate-50 text-lg leading-tight">
                This action is permanent
              </h3>
              <p className="text-xs sm:text-sm text-slate-550 dark:text-slate-400 font-normal leading-relaxed">
                Deleting your account will permanently remove your profile,
                all child profiles linked to it, learning progress, rewards,
                and any saved data. This cannot be undone once processed.
              </p>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 text-left shadow-xs"
          >
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="text-xs sm:text-sm font-medium text-[#0D0F12] dark:text-slate-50"
              >
                Account Email <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-[#FBFDFF] dark:bg-slate-950/40 px-4 py-2.5 text-sm text-[#0D0F12] dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#553CFA]/40 focus:border-[#553CFA] transition"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="reason"
                className="text-xs sm:text-sm font-medium text-[#0D0F12] dark:text-slate-50"
              >
                Reason for leaving <span className="text-red-500">*</span>
              </label>
              <select
                id="reason"
                required
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-[#FBFDFF] dark:bg-slate-950/40 px-4 py-2.5 text-sm text-[#0D0F12] dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#553CFA]/40 focus:border-[#553CFA] transition"
              >
                <option value="" disabled>
                  Select a reason
                </option>
                {REASONS.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="details"
                className="text-xs sm:text-sm font-medium text-[#0D0F12] dark:text-slate-50"
              >
                Additional details (optional)
              </label>
              <textarea
                id="details"
                rows={4}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Tell us more, or let us know how we could improve..."
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-[#FBFDFF] dark:bg-slate-950/40 px-4 py-2.5 text-sm text-[#0D0F12] dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#553CFA]/40 focus:border-[#553CFA] transition resize-none"
              />
            </div>

            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={confirmed}
                onChange={(e) => setConfirmed(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded border-slate-300 dark:border-slate-700 text-[#553CFA] focus:ring-[#553CFA]/40"
              />
              <span className="text-xs sm:text-sm text-slate-550 dark:text-slate-400 leading-relaxed">
                I understand this will permanently delete my account and all
                linked child data, and this action cannot be undone.
              </span>
            </label>

            {error && (
              <p className="text-xs sm:text-sm text-red-600 dark:text-red-400 font-medium">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] text-white text-sm font-medium py-3 transition-colors shadow-xs"
            >
              Request Account Deletion
            </button>
          </form>

          {/* Contact alternative */}
          <div className="flex items-start space-x-4 mt-10">
            <div className="w-12 h-12 rounded-full bg-[#E0F2FE] dark:bg-sky-500/15 flex items-center justify-center text-[#0284C7] dark:text-sky-300 shrink-0 shadow-xs">
              <Mail className="w-5 h-5 stroke-[2]" />
            </div>
            <div className="space-y-1 pt-0.5">
              <h3 className="font-display font-bold text-[#0D0F12] dark:text-slate-50 text-lg leading-tight">
                Prefer email?
              </h3>
              <p className="text-xs sm:text-sm text-slate-550 dark:text-slate-400 font-normal leading-relaxed">
                You can also send a deletion request directly to{" "}
                <a
                  href={`mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(
                    "Account Deletion Request"
                  )}`}
                  className="text-[#0284C7] dark:text-sky-300 font-medium hover:underline"
                >
                  {SUPPORT_EMAIL}
                </a>{" "}
                from your registered email address.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}