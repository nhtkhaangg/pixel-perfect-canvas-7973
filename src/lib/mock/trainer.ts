export const trainerMe = {
  id: "maya-nguyen",
  name: "Nguyễn Minh Anh",
  email: "minhanh.nguyen@gymfit.vn",
  phone: "0903 123 456",
  branch: "Khu tạ tự do",
  specialization: "Sức mạnh & Powerlifting",
  experienceYears: 9,
  bio: "Cựu vận động viên powerlifting cấp quốc gia, giúp người mới và người tập trung cấp xây dựng sức mạnh thực sự, đo lường được với kỹ thuật an toàn và giáo án đơn giản.",
  ratingAvg: 4.9,
  hourlyRate: 350000,
  languages: "Tiếng Việt, Tiếng Anh",
};

export type CertStatus = "PENDING" | "APPROVED" | "REJECTED";
export type Certificate = { id: string; name: string; issuer: string; issuedAt: string; expiresAt: string | null; fileName: string; status: CertStatus; note?: string };
export const certificates: Certificate[] = [
  { id: "cert_1", name: "NSCA-CSCS", issuer: "Hiệp hội Sức mạnh & Thể lực Quốc gia (NSCA)", issuedAt: "2019-05-10", expiresAt: "2027-05-10", fileName: "nsca-cscs.pdf", status: "APPROVED" },
  { id: "cert_2", name: "Huấn luyện viên Powerlifting", issuer: "Liên đoàn Powerlifting Việt Nam", issuedAt: "2020-11-02", expiresAt: null, fileName: "vpf-coach.pdf", status: "APPROVED" },
  { id: "cert_3", name: "Dinh dưỡng thể thao L1", issuer: "Precision Nutrition", issuedAt: "2022-03-18", expiresAt: null, fileName: "pn-l1.jpg", status: "APPROVED" },
  { id: "cert_4", name: "Sơ cấp cứu / CPR", issuer: "Hội Chữ thập đỏ Việt Nam", issuedAt: "2026-09-10", expiresAt: "2028-09-10", fileName: "cpr-2026.pdf", status: "PENDING" },
  { id: "cert_5", name: "Kettlebell cấp 1", issuer: "StrongFirst", issuedAt: "2026-06-01", expiresAt: null, fileName: "kb-l1-scan.png", status: "REJECTED", note: "Ảnh scan bị mờ — vui lòng tải lên bản rõ nét hơn thể hiện số chứng chỉ." },
];

export type Client = {
  id: string; name: string; age: number; goal: string; package: string; sessionsLeft: number; totalSessions: number;
  lastSession: string; adherence: number; status: "ACTIVE" | "PENDING" | "EXPIRED"; plateau?: boolean;
  metrics: { date: string; weight: number; bodyFat: number; bench: number; squat: number }[];
};
const series = (w: number, bf: number, b: number, s: number, dw: number) =>
  ["2026-07-01", "2026-07-15", "2026-08-01", "2026-08-15", "2026-09-01", "2026-09-15"].map((date, i) => ({
    date, weight: +(w - dw * i).toFixed(1), bodyFat: +(bf - 0.6 * i).toFixed(1), bench: b + (i < 4 ? 2.5 * i : 7.5), squat: s + 5 * i,
  }));
