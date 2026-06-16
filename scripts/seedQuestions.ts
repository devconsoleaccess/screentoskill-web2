// scripts/seedQuestions.ts
// Run once to seed your Supabase `questions` table from questionsData.js
//
// Usage:
//   npx ts-node -r tsconfig-paths/register scripts/seedQuestions.ts
//
// Or with tsx:
//   npx tsx scripts/seedQuestions.ts
// ─────────────────────────────────────────────────────────────────────────────

import { createClient } from "@supabase/supabase-js";
import { QUESTIONS } from "../data/questionsData";

const SUPABASE_URL      = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!; // use service key for seed

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// ─────────────────────────────────────────────────────────────────────────────

interface RawQuestion {
  id: string;
  question: string;
  type: string;
  optionType: string;
  options: string[];
  answer: string;
  soundKey?: string;
  visual?: string;
  optionColors?: Record<string, string>;
}

async function seed() {
  const rows: object[] = [];

  // Iterate subject → age_group → questions
  for (const [subjectId, ageGroups] of Object.entries(QUESTIONS)) {
    for (const [ageGroup, questions] of Object.entries(ageGroups as Record<string, RawQuestion[]>)) {
      for (const q of questions) {
        rows.push({
          id:           q.id,
          subject_id:   subjectId,
          age_group:    ageGroup,
          question:     q.question,
          type:         q.type ?? "mcq",
          option_type:  q.optionType ?? "text",
          options:      q.options,
          answer:       q.answer,
          sound_key:    q.soundKey ?? null,
          visual:       q.visual ?? null,
          option_colors: q.optionColors ?? null,
        });
      }
    }
  }

  console.log(`Seeding ${rows.length} questions…`);

  // Upsert in batches of 50
  const BATCH = 50;
  for (let i = 0; i < rows.length; i += BATCH) {
    const batch = rows.slice(i, i + BATCH);
    const { error } = await supabase
      .from("questions")
      .upsert(batch, { onConflict: "id" });

    if (error) {
      console.error(`Batch ${i / BATCH + 1} failed:`, error.message);
      process.exit(1);
    }
    console.log(`  ✓ batch ${i / BATCH + 1} (${batch.length} rows)`);
  }

  console.log("✅ Seed complete!");
}

seed().catch(console.error);