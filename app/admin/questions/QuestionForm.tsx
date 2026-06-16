// app/admin/questions/QuestionForm.tsx
"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Plus, Trash2, Check, ArrowLeft, Loader2, Save, Upload, Music2, X } from "lucide-react";
import {
  useCreateQuestionMutation,
  useUpdateQuestionMutation,
  Question,
  CreateQuestionInput,
  OptionType,
} from "@/store/api/questionsApi";
import { AGE_GROUPS, SUBJECTS } from "@/data/questionsData";
import { supabase } from "@/lib/supabase";

const AUDIO_BUCKET = "question-audio";
const MAX_AUDIO_BYTES = 10 * 1024 * 1024; // 10 MB

const isPlayableUrl = (v: string) => /^https?:\/\//i.test(v);

interface Props {
  question: Question | null; // null = create mode
}

interface FormState {
  id: string;
  subject_id: string;
  age_group: string;
  question: string;
  option_type: OptionType;
  options: string[];
  answer: string;
  sound_key: string;
  visual: string;
  option_colors: Record<string, string>;
}

const DEFAULT_FORM: FormState = {
  id: "",
  subject_id: "",
  age_group: "",
  question: "",
  option_type: "text",
  options: ["", "", ""],
  answer: "",
  sound_key: "",
  visual: "",
  option_colors: {},
};

function toFormState(q: Question): FormState {
  return {
    id: q.id,
    subject_id: q.subject_id,
    age_group: q.age_group,
    question: q.question,
    option_type: q.option_type,
    options: [...q.options],
    answer: q.answer,
    sound_key: q.sound_key ?? "",
    visual: q.visual ?? "",
    option_colors: q.option_colors ?? {},
  };
}

