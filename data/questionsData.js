// src/data/questionsData.js
// ─────────────────────────────────────────────────────────────────────────────
// AGE GROUPS
//   "baby"   → 2–3  : animal sounds (audio-first, no reading required)
//   "tiny"   → 4–5  : colours, animals, shapes (visual/audio/picture)
//   "young"  → 6–8  : easy math, simple English, fun science, basic history
//   "middle" → 9–12 : medium math, English grammar, science, history
//   "teen"   → 13+  : hard math, advanced English, science, history
// ─────────────────────────────────────────────────────────────────────────────

export const AGE_GROUPS = [
  {
    id: 'baby',
    label: '2 – 3 years',
    emoji: '🍼',
    description: 'sounds & pictures',
    minAge: 2,
    maxAge: 3,
  },
  {
    id: 'tiny',
    label: '4 – 5 years',
    emoji: '🐣',
    description: 'Colours, animals & shapes',
    minAge: 4,
    maxAge: 5,
  },
  {
    id: 'young',
    label: '6 – 8 years',
    emoji: '🌱',
    description: 'Easy math, simple words & fun facts',
    minAge: 6,
    maxAge: 8,
  },
  {
    id: 'middle',
    label: '9 – 12 years',
    emoji: '📚',
    description: 'Math, grammar, science & history',
    minAge: 9,
    maxAge: 12,
  },
  {
    id: 'teen',
    label: '13+ years',
    emoji: '🚀',
    description: 'Advanced questions across all subjects',
    minAge: 13,
    maxAge: 99,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// SUBJECT DEFINITIONS
// ─────────────────────────────────────────────────────────────────────────────

export const SUBJECTS = [
  {
    id: 'sounds',
    title: 'Animal Sounds',
    emoji: '🔊',
    description: 'Listen and pick the right animal',
    ageGroups: ['baby'],
  },
  {
    id: 'colors',
    title: 'Colours Sounds',
    emoji: '🎨',
    description: 'Listen and pick the right colour',
    ageGroups: ['tiny', 'baby'],
  },
  {
    id: 'animals',
    title: 'Animals',
    emoji: '🐾',
    description: 'Identify animals from pictures',
    ageGroups: ['tiny'],
  },
  {
    id: 'shapes',
    title: 'Shapes',
    emoji: '🔷',
    description: 'Recognise basic shapes',
    ageGroups: ['tiny'],
  },
  {
    id: 'math',
    title: 'Math',
    emoji: '🔢',
    description: 'Numbers, addition, subtraction and more',
    ageGroups: ['young', 'middle', 'teen'],
  },
  {
    id: 'english',
    title: 'English',
    emoji: '📝',
    description: 'Vocabulary, grammar and spelling',
    ageGroups: ['young', 'middle', 'teen'],
  },
  {
    id: 'science',
    title: 'Science',
    emoji: '🔬',
    description: 'Nature, space and how things work',
    ageGroups: ['young', 'middle', 'teen'],
  },
  {
    id: 'history',
    title: 'History',
    emoji: '🏛️',
    description: 'People, places and events from the past',
    ageGroups: ['middle', 'teen'],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// OPTION TYPES
// ─────────────────────────────────────────────────────────────────────────────
//
//  'text'   → plain text button (default for all reading-level questions)
//  'emoji'  → large emoji tile — options already contain emoji (e.g. '🦁 Lion')
//             Overlay enlarges font and hides text label if needed.
//  'color'  → filled colour circle.  Requires `optionColors` map on the
//             question object: { [optionLabel]: '#hexCode' }
//             The option label is still shown as small text below the circle.
//
// ─────────────────────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────────────────────
// SOUND KEYS
// Maps to res/raw/<key>.mp3 on Android.
//
// Animal sounds  — sound_lion, sound_cat, sound_dog, sound_cow, sound_duck,
//                  sound_elephant, sound_horse, sound_frog, sound_chicken, sound_sheep
//
// Colour sounds  — sound_color_red, sound_color_blue, sound_color_yellow,
//                  sound_color_green, sound_color_orange, sound_color_purple,
//                  sound_color_pink, sound_color_white, sound_color_black
//                  (short spoken-word audio: "Red!", "Blue!", etc.)
//
// Add each .mp3 to android/app/src/main/res/raw/ and register it in
// OverlayService.SOUND_MAP.
// ─────────────────────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────────────────────
// QUESTIONS
// Extra fields added:
//   optionType   : 'text' | 'emoji' | 'color'
//   optionColors : { [optionLabel]: '#hexCode' }  — only for optionType:'color'
// ─────────────────────────────────────────────────────────────────────────────

export const QUESTIONS = {

  // ── BABY (2–3) — sound-first, emoji answers ──────────────────────────────

  sounds: {
    baby: [
      {
        id: 'snd_1',
        question: 'Which animal makes this sound?',
        type: 'mcq',
        optionType: 'emoji',
        options: ['🦁 Lion', '🐱 Cat', '🐶 Dog'],
        answer: '🦁 Lion',
        soundKey: 'sound_lion',
      },
      {
        id: 'snd_2',
        question: 'Which animal makes this sound?',
        type: 'mcq',
        optionType: 'emoji',
        options: ['🐱 Cat', '🦁 Lion', '🐮 Cow'],
        answer: '🐱 Cat',
        soundKey: 'sound_cat',
      },
      {
        id: 'snd_3',
        question: 'Which animal makes this sound?',
        type: 'mcq',
        optionType: 'emoji',
        options: ['🐶 Dog', '🐸 Frog', '🐦 Bird'],
        answer: '🐶 Dog',
        soundKey: 'sound_dog',
      },
      {
        id: 'snd_4',
        question: 'Which animal makes this sound?',
        type: 'mcq',
        optionType: 'emoji',
        options: ['🐮 Cow', '🐶 Dog', '🦆 Duck'],
        answer: '🐮 Cow',
        soundKey: 'sound_cow',
      },
      {
        id: 'snd_5',
        question: 'Which animal makes this sound?',
        type: 'mcq',
        optionType: 'emoji',
        options: ['🦆 Duck', '🐱 Cat', '🐑 Sheep'],
        answer: '🦆 Duck',
        soundKey: 'sound_duck',
      },
      {
        id: 'snd_6',
        question: 'Which animal makes this sound?',
        type: 'mcq',
        optionType: 'emoji',
        options: ['🐘 Elephant', '🐶 Dog', '🦁 Lion'],
        answer: '🐘 Elephant',
        soundKey: 'sound_elephant',
      },
      {
        id: 'snd_7',
        question: 'Which animal makes this sound?',
        type: 'mcq',
        optionType: 'emoji',
        options: ['🐴 Horse', '🐮 Cow', '🐱 Cat'],
        answer: '🐴 Horse',
        soundKey: 'sound_horse',
      },
      {
        id: 'snd_8',
        question: 'Which animal makes this sound?',
        type: 'mcq',
        optionType: 'emoji',
        options: ['🐸 Frog', '🦆 Duck', '🐶 Dog'],
        answer: '🐸 Frog',
        soundKey: 'sound_frog',
      },
      {
        id: 'snd_9',
        question: 'Which animal makes this sound?',
        type: 'mcq',
        optionType: 'emoji',
        options: ['🐔 Chicken', '🐱 Cat', '🐑 Sheep'],
        answer: '🐔 Chicken',
        soundKey: 'sound_chicken',
      },
      {
        id: 'snd_10',
        question: 'Which animal makes this sound?',
        type: 'mcq',
        optionType: 'emoji',
        options: ['🐑 Sheep', '🐴 Horse', '🦁 Lion'],
        answer: '🐑 Sheep',
        soundKey: 'sound_sheep',
      },
    ],
  },

  // ── TINY (4–5) AND BABY (2–3) colour questions ────────────────────────────
  // FIX 3: added `baby` key so that baby + random includes colour questions.
  // Baby colour questions are audio-first (soundKey always set) with simple
  // 3-colour choices identical to the tiny set.

  colors: {
    // ── shared colour question bank (used by both tiny and baby) ─────────────
    tiny: [
  {
    id: 'col_1',
    question: 'What colour do you hear?',
    type: 'mcq',
    optionType: 'color',
    options: ['Red', 'Blue', 'Green'],
    answer: 'Red',
    soundKey: 'sound_color_red',
    optionColors: {
      Red: '#EF4444',
      Blue: '#3B82F6',
      Green: '#22C55E',
    },
  },
  {
    id: 'col_2',
    question: 'What colour do you hear?',
    type: 'mcq',
    optionType: 'color',
    options: ['Yellow', 'Blue', 'Pink'],
    answer: 'Blue',
    soundKey: 'sound_color_blue',
    optionColors: {
      Yellow: '#EAB308',
      Blue: '#3B82F6',
      Pink: '#EC4899',
    },
  },
  {
    id: 'col_3',
    question: 'What colour do you hear?',
    type: 'mcq',
    optionType: 'color',
    options: ['Purple', 'Orange', 'Yellow'],
    answer: 'Yellow',
    soundKey: 'sound_color_yellow',
    optionColors: {
      Purple: '#A855F7',
      Orange: '#F97316',
      Yellow: '#EAB308',
    },
  },
  {
    id: 'col_4',
    question: 'What colour do you hear?',
    type: 'mcq',
    optionType: 'color',
    options: ['Green', 'Red', 'Blue'],
    answer: 'Green',
    soundKey: 'sound_color_green',
    optionColors: {
      Green: '#22C55E',
      Red: '#EF4444',
      Blue: '#3B82F6',
    },
  },
  {
    id: 'col_5',
    question: 'What colour do you hear?',
    type: 'mcq',
    optionType: 'color',
    options: ['Pink', 'Orange', 'White'],
    answer: 'Orange',
    soundKey: 'sound_color_orange',
    optionColors: {
      Pink: '#EC4899',
      Orange: '#F97316',
      White: '#F9FAFB',
    },
  },
  {
    id: 'col_6',
    question: 'What colour do you hear?',
    type: 'mcq',
    optionType: 'color',
    options: ['Purple', 'Pink', 'Blue'],
    answer: 'Purple',
    soundKey: 'sound_color_purple',
    optionColors: {
      Purple: '#A855F7',
      Pink: '#EC4899',
      Blue: '#3B82F6',
    },
  },
  {
    id: 'col_7',
    question: 'What colour do you hear?',
    type: 'mcq',
    optionType: 'color',
    options: ['Pink', 'Green', 'Yellow'],
    answer: 'Pink',
    soundKey: 'sound_color_pink',
    optionColors: {
      Pink: '#EC4899',
      Green: '#22C55E',
      Yellow: '#EAB308',
    },
  },
  {
    id: 'col_8',
    question: 'What colour do you hear?',
    type: 'mcq',
    optionType: 'color',
    options: ['White', 'Black', 'Blue'],
    answer: 'White',
    soundKey: 'sound_color_white',
    optionColors: {
      White: '#F9FAFB',
      Black: '#1F2937',
      Blue: '#3B82F6',
    },
  },
  {
    id: 'col_9',
    question: 'What colour do you hear?',
    type: 'mcq',
    optionType: 'color',
    options: ['Black', 'Red', 'Yellow'],
    answer: 'Black',
    soundKey: 'sound_color_black',
    optionColors: {
      Black: '#1F2937',
      Red: '#EF4444',
      Yellow: '#EAB308',
    },
  },
],

baby: [
  {
    id: 'col_b1',
    question: 'What colour do you hear?',
    type: 'mcq',
    optionType: 'color',
    options: ['Red', 'Blue', 'Yellow'],
    answer: 'Red',
    soundKey: 'sound_color_red',
    optionColors: {
      Red: '#EF4444',
      Blue: '#3B82F6',
      Yellow: '#EAB308',
    },
  },
  {
    id: 'col_b2',
    question: 'What colour do you hear?',
    type: 'mcq',
    optionType: 'color',
    options: ['Red', 'Blue', 'Green'],
    answer: 'Blue',
    soundKey: 'sound_color_blue',
    optionColors: {
      Red: '#EF4444',
      Blue: '#3B82F6',
      Green: '#22C55E',
    },
  },
  {
    id: 'col_b3',
    question: 'What colour do you hear?',
    type: 'mcq',
    optionType: 'color',
    options: ['Blue', 'Yellow', 'Green'],
    answer: 'Yellow',
    soundKey: 'sound_color_yellow',
    optionColors: {
      Blue: '#3B82F6',
      Yellow: '#EAB308',
      Green: '#22C55E',
    },
  },
  {
    id: 'col_b4',
    question: 'What colour do you hear?',
    type: 'mcq',
    optionType: 'color',
    options: ['Red', 'Yellow', 'Green'],
    answer: 'Green',
    soundKey: 'sound_color_green',
    optionColors: {
      Red: '#EF4444',
      Yellow: '#EAB308',
      Green: '#22C55E',
    },
  },
  {
    id: 'col_b5',
    question: 'What colour do you hear?',
    type: 'mcq',
    optionType: 'color',
    options: ['Blue', 'Orange', 'Green'],
    answer: 'Orange',
    soundKey: 'sound_color_orange',
    optionColors: {
      Blue: '#3B82F6',
      Orange: '#F97316',
      Green: '#22C55E',
    },
  },
  {
    id: 'col_b6',
    question: 'What colour do you hear?',
    type: 'mcq',
    optionType: 'color',
    options: ['Purple', 'Pink', 'Blue'],
    answer: 'Purple',
    soundKey: 'sound_color_purple',
    optionColors: {
      Purple: '#A855F7',
      Pink: '#EC4899',
      Blue: '#3B82F6',
    },
  },
  {
    id: 'col_b7',
    question: 'What colour do you hear?',
    type: 'mcq',
    optionType: 'color',
    options: ['Pink', 'Yellow', 'Red'],
    answer: 'Pink',
    soundKey: 'sound_color_pink',
    optionColors: {
      Pink: '#EC4899',
      Yellow: '#EAB308',
      Red: '#EF4444',
    },
  },
  {
    id: 'col_b8',
    question: 'What colour do you hear?',
    type: 'mcq',
    optionType: 'color',
    options: ['White', 'Blue', 'Green'],
    answer: 'White',
    soundKey: 'sound_color_white',
    optionColors: {
      White: '#F9FAFB',
      Blue: '#3B82F6',
      Green: '#22C55E',
    },
  },
  {
    id: 'col_b9',
    question: 'What colour do you hear?',
    type: 'mcq',
    optionType: 'color',
    options: ['Black', 'Red', 'Orange'],
    answer: 'Black',
    soundKey: 'sound_color_black',
    optionColors: {
      Black: '#1F2937',
      Red: '#EF4444',
      Orange: '#F97316',
    },
  },
],
  },

  animals: {
    tiny: [
      {
        id: 'ani_1',
        question: 'Which animal goes "Moo"?',
        type: 'mcq',
        optionType: 'emoji',
        options: ['🐶 Dog', '🐄 Cow', '🐱 Cat'],
        answer: '🐄 Cow',
        visual: '🐄',
      },
      {
        id: 'ani_2',
        question: 'Which animal has a long neck?',
        type: 'mcq',
        optionType: 'emoji',
        options: ['🐘 Elephant', '🦒 Giraffe', '🦁 Lion'],
        answer: '🦒 Giraffe',
        visual: '🦒',
      },
      {
        id: 'ani_3',
        question: 'Which animal can fly?',
        type: 'mcq',
        optionType: 'emoji',
        options: ['🐟 Fish', '🐦 Bird', '🐶 Dog'],
        answer: '🐦 Bird',
        visual: '🐦',
      },
      {
        id: 'ani_4',
        question: 'Which animal lives in the sea?',
        type: 'mcq',
        optionType: 'emoji',
        options: ['🐰 Rabbit', '🐟 Fish', '🐴 Horse'],
        answer: '🐟 Fish',
        visual: '🐟',
      },
      {
        id: 'ani_5',
        question: 'Which animal goes "Woof"?',
        type: 'mcq',
        optionType: 'emoji',
        options: ['🐱 Cat', '🐄 Cow', '🐶 Dog'],
        answer: '🐶 Dog',
        visual: '🐶',
      },
      {
        id: 'ani_6',
        question: 'Which animal has a trunk?',
        type: 'mcq',
        optionType: 'emoji',
        options: ['🐘 Elephant', '🐯 Tiger', '🐒 Monkey'],
        answer: '🐘 Elephant',
        visual: '🐘',
      },
      {
        id: 'ani_7',
        question: 'Which animal hops?',
        type: 'mcq',
        optionType: 'emoji',
        options: ['🐍 Snake', '🐰 Rabbit', '🐻 Bear'],
        answer: '🐰 Rabbit',
        visual: '🐰',
      },
      {
        id: 'ani_8',
        question: 'Which animal has stripes?',
        type: 'mcq',
        optionType: 'emoji',
        options: ['🐼 Panda', '🐯 Tiger', '🐘 Elephant'],
        answer: '🐯 Tiger',
        visual: '🐯',
      },
    ],
  },

  shapes: {
    tiny: [
      { id: 'shp_1', question: 'How many sides does a triangle have?', type: 'mcq', optionType: 'text', options: ['2', '3', '4'], answer: '3', visual: '🔺' },
      { id: 'shp_2', question: 'What shape is a ball?', type: 'mcq', optionType: 'text', options: ['Square', 'Circle', 'Triangle'], answer: 'Circle', visual: '⭕' },
      { id: 'shp_3', question: 'What shape is a pizza slice?', type: 'mcq', optionType: 'text', options: ['Circle', 'Square', 'Triangle'], answer: 'Triangle', visual: '🔺' },
      { id: 'shp_4', question: 'How many sides does a square have?', type: 'mcq', optionType: 'text', options: ['3', '4', '5'], answer: '4', visual: '🟦' },
      { id: 'shp_5', question: 'What shape is a clock face?', type: 'mcq', optionType: 'text', options: ['Rectangle', 'Circle', 'Triangle'], answer: 'Circle', visual: '⭕' },
      { id: 'shp_6', question: 'What shape has 6 sides?', type: 'mcq', optionType: 'text', options: ['Pentagon', 'Hexagon', 'Octagon'], answer: 'Hexagon', visual: '⬡' },
      { id: 'shp_7', question: 'How many corners does a rectangle have?', type: 'mcq', optionType: 'text', options: ['3', '4', '6'], answer: '4', visual: '🟦' },
      { id: 'shp_8', question: 'Which shape looks like an egg?', type: 'mcq', optionType: 'text', options: ['Square', 'Oval', 'Triangle'], answer: 'Oval', visual: '🥚' },
    ],
  },

  // ── YOUNG ───────────────────────────────────────────────────────────────────

  math: {
    young: [
      { id: 'my_1',  question: '2 + 3 = ?',          type: 'mcq', optionType: 'text', options: ['4', '5', '6'],           answer: '5' },
      { id: 'my_2',  question: '7 - 4 = ?',          type: 'mcq', optionType: 'text', options: ['2', '3', '4'],           answer: '3' },
      { id: 'my_3',  question: '3 × 2 = ?',          type: 'mcq', optionType: 'text', options: ['5', '6', '7'],           answer: '6' },
      { id: 'my_4',  question: '10 ÷ 2 = ?',         type: 'mcq', optionType: 'text', options: ['4', '5', '6'],           answer: '5' },
      { id: 'my_5',  question: '5 + 8 = ?',          type: 'mcq', optionType: 'text', options: ['11', '12', '13'],        answer: '13' },
      { id: 'my_6',  question: '9 - 6 = ?',          type: 'mcq', optionType: 'text', options: ['2', '3', '4'],           answer: '3' },
      { id: 'my_7',  question: '4 × 3 = ?',          type: 'mcq', optionType: 'text', options: ['10', '11', '12'],        answer: '12' },
      { id: 'my_8',  question: 'What is half of 10?', type: 'mcq', optionType: 'text', options: ['4', '5', '6'],           answer: '5' },
      { id: 'my_9',  question: '15 + 5 = ?',         type: 'mcq', optionType: 'text', options: ['18', '20', '22'],        answer: '20' },
      { id: 'my_10', question: '20 - 8 = ?',         type: 'mcq', optionType: 'text', options: ['10', '11', '12'],        answer: '12' },
    ],
    middle: [
      { id: 'mm_1',  question: '12 × 8 = ?',                                  type: 'mcq', optionType: 'text', options: ['86', '96', '106'],                     answer: '96' },
      { id: 'mm_2',  question: '144 ÷ 12 = ?',                                type: 'mcq', optionType: 'text', options: ['10', '12', '14'],                     answer: '12' },
      { id: 'mm_3',  question: 'What is 25% of 80?',                           type: 'mcq', optionType: 'text', options: ['15', '20', '25'],                     answer: '20' },
      { id: 'mm_4',  question: '√64 = ?',                                      type: 'mcq', optionType: 'text', options: ['6', '7', '8'],                        answer: '8' },
      { id: 'mm_5',  question: '3² + 4² = ?',                                  type: 'mcq', optionType: 'text', options: ['25', '30', '35'],                     answer: '25' },
      { id: 'mm_6',  question: 'What is 15% of 60?',                           type: 'mcq', optionType: 'text', options: ['7', '9', '11'],                       answer: '9' },
      { id: 'mm_7',  question: '56 ÷ 7 = ?',                                   type: 'mcq', optionType: 'text', options: ['6', '7', '8'],                        answer: '8' },
      { id: 'mm_8',  question: 'What is the perimeter of a square with side 5?',type: 'mcq', optionType: 'text', options: ['15', '20', '25'],                    answer: '20' },
      { id: 'mm_9',  question: '123 + 456 = ?',                                type: 'mcq', optionType: 'text', options: ['567', '579', '589'],                  answer: '579' },
      { id: 'mm_10', question: '1000 - 357 = ?',                               type: 'mcq', optionType: 'text', options: ['643', '653', '663'],                  answer: '643' },
    ],
    teen: [
      { id: 'mt_1',  question: 'Solve: 2x + 6 = 14, x = ?',                   type: 'mcq', optionType: 'text', options: ['3', '4', '5'],                        answer: '4' },
      { id: 'mt_2',  question: 'What is 20% of 350?',                          type: 'mcq', optionType: 'text', options: ['60', '70', '80'],                     answer: '70' },
      { id: 'mt_3',  question: '√225 = ?',                                     type: 'mcq', optionType: 'text', options: ['13', '15', '17'],                     answer: '15' },
      { id: 'mt_4',  question: 'What is 5³?',                                  type: 'mcq', optionType: 'text', options: ['100', '115', '125'],                  answer: '125' },
      { id: 'mt_5',  question: 'LCM of 6 and 9?',                             type: 'mcq', optionType: 'text', options: ['12', '18', '24'],                     answer: '18' },
      { id: 'mt_6',  question: 'Area of circle with radius 7 (use π≈3.14)?',  type: 'mcq', optionType: 'text', options: ['143.07', '153.86', '163.54'],          answer: '153.86' },
      { id: 'mt_7',  question: 'Simplify: (3 + 5) × 2 − 4 = ?',              type: 'mcq', optionType: 'text', options: ['10', '12', '14'],                     answer: '12' },
      { id: 'mt_8',  question: 'What is the HCF of 24 and 36?',               type: 'mcq', optionType: 'text', options: ['6', '12', '18'],                      answer: '12' },
      { id: 'mt_9',  question: 'If 40% of x = 80, then x = ?',               type: 'mcq', optionType: 'text', options: ['160', '200', '220'],                   answer: '200' },
      { id: 'mt_10', question: '(-5) × (-4) = ?',                             type: 'mcq', optionType: 'text', options: ['−20', '0', '20'],                     answer: '20' },
    ],
  },

  english: {
    young: [
      { id: 'ey_1', question: 'Which is a fruit?',               type: 'mcq', optionType: 'text', options: ['Apple', 'Chair', 'Book'],              answer: 'Apple' },
      { id: 'ey_2', question: 'Opposite of "hot"?',             type: 'mcq', optionType: 'text', options: ['Warm', 'Cold', 'Dark'],                 answer: 'Cold' },
      { id: 'ey_3', question: 'Plural of "cat"?',               type: 'mcq', optionType: 'text', options: ['Cates', 'Cats', 'Catz'],                answer: 'Cats' },
      { id: 'ey_4', question: 'Which word means happy?',        type: 'mcq', optionType: 'text', options: ['Sad', 'Angry', 'Joyful'],               answer: 'Joyful' },
      { id: 'ey_5', question: 'Opposite of "big"?',             type: 'mcq', optionType: 'text', options: ['Large', 'Small', 'Tall'],               answer: 'Small' },
      { id: 'ey_6', question: 'Spell the number 4?',            type: 'mcq', optionType: 'text', options: ['For', 'Four', 'Fore'],                  answer: 'Four' },
      { id: 'ey_7', question: 'Which is an animal?',            type: 'mcq', optionType: 'text', options: ['Table', 'Lion', 'Cloud'],               answer: 'Lion' },
      { id: 'ey_8', question: 'Past tense of "jump"?',          type: 'mcq', optionType: 'text', options: ['Jumped', 'Jumps', 'Jumping'],           answer: 'Jumped' },
    ],
    middle: [
      { id: 'em_1', question: 'Synonym of "brave"?',            type: 'mcq', optionType: 'text', options: ['Cowardly', 'Courageous', 'Careless'],   answer: 'Courageous' },
      { id: 'em_2', question: 'Plural of "child"?',             type: 'mcq', optionType: 'text', options: ['Childs', 'Childes', 'Children'],        answer: 'Children' },
      { id: 'em_3', question: 'Past tense of "run"?',           type: 'mcq', optionType: 'text', options: ['Runned', 'Ran', 'Running'],             answer: 'Ran' },
      { id: 'em_4', question: 'Opposite of "ancient"?',         type: 'mcq', optionType: 'text', options: ['Old', 'Modern', 'Antique'],             answer: 'Modern' },
      { id: 'em_5', question: 'Which sentence is correct?',     type: 'mcq', optionType: 'text', options: ['She go to school', 'She goes to school', 'She going to school'], answer: 'She goes to school' },
      { id: 'em_6', question: 'Plural of "tooth"?',             type: 'mcq', optionType: 'text', options: ['Tooths', 'Toothes', 'Teeth'],           answer: 'Teeth' },
      { id: 'em_7', question: 'Synonym of "difficult"?',        type: 'mcq', optionType: 'text', options: ['Easy', 'Hard', 'Simple'],               answer: 'Hard' },
      { id: 'em_8', question: 'Opposite of "empty"?',           type: 'mcq', optionType: 'text', options: ['Full', 'Hollow', 'Large'],              answer: 'Full' },
    ],
    teen: [
      { id: 'et_1', question: 'What is a "metaphor"?',          type: 'mcq', optionType: 'text', options: ['Direct comparison using like/as', 'Comparison without like/as', 'Exaggeration for effect'], answer: 'Comparison without like/as' },
      { id: 'et_2', question: 'Synonym of "ephemeral"?',        type: 'mcq', optionType: 'text', options: ['Permanent', 'Fleeting', 'Powerful'],    answer: 'Fleeting' },
      { id: 'et_3', question: 'Correct spelling?',              type: 'mcq', optionType: 'text', options: ['Accomodate', 'Accommodate', 'Acommodate'], answer: 'Accommodate' },
      { id: 'et_4', question: 'Passive voice of "She wrote a letter"?', type: 'mcq', optionType: 'text', options: ['A letter was written by her', 'A letter is written', 'She is writing a letter'], answer: 'A letter was written by her' },
      { id: 'et_5', question: 'Antonym of "benevolent"?',       type: 'mcq', optionType: 'text', options: ['Kind', 'Malevolent', 'Generous'],       answer: 'Malevolent' },
      { id: 'et_6', question: '"She is a night owl." This is a ___?', type: 'mcq', optionType: 'text', options: ['Simile', 'Alliteration', 'Metaphor'], answer: 'Metaphor' },
      { id: 'et_7', question: 'Plural of "phenomenon"?',        type: 'mcq', optionType: 'text', options: ['Phenomenas', 'Phenomena', 'Phenomenons'], answer: 'Phenomena' },
      { id: 'et_8', question: 'Which is an adverb?',            type: 'mcq', optionType: 'text', options: ['Quickly', 'Quick', 'Quicker'],          answer: 'Quickly' },
    ],
  },

  science: {
    young: [
      { id: 'sy_1', question: 'What do plants need to grow?',      type: 'mcq', optionType: 'text', options: ['Oil & Fire', 'Sun, Water & Soil', 'Ice & Snow'],   answer: 'Sun, Water & Soil' },
      { id: 'sy_2', question: 'How many legs does a spider have?', type: 'mcq', optionType: 'text', options: ['6', '8', '10'],                                    answer: '8' },
      { id: 'sy_3', question: 'What do we breathe in?',            type: 'mcq', optionType: 'text', options: ['CO2', 'Oxygen', 'Nitrogen'],                       answer: 'Oxygen' },
      { id: 'sy_4', question: 'Closest star to Earth?',            type: 'mcq', optionType: 'text', options: ['Moon', 'Sun', 'Mars'],                             answer: 'Sun' },
      { id: 'sy_5', question: 'What covers most of Earth?',        type: 'mcq', optionType: 'text', options: ['Land', 'Ice', 'Water'],                            answer: 'Water' },
      { id: 'sy_6', question: 'Which animal lays eggs?',           type: 'mcq', optionType: 'text', options: ['Dog', 'Cat', 'Bird'],                              answer: 'Bird' },
      { id: 'sy_7', question: 'What do caterpillars turn into?',   type: 'mcq', optionType: 'text', options: ['Bees', 'Butterflies', 'Beetles'],                  answer: 'Butterflies' },
      { id: 'sy_8', question: 'How many planets in our solar system?', type: 'mcq', optionType: 'text', options: ['7', '8', '9'],                                answer: '8' },
    ],
    middle: [
      { id: 'sm_1', question: 'Powerhouse of the cell?',            type: 'mcq', optionType: 'text', options: ['Nucleus', 'Mitochondria', 'Ribosome'],            answer: 'Mitochondria' },
      { id: 'sm_2', question: 'Chemical formula of water?',         type: 'mcq', optionType: 'text', options: ['H2O2', 'HO2', 'H2O'],                            answer: 'H2O' },
      { id: 'sm_3', question: 'Planet closest to the Sun?',         type: 'mcq', optionType: 'text', options: ['Venus', 'Mercury', 'Earth'],                     answer: 'Mercury' },
      { id: 'sm_4', question: 'How many chromosomes do humans have?', type: 'mcq', optionType: 'text', options: ['23', '46', '48'],                              answer: '46' },
      { id: 'sm_5', question: 'Speed of light (approx km/s)?',      type: 'mcq', optionType: 'text', options: ['150,000', '300,000', '450,000'],                 answer: '300,000' },
      { id: 'sm_6', question: 'Which gas do plants absorb?',        type: 'mcq', optionType: 'text', options: ['O2', 'CO2', 'N2'],                               answer: 'CO2' },
      { id: 'sm_7', question: 'What force pulls objects downward?', type: 'mcq', optionType: 'text', options: ['Friction', 'Gravity', 'Tension'],                 answer: 'Gravity' },
      { id: 'sm_8', question: 'Which organ pumps blood?',           type: 'mcq', optionType: 'text', options: ['Liver', 'Heart', 'Lungs'],                        answer: 'Heart' },
    ],
    teen: [
      { id: 'st_1', question: 'Atomic number of Carbon?',           type: 'mcq', optionType: 'text', options: ['4', '6', '8'],                                   answer: '6' },
      { id: 'st_2', question: "What is Newton's 2nd law?",          type: 'mcq', optionType: 'text', options: ['F = ma', 'E = mc²', 'V = IR'],                   answer: 'F = ma' },
      { id: 'st_3', question: 'DNA stands for?',                    type: 'mcq', optionType: 'text', options: ['Deoxyribose Nucleic Acid', 'Dioxyribose Nitrogen Acid', 'Deoxyribonucleic Acid'], answer: 'Deoxyribonucleic Acid' },
      { id: 'st_4', question: "Most abundant gas in Earth's atmosphere?", type: 'mcq', optionType: 'text', options: ['Oxygen', 'CO2', 'Nitrogen'],               answer: 'Nitrogen' },
      { id: 'st_5', question: 'pH of pure water?',                  type: 'mcq', optionType: 'text', options: ['5', '7', '9'],                                   answer: '7' },
      { id: 'st_6', question: 'Which particle has no charge?',      type: 'mcq', optionType: 'text', options: ['Proton', 'Electron', 'Neutron'],                  answer: 'Neutron' },
      { id: 'st_7', question: 'Theory of evolution proposed by?',   type: 'mcq', optionType: 'text', options: ['Newton', 'Darwin', 'Einstein'],                  answer: 'Darwin' },
      { id: 'st_8', question: 'SI unit of electric current?',       type: 'mcq', optionType: 'text', options: ['Volt', 'Ampere', 'Watt'],                        answer: 'Ampere' },
    ],
  },

  history: {
    middle: [
      { id: 'hm_1', question: 'First US President?',               type: 'mcq', optionType: 'text', options: ['Lincoln', 'Washington', 'Jefferson'],  answer: 'Washington' },
      { id: 'hm_2', question: 'WW2 ended in?',                     type: 'mcq', optionType: 'text', options: ['1943', '1945', '1947'],                answer: '1945' },
      { id: 'hm_3', question: 'Which empire built the Colosseum?', type: 'mcq', optionType: 'text', options: ['Greek', 'Roman', 'Ottoman'],           answer: 'Roman' },
      { id: 'hm_4', question: 'Who discovered America in 1492?',   type: 'mcq', optionType: 'text', options: ['Vespucci', 'Magellan', 'Columbus'],    answer: 'Columbus' },
      { id: 'hm_5', question: 'Which country built the Great Wall?', type: 'mcq', optionType: 'text', options: ['India', 'China', 'Japan'],           answer: 'China' },
      { id: 'hm_6', question: 'WW1 began in?',                     type: 'mcq', optionType: 'text', options: ['1912', '1914', '1916'],                answer: '1914' },
      { id: 'hm_7', question: 'Ancient Egypt rulers were called?', type: 'mcq', optionType: 'text', options: ['Kings', 'Pharaohs', 'Emperors'],       answer: 'Pharaohs' },
      { id: 'hm_8', question: 'Capital of the Roman Empire?',      type: 'mcq', optionType: 'text', options: ['Athens', 'Rome', 'Paris'],             answer: 'Rome' },
    ],
    teen: [
      { id: 'ht_1', question: 'India gained independence in?',      type: 'mcq', optionType: 'text', options: ['1945', '1947', '1950'],                answer: '1947' },
      { id: 'ht_2', question: 'Who wrote the Declaration of Independence?', type: 'mcq', optionType: 'text', options: ['Madison', 'Hamilton', 'Jefferson'], answer: 'Jefferson' },
      { id: 'ht_3', question: 'The Cold War was primarily between?', type: 'mcq', optionType: 'text', options: ['US & China', 'US & USSR', 'UK & Germany'], answer: 'US & USSR' },
      { id: 'ht_4', question: 'The French Revolution began in?',    type: 'mcq', optionType: 'text', options: ['1789', '1799', '1812'],                answer: '1789' },
      { id: 'ht_5', question: 'First man on the Moon?',             type: 'mcq', optionType: 'text', options: ['Buzz Aldrin', 'Neil Armstrong', 'Yuri Gagarin'], answer: 'Neil Armstrong' },
      { id: 'ht_6', question: 'The Berlin Wall fell in?',           type: 'mcq', optionType: 'text', options: ['1987', '1989', '1991'],                answer: '1989' },
      { id: 'ht_7', question: 'Led the Indian independence movement?', type: 'mcq', optionType: 'text', options: ['Nehru', 'Gandhi', 'Bose'],         answer: 'Gandhi' },
      { id: 'ht_8', question: 'Ancient wonder in Alexandria?',      type: 'mcq', optionType: 'text', options: ['Hanging Gardens', 'Lighthouse', 'Colossus'], answer: 'Lighthouse' },
    ],
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// HELPER FUNCTIONS
// ─────────────────────────────────────────────────────────────────────────────

export function getAgeGroup(age) {
  return AGE_GROUPS.find(g => age >= g.minAge && age <= g.maxAge) ?? AGE_GROUPS[1];
}

export function getSubjectsForAgeGroup(ageGroupId) {
  return SUBJECTS.filter(s => s.ageGroups.includes(ageGroupId));
}

export function getRandomQuestion(subjectId, ageGroupId) {
  const pool = QUESTIONS[subjectId]?.[ageGroupId];
  if (!pool || pool.length === 0) return null;
  return pool[Math.floor(Math.random() * pool.length)];
}

export function getQuestionsForSubject(subjectId, ageGroupId) {
  return QUESTIONS[subjectId]?.[ageGroupId] ?? [];
}