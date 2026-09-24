export const me = {
  id: "cus_1042",
  name: "Alex Morgan",
  email: "alex.morgan@example.com",
  phone: "+1 415 555 0187",
  dob: "1994-03-12",
  gender: "Male",
  address: "22 Oak St, San Francisco, CA",
  homeBranch: "Downtown",
  memberSince: "2025-02-10",
  goal: "Lose 6 kg of fat and bench 100 kg",
  emergencyContact: "Jamie Morgan · +1 415 555 0133",
  trainerId: "maya-nguyen",
  trainerName: "Maya Nguyen",
};

export type CustomerPackageStatus = "PENDING" | "ACTIVE" | "EXPIRED" | "CANCELLED";
export type CustomerPackage = {
  id: string;
  packageId: string;
  name: string;
  type: "MEMBERSHIP" | "PT";
  startDate: string;
  endDate: string;
  status: CustomerPackageStatus;
  totalSessions: number | null;
  usedSessions: number;
  trainer?: string;
  price: number;
};

export const customerPackages: CustomerPackage[] = [
  { id: "cp_301", packageId: "standard-monthly", name: "Standard Monthly", type: "MEMBERSHIP", startDate: "2026-09-01", endDate: "2026-09-30", status: "ACTIVE", totalSessions: null, usedSessions: 14, price: 49 },
  { id: "cp_298", packageId: "pt-transform-24", name: "PT Transform 24", type: "PT", startDate: "2026-07-15", endDate: "2026-10-13", status: "ACTIVE", totalSessions: 24, usedSessions: 17, trainer: "Maya Nguyen", price: 960 },
  { id: "cp_305", packageId: "all-access-quarter", name: "All-Access Quarterly", type: "MEMBERSHIP", startDate: "2026-10-01", endDate: "2026-12-30", status: "PENDING", totalSessions: null, usedSessions: 0, price: 239 },
  { id: "cp_244", packageId: "standard-monthly", name: "Standard Monthly", type: "MEMBERSHIP", startDate: "2026-08-01", endDate: "2026-08-31", status: "EXPIRED", totalSessions: null, usedSessions: 19, price: 49 },
  { id: "cp_210", packageId: "pt-starter-8", name: "PT Starter 8", type: "PT", startDate: "2026-05-02", endDate: "2026-06-16", status: "EXPIRED", totalSessions: 8, usedSessions: 8, trainer: "Daniel Okafor", price: 360 },
  { id: "cp_199", packageId: "flex-monthly", name: "Flex Monthly", type: "MEMBERSHIP", startDate: "2026-04-01", endDate: "2026-04-30", status: "CANCELLED", totalSessions: null, usedSessions: 3, price: 29 },
];

export type PaymentMethod = "VNPAY" | "PAYOS" | "CASH";
export type PaymentStatus = "PAID" | "FAILED" | "REFUNDED";
export type PaymentTransaction = {
  id: string;
  customerPackageId: string;
  description: string;
  amount: number;
  method: PaymentMethod;
  status: PaymentStatus;
  date: string;
  reference: string;
};

export const transactions: PaymentTransaction[] = [
  { id: "tx_9012", customerPackageId: "cp_305", description: "All-Access Quarterly", amount: 239, method: "VNPAY", status: "PAID", date: "2026-09-21", reference: "VNP14829301" },
  { id: "tx_9008", customerPackageId: "cp_305", description: "All-Access Quarterly", amount: 239, method: "PAYOS", status: "FAILED", date: "2026-09-21", reference: "PO-7781230" },
  { id: "tx_8950", customerPackageId: "cp_301", description: "Standard Monthly", amount: 49, method: "PAYOS", status: "PAID", date: "2026-09-01", reference: "PO-7721004" },
  { id: "tx_8702", customerPackageId: "cp_298", description: "PT Transform 24", amount: 960, method: "VNPAY", status: "PAID", date: "2026-07-15", reference: "VNP13900211" },
  { id: "tx_8610", customerPackageId: "cp_244", description: "Standard Monthly", amount: 49, method: "CASH", status: "PAID", date: "2026-08-01", reference: "DESK-0488" },
  { id: "tx_8200", customerPackageId: "cp_210", description: "PT Starter 8", amount: 360, method: "VNPAY", status: "PAID", date: "2026-05-02", reference: "VNP12555018" },
  { id: "tx_8105", customerPackageId: "cp_199", description: "Flex Monthly (refund)", amount: 29, method: "CASH", status: "REFUNDED", date: "2026-04-05", reference: "DESK-0311" },
];