export const clients: Client[] = [
  { id: "cus_1042", name: "Trần Quốc Huy", age: 32, goal: "Bench 100 kg & giảm 6 kg", package: "PT Transform 24", sessionsLeft: 7, totalSessions: 24, lastSession: "2026-09-22", adherence: 92, status: "ACTIVE", plateau: true, metrics: series(82.6, 23, 77.5, 97.5, 0.5) },
  { id: "cus_1088", name: "Phạm Thu Trang", age: 28, goal: "Giải powerlifting đầu tiên", package: "PT Elite 48", sessionsLeft: 31, totalSessions: 48, lastSession: "2026-09-23", adherence: 97, status: "ACTIVE", metrics: series(61, 22, 50, 85, 0.1) },
  { id: "cus_1101", name: "Lê Minh Khang", age: 41, goal: "Giảm 10 kg", package: "PT Transform 24", sessionsLeft: 12, totalSessions: 24, lastSession: "2026-09-20", adherence: 78, status: "ACTIVE", metrics: series(96, 29, 70, 90, 0.9) },
  { id: "cus_1130", name: "Đỗ Ngọc Bích", age: 35, goal: "Deadlift không đau lưng", package: "PT Starter 8", sessionsLeft: 2, totalSessions: 8, lastSession: "2026-09-18", adherence: 85, status: "ACTIVE", plateau: true, metrics: series(68, 26, 45, 70, 0.2) },
  { id: "cus_1152", name: "Vũ Anh Tuấn", age: 24, goal: "Tăng cơ", package: "PT Starter 8", sessionsLeft: 8, totalSessions: 8, lastSession: "—", adherence: 0, status: "PENDING", metrics: series(72, 16, 65, 90, -0.3) },
  { id: "cus_0990", name: "Ngô Thị Hạnh", age: 30, goal: "Thể lực tổng quát", package: "PT Starter 8", sessionsLeft: 0, totalSessions: 8, lastSession: "2026-08-12", adherence: 88, status: "EXPIRED", metrics: series(65, 25, 40, 60, 0.3) },
];

export type Booking = { id: string; clientId: string; client: string; date: string; start: string; end: string; focus: string; status: "UPCOMING" | "IN_PROGRESS" | "COMPLETED" | "AWAITING" | "MISSED" };
export const bookings: Booking[] = [
  { id: "b_201", clientId: "cus_1042", client: "Trần Quốc Huy", date: "2026-09-24", start: "18:00", end: "19:00", focus: "Thân trên — bench", status: "IN_PROGRESS" },
  { id: "b_202", clientId: "cus_1088", client: "Phạm Thu Trang", date: "2026-09-24", start: "07:00", end: "08:00", focus: "Kỹ thuật squat", status: "AWAITING" },
  { id: "b_203", clientId: "cus_1101", client: "Lê Minh Khang", date: "2026-09-23", start: "12:00", end: "13:00", focus: "Thể lực nền", status: "AWAITING" },
  { id: "b_204", clientId: "cus_1130", client: "Đỗ Ngọc Bích", date: "2026-09-25", start: "17:00", end: "18:00", focus: "Phục hồi deadlift", status: "UPCOMING" },
  { id: "b_205", clientId: "cus_1042", client: "Trần Quốc Huy", date: "2026-09-26", start: "07:00", end: "08:00", focus: "Thân dưới — squat", status: "UPCOMING" },
  { id: "b_206", clientId: "cus_1088", client: "Phạm Thu Trang", date: "2026-09-26", start: "18:00", end: "19:00", focus: "Bench đỉnh phong độ", status: "UPCOMING" },
  { id: "b_207", clientId: "cus_1101", client: "Lê Minh Khang", date: "2026-09-28", start: "12:00", end: "13:00", focus: "Toàn thân", status: "UPCOMING" },
  { id: "b_208", clientId: "cus_1042", client: "Trần Quốc Huy", date: "2026-09-29", start: "18:00", end: "19:00", focus: "Thể lực nền & core", status: "UPCOMING" },
  { id: "b_209", clientId: "cus_1088", client: "Phạm Thu Trang", date: "2026-09-30", start: "07:00", end: "08:00", focus: "Deadlift", status: "UPCOMING" },
  { id: "b_190", clientId: "cus_1042", client: "Trần Quốc Huy", date: "2026-09-22", start: "18:00", end: "19:00", focus: "Thân dưới — deadlift", status: "COMPLETED" },
  { id: "b_188", clientId: "cus_1130", client: "Đỗ Ngọc Bích", date: "2026-09-18", start: "17:00", end: "18:00", focus: "Hông gập", status: "COMPLETED" },
  { id: "b_185", clientId: "cus_1101", client: "Lê Minh Khang", date: "2026-09-17", start: "12:00", end: "13:00", focus: "Thể lực nền", status: "MISSED" },
];

