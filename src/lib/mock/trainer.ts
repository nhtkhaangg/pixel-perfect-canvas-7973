export const trainerMe = {
  id: "maya-nguyen",
  name: "Maya Nguyen",
  email: "maya.nguyen@gymfit.example",
  phone: "+1 415 555 0161",
  branch: "Downtown",
  specialization: "Strength & Powerlifting",
  experienceYears: 9,
  bio: "Former national-level powerlifter who helps beginners and intermediates build real, measurable strength with safe technique and simple programmes.",
  ratingAvg: 4.9,
  hourlyRate: 45,
  languages: "English, Vietnamese",
};

export type CertStatus = "PENDING" | "APPROVED" | "REJECTED";
export type Certificate = { id: string; name: string; issuer: string; issuedAt: string; expiresAt: string | null; fileName: string; status: CertStatus; note?: string };
export const certificates: Certificate[] = [
  { id: "cert_1", name: "NSCA-CSCS", issuer: "National Strength & Conditioning Association", issuedAt: "2019-05-10", expiresAt: "2027-05-10", fileName: "nsca-cscs.pdf", status: "APPROVED" },
  { id: "cert_2", name: "USAPL Club Coach", issuer: "USA Powerlifting", issuedAt: "2020-11-02", expiresAt: null, fileName: "usapl-coach.pdf", status: "APPROVED" },
  { id: "cert_3", name: "Precision Nutrition L1", issuer: "Precision Nutrition", issuedAt: "2022-03-18", expiresAt: null, fileName: "pn-l1.jpg", status: "APPROVED" },
  { id: "cert_4", name: "CPR / AED", issuer: "American Red Cross", issuedAt: "2026-09-10", expiresAt: "2028-09-10", fileName: "cpr-2026.pdf", status: "PENDING" },
  { id: "cert_5", name: "Kettlebell Level 1", issuer: "StrongFirst", issuedAt: "2026-06-01", expiresAt: null, fileName: "kb-l1-scan.png", status: "REJECTED", note: "Scan is blurry — please upload a clearer copy showing the certificate number." },
];

export type Client = {
  id: string; name: string; age: number; goal: string; package: string; sessionsLeft: number; totalSessions: number;
  lastSession: string; adherence: number; status: "ACTIVE" | "PENDING" | "EXPIRED"; plateau?: boolean;
  metrics: { date: string; weight: number; bodyFat: number; bench: number; squat: number }[];
};
const series = (w: number, bf: number, b: number, s: number, dw: number) =>
  ["Jul 01", "Jul 15", "Aug 01", "Aug 15", "Sep 01", "Sep 15"].map((date, i) => ({
    date, weight: +(w - dw * i).toFixed(1), bodyFat: +(bf - 0.6 * i).toFixed(1), bench: b + (i < 4 ? 2.5 * i : 7.5), squat: s + 5 * i,
  }));
export const clients: Client[] = [
  { id: "cus_1042", name: "Alex Morgan", age: 32, goal: "Bench 100 kg & lose 6 kg", package: "PT Transform 24", sessionsLeft: 7, totalSessions: 24, lastSession: "2026-09-22", adherence: 92, status: "ACTIVE", plateau: true, metrics: series(82.6, 23, 77.5, 97.5, 0.5) },
  { id: "cus_1088", name: "Sophie Laurent", age: 28, goal: "First powerlifting meet", package: "PT Elite 48", sessionsLeft: 31, totalSessions: 48, lastSession: "2026-09-23", adherence: 97, status: "ACTIVE", metrics: series(61, 22, 50, 85, 0.1) },
  { id: "cus_1101", name: "James Kim", age: 41, goal: "Lose 10 kg", package: "PT Transform 24", sessionsLeft: 12, totalSessions: 24, lastSession: "2026-09-20", adherence: 78, status: "ACTIVE", metrics: series(96, 29, 70, 90, 0.9) },
  { id: "cus_1130", name: "Priya Shah", age: 35, goal: "Pain-free deadlift", package: "PT Starter 8", sessionsLeft: 2, totalSessions: 8, lastSession: "2026-09-18", adherence: 85, status: "ACTIVE", plateau: true, metrics: series(68, 26, 45, 70, 0.2) },
  { id: "cus_1152", name: "Ben Walker", age: 24, goal: "Build muscle", package: "PT Starter 8", sessionsLeft: 8, totalSessions: 8, lastSession: "—", adherence: 0, status: "PENDING", metrics: series(72, 16, 65, 90, -0.3) },
  { id: "cus_0990", name: "Grace Obi", age: 30, goal: "General fitness", package: "PT Starter 8", sessionsLeft: 0, totalSessions: 8, lastSession: "2026-08-12", adherence: 88, status: "EXPIRED", metrics: series(65, 25, 40, 60, 0.3) },
];

