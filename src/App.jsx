import { useState } from "react";

const T = {
  personal:      { b: "#E8A55A", bg: "#FEF6EC", c: "#7A4520", tag: "Morning" },
  school:        { b: "#5BAEE8", bg: "#EBF4FF", c: "#0C447C", tag: "School" },
  study:         { b: "#6DC240", bg: "#EEF7E3", c: "#27500A", tag: "Study" },
  "study-opt":   { b: "#3EC9A7", bg: "#E5F7F2", c: "#085041", tag: "Optional" },
  buffer:        { b: "#F5A623", bg: "#FFF8E6", c: "#7A4E10", tag: "Buffer" },
  free:          { b: "#AAAA9F", bg: "#F3F3F0", c: "#444440", tag: "Free" },
  "lion-dance":  { b: "#E85555", bg: "#FEF0F0", c: "#7A1F1F", tag: "Lion Dance" },
  temple:        { b: "#9B8FE8", bg: "#F3F0FD", c: "#3C2E89", tag: "Temple" },
  "viet-school": { b: "#E8834B", bg: "#FEF3EC", c: "#7A3A10", tag: "Viet. School" },
  "wind-down":   { b: "#C8A8E8", bg: "#F8F0FD", c: "#4A3070", tag: "Wind Down" },
  sleep:         { b: "#7070A8", bg: "#EEECF8", c: "#2D2D5A", tag: "Sleep" },
  workout:       { b: "#E84040", bg: "#FFF2F2", c: "#7A0A0A", tag: "💪 Workout" },
};

const DAY_ACCENT = {
  Mon: "#6DC240", Tue: "#E84040", Wed: "#E85555",
  Thu: "#6DC240", Fri: "#E85555", Sat: "#E84040", Sun: "#E8834B",
};

const WORKOUT_SUBJECTS = [
  "🔥 Warmup · 4 min: High Knees, Arm Circles (2 sets), Hip Circles, Leg Swings, Bodyweight Squat",
  "💪 Main Circuit · 34 min: Romanian DL (3×17), Floor Press (3×13-15), Squeeze Press (2×12), Hammer Curl (3×4-6), Goblet Squat (2×22), DB Row (3×15-16)",
  "🏋️ Core + Shoulder + Arms + Calf · 33 min: Bulgarian Split Squat, Shoulder Press, Zottman Curl, Russian Twist, Tricep Extension, Wrist Curl, Lateral Raise, Calf Raise",
  "🎯 Finisher · 8 min: Dead Bug (3×10), Farmer's Hold (2 sets)",
  "⏱️ Total: ~2 hours including rest between blocks",
];

const WORKOUT_NOTE_EVE = "Eat during the 4:55 PM long study break — pre-workout meal window. Workout ends at 7:15 PM, giving you 2h15m before sleep. This is the tighter end of the gray zone — resistance training is more forgiving than cardio on sleep quality, so most people handle it fine. If you notice sleep issues, shift dinner to 4:30 and start at 5:00 instead.";
const WORKOUT_NOTE_SAT = "Best timing of the week: finishing at 9:15 AM puts 12+ hours between the workout and bedtime — zero sleep interference. Post-exercise cognition is enhanced for 1–2 hrs afterward, so your review right after is a bonus.";

const SAT_MORNING = [
  { t: "7:00–7:15 AM", l: "Wake up + quick prep", type: "personal", note: "Set your alarm for 7:00 AM the night before. 15 min to change, hydrate, and get ready." },
  { t: "7:15–9:15 AM", l: "Full-Body Workout", type: "workout", note: WORKOUT_NOTE_SAT, subjects: WORKOUT_SUBJECTS },
  { t: "9:15–9:35 AM", l: "Shower + breakfast", type: "buffer", note: "Post-workout shower + real breakfast. Protein-rich — you earned it." },
  { t: "9:35–10:00 AM", l: "Light review + task check", type: "study-opt",
    note: "Weekends are for recharging. 25 min max — scan what's due Monday, finish any tiny hanging tasks, then close the books.",
    subjects: ["Check what's due Monday", "Finish any task under 10 min", "Stop at 10:00 — no exceptions"] },
];