export const trainerReschedules = [
  { id: "rs_40", client: "Trần Quốc Huy", from: "2026-09-26 07:00", to: "2026-09-26 18:00", reason: "Có họp sớm vào thứ Sáu.", requestedBy: "client", status: "REQUESTED" },
  { id: "rs_44", client: "Lê Minh Khang", from: "2026-09-28 12:00", to: "2026-09-28 17:00", reason: "Đổi lịch họp giờ ăn trưa.", requestedBy: "client", status: "REQUESTED" },
  { id: "rs_41", client: "Trần Quốc Huy", from: "2026-09-29 18:00", to: "2026-09-30 07:00", reason: "Tham dự khóa học chứng chỉ.", requestedBy: "me", status: "REQUESTED" },
  { id: "rs_33", client: "Phạm Thu Trang", from: "2026-09-09 07:00", to: "2026-09-10 07:00", reason: "Bị ốm.", requestedBy: "client", status: "CONFIRMED" },
] as { id: string; client: string; from: string; to: string; reason: string; requestedBy: "client" | "me"; status: "REQUESTED" | "CONFIRMED" | "REJECTED" }[];

export const daysOff = [
  { id: "off_1", date: "2026-10-06", type: "Cả ngày", reason: "Khóa học chứng chỉ", status: "APPROVED" },
  { id: "off_2", date: "2026-10-17", type: "Buổi sáng", reason: "Có việc cá nhân", status: "PENDING" },
  { id: "off_3", date: "2026-09-05", type: "Cả ngày", reason: "Huấn luyện thi đấu", status: "APPROVED" },
];
export const weeklyOff = ["CN"];

export type LessonPlan = { id: string; title: string; clientId: string | null; focus: string; durationMin: number; updatedAt: string; warmup: string; blocks: { exercise: string; sets: number; reps: string; rest: string }[]; notes: string; image?: string };
export const lessonPlans: LessonPlan[] = [
  { id: "lp_1", title: "Bench 5×5 — tăng cường độ", clientId: "cus_1042", focus: "Thân trên", durationMin: 60, updatedAt: "2026-09-21", warmup: "Kéo dây band, chống đẩy khởi động, đòn tạ không 2×10", blocks: [
    { exercise: "Đẩy ngực thanh đòn", sets: 5, reps: "5 @ 85 kg", rest: "3 phút" },
    { exercise: "Kéo xà có tạ", sets: 4, reps: "6", rest: "2 phút" },
    { exercise: "Đẩy ngực nghiêng tạ đơn", sets: 3, reps: "10", rest: "90 giây" },
    { exercise: "Kéo cáp ngồi", sets: 3, reps: "12", rest: "60 giây" },
  ], notes: "Chú ý khuỷu tay ở các rep cuối. Tăng lên 87,5 kg nếu RPE ≤ 8." },
  { id: "lp_2", title: "Chuẩn bị giải — ngày squat", clientId: "cus_1088", focus: "Thân dưới", durationMin: 75, updatedAt: "2026-09-20", warmup: "Đạp xe 5 phút, goblet squat 2×8, xoay hông", blocks: [
    { exercise: "Squat thi đấu", sets: 6, reps: "2 @ 90%", rest: "4 phút" },
    { exercise: "Squat dừng", sets: 3, reps: "3", rest: "3 phút" },
    { exercise: "Đạp đùi máy", sets: 3, reps: "10", rest: "2 phút" },
  ], notes: "Quay video các set nặng từ góc nghiêng." },
  { id: "lp_3", title: "Phục hồi hông gập", clientId: "cus_1130", focus: "Chuỗi cơ sau", durationMin: 50, updatedAt: "2026-09-15", warmup: "Cat-cow, bird dog, đẩy hông cầu", blocks: [
    { exercise: "Deadlift kettlebell", sets: 4, reps: "8", rest: "90 giây" },
    { exercise: "Đẩy hông (hip thrust)", sets: 3, reps: "10", rest: "90 giây" },
  ], notes: "Dừng ngay nếu đau nhói. Mục tiêu thang đau ≤ 2/10." },
  { id: "lp_4", title: "Mẫu bài thể lực nền", clientId: null, focus: "Thể lực nền", durationMin: 45, updatedAt: "2026-08-30", warmup: "Chèo thuyền nhẹ 500m", blocks: [
    { exercise: "Đẩy xe trượt (sled push)", sets: 6, reps: "20 m", rest: "60 giây" },
    { exercise: "Đu kettlebell (swing)", sets: 4, reps: "15", rest: "45 giây" },
  ], notes: "Bài mẫu có thể tái sử dụng." },
];