export type Booking = { id: string; clientId: string; client: string; date: string; start: string; end: string; focus: string; status: "UPCOMING" | "IN_PROGRESS" | "COMPLETED" | "AWAITING" | "MISSED" };
export const bookings: Booking[] = [
  { id: "b_201", clientId: "cus_1042", client: "Alex Morgan", date: "2026-09-24", start: "18:00", end: "19:00", focus: "Upper — bench", status: "IN_PROGRESS" },
  { id: "b_202", clientId: "cus_1088", client: "Sophie Laurent", date: "2026-09-24", start: "07:00", end: "08:00", focus: "Squat technique", status: "AWAITING" },
  { id: "b_203", clientId: "cus_1101", client: "James Kim", date: "2026-09-23", start: "12:00", end: "13:00", focus: "Conditioning", status: "AWAITING" },
  { id: "b_204", clientId: "cus_1130", client: "Priya Shah", date: "2026-09-25", start: "17:00", end: "18:00", focus: "Deadlift rehab", status: "UPCOMING" },
  { id: "b_205", clientId: "cus_1042", client: "Alex Morgan", date: "2026-09-26", start: "07:00", end: "08:00", focus: "Lower — squat", status: "UPCOMING" },
  { id: "b_206", clientId: "cus_1088", client: "Sophie Laurent", date: "2026-09-26", start: "18:00", end: "19:00", focus: "Bench peaking", status: "UPCOMING" },
  { id: "b_207", clientId: "cus_1101", client: "James Kim", date: "2026-09-28", start: "12:00", end: "13:00", focus: "Full body", status: "UPCOMING" },
  { id: "b_208", clientId: "cus_1042", client: "Alex Morgan", date: "2026-09-29", start: "18:00", end: "19:00", focus: "Conditioning & core", status: "UPCOMING" },
  { id: "b_209", clientId: "cus_1088", client: "Sophie Laurent", date: "2026-09-30", start: "07:00", end: "08:00", focus: "Deadlift", status: "UPCOMING" },
  { id: "b_190", clientId: "cus_1042", client: "Alex Morgan", date: "2026-09-22", start: "18:00", end: "19:00", focus: "Lower — deadlift", status: "COMPLETED" },
  { id: "b_188", clientId: "cus_1130", client: "Priya Shah", date: "2026-09-18", start: "17:00", end: "18:00", focus: "Hip hinge", status: "COMPLETED" },
  { id: "b_185", clientId: "cus_1101", client: "James Kim", date: "2026-09-17", start: "12:00", end: "13:00", focus: "Conditioning", status: "MISSED" },
];

export const trainerReschedules = [
  { id: "rs_40", client: "Alex Morgan", from: "2026-09-26 07:00", to: "2026-09-26 18:00", reason: "Early work meeting on Friday.", requestedBy: "client", status: "REQUESTED" },
  { id: "rs_44", client: "James Kim", from: "2026-09-28 12:00", to: "2026-09-28 17:00", reason: "Lunch meeting moved.", requestedBy: "client", status: "REQUESTED" },
  { id: "rs_41", client: "Alex Morgan", from: "2026-09-29 18:00", to: "2026-09-30 07:00", reason: "Attending certification workshop.", requestedBy: "me", status: "REQUESTED" },
  { id: "rs_33", client: "Sophie Laurent", from: "2026-09-09 07:00", to: "2026-09-10 07:00", reason: "Sick day.", requestedBy: "client", status: "CONFIRMED" },
] as { id: string; client: string; from: string; to: string; reason: string; requestedBy: "client" | "me"; status: "REQUESTED" | "CONFIRMED" | "REJECTED" }[];

export const daysOff = [
  { id: "off_1", date: "2026-10-06", type: "Full day", reason: "Certification workshop", status: "APPROVED" },
  { id: "off_2", date: "2026-10-17", type: "Morning", reason: "Personal appointment", status: "PENDING" },
  { id: "off_3", date: "2026-09-05", type: "Full day", reason: "Competition coaching", status: "APPROVED" },
];
export const weeklyOff = ["Sun"];