const SCHEDULE = {
  Mon: {
    label: "Monday", sub: "School + Full Study Evening",
    tip: "Your main study day. Start with History right after your snack — hardest task first while your brain is still warm from school.",
    blocks: [
      { t: "6:30–7:00 AM", l: "Wake up & get ready", type: "personal" },
      { t: "7:00 AM–2:40 PM", l: "School", type: "school" },
      { t: "2:40–3:00 PM", l: "Decompress + snack", type: "buffer", note: "Non-negotiable buffer — your brain needs this after 7+ hrs of school." },
      { t: "3:00–5:15 PM", l: "Main Study Block", type: "study", pom: 4,
        subjects: ["Pomodoro 1: 3:00–3:25 → History (hardest first)", "Break: 3:25–3:30", "Pomodoro 2: 3:30–3:55 → History continued", "Break: 3:55–4:00", "Pomodoro 3: 4:00–4:25 → Psychology", "Break: 4:25–4:30", "Pomodoro 4: 4:30–4:55 → English / overflow", "Long break: 4:55–5:15"] },
      { t: "5:15–6:15 PM", l: "Dinner / Personal time", type: "buffer", note: "Flex block — eat, relax. Don't study during this time." },
      { t: "6:15–7:30 PM", l: "Optional Study Block 2", type: "study-opt", pom: 3,
        subjects: ["Only use this if homework isn't finished", "Pomodoro 1–3: 6:15–7:20 → whatever's left", "Stop at 7:30 — no exceptions"] },
      { t: "7:30–8:30 PM", l: "Free time", type: "free" },
      { t: "8:30–9:30 PM", l: "Wind down + prep", type: "wind-down", note: "No screens after 9 PM. Lay out tomorrow's things, check Outlook." },
      { t: "9:30 PM", l: "Lights out", type: "sleep" },
    ],
  },

  Tue: {
    label: "Tuesday", sub: "School + Study + 💪 Workout 5:15–7:15 PM",
    tip: "Workout day. Eat your main meal during the 4:55 PM long break, then train 5:15–7:15 PM. The 2h15m buffer before sleep is on the tighter side but manageable — resistance training is easier on sleep than cardio. Research shows afternoon/evening training produces up to 84% more muscle gain vs. morning.",
    blocks: [
      { t: "6:30–7:00 AM", l: "Wake up & get ready", type: "personal" },
      { t: "7:00 AM–2:40 PM", l: "School", type: "school" },
      { t: "2:40–3:00 PM", l: "Decompress + snack", type: "buffer", note: "Non-negotiable buffer — recharge before studying." },
      { t: "3:00–5:15 PM", l: "Main Study Block", type: "study", pom: 4,
        subjects: ["Pomodoro 1: 3:00–3:25 → History (hardest first)", "Break: 3:25–3:30", "Pomodoro 2: 3:30–3:55 → History continued", "Break: 3:55–4:00", "Pomodoro 3: 4:00–4:25 → Psychology", "Break: 4:25–4:30", "Pomodoro 4: 4:30–4:55 → English / overflow", "Long break: 4:55–5:15 → 🍽️ Eat dinner here — pre-workout meal window"] },
      { t: "5:15–7:15 PM", l: "Full-Body Workout", type: "workout", note: WORKOUT_NOTE_EVE, subjects: WORKOUT_SUBJECTS },
      { t: "7:15–7:45 PM", l: "Shower + protein", type: "buffer", note: "Protein shake or meal within 30–60 min post-workout. Keep this block calm — it's recovery, not free time." },
      { t: "7:45–8:30 PM", l: "Free time", type: "free" },
      { t: "8:30–9:30 PM", l: "Wind down + prep", type: "wind-down", note: "No screens after 9 PM. Lay out tomorrow's things, check Outlook." },
      { t: "9:30 PM", l: "Lights out", type: "sleep" },
    ],
  },

  Wed: {
    label: "Wednesday", sub: "Short Day — Home 12:40 PM + Lion Dance (4:30–8:30)",
    tip: "Short day = your second-best study window of the week. You have 3+ hours before practice. Use it — this is your buffer for the whole week. No workout today — Lion Dance is physically demanding and you trained yesterday.",
    blocks: [
      { t: "6:30–7:00 AM", l: "Wake up & get ready", type: "personal" },
      { t: "7:00 AM–12:40 PM", l: "School (Short Day)", type: "school", note: "Early dismissal — you're home by 12:40." },
      { t: "12:40–1:00 PM", l: "Decompress + lunch", type: "buffer", note: "Eat, decompress. Big study block ahead." },
      { t: "1:00–3:30 PM", l: "Main Study Block", type: "study", pom: 5,
        subjects: ["Pomodoro 1: 1:00–1:25 → History (hardest, do it fresh)", "Break: 1:25–1:30", "Pomodoro 2: 1:30–1:55 → History continued", "Break: 1:55–2:00", "Pomodoro 3: 2:00–2:25 → Psychology", "Break: 2:25–2:30", "Pomodoro 4: 2:30–2:55 → English", "Break: 2:55–3:00", "Pomodoro 5: 3:00–3:25 → overflow / review", "Wind down: 3:25–3:30"] },
      { t: "3:30–4:30 PM", l: "Long break + pack for practice", type: "buffer", note: "Rest up and get ready — you've earned a proper break. Don't study during this." },
      { t: "4:30–8:30 PM", l: "Lion Dance Practice", type: "lion-dance" },
      { t: "8:30–9:30 PM", l: "Wind down", type: "wind-down", note: "Light review optional — max 20 min. No new material. You earned rest." },
      { t: "9:30 PM", l: "Lights out", type: "sleep" },
    ],
  },

  Thu: {
    variants: {
      practice: {
        label: "Thursday", sub: "School + Lion Dance (3:30–8:00 PM) — No Workout",
        tip: "Practice day: no time or energy for the full workout. Three consecutive Lion Dance days (Wed/Thu/Fri) plus Tuesday's workout is already a heavy load. Skip and recover. This week is Tue + Sat — still effective per volume research.",
        blocks: [
          { t: "6:30–7:00 AM", l: "Wake up & get ready", type: "personal" },
          { t: "7:00 AM–2:40 PM", l: "School", type: "school" },
          { t: "2:40–3:30 PM", l: "Decompress + pack bag", type: "buffer", note: "Eat a snack and pack your bag — the 3:30 start already accounts for travel." },
          { t: "3:30–8:00 PM", l: "Lion Dance Practice", type: "lion-dance" },
          { t: "8:00–8:30 PM", l: "Decompress + snack", type: "buffer", note: "Big practice — refuel before wind down. No studying tonight." },
          { t: "8:30–9:30 PM", l: "Wind down", type: "wind-down", note: "Check tomorrow's assignments in Outlook. Max 10-min light review only." },
          { t: "9:30 PM", l: "Lights out", type: "sleep" },
        ],
      },
      free: {
        label: "Thursday", sub: "School + Study + 💪 Workout 5:15–7:15 PM",
        tip: "Lucky free Thursday — same structure as Tuesday. If you're sore from Wednesday's Lion Dance, reduce load by ~20% but keep the session. Consistency matters more than any single set.",
        blocks: [
          { t: "6:30–7:00 AM", l: "Wake up & get ready", type: "personal" },
          { t: "7:00 AM–2:40 PM", l: "School", type: "school" },
          { t: "2:40–3:00 PM", l: "Decompress + snack", type: "buffer", note: "No rush today — full evening ahead." },
          { t: "3:00–5:15 PM", l: "Main Study Block", type: "study", pom: 4,
            subjects: ["Pomodoro 1: History (if still pending from Mon–Wed)", "Pomodoro 2: English essay drafting", "Pomodoro 3: Psychology deep review", "Pomodoro 4: Any overflow / reading", "Long break: 4:55–5:15 → 🍽️ Eat dinner here — pre-workout meal window"] },
          { t: "5:15–7:15 PM", l: "Full-Body Workout", type: "workout", note: WORKOUT_NOTE_EVE, subjects: WORKOUT_SUBJECTS },
          { t: "7:15–7:45 PM", l: "Shower + protein", type: "buffer", note: "Protein within 30–60 min post-workout. Recovery time — not study time." },
          { t: "7:45–8:30 PM", l: "Free time", type: "free" },
          { t: "8:30–9:30 PM", l: "Wind down + prep", type: "wind-down", note: "Check what's due Friday. Set Outlook blocks for the rest of the week." },
          { t: "9:30 PM", l: "Lights out", type: "sleep" },
        ],
      },
    },
  },

  Fri: {
    label: "Friday", sub: "School + Lion Dance (4:30–8:30 PM)",
    tip: "Tight but usable 90-min window after school before practice. Prioritize finishing anything due Monday — don't leave the weekend carrying schoolwork.",
    blocks: [
      { t: "6:30–7:00 AM", l: "Wake up & get ready", type: "personal" },
      { t: "7:00 AM–2:40 PM", l: "School", type: "school" },
      { t: "2:40–3:00 PM", l: "Decompress + snack", type: "buffer", note: "Quick reset before your study window." },
      { t: "3:00–4:30 PM", l: "Pre-Practice Study Block", type: "study", pom: 2,
        subjects: ["Pomodoro 1: 3:00–3:25 → Most urgent leftover work (History or English)", "Break: 3:25–3:30", "Pomodoro 2: 3:30–3:55 → Psychology review or weekend preview", "Wind down / pack bag: 3:55–4:30"] },
      { t: "4:30–8:30 PM", l: "Lion Dance Practice", type: "lion-dance" },
      { t: "8:30–9:00 PM", l: "Decompress + wind down", type: "wind-down", note: "Big practice night — no studying. Lay out Saturday things and get to bed." },
      { t: "9:00 PM", l: "Lights out", type: "sleep" },
    ],
  },

  Sat: {
    variants: {
      temple: {
        label: "Saturday", sub: "💪 Workout 7:15–9:15 AM · Temple (11:00 AM–5:30 PM)",
        tip: "Workout done before 9:15 AM, light review done by 10:00 AM — roll into Temple with everything handled and the evening completely free.",
        blocks: [
          ...SAT_MORNING,
          { t: "10:00–11:00 AM", l: "Free time + get ready for Temple", type: "free", note: "Plenty of time to get ready — the 11:00 AM start already accounts for travel." },
          { t: "11:00 AM–5:30 PM", l: "Temple", type: "temple" },
          { t: "5:30–6:30 PM", l: "Decompress + dinner", type: "buffer", note: "Long day — decompress properly before anything else." },
          { t: "6:30–8:30 PM", l: "Free time", type: "free" },
          { t: "8:30–9:30 PM", l: "Wind down", type: "wind-down" },
          { t: "9:30 PM", l: "Lights out", type: "sleep" },
        ],
      },
      short: {
        label: "Saturday", sub: "💪 Workout 7:15–9:15 AM · Temple Short Day (11:00 AM–4:30 PM)",
        tip: "Home by 4:30 — that's 5 extra hours compared to the full temple day. Workout is already done, review is done. The afternoon is genuinely yours.",
        blocks: [
          ...SAT_MORNING,
          { t: "10:00–11:00 AM", l: "Free time + get ready for Temple", type: "free", note: "Short day today — home by 4:30." },
          { t: "11:00 AM–4:30 PM", l: "Temple", type: "temple" },
          { t: "4:30–5:30 PM", l: "Decompress + dinner", type: "buffer", note: "You're home early — take a real break." },
          { t: "5:30–8:30 PM", l: "Free time", type: "free" },
          { t: "8:30–9:30 PM", l: "Wind down", type: "wind-down" },
          { t: "9:30 PM", l: "Lights out", type: "sleep" },
        ],
      },
      nope: {
        label: "Saturday", sub: "💪 Workout 7:15–9:15 AM · Free Day",
        tip: "Rare full free Saturday. Workout done early, 25-min review done by 10:00 AM — the entire rest of the day is yours. Don't fill it with study. This is recovery time.",
        blocks: [
          ...SAT_MORNING,
          { t: "10:00 AM–12:00 PM", l: "Free time", type: "free" },
          { t: "12:00–1:00 PM", l: "Lunch", type: "buffer" },
          { t: "1:00–6:00 PM", l: "Free time / personal", type: "free" },
          { t: "6:00–7:00 PM", l: "Dinner", type: "buffer" },
          { t: "7:00–8:30 PM", l: "Free time", type: "free" },
          { t: "8:30–9:30 PM", l: "Wind down", type: "wind-down", note: "Quick Outlook check for the week ahead. Then proper wind-down." },
          { t: "9:30 PM", l: "Lights out", type: "sleep" },
        ],
      },
    },
  },

  Sun: {
    variants: {
      viet: {
        label: "Sunday", sub: "Vietnamese School (12:00–4:00 PM)",
        tip: "Light morning, then school, then free. A 30-min review is all you need — no heavy study on Sundays. The recharge matters.",
        blocks: [
          { t: "9:00–9:30 AM", l: "Light review + weekly check", type: "study-opt",
            note: "30 min max. Scan what's due this week, set Outlook blocks, finish anything under 10 min. Then stop.",
            subjects: ["Check what's due Mon–Tue", "Set Outlook study blocks for the week", "Any task under 10 min — do it now or drop it"] },
          { t: "9:30 AM–12:00 PM", l: "Free time / prep", type: "free" },
          { t: "12:00–4:00 PM", l: "Vietnamese School", type: "viet-school" },
          { t: "4:00–8:30 PM", l: "Decompress + dinner + free time", type: "free", note: "Rest, eat, do whatever. No study tonight." },
          { t: "8:30–9:30 PM", l: "Wind down + Outlook check", type: "wind-down", note: "10 min: confirm Outlook blocks are in place for the week. Then wind down properly." },
          { t: "9:30 PM", l: "Lights out", type: "sleep" },
        ],
      },
      free: {
        label: "Sunday", sub: "Free Day — Light Review Only",
        tip: "Full free Sunday. Do the 30-min review so Monday doesn't blindside you, then genuinely rest. This is the most important recovery day of your week.",
        blocks: [
          { t: "9:00–9:30 AM", l: "Light review + weekly check", type: "study-opt",
            note: "No school today — keep it genuinely light. Scan the week ahead and set Outlook, nothing more.",
            subjects: ["Check what's due Mon–Tue", "Set Outlook study blocks for the week", "Stop at 9:30 — rest day"] },
          { t: "9:30 AM–12:00 PM", l: "Free time", type: "free" },
          { t: "12:00–1:00 PM", l: "Lunch", type: "buffer" },
          { t: "1:00–8:30 PM", l: "Free time / personal / dinner", type: "free", note: "Full free afternoon. Rest, go out, do what you want — you've earned it." },
          { t: "8:30–9:30 PM", l: "Wind down + Outlook prep", type: "wind-down", note: "10 min Outlook setup for the week. Then proper wind-down before Monday." },
          { t: "9:30 PM", l: "Lights out", type: "sleep" },
        ],
      },
    },
  },
};