export type SessionStatus = "UPCOMING" | "IN_PROGRESS" | "COMPLETED" | "MISSED" | "CANCELLED";
export type TrainingSession = {
  id: string;
  date: string;
  start: string;
  end: string;
  trainer: string;
  focus: string;
  room: string;
  status: SessionStatus;
  exercises: { name: string; sets: number; reps: string; weight: number }[];
};

export const sessions: TrainingSession[] = [
  { id: "s_18", date: "2026-09-24", start: "18:00", end: "19:00", trainer: "Maya Nguyen", focus: "Upper body — bench focus", room: "Strength zone A", status: "IN_PROGRESS", exercises: [
    { name: "Barbell bench press", sets: 5, reps: "5", weight: 85 },
    { name: "Weighted pull-up", sets: 4, reps: "6", weight: 10 },
    { name: "Incline DB press", sets: 3, reps: "10", weight: 26 },
    { name: "Cable row", sets: 3, reps: "12", weight: 55 },
  ] },
  { id: "s_19", date: "2026-09-26", start: "07:00", end: "08:00", trainer: "Maya Nguyen", focus: "Lower body — squat", room: "Strength zone A", status: "UPCOMING", exercises: [
    { name: "Back squat", sets: 5, reps: "5", weight: 110 },
    { name: "Romanian deadlift", sets: 3, reps: "8", weight: 90 },
    { name: "Walking lunge", sets: 3, reps: "12", weight: 20 },
  ] },
  { id: "s_20", date: "2026-09-29", start: "18:00", end: "19:00", trainer: "Maya Nguyen", focus: "Conditioning & core", room: "Turf lane", status: "UPCOMING", exercises: [
    { name: "Sled push", sets: 6, reps: "20 m", weight: 80 },
    { name: "Kettlebell swing", sets: 4, reps: "15", weight: 24 },
  ] },
  { id: "s_21", date: "2026-10-01", start: "18:00", end: "19:00", trainer: "Maya Nguyen", focus: "Upper body — volume", room: "Strength zone B", status: "UPCOMING", exercises: [
    { name: "Bench press", sets: 4, reps: "8", weight: 75 },
  ] },
  { id: "s_17", date: "2026-09-22", start: "18:00", end: "19:00", trainer: "Maya Nguyen", focus: "Lower body — deadlift", room: "Strength zone A", status: "COMPLETED", exercises: [
    { name: "Deadlift", sets: 5, reps: "3", weight: 140 },
  ] },
  { id: "s_16", date: "2026-09-19", start: "07:00", end: "08:00", trainer: "Maya Nguyen", focus: "Upper body — bench", room: "Strength zone A", status: "COMPLETED", exercises: [
    { name: "Bench press", sets: 5, reps: "5", weight: 85 },
  ] },
  { id: "s_15", date: "2026-09-17", start: "18:00", end: "19:00", trainer: "Maya Nguyen", focus: "Conditioning", room: "Turf lane", status: "MISSED", exercises: [] },
];

export type RescheduleRequest = {
  id: string;
  sessionId: string;
  from: string;
  to: string;
  reason: string;
  requestedBy: "You" | "Maya Nguyen";
  status: "REQUESTED" | "CONFIRMED" | "REJECTED";
  createdAt: string;
};