export type Exercise = { id: string; name: string; muscleGroup: string; equipment: string; videoUrl: string; description: string; custom: boolean; image?: string };
export const exercises: Exercise[] = [
  { id: "ex_1", name: "Squat lưng thanh đòn", muscleGroup: "Chân", equipment: "Thanh đòn", videoUrl: "https://videos.gymfit.vn/back-squat.mp4", description: "Squat high-bar xuống dưới song song.", custom: false },
  { id: "ex_2", name: "Đẩy ngực (Bench press)", muscleGroup: "Ngực", equipment: "Thanh đòn", videoUrl: "https://videos.gymfit.vn/bench.mp4", description: "Bench thi đấu, dừng tạ chạm ngực.", custom: false },
  { id: "ex_3", name: "Deadlift thông thường", muscleGroup: "Lưng", equipment: "Thanh đòn", videoUrl: "https://videos.gymfit.vn/deadlift.mp4", description: "Kéo tạ từ sàn, giữ cột sống thẳng.", custom: false },
  { id: "ex_4", name: "Kéo xà có tạ", muscleGroup: "Lưng", equipment: "Xà đơn", videoUrl: "https://videos.gymfit.vn/pullup.mp4", description: "Treo thẳng tay đến cằm qua xà, đeo đai tạ.", custom: false },
  { id: "ex_5", name: "Spoto press", muscleGroup: "Ngực", equipment: "Thanh đòn", videoUrl: "https://videos.gymfit.vn/minhanh/spoto.mp4", description: "Bench dừng cách ngực 2cm — dùng cho bài phá plateau của Huy.", custom: true },
  { id: "ex_6", name: "Deadlift kettlebell chậm", muscleGroup: "Chuỗi cơ sau", equipment: "Kettlebell", videoUrl: "https://videos.gymfit.vn/minhanh/tempo-kbdl.mp4", description: "Hạ tạ 3 giây cho khách hàng phục hồi chấn thương.", custom: true },
  { id: "ex_7", name: "Đu kettlebell (Swing)", muscleGroup: "Toàn thân", equipment: "Kettlebell", videoUrl: "https://videos.gymfit.vn/kb-swing.mp4", description: "Kiểu Nga, đu lên ngang ngực.", custom: false },
];