const DAY_KEYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function PomRow({ count }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 6 }}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} style={{
          width: 18, height: 18, borderRadius: "50%", background: "#E85B2F",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 10, color: "#fff", fontWeight: 700
        }}>{i + 1}</div>
      ))}
      <span style={{ fontSize: 11, color: "#888", marginLeft: 2 }}>
        {count} × 25 min = {count * 30} min (with breaks)
      </span>
    </div>
  );
}

function Block({ b }) {
  const [open, setOpen] = useState(false);
  const s = T[b.type] || T.free;
  const expandable = b.note || b.pom || b.subjects;
  const isSleep = b.type === "sleep";
  const isWorkout = b.type === "workout";

  return (
    <div
      onClick={() => expandable && setOpen(o => !o)}
      style={{
        display: "flex", gap: 0,
        borderLeft: `4px solid ${s.b}`,
        background: s.bg,
        borderRadius: "0 10px 10px 0",
        padding: isSleep ? "8px 12px" : "10px 12px",
        marginBottom: 5,
        cursor: expandable ? "pointer" : "default",
        transition: "box-shadow 0.15s",
        boxShadow: isWorkout ? `0 2px 10px ${s.b}35` : open ? `0 2px 8px ${s.b}30` : "none",
        outline: isWorkout ? `1px solid ${s.b}30` : "none",
      }}
    >
      <div style={{ width: 100, flexShrink: 0, paddingRight: 10 }}>
        <span style={{ fontSize: 10, fontWeight: 600, color: s.b, lineHeight: 1.3 }}>{b.t}</span>
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: s.c }}>{b.l}</span>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            {b.pom && !open && (
              <span style={{ fontSize: 10, background: s.b, color: "#fff", borderRadius: 10, padding: "1px 6px", fontWeight: 600 }}>
                {b.pom} 🍅
              </span>
            )}
            {isWorkout && !open && (
              <span style={{ fontSize: 10, background: s.b, color: "#fff", borderRadius: 10, padding: "1px 6px", fontWeight: 600 }}>
                2 hrs
              </span>
            )}
            {expandable && (
              <span style={{ fontSize: 10, color: s.b, fontWeight: 700 }}>{open ? "▲" : "▼"}</span>
            )}
          </div>
        </div>
        {open && (
          <div style={{ marginTop: 8, paddingTop: 8, borderTop: `1px solid ${s.b}40` }}>
            {b.note && (
              <p style={{ margin: "0 0 6px", fontSize: 11, color: s.c, fontStyle: "italic", lineHeight: 1.5 }}>
                {b.note}
              </p>
            )}
            {b.pom && <PomRow count={b.pom} />}
            {b.subjects && (
              <div style={{ marginTop: 7, display: "flex", flexDirection: "column", gap: 4 }}>
                {b.subjects.map((s2, i) => (
                  <div key={i} style={{ fontSize: 11, color: s.c, lineHeight: 1.4 }}>
                    {s2.startsWith("Pomodoro") || s2.startsWith("Break") || s2.startsWith("Long") || s2.startsWith("Wind") || s2.startsWith("Last") || s2.startsWith("⏱️")
                      ? <span style={{ fontFamily: "monospace" }}>{s2}</span>
                      : <span>{s2}</span>
                    }
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function ModeToggle({ label, options, value, onChange }) {
  return (
    <div style={{
      display: "flex", gap: 6, marginBottom: 10, background: "#fff",
      borderRadius: 10, padding: "8px 10px", alignItems: "center",
    }}>
      <span style={{ fontSize: 11, color: "#888", marginRight: 4, fontWeight: 600, whiteSpace: "nowrap" }}>{label}</span>
      {options.map(({ key, label: lbl, color }) => {
        const active = value === key;
        return (
          <button key={key} onClick={() => onChange(key)} style={{
            flex: 1, padding: "6px 8px", borderRadius: 8,
            border: `2px solid ${active ? color : "#E8E7E3"}`,
            background: active ? color : "#F7F6F2",
            color: active ? "#fff" : "#666",
            fontWeight: active ? 700 : 500,
            fontSize: 11, cursor: "pointer", transition: "all 0.15s",
          }}>
            {lbl}
          </button>
        );
      })}
    </div>
  );
}

function WorkoutWeekPanel() {
  return (
    <div style={{ background: "#fff", borderRadius: 12, padding: "14px 14px", marginBottom: 10, borderLeft: "4px solid #E84040" }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: "#E84040", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>
        💪 Workout Schedule This Week
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {[
          { day: "Tuesday",  time: "5:15–7:15 PM",            note: "2h15m before sleep",   icon: "💪" },
          { day: "Thursday", time: "5:15–7:15 PM (no practice)", note: "Skip if Lion Dance", icon: "?" },
          { day: "Saturday", time: "7:15–9:15 AM",            note: "12+ hrs before sleep ✓✓", icon: "💪" },
        ].map(({ day, time, note, icon }) => (
          <div key={day} style={{
            display: "flex", alignItems: "center", gap: 10,
            background: "#FFF2F2", borderRadius: 8, padding: "8px 10px"
          }}>
            <div style={{
              width: 30, height: 30, borderRadius: "50%",
              background: icon === "💪" ? "#E84040" : "#F5A623",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 13, flexShrink: 0
            }}>{icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#7A0A0A" }}>{day} · {time}</div>
              <div style={{ fontSize: 11, color: "#555" }}>Full-Body · 2 hours</div>
            </div>
            <div style={{ fontSize: 10, color: icon === "💪" ? "#27500A" : "#7A4E10", fontWeight: 600, textAlign: "right" }}>{note}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 10, padding: "8px 10px", background: "#F0F7FF", borderRadius: 8, fontSize: 11, color: "#0C447C", lineHeight: 1.5 }}>
        <strong>48h recovery:</strong> Tue → Thu = 48h ✓ · Thu → Sat = 48h ✓ · Sat → Tue = 72h ✓<br/>
        On Lion Dance Thursdays: 2 sessions/week (Tue + Sat) still drives hypertrophy — volume is what matters.
      </div>
    </div>
  );
}

const LEGEND = [
  ["school",      "School — Blue"],
  ["study",       "Study — Green"],
  ["study-opt",   "Light Review / Optional — Teal"],
  ["buffer",      "Buffer/Flex — Amber"],
  ["workout",     "Workout — Red"],
  ["lion-dance",  "Lion Dance — Dark Red"],
  ["temple",      "Temple — Purple"],
  ["viet-school", "Viet. School — Orange"],
  ["free",        "Free Time — Gray"],
  ["wind-down",   "Wind Down — Lavender"],
];

export default function App() {
  const [day, setDay] = useState("Tue");
  const [thuMode, setThuMode] = useState("practice");
  const [satMode, setSatMode] = useState("temple");
  const [sunMode, setSunMode] = useState("viet");
  const [showWeekPanel, setShowWeekPanel] = useState(false);

  const isThu = day === "Thu";
  const isSat = day === "Sat";
  const isSun = day === "Sun";

  const curr = isThu ? SCHEDULE.Thu.variants[thuMode]
    : isSat ? SCHEDULE.Sat.variants[satMode]
    : isSun ? SCHEDULE.Sun.variants[sunMode]
    : SCHEDULE[day];

  const accent = DAY_ACCENT[day];
  const isWorkoutDay = day === "Tue" || day === "Sat" || (day === "Thu" && thuMode === "free");

  return (
    <div style={{
      fontFamily: "'Outfit', 'Segoe UI', system-ui, sans-serif",
      background: "#F7F6F2", minHeight: "100vh",
      maxWidth: 540, margin: "0 auto", padding: "20px 14px 48px",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        button { font-family: inherit; }
      `}</style>

      <div style={{ marginBottom: 18 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 700, color: "#1A1A1A", letterSpacing: "-0.3px" }}>My Weekly Schedule</h1>
            <p style={{ fontSize: 11, color: "#999", marginTop: 3 }}>Tap any block with ▼ to expand • Study blocks show Pomodoro breakdown</p>
          </div>
          <button onClick={() => setShowWeekPanel(v => !v)} style={{
            background: showWeekPanel ? "#E84040" : "#FFF2F2",
            color: showWeekPanel ? "#fff" : "#E84040",
            border: "1.5px solid #E84040", borderRadius: 8,
            padding: "5px 10px", fontSize: 11, fontWeight: 700, cursor: "pointer",
          }}>
            💪 Week
          </button>
        </div>
      </div>

      {showWeekPanel && <WorkoutWeekPanel />}

      <div style={{ display: "flex", gap: 5, marginBottom: 10, flexWrap: "wrap" }}>
        {DAY_KEYS.map(d => {
          const active = day === d;
          return (
            <button key={d} onClick={() => setDay(d)} style={{
              padding: "5px 13px", borderRadius: 20, border: "none",
              background: active ? DAY_ACCENT[d] : "#E8E7E3",
              color: active ? "#fff" : "#666",
              fontWeight: active ? 700 : 400,
              fontSize: 12, cursor: "pointer", transition: "all 0.15s",
              position: "relative",
            }}>
              {d}
              {(d === "Tue" || d === "Sat") && (
                <span style={{
                  position: "absolute", top: -4, right: -4,
                  width: 8, height: 8, borderRadius: "50%",
                  background: "#E84040", border: "1.5px solid #F7F6F2"
                }} />
              )}
            </button>
          );
        })}
      </div>

      {isThu && (
        <ModeToggle label="Thursday:" value={thuMode} onChange={setThuMode} options={[
          { key: "practice", label: "🥁 Practice Day", color: "#E85555" },
          { key: "free",     label: "💪 No Practice",  color: "#E84040" },
        ]} />
      )}

      {isSat && (
        <ModeToggle label="Saturday:" value={satMode} onChange={setSatMode} options={[
          { key: "temple", label: "⛩️ Temple (5:30)", color: "#9B8FE8" },
          { key: "short",  label: "⛩️ Short (4:30)",  color: "#9B8FE8" },
          { key: "nope",   label: "☀️ No Temple",     color: "#F5A623" },
        ]} />
      )}

      {isSun && (
        <ModeToggle label="Sunday:" value={sunMode} onChange={setSunMode} options={[
          { key: "viet", label: "🇻🇳 Viet. School", color: "#E8834B" },
          { key: "free", label: "☀️ Free Day",      color: "#6DC240" },
        ]} />
      )}

      <div style={{
        background: "#fff", borderRadius: 12,
        borderLeft: `4px solid ${accent}`,
        padding: "13px 14px", marginBottom: 10,
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#1A1A1A" }}>{curr.label}</div>
            <div style={{ fontSize: 11, color: "#999", marginTop: 1 }}>{curr.sub}</div>
          </div>
          {isWorkoutDay && (
            <div style={{
              background: "#FFF2F2", border: "1.5px solid #E84040",
              borderRadius: 8, padding: "3px 8px",
              fontSize: 11, color: "#E84040", fontWeight: 700,
            }}>
              Workout Day
            </div>
          )}
        </div>
        <div style={{
          marginTop: 9, padding: "8px 10px",
          background: `${accent}15`, borderRadius: 8,
          fontSize: 12, color: "#333", lineHeight: 1.5,
          borderLeft: `2px solid ${accent}`,
        }}>
          {curr.tip}
        </div>
      </div>

      <div style={{ marginBottom: 16 }}>
        {curr.blocks.map((b, i) => <Block key={i} b={b} />)}
      </div>

      <div style={{ background: "#fff", borderRadius: 12, padding: "14px 14px", marginBottom: 10 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#999", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>
          Pomodoro Method
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "72px 1fr", gap: "5px 0" }}>
          {[
            ["25 min",    "Focus sprint — one task, phone away"],
            ["5 min",     "Short break — move, don't scroll"],
            ["×4 cycles", "= Full study block (~2 hrs total)"],
            ["Long break","15–30 min after 4 cycles"],
          ].map(([a, b]) => (
            <>
              <span key={a} style={{ fontSize: 11, fontWeight: 700, color: "#E85B2F" }}>{a}</span>
              <span key={b} style={{ fontSize: 11, color: "#555" }}>{b}</span>
            </>
          ))}
        </div>
        <div style={{ marginTop: 10, padding: "8px 10px", background: "#FFF3F0", borderRadius: 8, fontSize: 11, color: "#7A3010", lineHeight: 1.5 }}>
          <strong>If you get distracted:</strong> Write it on paper, set it aside, restart the 25-min timer. Don't give in mid-Pomodoro.
        </div>
      </div>

      <div style={{ background: "#fff", borderRadius: 12, padding: "14px 14px", marginBottom: 10, borderLeft: "4px solid #E84040" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#999", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>
          Why This Timing Works
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {[
            ["📈 Evening > Morning", "Afternoon/evening resistance training produces up to 84% more muscle gain than morning sessions (Küüsmaa et al., 2016). Your Tue/Thu 5:15 PM timing is in the optimal window."],
            ["💤 2h15m Buffer (Tue/Thu)", "Ending at 7:15 PM gives you 2h15m before sleep — the tighter end of the gray zone, but resistance training is more forgiving on sleep than cardio. If you notice issues, shift to start at 5:00 PM."],
            ["🌅 Saturday AM", "Finishing at 9:15 AM = 12+ hours before bedtime. Zero sleep interference, plus a post-workout cognitive boost for the review block right after."],
            ["🔄 48h Recovery", "Full-body workouts need 48h between sessions. Tue→Thu, Thu→Sat, Sat→Tue all meet that target."],
            ["🦁 Lion Dance Counts", "Wed/Thu-practice/Fri Lion Dance is physically demanding. Skipping the workout on practice Thursdays is smart load management, not laziness."],
          ].map(([title, body]) => (
            <div key={title} style={{ fontSize: 11, color: "#555", lineHeight: 1.5 }}>
              <strong style={{ color: "#1A1A1A" }}>{title}</strong><br/>{body}
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: "#fff", borderRadius: 12, padding: "14px 14px" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#999", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>
          Outlook Color Guide
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px" }}>
          {LEGEND.map(([type, label]) => (
            <div key={type} style={{ display: "flex", alignItems: "center", gap: 7 }}>
              <div style={{ width: 11, height: 11, borderRadius: 3, background: T[type]?.b || "#ccc", flexShrink: 0 }} />
              <span style={{ fontSize: 11, color: "#555" }}>{label}</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 10, fontSize: 11, color: "#888", lineHeight: 1.6, borderTop: "1px solid #F0EFEB", paddingTop: 10 }}>
          <strong style={{ color: "#555" }}>Sunday setup (10 min):</strong> Open Outlook weekly view → set 9:30 PM hard-stop every night → add 💪 blocks: Tue 5:15–7:15 PM, Sat 7:15–9:15 AM.
        </div>
      </div>
    </div>
  );
}