export type LessonPlan = { id: string; title: string; clientId: string | null; focus: string; durationMin: number; updatedAt: string; warmup: string; blocks: { exercise: string; sets: number; reps: string; rest: string }[]; notes: string };
export const lessonPlans: LessonPlan[] = [
  { id: "lp_1", title: "Bench 5×5 — intensification", clientId: "cus_1042", focus: "Upper body", durationMin: 60, updatedAt: "2026-09-21", warmup: "Band pull-aparts, push-up ladder, empty bar 2×10", blocks: [
    { exercise: "Barbell bench press", sets: 5, reps: "5 @ 85 kg", rest: "3 min" },
    { exercise: "Weighted pull-up", sets: 4, reps: "6", rest: "2 min" },
    { exercise: "Incline DB press", sets: 3, reps: "10", rest: "90 s" },
    { exercise: "Cable row", sets: 3, reps: "12", rest: "60 s" },
  ], notes: "Watch elbow flare on last reps. Increase to 87.5 if RPE ≤ 8." },
  { id: "lp_2", title: "Meet prep — squat day", clientId: "cus_1088", focus: "Lower body", durationMin: 75, updatedAt: "2026-09-20", warmup: "Bike 5 min, goblet squat 2×8, hip airplanes", blocks: [
    { exercise: "Competition squat", sets: 6, reps: "2 @ 90%", rest: "4 min" },
    { exercise: "Pause squat", sets: 3, reps: "3", rest: "3 min" },
    { exercise: "Leg press", sets: 3, reps: "10", rest: "2 min" },
  ], notes: "Film top sets from the side." },
  { id: "lp_3", title: "Hinge rehab progression", clientId: "cus_1130", focus: "Posterior chain", durationMin: 50, updatedAt: "2026-09-15", warmup: "Cat-cow, bird dog, glute bridge", blocks: [
    { exercise: "KB deadlift", sets: 4, reps: "8", rest: "90 s" },
    { exercise: "Hip thrust", sets: 3, reps: "10", rest: "90 s" },
  ], notes: "Stop at any sharp pain. Pain scale target ≤ 2/10." },
  { id: "lp_4", title: "Conditioning template", clientId: null, focus: "Conditioning", durationMin: 45, updatedAt: "2026-08-30", warmup: "Row 500 m easy", blocks: [
    { exercise: "Sled push", sets: 6, reps: "20 m", rest: "60 s" },
    { exercise: "Kettlebell swing", sets: 4, reps: "15", rest: "45 s" },
  ], notes: "Reusable template." },
];

export type Exercise = { id: string; name: string; muscleGroup: string; equipment: string; videoUrl: string; description: string; custom: boolean };
export const exercises: Exercise[] = [
  { id: "ex_1", name: "Barbell back squat", muscleGroup: "Legs", equipment: "Barbell", videoUrl: "https://videos.gymfit.example/back-squat.mp4", description: "High-bar squat to below parallel.", custom: false },
  { id: "ex_2", name: "Bench press", muscleGroup: "Chest", equipment: "Barbell", videoUrl: "https://videos.gymfit.example/bench.mp4", description: "Competition-style bench with pause on chest.", custom: false },
  { id: "ex_3", name: "Conventional deadlift", muscleGroup: "Back", equipment: "Barbell", videoUrl: "https://videos.gymfit.example/deadlift.mp4", description: "Pull from floor, neutral spine.", custom: false },
  { id: "ex_4", name: "Weighted pull-up", muscleGroup: "Back", equipment: "Pull-up bar", videoUrl: "https://videos.gymfit.example/pullup.mp4", description: "Dead hang to chin over bar with belt.", custom: false },
  { id: "ex_5", name: "Spoto press", muscleGroup: "Chest", equipment: "Barbell", videoUrl: "https://videos.gymfit.example/maya/spoto.mp4", description: "Bench pausing 2 cm above chest — for Alex's plateau block.", custom: true },
  { id: "ex_6", name: "Tempo KB deadlift", muscleGroup: "Posterior chain", equipment: "Kettlebell", videoUrl: "https://videos.gymfit.example/maya/tempo-kbdl.mp4", description: "3-second eccentric hinge for rehab clients.", custom: true },
  { id: "ex_7", name: "Kettlebell swing", muscleGroup: "Full body", equipment: "Kettlebell", videoUrl: "https://videos.gymfit.example/kb-swing.mp4", description: "Russian swing to chest height.", custom: false },
];