export type PlanStatus = "DRAFT" | "ACTIVE" | "ARCHIVED";
export type WorkoutPlan = {
  id: string; clientId: string; client: string; title: string; goal: string; durationWeeks: number; version: number; isAiGenerated: boolean; status: PlanStatus; updatedAt: string;
  weeks: { week: number; focus: string; sessions: string[] }[];
  milestones: { week: number; title: string; target: string; status: "COMPLETED" | "PENDING" | "MISSED"; review?: string }[];
  versions: { version: number; date: string; author: string; change: string; status: PlanStatus }[];
  image?: string;
};
export const plans: WorkoutPlan[] = [
  { id: "wp_12", clientId: "cus_1042", client: "Trần Quốc Huy", title: "Sức mạnh & tái cấu trúc cơ thể", goal: "Bench 100 kg, giảm 6 kg", durationWeeks: 14, version: 3, isAiGenerated: false, status: "ACTIVE", updatedAt: "2026-09-15",
    weeks: [
      { week: 1, focus: "Nền tảng", sessions: ["Toàn thân A", "Toàn thân B", "Thể lực nền"] },
      { week: 5, focus: "Xây sức mạnh", sessions: ["Thân trên nặng", "Thân dưới nặng", "Thân trên khối lượng"] },
      { week: 9, focus: "Tăng cường độ", sessions: ["Bench 5×5", "Squat 5×5", "Deadlift + thể lực nền"] },
      { week: 13, focus: "Đỉnh cao & kiểm tra", sessions: ["Mức mở màn", "Ngày kiểm tra"] },
    ],
    milestones: [
      { week: 4, title: "Chuẩn kỹ thuật", target: "Squat/bench/deadlift đúng kỹ thuật", status: "COMPLETED", review: "Cả 3 bài được duyệt qua video." },
      { week: 8, title: "Bench 80 kg", target: "80 kg × 5", status: "COMPLETED", review: "Đạt 80×5 vào tuần 7." },
      { week: 12, title: "Bench 90 kg × 3", target: "90 kg × 3, mỡ cơ thể 20%", status: "PENDING" },
      { week: 14, title: "Bench 100 kg 1RM", target: "100 kg đơn", status: "PENDING" },
    ],
    versions: [
      { version: 3, date: "2026-09-15", author: "Nguyễn Minh Anh", change: "Thêm bài Spoto press để phá plateau bench", status: "ACTIVE" },
      { version: 2, date: "2026-08-10", author: "Nguyễn Minh Anh", change: "Tăng tần suất lên 3 buổi/tuần", status: "ARCHIVED" },
      { version: 1, date: "2026-07-15", author: "Trợ lý AI", change: "Giáo án khởi tạo bằng AI", status: "ARCHIVED" },
    ] },
  { id: "wp_14", clientId: "cus_1088", client: "Phạm Thu Trang", title: "Chuẩn bị thi đấu 12 tuần", goal: "Tổng cử 300 kg tại giải đầu tiên", durationWeeks: 12, version: 2, isAiGenerated: false, status: "ACTIVE", updatedAt: "2026-09-02",
    weeks: [{ week: 1, focus: "Phì đại cơ", sessions: ["SQ", "BP", "DL", "Bổ trợ"] }, { week: 7, focus: "Sức mạnh", sessions: ["SQ nặng", "BP nặng", "DL nặng"] }, { week: 11, focus: "Đỉnh cao", sessions: ["Mức mở màn", "Giảm tải"] }],
    milestones: [{ week: 6, title: "Thi đấu thử", target: "Tổng 280 kg", status: "COMPLETED", review: "Đạt tổng 282,5 kg." }, { week: 12, title: "Ngày thi đấu", target: "Tổng 300 kg", status: "PENDING" }],
    versions: [{ version: 2, date: "2026-09-02", author: "Nguyễn Minh Anh", change: "Dời đỉnh cao thêm 1 tuần", status: "ACTIVE" }, { version: 1, date: "2026-07-01", author: "Nguyễn Minh Anh", change: "Giáo án ban đầu", status: "ARCHIVED" }] },
  { id: "wp_15", clientId: "cus_1101", client: "Lê Minh Khang", title: "Giảm mỡ giai đoạn 1", goal: "Giảm 10 kg trong 16 tuần", durationWeeks: 16, version: 1, isAiGenerated: true, status: "DRAFT", updatedAt: "2026-09-23",
    weeks: [{ week: 1, focus: "Xây thói quen", sessions: ["Toàn thân", "Zone 2", "Toàn thân"] }, { week: 9, focus: "Trao đổi chất", sessions: ["Circuit", "Sức mạnh", "Interval"] }],
    milestones: [{ week: 8, title: "−5 kg", target: "91 kg", status: "PENDING" }, { week: 16, title: "−10 kg", target: "86 kg", status: "PENDING" }],
    versions: [{ version: 1, date: "2026-09-23", author: "Trợ lý AI", change: "Bản nháp do AI tạo từ đánh giá ban đầu", status: "DRAFT" }] },
  { id: "wp_09", clientId: "cus_0990", client: "Ngô Thị Hạnh", title: "Thể lực tổng quát 8 tuần", goal: "Tập đều 3 buổi/tuần", durationWeeks: 8, version: 1, isAiGenerated: false, status: "ARCHIVED", updatedAt: "2026-08-12",
    weeks: [{ week: 1, focus: "Tổng quát", sessions: ["Toàn thân A", "Toàn thân B"] }],
    milestones: [{ week: 8, title: "Hoàn thành chu kỳ", target: "24 buổi tập", status: "COMPLETED", review: "Tham gia 22/24 buổi." }],
    versions: [{ version: 1, date: "2026-06-15", author: "Nguyễn Minh Anh", change: "Giáo án ban đầu", status: "ARCHIVED" }] },
];

export const nutritionPlans = [
  { id: "np_1", client: "Trần Quốc Huy", calories: 2250, protein: 170, carbs: 230, fat: 70, status: "ACTIVE", updatedAt: "2026-09-01" },
  { id: "np_2", client: "Lê Minh Khang", calories: 2100, protein: 180, carbs: 180, fat: 70, status: "DRAFT", updatedAt: "2026-09-23" },
];