export const reschedules: RescheduleRequest[] = [
  { id: "rs_41", sessionId: "s_20", from: "2026-09-29 18:00", to: "2026-09-30 07:00", reason: "Coach attending a certification workshop on Monday evening.", requestedBy: "Maya Nguyen", status: "REQUESTED", createdAt: "2026-09-23" },
  { id: "rs_40", sessionId: "s_19", from: "2026-09-26 07:00", to: "2026-09-26 18:00", reason: "Early work meeting on Friday.", requestedBy: "You", status: "REQUESTED", createdAt: "2026-09-22" },
  { id: "rs_35", sessionId: "s_14", from: "2026-09-12 18:00", to: "2026-09-13 09:00", reason: "Travel delay.", requestedBy: "You", status: "CONFIRMED", createdAt: "2026-09-10" },
  { id: "rs_31", sessionId: "s_11", from: "2026-09-03 07:00", to: "2026-09-03 12:00", reason: "Lunch slot preferred.", requestedBy: "You", status: "REJECTED", createdAt: "2026-09-01" },
];

export const checkIns = [
  { id: "ci_551", date: "2026-09-24", time: "17:52", branch: "Downtown", method: "QR", status: "CHECKED_IN" },
  { id: "ci_548", date: "2026-09-22", time: "17:48", branch: "Downtown", method: "QR", status: "CHECKED_IN" },
  { id: "ci_540", date: "2026-09-20", time: "10:15", branch: "Riverside", method: "QR", status: "CHECKED_IN" },
  { id: "ci_536", date: "2026-09-19", time: "06:51", branch: "Downtown", method: "Front desk", status: "CHECKED_IN" },
  { id: "ci_529", date: "2026-09-17", time: "12:30", branch: "Downtown", method: "QR", status: "CHECKED_IN" },
  { id: "ci_520", date: "2026-09-15", time: "18:02", branch: "Downtown", method: "QR", status: "CHECKED_IN" },
  { id: "ci_514", date: "2026-09-13", time: "09:05", branch: "Northgate", method: "QR", status: "FAILED" },
  { id: "ci_511", date: "2026-09-12", time: "07:10", branch: "Downtown", method: "QR", status: "CHECKED_IN" },
  { id: "ci_503", date: "2026-09-10", time: "17:40", branch: "Downtown", method: "QR", status: "CHECKED_IN" },
  { id: "ci_498", date: "2026-09-08", time: "18:10", branch: "Downtown", method: "Front desk", status: "CHECKED_IN" },
];

export const bodyMetrics = [
  { date: "Jun 01", weight: 84.2, bodyFat: 24.1, muscle: 35.2, waist: 92 },
  { date: "Jun 15", weight: 83.5, bodyFat: 23.6, muscle: 35.4, waist: 91 },
  { date: "Jul 01", weight: 82.6, bodyFat: 23.0, muscle: 35.7, waist: 90 },
  { date: "Jul 15", weight: 81.9, bodyFat: 22.3, muscle: 35.9, waist: 89 },
  { date: "Aug 01", weight: 81.0, bodyFat: 21.6, muscle: 36.2, waist: 88 },
  { date: "Aug 15", weight: 80.4, bodyFat: 21.0, muscle: 36.4, waist: 87 },
  { date: "Sep 01", weight: 80.1, bodyFat: 20.8, muscle: 36.5, waist: 87 },
  { date: "Sep 15", weight: 80.0, bodyFat: 20.7, muscle: 36.5, waist: 86.5 },
];

export const strengthProgress = [
  { week: "W1", bench: 70, squat: 90, deadlift: 110 },
  { week: "W2", bench: 72.5, squat: 95, deadlift: 115 },
  { week: "W3", bench: 75, squat: 97.5, deadlift: 120 },
  { week: "W4", bench: 77.5, squat: 100, deadlift: 125 },
  { week: "W5", bench: 80, squat: 102.5, deadlift: 130 },
  { week: "W6", bench: 82.5, squat: 105, deadlift: 132.5 },
  { week: "W7", bench: 85, squat: 107.5, deadlift: 135 },
  { week: "W8", bench: 85, squat: 110, deadlift: 137.5 },
  { week: "W9", bench: 85, squat: 110, deadlift: 140 },
  { week: "W10", bench: 85, squat: 112.5, deadlift: 140 },
];

export const weeklyVolume = [
  { week: "W5", sessions: 3, volume: 18.2 },
  { week: "W6", sessions: 4, volume: 21.5 },
  { week: "W7", sessions: 3, volume: 19.8 },
  { week: "W8", sessions: 4, volume: 23.1 },
  { week: "W9", sessions: 3, volume: 20.4 },
  { week: "W10", sessions: 4, volume: 22.7 },
];