export type PlanStatus = "DRAFT" | "ACTIVE" | "ARCHIVED";
export type WorkoutPlan = {
  id: string; clientId: string; client: string; title: string; goal: string; durationWeeks: number; version: number; isAiGenerated: boolean; status: PlanStatus; updatedAt: string;
  weeks: { week: number; focus: string; sessions: string[] }[];
  milestones: { week: number; title: string; target: string; status: "COMPLETED" | "PENDING" | "MISSED"; review?: string }[];
  versions: { version: number; date: string; author: string; change: string; status: PlanStatus }[];
};
export const plans: WorkoutPlan[] = [
  { id: "wp_12", clientId: "cus_1042", client: "Alex Morgan", title: "Strength & recomposition", goal: "Bench 100 kg, lose 6 kg", durationWeeks: 14, version: 3, isAiGenerated: false, status: "ACTIVE", updatedAt: "2026-09-15",
    weeks: [
      { week: 1, focus: "Foundation", sessions: ["Full body A", "Full body B", "Conditioning"] },
      { week: 5, focus: "Strength build", sessions: ["Upper heavy", "Lower heavy", "Upper volume"] },
      { week: 9, focus: "Intensification", sessions: ["Bench 5×5", "Squat 5×5", "Deadlift + conditioning"] },
      { week: 13, focus: "Peak & test", sessions: ["Openers", "Test day"] },
    ],
    milestones: [
      { week: 4, title: "Technique baseline", target: "Clean squat/bench/deadlift", status: "COMPLETED", review: "All three lifts approved on video." },
      { week: 8, title: "Bench 80 kg", target: "80 kg × 5", status: "COMPLETED", review: "Hit 80×5 in week 7." },
      { week: 12, title: "Bench 90 kg × 3", target: "90 kg × 3, BF 20%", status: "PENDING" },
      { week: 14, title: "Bench 100 kg 1RM", target: "100 kg single", status: "PENDING" },
    ],
    versions: [
      { version: 3, date: "2026-09-15", author: "Maya Nguyen", change: "Added Spoto press block for bench plateau", status: "ACTIVE" },
      { version: 2, date: "2026-08-10", author: "Maya Nguyen", change: "Increased weekly frequency to 3 sessions", status: "ARCHIVED" },
      { version: 1, date: "2026-07-15", author: "AI Assistant", change: "Initial AI-generated plan", status: "ARCHIVED" },
    ] },
  { id: "wp_14", clientId: "cus_1088", client: "Sophie Laurent", title: "Meet prep 12 weeks", goal: "Total 300 kg at first meet", durationWeeks: 12, version: 2, isAiGenerated: false, status: "ACTIVE", updatedAt: "2026-09-02",
    weeks: [{ week: 1, focus: "Hypertrophy", sessions: ["SQ", "BP", "DL", "Accessories"] }, { week: 7, focus: "Strength", sessions: ["SQ heavy", "BP heavy", "DL heavy"] }, { week: 11, focus: "Peak", sessions: ["Openers", "Deload"] }],
    milestones: [{ week: 6, title: "Mock meet", target: "Total 280 kg", status: "COMPLETED", review: "Totalled 282.5 kg." }, { week: 12, title: "Meet day", target: "Total 300 kg", status: "PENDING" }],
    versions: [{ version: 2, date: "2026-09-02", author: "Maya Nguyen", change: "Shifted peak by 1 week", status: "ACTIVE" }, { version: 1, date: "2026-07-01", author: "Maya Nguyen", change: "Initial plan", status: "ARCHIVED" }] },
  { id: "wp_15", clientId: "cus_1101", client: "James Kim", title: "Fat loss phase 1", goal: "Lose 10 kg in 16 weeks", durationWeeks: 16, version: 1, isAiGenerated: true, status: "DRAFT", updatedAt: "2026-09-23",
    weeks: [{ week: 1, focus: "Habit building", sessions: ["Full body", "Zone 2", "Full body"] }, { week: 9, focus: "Metabolic", sessions: ["Circuit", "Strength", "Intervals"] }],
    milestones: [{ week: 8, title: "−5 kg", target: "91 kg", status: "PENDING" }, { week: 16, title: "−10 kg", target: "86 kg", status: "PENDING" }],
    versions: [{ version: 1, date: "2026-09-23", author: "AI Assistant", change: "AI-generated draft from assessment", status: "DRAFT" }] },
  { id: "wp_09", clientId: "cus_0990", client: "Grace Obi", title: "General fitness 8 weeks", goal: "Consistent 3×/week training", durationWeeks: 8, version: 1, isAiGenerated: false, status: "ARCHIVED", updatedAt: "2026-08-12",
    weeks: [{ week: 1, focus: "General", sessions: ["Full body A", "Full body B"] }],
    milestones: [{ week: 8, title: "Complete block", target: "24 sessions", status: "COMPLETED", review: "22/24 attended." }],
    versions: [{ version: 1, date: "2026-06-15", author: "Maya Nguyen", change: "Initial plan", status: "ARCHIVED" }] },
];