export const trainerReviews = [
  { id: "tr_1", client: "Trần Quốc Huy", rating: 5, date: "2026-09-20", title: "Bench tăng 15 kg", body: "Giáo án của chị Minh Anh đơn giản mà hiệu quả. Chị luôn giải thích lý do của từng bài tập.", reply: "Cảm ơn Huy! 100 kg sắp đạt được rồi 💪" },
  { id: "tr_2", client: "Phạm Thu Trang", rating: 5, date: "2026-09-12", title: "Sẵn sàng cho giải đầu tiên", body: "Hướng dẫn cực kỳ chi tiết và luôn phản hồi nhanh qua chat.", reply: null },
  { id: "tr_3", client: "Đỗ Ngọc Bích", rating: 4, date: "2026-09-03", title: "Hết đau lưng rồi", body: "Bài phục hồi rất tốt. Thỉnh thoảng buổi tập bắt đầu trễ vài phút.", reply: null },
  { id: "tr_4", client: "Ngô Thị Hạnh", rating: 5, date: "2026-08-15", title: "Đã tạo thói quen tập luyện", body: "Thân thiện và truyền động lực. Rất khuyến khích cho người mới bắt đầu.", reply: "Rất vui vì đã đồng hành cùng em, Hạnh — hẹn gặp lại nhé!" },
  { id: "tr_5", client: "Lê Minh Khang", rating: 4, date: "2026-08-02", title: "Khó nhưng công bằng", body: "Đẩy tôi tập rất nghiêm túc. Mong có thêm hướng dẫn dinh dưỡng.", reply: null },
] as { id: string; client: string; rating: number; date: string; title: string; body: string; reply: string | null }[];

export const sessionFeedback = [
  { id: "sf_1", client: "Trần Quốc Huy", session: "2026-09-22 · Thân dưới — deadlift", rpe: 8, rating: 5, comment: "Cảm thấy khỏe, hơi căng lưng dưới.", coachNote: "" },
  { id: "sf_2", client: "Đỗ Ngọc Bích", session: "2026-09-18 · Hông gập", rpe: 6, rating: 4, comment: "Hôm nay không đau!", coachNote: "Tuần sau tăng lên kettlebell 16 kg." },
  { id: "sf_3", client: "Phạm Thu Trang", session: "2026-09-16 · Bench đỉnh phong độ", rpe: 9, rating: 5, comment: "Set cuối cực kỳ nặng.", coachNote: "" },
];

export const trainerNotifications = [
  { id: "tn1", title: "Phát hiện plateau: Trần Quốc Huy", body: "Bench giữ nguyên 85 kg trong 4 tuần liên tiếp.", date: "2026-09-20 08:00", read: false, type: "alert" },
  { id: "tn2", title: "Yêu cầu đổi lịch từ Lê Minh Khang", body: "CN 12:00 → CN 17:00", date: "2026-09-23 10:10", read: false, type: "session" },
  { id: "tn3", title: "Chứng chỉ đang chờ duyệt", body: "Sơ cấp cứu / CPR đã được gửi để phê duyệt.", date: "2026-09-10 14:00", read: true, type: "system" },
  { id: "tn4", title: "Có hội viên mới", body: "Vũ Anh Tuấn đã mua gói PT Starter 8 với bạn.", date: "2026-09-21 16:45", read: false, type: "client" },
  { id: "tn5", title: "Chứng chỉ bị từ chối", body: "Kettlebell cấp 1 — vui lòng tải lên lại.", date: "2026-06-04 09:00", read: true, type: "system" },
  { id: "tn6", title: "Đánh giá 5 sao mới", body: "Trần Quốc Huy: 'Bench tăng 15 kg'", date: "2026-09-20 19:30", read: true, type: "review" },
];

export const trainerKpis = [
  { month: "T4", sessions: 58, revenue: 20880000 },
  { month: "T5", sessions: 64, revenue: 23040000 },
  { month: "T6", sessions: 61, revenue: 21960000 },
  { month: "T7", sessions: 70, revenue: 25200000 },
  { month: "T8", sessions: 74, revenue: 26640000 },
  { month: "T9", sessions: 68, revenue: 24480000 },
];
