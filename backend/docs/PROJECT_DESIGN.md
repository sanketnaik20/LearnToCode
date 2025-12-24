# Gamified C++ Learning Platform Design

## 1. Database Schema (Relational)

We'll use a relational structure to ensure data integrity, especially for the curriculum tree and user progress.

### Core Tables

#### `users`
- `id`: UUID (Primary Key)
- `username`: VARCHAR(255) UNIQUE
- `email`: VARCHAR(255) UNIQUE
- `xp`: INTEGER DEFAULT 0
- `streak_count`: INTEGER DEFAULT 0
- `last_active_at`: TIMESTAMP
- `created_at`: TIMESTAMP

#### `curriculum_nodes` (Lessons/Units)
- `id`: UUID (Primary Key)
- `title`: VARCHAR(255)
- `slug`: VARCHAR(255) UNIQUE (e.g., 'intro-to-pointers')
- `type`: ENUM('unit', 'lesson')
- `parent_id`: UUID (Self-reference, FK to `curriculum_nodes.id`)
- `order_index`: INTEGER (For sequencing)
- `theory_content`: JSONB (Text snippets, code examples)
- `is_published`: BOOLEAN DEFAULT FALSE

#### `questions`
- `id`: UUID (Primary Key)
- `lesson_id`: UUID (FK to `curriculum_nodes.id`)
- `type`: ENUM('MCQ', 'PARSONS', 'FILL_IN_BLANK')
- `content`: JSONB (Question text, options/blocks)
- `solution_data`: JSONB (The correct answer structure)
- `concept_tags`: TEXT[] (e.g., `['memory', 'syntax']` for SRS)

#### `user_progress`
- `id`: UUID (Primary Key)
- `user_id`: UUID (FK to `users.id`)
- `node_id`: UUID (FK to `curriculum_nodes.id`)
- `status`: ENUM('LOCKED', 'UNLOCKED', 'COMPLETED')
- `last_attempt_at`: TIMESTAMP
- `best_score`: INTEGER

---

## 2. Validation Logic: C++ Fill-in-the-blank

C++ syntax allows flexibility in spacing. A simple string match will fail users who format code differently.

### Proposed Strategy: Tokenization-based Comparison

1. **Clean**: Remove leading/trailing whitespace.
2. **Tokenize**: Use a regex-based tokenizer to split the input and answer into C++ tokens.
   - Regex Example: `/\s*([a-zA-Z_][a-zA-Z0-9_]*|[0-9]+|[\+\-\*\/\=\&\|\!<>]+|[;,\.\(\)\[\]\{\}])\s*/g`
3. **Compare Sequences**: Ensure the sequence of tokens is identical, ignoring the amount/presence of whitespace between tokens (except where required for separation, e.g., `intx` vs `int x`).

**Example:**
- Expected: `int *ptr = &x;` -> `['int', '*', 'ptr', '=', '&', 'x', ';']`
- User Input: `int* ptr=&x;` -> `['int', '*', 'ptr', '=', '&', 'x', ';']`
- **Result**: Match ✅

---

## 3. Curriculum Mapping (JSON Structure)

```json
{
  "unit_id": "mem-mgmt-01",
  "title": "Memory Management",
  "lessons": [
    {
      "lesson_id": "pointers-101",
      "title": "Intro to Pointers",
      "prerequisites": ["basics-05"],
      "theory": [
        { "type": "text", "content": "Pointers hold memory addresses." },
        { "type": "code", "content": "int a = 5; int* p = &a;" }
      ],
      "questions": [
        {
          "id": "q_001",
          "type": "FILL_IN_BLANK",
          "text": "Assign the address of 'myVar' to pointer 'p'.",
          "code_template": "int* p = ___myVar;",
          "answer": "&"
        },
        {
          "id": "q_002",
          "type": "PARSONS",
          "text": "Reorder to print the value of a pointer.",
          "blocks": ["int x = 10;", "int* p = &x;", "std::cout << *p;"],
          "answer": [0, 1, 2]
        }
      ]
    }
  ]
}
```

---

## 4. Gamification & Spaced Repetition (SRS)

### Spaced Repetition Logic

We use a "Mastery Level" (0-5) system for specific `concept_tags`.

1. **Storage**: A `user_concept_mastery` table tracks `(user_id, concept_tag, mastery_level, next_review_at)`.
2. **Back-end Flow**:
   - **Correct Answer**: 
     - If `total_attempts` = 1, `mastery += 1`.
     - `next_review_at` = `now + (2^mastery days)`.
   - **Incorrect Answer**: 
     - Flag the concept immediately.
     - `mastery = max(0, mastery - 1)`.
     - `next_review_at` = `now + (few hours)`.
3. **Trigger**: When a user starts a "Daily Review" session, query concepts where `next_review_at <= now`.
4. **Streak Maintenance**:
   - Store `last_completion_date` on the user profile.
   - On login:
     - If `current_date == last_completion + 1`, streak continues.
     - If `current_date > last_completion + 1`, streak resets.