export default function QuestionForm({ question }: Props) {
  const router = useRouter();
  const isEdit = !!question;
  const [form, setForm] = useState<FormState>(isEdit ? toFormState(question!) : { ...DEFAULT_FORM });
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormState | "options_fill" | "answer_match", string>>
  >({});

  const [createQuestion, { isLoading: creating }] = useCreateQuestionMutation();
  const [updateQuestion, { isLoading: updating }] = useUpdateQuestionMutation();
  const saving = creating || updating;

  // ── Audio upload ────────────────────────────────────────────────────────────
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [audioError, setAudioError] = useState<string | null>(null);

  const handleAudioUpload = async (file: File) => {
    setAudioError(null);

    if (!/audio\/(mpeg|mp3)/.test(file.type) && !/\.mp3$/i.test(file.name)) {
      setAudioError("Please choose an MP3 file.");
      return;
    }
    if (file.size > MAX_AUDIO_BYTES) {
      setAudioError("File is too large (max 10 MB).");
      return;
    }

    setUploading(true);
    const safeId = (form.id.trim() || "audio").replace(/[^a-zA-Z0-9_-]/g, "_");
    const path = `${safeId}-${Date.now()}.mp3`;

    const { error } = await supabase.storage
      .from(AUDIO_BUCKET)
      .upload(path, file, { contentType: "audio/mpeg", upsert: true });

    if (error) {
      setUploading(false);
      setAudioError(
        /bucket not found/i.test(error.message)
          ? "Audio bucket not found — run scripts/setup.sql in Supabase first."
          : error.message
      );
      return;
    }

    const { data } = supabase.storage.from(AUDIO_BUCKET).getPublicUrl(path);
    setForm((f) => ({ ...f, sound_key: data.publicUrl }));
    setUploading(false);
  };

  const clearAudio = () => {
    setForm((f) => ({ ...f, sound_key: "" }));
    setAudioError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  useEffect(() => {
    setForm(isEdit ? toFormState(question!) : { ...DEFAULT_FORM });
    setErrors({});
  }, [question]);

  // ── Helpers ───────────────────────────────────────────────────────────────
  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const setOption = (index: number, value: string) => {
    const next = [...form.options];
    next[index] = value;
    if (form.option_type === "color") {
      const oldKey = form.options[index];
      const colors = { ...form.option_colors };
      if (oldKey && colors[oldKey]) {
        colors[value] = colors[oldKey];
        delete colors[oldKey];
      }
      setForm((f) => ({ ...f, options: next, option_colors: colors }));
    } else {
      set("options", next);
    }
  };

  const addOption = () => set("options", [...form.options, ""]);

  const removeOption = (index: number) => {
    const next = form.options.filter((_, i) => i !== index);
    const removed = form.options[index];
    const colors = { ...form.option_colors };
    delete colors[removed];
    setForm((f) => ({
      ...f,
      options: next,
      option_colors: colors,
      answer: f.answer === removed ? "" : f.answer,
    }));
  };

  const setOptionColor = (label: string, hex: string) => {
    setForm((f) => ({ ...f, option_colors: { ...f.option_colors, [label]: hex } }));
  };

  // ── Validation ──────────────────────────────────────────────────────────────
  const validate = (): boolean => {
    const e: typeof errors = {};
    if (!form.id.trim()) e.id = "ID is required";
    if (!form.subject_id) e.subject_id = "Subject is required";
    if (!form.age_group) e.age_group = "Age group is required";
    if (!form.question.trim()) e.question = "Question text is required";
    if (form.options.some((o) => !o.trim())) e.options_fill = "All options must be filled";
    if (!form.answer.trim()) e.answer = "Correct answer is required";
    if (!form.options.includes(form.answer)) e.answer_match = "Answer must match one of the options";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // ── Submit ────────────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const payload: CreateQuestionInput = {
      id: form.id.trim(),
      subject_id: form.subject_id,
      age_group: form.age_group,
      question: form.question.trim(),
      type: "mcq",
      option_type: form.option_type,
      options: form.options.map((o) => o.trim()),
      answer: form.answer.trim(),
      sound_key: form.sound_key.trim() || null,
      visual: form.visual.trim() || null,
      option_colors: form.option_type === "color" ? form.option_colors : null,
    };

    try {
      if (isEdit) await updateQuestion(payload).unwrap();
      else await createQuestion(payload).unwrap();
      router.push("/admin/questions");
    } catch {
      setErrors((prev) => ({ ...prev, id: "Could not save. Check the ID is unique and try again." }));
    }
  };

  const availableAgeGroups = useMemo(() => {
    if (!form.subject_id) return AGE_GROUPS;
    const subject = SUBJECTS.find((s) => s.id === form.subject_id);
    if (!subject) return AGE_GROUPS;
    return AGE_GROUPS.filter((g) => subject.ageGroups.includes(g.id));
  }, [form.subject_id]);

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className="max-w-3xl mx-auto w-full space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link
          href="/admin/questions"
          className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
          aria-label="Back to questions"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-xl font-display font-bold text-slate-900 dark:text-white tracking-tight">
            {isEdit ? "Edit question" : "Add question"}
          </h1>
          <p className="text-[13px] text-slate-500 mt-0.5">
            {isEdit ? `Editing ${question!.id}` : "Create a new MCQ for the question bank."}
          </p>
        </div>
      </div>

      {/* Form card */}
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 sm:p-7 space-y-5"
      >
        {/* ID */}
        <Field label="ID" error={errors.id}>
          <input
            type="text"
            value={form.id}
            onChange={(e) => set("id", e.target.value)}
            disabled={isEdit}
            placeholder="e.g. my_11"
            className={inputCls(!!errors.id, isEdit)}
          />
          {isEdit && (
            <p className="text-[11px] text-slate-400 mt-1">IDs cannot be changed after creation.</p>
          )}
        </Field>

        {/* Subject + Age group */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Subject" error={errors.subject_id}>
            <select
              value={form.subject_id}
              onChange={(e) => {
                set("subject_id", e.target.value);
                set("age_group", "");
              }}
              className={inputCls(!!errors.subject_id)}
            >
              <option value="">Select…</option>
              {SUBJECTS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.emoji} {s.title}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Age group" error={errors.age_group}>
            <select
              value={form.age_group}
              onChange={(e) => set("age_group", e.target.value)}
              disabled={!form.subject_id}
              className={inputCls(!!errors.age_group, !form.subject_id)}
            >
              <option value="">Select…</option>
              {availableAgeGroups.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.emoji} {g.label}
                </option>
              ))}
            </select>
          </Field>
        </div>

        {/* Question text */}
        <Field label="Question text" error={errors.question}>
          <textarea
            value={form.question}
            onChange={(e) => set("question", e.target.value)}
            rows={2}
            placeholder="e.g. What is 2 + 2?"
            className={inputCls(!!errors.question)}
          />
        </Field>

        {/* Option type */}
        <Field label="Option type">
          <div className="flex gap-2">
            {(["text", "emoji", "color"] as OptionType[]).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => set("option_type", t)}
                className={`flex-1 py-2 rounded-lg text-[12px] font-semibold border transition-colors ${
                  form.option_type === t
                    ? "bg-[var(--color-brand)] text-white border-[var(--color-brand)]"
                    : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
              >
                {t === "text" ? "📝 Text" : t === "emoji" ? "😀 Emoji" : "🎨 Colour"}
              </button>
            ))}
          </div>
        </Field>

        {/* Options */}
        <Field label="Options" error={errors.options_fill ?? errors.answer_match}>
          <div className="space-y-2">
            {form.options.map((opt, i) => (
              <div key={i} className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => set("answer", opt)}
                  title="Mark as correct answer"
                  className={`shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                    form.answer === opt && opt.trim()
                      ? "bg-green-500 border-green-500 text-white"
                      : "border-slate-300 dark:border-slate-600 text-transparent hover:border-green-400"
                  }`}
                >
                  <Check className="w-3 h-3" />
                </button>

                <input
                  type="text"
                  value={opt}
                  onChange={(e) => setOption(i, e.target.value)}
                  placeholder={`Option ${i + 1}`}
                  className={`flex-1 ${inputCls(false)}`}
                />

                {form.option_type === "color" && opt.trim() && (
                  <input
                    type="color"
                    value={form.option_colors[opt] ?? "#cccccc"}
                    onChange={(e) => setOptionColor(opt, e.target.value)}
                    className="w-9 h-9 rounded cursor-pointer border border-slate-200 dark:border-slate-700"
                    title={`Colour for "${opt}"`}
                  />
                )}

                {form.options.length > 2 && (
                  <button
                    type="button"
                    onClick={() => removeOption(i)}
                    className="shrink-0 p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ))}
            {form.options.length < 6 && (
              <button
                type="button"
                onClick={addOption}
                className="flex items-center gap-1.5 text-[12px] font-medium text-[var(--color-brand)] hover:underline"
              >
                <Plus className="w-3.5 h-3.5" /> Add option
              </button>
            )}
          </div>
          {form.answer && (
            <p className="text-[11px] text-green-600 dark:text-green-400 mt-1.5 flex items-center gap-1">
              <Check className="w-3 h-3" /> Correct answer: <strong>{form.answer}</strong>
            </p>
          )}
        </Field>

        {/* Audio (optional) */}
        <Field label="Audio (optional)">
          {/* Hidden native input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="audio/mpeg,.mp3"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleAudioUpload(file);
            }}
          />

          {isPlayableUrl(form.sound_key) ? (
            // Uploaded clip — listen + replace + remove
            <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 p-3 space-y-2.5">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-[var(--color-brand)]/10 flex items-center justify-center shrink-0">
                  <Music2 className="w-4 h-4 text-[var(--color-brand)]" />
                </span>
                <span className="text-[12.5px] font-medium text-slate-700 dark:text-slate-200 truncate flex-1">
                  {decodeURIComponent(form.sound_key.split("/").pop() ?? "Audio clip")}
                </span>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="text-[12px] font-medium text-[var(--color-brand)] hover:underline disabled:opacity-50"
                >
                  Replace
                </button>
                <button
                  type="button"
                  onClick={clearAudio}
                  className="p-1 rounded-md text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  aria-label="Remove audio"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <audio controls src={form.sound_key} className="w-full h-9" />
            </div>
          ) : (
            // No clip yet — upload dropzone-style button
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="w-full flex items-center justify-center gap-2 py-4 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 text-[13px] font-medium text-slate-500 dark:text-slate-400 hover:border-[var(--color-brand)] hover:text-[var(--color-brand)] hover:bg-[var(--color-brand)]/5 disabled:opacity-60 transition-colors"
            >
              {uploading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Uploading…
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" /> Upload MP3
                </>
              )}
            </button>
          )}

          {audioError && <p className="text-[11px] text-red-500 mt-1.5">{audioError}</p>}

          {/* Manual sound key (legacy Android res/raw reference) */}
          <input
            type="text"
            value={isPlayableUrl(form.sound_key) ? "" : form.sound_key}
            onChange={(e) => set("sound_key", e.target.value)}
            disabled={isPlayableUrl(form.sound_key)}
            placeholder="…or a sound key, e.g. sound_lion"
            className={`mt-2 ${inputCls(false, isPlayableUrl(form.sound_key))}`}
          />
          <p className="text-[11px] text-slate-400 mt-1">
            Upload an MP3 to host it, or enter a key that maps to res/raw/&lt;key&gt;.mp3 on Android.
          </p>
        </Field>

        {/* Visual emoji */}
        <Field label="Visual emoji (optional)">
          <input
            type="text"
            value={form.visual}
            onChange={(e) => set("visual", e.target.value)}
            placeholder="e.g. 🐄"
            className={inputCls(false)}
          />
        </Field>

        {/* Footer actions */}
        <div className="flex items-center justify-end gap-2 border-t border-slate-100 dark:border-slate-800 -mx-6 sm:-mx-7 px-6 sm:px-7 pt-5">
          <Link
            href="/admin/questions"
            className="px-4 py-2 text-[13px] font-medium rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-1.5 px-5 py-2 text-[13px] font-semibold rounded-lg bg-[var(--color-brand)] text-white hover:opacity-90 disabled:opacity-60 transition-opacity"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                {isEdit ? "Saving…" : "Creating…"}
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                {isEdit ? "Save changes" : "Create question"}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

// ── Tiny helpers ────────────────────────────────────────────────────────────
function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
        {label}
      </label>
      {children}
      {error && <p className="text-[11px] text-red-500 mt-1">{error}</p>}
    </div>
  );
}

function inputCls(hasError: boolean, disabled?: boolean): string {
  return [
    "w-full px-3 py-2 text-[13px] rounded-lg border transition-colors",
    "bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200",
    "placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)]/30",
    hasError ? "border-red-300 dark:border-red-700" : "border-slate-200 dark:border-slate-700",
    disabled ? "opacity-50 cursor-not-allowed" : "",
  ].join(" ");
}