export type Notification = {
  id: string;
  title: string;
  body: string;
  detail: string;
  type: "package" | "session" | "payment" | "system" | "chat";
  date: string;
  read: boolean;
};

export const notifications: Notification[] = [
  { id: "n1", title: "Your Standard Monthly expires in 6 days", body: "Renew now to keep uninterrupted access.", detail: "Your Standard Monthly membership (cp_301) ends on Sep 30, 2026. Your All-Access Quarterly package will activate on Oct 1 once payment is confirmed. If you'd rather keep Standard, renew from My packages.", type: "package", date: "2026-09-24 09:00", read: false },
  { id: "n2", title: "Reschedule request from Maya Nguyen", body: "Monday 18:00 → Tuesday 07:00", detail: "Maya asked to move your 'Conditioning & core' session from Mon Sep 29 18:00 to Tue Sep 30 07:00 because she is attending a certification workshop. Confirm or decline from the Reschedules page.", type: "session", date: "2026-09-23 15:12", read: false },
  { id: "n3", title: "Payment received — $239", body: "All-Access Quarterly via VNPAY.", detail: "We received your VNPAY payment of $239 (ref VNP14829301) for All-Access Quarterly. The package is pending and starts Oct 1, 2026.", type: "payment", date: "2026-09-21 20:41", read: true },
  { id: "n4", title: "Payment failed", body: "PAYOS transaction PO-7781230 was declined.", detail: "Your PAYOS payment attempt of $239 was declined by the provider. No money was taken. You completed the purchase with VNPAY afterwards.", type: "payment", date: "2026-09-21 20:35", read: true },
  { id: "n5", title: "New message from Maya", body: "Great session today — log your RPE please!", detail: "Maya sent you a message in chat: 'Great session today — log your RPE please! We'll push bench to 87.5 next week.'", type: "chat", date: "2026-09-22 19:10", read: true },
  { id: "n6", title: "Plateau detected on bench press", body: "No increase in 4 weeks.", detail: "Your bench press top set has stayed at 85 kg for four consecutive weeks. Your coach has been notified and may adjust your programme with a deload or variation block.", type: "system", date: "2026-09-20 08:00", read: true },
];

export const roadmap = [
  { phase: "Phase 1", title: "Foundation", weeks: "Weeks 1–4", status: "COMPLETED", goals: ["Learn squat, bench, deadlift technique", "3 sessions per week", "Baseline body scan"], progress: 100 },
  { phase: "Phase 2", title: "Strength build", weeks: "Weeks 5–8", status: "COMPLETED", goals: ["Linear progression on main lifts", "Reach 80 kg bench", "Body fat below 22%"], progress: 100 },
  { phase: "Phase 3", title: "Intensification", weeks: "Weeks 9–12", status: "IN_PROGRESS", goals: ["Bench 90 kg × 3", "Squat 120 kg × 5", "Body fat 20%"], progress: 55 },
  { phase: "Phase 4", title: "Peak & test", weeks: "Weeks 13–14", status: "UPCOMING", goals: ["Test 1RM bench (target 100 kg)", "Final body scan", "Plan next block"], progress: 0 },
];

