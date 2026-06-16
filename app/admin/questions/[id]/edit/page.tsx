"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Loader2, ArrowLeft, AlertCircle } from "lucide-react";
import { useGetQuestionQuery } from "@/store/api/questionsApi";
import QuestionForm from "../../QuestionForm";

export default function EditQuestionPage() {
  const params = useParams<{ id: string }>();
  const id = decodeURIComponent(params.id);
  const { data: question, isLoading, isError } = useGetQuestionQuery(id);

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto w-full py-24 flex items-center justify-center">
        <Loader2 className="w-6 h-6 text-[var(--color-brand)] animate-spin" />
      </div>
    );
  }

  if (isError || !question) {
    return (
      <div className="max-w-3xl mx-auto w-full space-y-4">
        <Link
          href="/admin/questions"
          className="inline-flex items-center gap-2 text-[13px] font-medium text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to questions
        </Link>
        <div className="bg-white dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-800 p-12 text-center">
          <AlertCircle className="w-8 h-8 text-slate-300 dark:text-slate-700 mx-auto mb-2" />
          <p className="text-[13px] text-slate-400">
            Question <span className="font-mono">{id}</span> could not be found.
          </p>
        </div>
      </div>
    );
  }

  return <QuestionForm question={question} />;
}
