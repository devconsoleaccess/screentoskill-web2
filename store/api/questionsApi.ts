// src/store/api/questionsApi.ts
// RTK Query API slice for Questions CRUD via Supabase REST API
// ─────────────────────────────────────────────────────────────────────────────
// Prerequisites:
//   npm install @reduxjs/toolkit react-redux
//
// Supabase table schema (run in Supabase SQL editor):
// ─────────────────────────────────────────────────────────────────────────────
// CREATE TABLE questions (
//   id          TEXT PRIMARY KEY,          -- e.g. "snd_1", "col_1", "my_1"
//   subject_id  TEXT NOT NULL,             -- e.g. "math", "sounds", "colors"
//   age_group   TEXT NOT NULL,             -- e.g. "young", "middle", "teen"
//   question    TEXT NOT NULL,
//   type        TEXT NOT NULL DEFAULT 'mcq',
//   option_type TEXT NOT NULL DEFAULT 'text', -- 'text' | 'emoji' | 'color'
//   options     JSONB NOT NULL,            -- string[]
//   answer      TEXT NOT NULL,
//   sound_key   TEXT,                      -- for audio questions
//   visual      TEXT,                      -- emoji visual hint
//   option_colors JSONB,                   -- { [label]: '#hex' }
//   created_at  TIMESTAMPTZ DEFAULT now(),
//   updated_at  TIMESTAMPTZ DEFAULT now()
// );
//
// Seed it from questionsData.js:  see seedQuestions.ts helper at bottom.
// ─────────────────────────────────────────────────────────────────────────────

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// ── Types ────────────────────────────────────────────────────────────────────

export type OptionType = "text" | "emoji" | "color";

export interface Question {
  id: string;
  subject_id: string;
  age_group: string;
  question: string;
  type: string;
  option_type: OptionType;
  options: string[];
  answer: string;
  sound_key?: string | null;
  visual?: string | null;
  option_colors?: Record<string, string> | null;
  created_at?: string;
  updated_at?: string;
}

export type CreateQuestionInput = Omit<Question, "created_at" | "updated_at">;
export type UpdateQuestionInput = Partial<CreateQuestionInput> & { id: string };

export interface QuestionsFilter {
  subject_id?: string;
  age_group?: string;
  option_type?: OptionType;
  search?: string;         // searches question text
  page?: number;
  pageSize?: number;
}

// ── Env ──────────────────────────────────────────────────────────────────────

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY!;

// ── API Slice ────────────────────────────────────────────────────────────────

export const questionsApi = createApi({
  reducerPath: "questionsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${SUPABASE_URL}/rest/v1`,
    prepareHeaders: (headers) => {
      headers.set("apikey", SUPABASE_ANON_KEY);
      headers.set("Authorization", `Bearer ${SUPABASE_ANON_KEY}`);
      headers.set("Content-Type", "application/json");
      // Don't clobber a Prefer already set by an endpoint (e.g. the list query
      // needs `count=exact` so PostgREST returns the total row count, which the
      // pagination controls depend on). Only default it for mutations.
      if (!headers.has("Prefer")) headers.set("Prefer", "return=representation");
      return headers;
    },
  }),
  tagTypes: ["Question"],
  endpoints: (builder) => ({

    // ── LIST (with filters + pagination) ─────────────────────────────────────
    getQuestions: builder.query<{ data: Question[]; count: number }, QuestionsFilter>({
      query: ({ subject_id, age_group, option_type, search, page = 1, pageSize = 20 } = {}) => {
        const params = new URLSearchParams();
        params.set("select", "*");

        if (subject_id)  params.set("subject_id", `eq.${subject_id}`);
        if (age_group)   params.set("age_group",   `eq.${age_group}`);
        if (option_type) params.set("option_type", `eq.${option_type}`);
        if (search)      params.set("question",    `ilike.*${search}*`);

        // Pagination
        const from = (page - 1) * pageSize;
        const to   = from + pageSize - 1;

        return {
          url: `/questions?${params.toString()}`,
          headers: {
            Range: `${from}-${to}`,
            "Range-Unit": "items",
            Prefer: "count=exact",
          },
        };
      },
      transformResponse: (data: Question[], meta: any) => {
        const contentRange = meta?.response?.headers?.get("content-range") ?? "";
        const total = parseInt(contentRange.split("/")[1] ?? "0", 10);
        return { data, count: isNaN(total) ? (data as Question[]).length : total };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: "Question" as const, id })),
              { type: "Question", id: "LIST" },
            ]
          : [{ type: "Question", id: "LIST" }],
    }),

    // ── GET ONE ───────────────────────────────────────────────────────────────
    getQuestion: builder.query<Question, string>({
      query: (id) => `/questions?id=eq.${encodeURIComponent(id)}&select=*`,
      transformResponse: (data: Question[]) => data[0],
      providesTags: (_result, _err, id) => [{ type: "Question", id }],
    }),

    // ── CREATE ────────────────────────────────────────────────────────────────
    createQuestion: builder.mutation<Question, CreateQuestionInput>({
      query: (body) => ({
        url: "/questions",
        method: "POST",
        body,
      }),
      transformResponse: (data: Question[]) => data[0],
      invalidatesTags: [{ type: "Question", id: "LIST" }],
    }),

    // ── UPDATE ────────────────────────────────────────────────────────────────
    updateQuestion: builder.mutation<Question, UpdateQuestionInput>({
      query: ({ id, ...patch }) => ({
        url: `/questions?id=eq.${encodeURIComponent(id)}`,
        method: "PATCH",
        body: { ...patch, updated_at: new Date().toISOString() },
      }),
      transformResponse: (data: Question[]) => data[0],
      invalidatesTags: (_result, _err, { id }) => [
        { type: "Question", id },
        { type: "Question", id: "LIST" },
      ],
    }),

    // ── DELETE ────────────────────────────────────────────────────────────────
    deleteQuestion: builder.mutation<void, string>({
      query: (id) => ({
        url: `/questions?id=eq.${encodeURIComponent(id)}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _err, id) => [
        { type: "Question", id },
        { type: "Question", id: "LIST" },
      ],
    }),

    // ── BULK DELETE ───────────────────────────────────────────────────────────
    bulkDeleteQuestions: builder.mutation<void, string[]>({
      query: (ids) => ({
        url: `/questions?id=in.(${ids.map((id) => `"${id}"`).join(",")})`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Question", id: "LIST" }],
    }),

    // ── STATS (counts per subject+age_group) ──────────────────────────────────
    getQuestionStats: builder.query<{ subject_id: string; age_group: string; count: number }[], void>({
      query: () => `/questions?select=subject_id,age_group`,
      transformResponse: (data: { subject_id: string; age_group: string }[]) => {
        const map: Record<string, number> = {};
        data.forEach(({ subject_id, age_group }) => {
          const key = `${subject_id}__${age_group}`;
          map[key] = (map[key] ?? 0) + 1;
        });
        return Object.entries(map).map(([key, count]) => {
          const [subject_id, age_group] = key.split("__");
          return { subject_id, age_group, count };
        });
      },
      providesTags: [{ type: "Question", id: "LIST" }],
    }),
  }),
});

export const {
  useGetQuestionsQuery,
  useGetQuestionQuery,
  useCreateQuestionMutation,
  useUpdateQuestionMutation,
  useDeleteQuestionMutation,
  useBulkDeleteQuestionsMutation,
  useGetQuestionStatsQuery,
} = questionsApi;