export const exerciseGuides = [
  { id: "e1", name: "Barbell back squat", muscle: "Legs", level: "Intermediate", duration: "4:12", equipment: "Barbell, rack", cues: ["Brace before descent", "Knees track over toes", "Hit depth below parallel"] },
  { id: "e2", name: "Bench press", muscle: "Chest", level: "Intermediate", duration: "5:03", equipment: "Barbell, bench", cues: ["Retract shoulder blades", "Touch lower chest", "Drive feet into floor"] },
  { id: "e3", name: "Conventional deadlift", muscle: "Back", level: "Intermediate", duration: "4:47", equipment: "Barbell", cues: ["Bar over mid-foot", "Push the floor away", "Lock out with glutes"] },
  { id: "e4", name: "Pull-up", muscle: "Back", level: "Beginner", duration: "3:20", equipment: "Pull-up bar", cues: ["Full hang start", "Lead with chest", "Control the descent"] },
  { id: "e5", name: "Romanian deadlift", muscle: "Legs", level: "Beginner", duration: "3:55", equipment: "Barbell / DBs", cues: ["Soft knees", "Hips back", "Feel hamstring stretch"] },
  { id: "e6", name: "Overhead press", muscle: "Shoulders", level: "Intermediate", duration: "4:01", equipment: "Barbell", cues: ["Squeeze glutes", "Bar path straight up", "Head through at top"] },
  { id: "e7", name: "Kettlebell swing", muscle: "Full body", level: "Beginner", duration: "2:48", equipment: "Kettlebell", cues: ["Hinge, don't squat", "Snap hips", "Float the bell"] },
  { id: "e8", name: "Plank variations", muscle: "Core", level: "Beginner", duration: "3:10", equipment: "None", cues: ["Neutral spine", "Squeeze glutes", "Breathe steadily"] },
];

export const sampleWorkouts = [
  { id: "w1", name: "Full-body beginner A", duration: 45, level: "Beginner", goal: "Strength", exercises: ["Goblet squat 3×10", "Push-up 3×8", "DB row 3×10", "Plank 3×30s"] },
  { id: "w2", name: "Upper hypertrophy", duration: 60, level: "Intermediate", goal: "Muscle gain", exercises: ["Bench press 4×8", "Lat pulldown 4×10", "Incline DB press 3×12", "Face pull 3×15", "Curls 3×12"] },
  { id: "w3", name: "Metcon 20", duration: 20, level: "All levels", goal: "Fat loss", exercises: ["KB swing ×15", "Burpee ×10", "Row 250 m", "AMRAP 20 min"] },
  { id: "w4", name: "Lower strength", duration: 55, level: "Intermediate", goal: "Strength", exercises: ["Back squat 5×5", "RDL 3×8", "Bulgarian split squat 3×10", "Calf raise 3×15"] },
  { id: "w5", name: "Mobility reset", duration: 25, level: "All levels", goal: "Recovery", exercises: ["Couch stretch 2×60s", "90/90 hips 2×60s", "Thread the needle 2×10", "Dead hang 3×30s"] },
  { id: "w6", name: "Zone 2 + core", duration: 40, level: "Beginner", goal: "Endurance", exercises: ["Bike 30 min zone 2", "Dead bug 3×10", "Side plank 3×30s"] },
];

export const chatMessages = [
  { id: "m1", from: "trainer", text: "Morning Alex! How's the lower back after Monday's deadlifts?", time: "08:12" },
  { id: "m2", from: "me", text: "All good — a bit tight but fine after the mobility routine.", time: "08:30" },
  { id: "m3", from: "trainer", text: "Perfect. Tonight we'll hit bench 5×5 at 85 kg. If it moves well we go 87.5 next week.", time: "08:31" },
  { id: "m4", from: "me", text: "Sounds good. Can I move Friday's session to the evening?", time: "09:02" },
  { id: "m5", from: "trainer", text: "Send a reschedule request and I'll confirm it 👍", time: "09:05" },
];

export const trainerSuggestions = [
  { trainerId: "maya-nguyen", match: 94, reasons: ["Specialises in strength — matches your bench goal", "Available Mon/Wed/Fri evenings", "Same home branch (Downtown)"] },
  { trainerId: "marco-silva", match: 86, reasons: ["Hypertrophy focus supports body recomposition", "Nutrition certification", "Available weekends"] },
  { trainerId: "daniel-okafor", match: 81, reasons: ["Fat-loss specialist — fits your 6 kg target", "Conditioning blocks to break plateaus", "Riverside branch, 10 min away"] },
];

export const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
export const timeSlots = ["06:00", "07:00", "08:00", "12:00", "17:00", "18:00", "19:00", "20:00"];
export const defaultAvailability: Record<string, boolean> = {
  "Mon-18:00": true, "Mon-19:00": true, "Wed-18:00": true, "Wed-19:00": true, "Fri-07:00": true, "Fri-18:00": true, "Sat-08:00": true,
};

export const toStatus = (s: string) => s.toLowerCase();