export const nutritionPlans = [
  { id: "np_1", client: "Alex Morgan", calories: 2250, protein: 170, carbs: 230, fat: 70, status: "ACTIVE", updatedAt: "2026-09-01" },
  { id: "np_2", client: "James Kim", calories: 2100, protein: 180, carbs: 180, fat: 70, status: "DRAFT", updatedAt: "2026-09-23" },
];

export const trainerReviews = [
  { id: "tr_1", client: "Alex Morgan", rating: 5, date: "2026-09-20", title: "Bench went up 15 kg", body: "Maya's programming is simple and it works. She explains why we do every exercise.", reply: "Thanks Alex! 100 kg is coming 💪" },
  { id: "tr_2", client: "Sophie Laurent", rating: 5, date: "2026-09-12", title: "Ready for my first meet", body: "Incredibly detailed coaching and always available on chat.", reply: null },
  { id: "tr_3", client: "Priya Shah", rating: 4, date: "2026-09-03", title: "Back pain is gone", body: "Great rehab progressions. Sometimes sessions start a few minutes late.", reply: null },
  { id: "tr_4", client: "Grace Obi", rating: 5, date: "2026-08-15", title: "Made training a habit", body: "Friendly and motivating. Would recommend to any beginner.", reply: "It was a pleasure, Grace — come back any time!" },
  { id: "tr_5", client: "James Kim", rating: 4, date: "2026-08-02", title: "Tough but fair", body: "Pushes me hard. Would love more nutrition guidance.", reply: null },
] as { id: string; client: string; rating: number; date: string; title: string; body: string; reply: string | null }[];

export const sessionFeedback = [
  { id: "sf_1", client: "Alex Morgan", session: "2026-09-22 · Lower — deadlift", rpe: 8, rating: 5, comment: "Felt strong, slight lower back tightness.", coachNote: "" },
  { id: "sf_2", client: "Priya Shah", session: "2026-09-18 · Hip hinge", rpe: 6, rating: 4, comment: "No pain today!", coachNote: "Progress to 16 kg KB next week." },
  { id: "sf_3", client: "Sophie Laurent", session: "2026-09-16 · Bench peaking", rpe: 9, rating: 5, comment: "Last set was a grinder.", coachNote: "" },
];

export const trainerNotifications = [
  { id: "tn1", title: "Plateau detected: Alex Morgan", body: "Bench top set flat at 85 kg for 4 weeks.", date: "2026-09-20 08:00", read: false, type: "alert" },
  { id: "tn2", title: "Reschedule request from James Kim", body: "Sun 12:00 → Sun 17:00", date: "2026-09-23 10:10", read: false, type: "session" },
  { id: "tn3", title: "Certificate under review", body: "CPR / AED was submitted for approval.", date: "2026-09-10 14:00", read: true, type: "system" },
  { id: "tn4", title: "New client assigned", body: "Ben Walker purchased PT Starter 8 with you.", date: "2026-09-21 16:45", read: false, type: "client" },
  { id: "tn5", title: "Certificate rejected", body: "Kettlebell Level 1 — please re-upload.", date: "2026-06-04 09:00", read: true, type: "system" },
  { id: "tn6", title: "New 5-star review", body: "Alex Morgan: 'Bench went up 15 kg'", date: "2026-09-20 19:30", read: true, type: "review" },
];

export const trainerKpis = [
  { month: "Apr", sessions: 58, revenue: 2610 },
  { month: "May", sessions: 64, revenue: 2880 },
  { month: "Jun", sessions: 61, revenue: 2745 },
  { month: "Jul", sessions: 70, revenue: 3150 },
  { month: "Aug", sessions: 74, revenue: 3330 },
  { month: "Sep", sessions: 68, revenue: 3060 },
];
