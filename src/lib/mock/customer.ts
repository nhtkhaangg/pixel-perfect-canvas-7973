export const me = {
  id: "hv_1042",
  name: "Nguyễn Minh Anh",
  email: "minhanh.nguyen@example.com",
  phone: "0903 123 456",
  dob: "1994-03-12",
  gender: "Nam",
  address: "22 Đường Nguyễn Huệ, Quận 1, TP.HCM",
  homeZone: "Khu tạ tự do",
  memberSince: "2025-02-10",
  goal: "Giảm 6 kg mỡ và đẩy ngực 100 kg",
  emergencyContact: "Nguyễn Thu Hà · 0903 555 133",
  trainerId: "maya-nguyen",
  trainerName: "Maya Nguyễn",
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
  { id: "cp_301", packageId: "standard-monthly", name: "Gói Tiêu chuẩn hàng tháng", type: "MEMBERSHIP", startDate: "2026-09-01", endDate: "2026-09-30", status: "ACTIVE", totalSessions: null, usedSessions: 14, price: 499000 },
  { id: "cp_298", packageId: "pt-transform-24", name: "PT Transform 24 buổi", type: "PT", startDate: "2026-07-15", endDate: "2026-10-13", status: "ACTIVE", totalSessions: 24, usedSessions: 17, trainer: "Maya Nguyễn", price: 9600000 },
  { id: "cp_305", packageId: "all-access-quarter", name: "Gói Toàn quyền theo Quý", type: "MEMBERSHIP", startDate: "2026-10-01", endDate: "2026-12-30", status: "PENDING", totalSessions: null, usedSessions: 0, price: 2390000 },
  { id: "cp_244", packageId: "standard-monthly", name: "Gói Tiêu chuẩn hàng tháng", type: "MEMBERSHIP", startDate: "2026-08-01", endDate: "2026-08-31", status: "EXPIRED", totalSessions: null, usedSessions: 19, price: 499000 },
  { id: "cp_210", packageId: "pt-starter-8", name: "PT Starter 8 buổi", type: "PT", startDate: "2026-05-02", endDate: "2026-06-16", status: "EXPIRED", totalSessions: 8, usedSessions: 8, trainer: "Daniel Okafor", price: 3600000 },
  { id: "cp_199", packageId: "flex-monthly", name: "Gói Linh hoạt hàng tháng", type: "MEMBERSHIP", startDate: "2026-04-01", endDate: "2026-04-30", status: "CANCELLED", totalSessions: null, usedSessions: 3, price: 299000 },
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
  { id: "tx_9012", customerPackageId: "cp_305", description: "Gói Toàn quyền theo Quý", amount: 2390000, method: "VNPAY", status: "PAID", date: "2026-09-21", reference: "VNP14829301" },
  { id: "tx_9008", customerPackageId: "cp_305", description: "Gói Toàn quyền theo Quý", amount: 2390000, method: "PAYOS", status: "FAILED", date: "2026-09-21", reference: "PO-7781230" },
  { id: "tx_8950", customerPackageId: "cp_301", description: "Gói Tiêu chuẩn hàng tháng", amount: 499000, method: "PAYOS", status: "PAID", date: "2026-09-01", reference: "PO-7721004" },
  { id: "tx_8702", customerPackageId: "cp_298", description: "PT Transform 24 buổi", amount: 9600000, method: "VNPAY", status: "PAID", date: "2026-07-15", reference: "VNP13900211" },
  { id: "tx_8610", customerPackageId: "cp_244", description: "Gói Tiêu chuẩn hàng tháng", amount: 499000, method: "CASH", status: "PAID", date: "2026-08-01", reference: "DESK-0488" },
  { id: "tx_8200", customerPackageId: "cp_210", description: "PT Starter 8 buổi", amount: 3600000, method: "VNPAY", status: "PAID", date: "2026-05-02", reference: "VNP12555018" },
  { id: "tx_8105", customerPackageId: "cp_199", description: "Hoàn tiền gói Linh hoạt hàng tháng", amount: 299000, method: "CASH", status: "REFUNDED", date: "2026-04-05", reference: "DESK-0311" },
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
  { id: "s_18", date: "2026-09-24", start: "18:00", end: "19:00", trainer: "Maya Nguyễn", focus: "Thân trên — trọng tâm đẩy ngực", room: "Khu tạ tự do A", status: "IN_PROGRESS", exercises: [
    { name: "Đẩy ngực với tạ đòn", sets: 5, reps: "5", weight: 85 },
    { name: "Hít xà có tạ", sets: 4, reps: "6", weight: 10 },
    { name: "Đẩy ngực nghiêng tạ đơn", sets: 3, reps: "10", weight: 26 },
    { name: "Kéo cáp ngồi", sets: 3, reps: "12", weight: 55 },
  ] },
  { id: "s_19", date: "2026-09-26", start: "07:00", end: "08:00", trainer: "Maya Nguyễn", focus: "Thân dưới — squat", room: "Khu tạ tự do A", status: "UPCOMING", exercises: [
    { name: "Squat sau", sets: 5, reps: "5", weight: 110 },
    { name: "Deadlift Romania", sets: 3, reps: "8", weight: 90 },
    { name: "Lunge bước đi", sets: 3, reps: "12", weight: 20 },
  ] },
  { id: "s_20", date: "2026-09-29", start: "18:00", end: "19:00", trainer: "Maya Nguyễn", focus: "Sức bền & cơ core", room: "Đường chạy trong nhà", status: "UPCOMING", exercises: [
    { name: "Đẩy xe kéo tạ", sets: 6, reps: "20 m", weight: 80 },
    { name: "Đu tạ ấm (kettlebell swing)", sets: 4, reps: "15", weight: 24 },
  ] },
  { id: "s_21", date: "2026-10-01", start: "18:00", end: "19:00", trainer: "Maya Nguyễn", focus: "Thân trên — khối lượng", room: "Khu tạ tự do B", status: "UPCOMING", exercises: [
    { name: "Đẩy ngực", sets: 4, reps: "8", weight: 75 },
  ] },
  { id: "s_17", date: "2026-09-22", start: "18:00", end: "19:00", trainer: "Maya Nguyễn", focus: "Thân dưới — deadlift", room: "Khu tạ tự do A", status: "COMPLETED", exercises: [
    { name: "Deadlift", sets: 5, reps: "3", weight: 140 },
  ] },
  { id: "s_16", date: "2026-09-19", start: "07:00", end: "08:00", trainer: "Maya Nguyễn", focus: "Thân trên — đẩy ngực", room: "Khu tạ tự do A", status: "COMPLETED", exercises: [
    { name: "Đẩy ngực", sets: 5, reps: "5", weight: 85 },
  ] },
  { id: "s_15", date: "2026-09-17", start: "18:00", end: "19:00", trainer: "Maya Nguyễn", focus: "Sức bền", room: "Đường chạy trong nhà", status: "MISSED", exercises: [] },
];

export type RescheduleRequest = {
  id: string;
  sessionId: string;
  from: string;
  to: string;
  reason: string;
  requestedBy: "Bạn" | "Maya Nguyễn";
  status: "REQUESTED" | "CONFIRMED" | "REJECTED";
  createdAt: string;
};

export const reschedules: RescheduleRequest[] = [
  { id: "rs_41", sessionId: "s_20", from: "29/09/2026 18:00", to: "30/09/2026 07:00", reason: "Huấn luyện viên tham dự khóa chứng chỉ vào tối thứ Hai.", requestedBy: "Maya Nguyễn", status: "REQUESTED", createdAt: "2026-09-23" },
  { id: "rs_40", sessionId: "s_19", from: "26/09/2026 07:00", to: "26/09/2026 18:00", reason: "Có cuộc họp công việc sớm vào thứ Sáu.", requestedBy: "Bạn", status: "REQUESTED", createdAt: "2026-09-22" },
  { id: "rs_35", sessionId: "s_14", from: "12/09/2026 18:00", to: "13/09/2026 09:00", reason: "Trễ chuyến đi công tác.", requestedBy: "Bạn", status: "CONFIRMED", createdAt: "2026-09-10" },
  { id: "rs_31", sessionId: "s_11", from: "03/09/2026 07:00", to: "03/09/2026 12:00", reason: "Muốn tập vào khung giờ trưa.", requestedBy: "Bạn", status: "REJECTED", createdAt: "2026-09-01" },
];

export const checkIns = [
  { id: "ci_551", date: "2026-09-24", time: "17:52", zone: "Cổng chính", method: "QR", status: "CHECKED_IN" },
  { id: "ci_548", date: "2026-09-22", time: "17:48", zone: "Cổng chính", method: "QR", status: "CHECKED_IN" },
  { id: "ci_540", date: "2026-09-20", time: "10:15", zone: "Cổng phụ", method: "QR", status: "CHECKED_IN" },
  { id: "ci_536", date: "2026-09-19", time: "06:51", zone: "Cổng chính", method: "Quầy lễ tân", status: "CHECKED_IN" },
  { id: "ci_529", date: "2026-09-17", time: "12:30", zone: "Cổng chính", method: "QR", status: "CHECKED_IN" },
  { id: "ci_520", date: "2026-09-15", time: "18:02", zone: "Cổng chính", method: "QR", status: "CHECKED_IN" },
  { id: "ci_514", date: "2026-09-13", time: "09:05", zone: "Cổng phụ", method: "QR", status: "FAILED" },
  { id: "ci_511", date: "2026-09-12", time: "07:10", zone: "Cổng chính", method: "QR", status: "CHECKED_IN" },
  { id: "ci_503", date: "2026-09-10", time: "17:40", zone: "Cổng chính", method: "QR", status: "CHECKED_IN" },
  { id: "ci_498", date: "2026-09-08", time: "18:10", zone: "Cổng chính", method: "Quầy lễ tân", status: "CHECKED_IN" },
];

export const bodyMetrics = [
  { date: "01/06", weight: 84.2, bodyFat: 24.1, muscle: 35.2, waist: 92 },
  { date: "15/06", weight: 83.5, bodyFat: 23.6, muscle: 35.4, waist: 91 },
  { date: "01/07", weight: 82.6, bodyFat: 23.0, muscle: 35.7, waist: 90 },
  { date: "15/07", weight: 81.9, bodyFat: 22.3, muscle: 35.9, waist: 89 },
  { date: "01/08", weight: 81.0, bodyFat: 21.6, muscle: 36.2, waist: 88 },
  { date: "15/08", weight: 80.4, bodyFat: 21.0, muscle: 36.4, waist: 87 },
  { date: "01/09", weight: 80.1, bodyFat: 20.8, muscle: 36.5, waist: 87 },
  { date: "15/09", weight: 80.0, bodyFat: 20.7, muscle: 36.5, waist: 86.5 },
];

export const strengthProgress = [
  { week: "Tuần 1", bench: 70, squat: 90, deadlift: 110 },
  { week: "Tuần 2", bench: 72.5, squat: 95, deadlift: 115 },
  { week: "Tuần 3", bench: 75, squat: 97.5, deadlift: 120 },
  { week: "Tuần 4", bench: 77.5, squat: 100, deadlift: 125 },
  { week: "Tuần 5", bench: 80, squat: 102.5, deadlift: 130 },
  { week: "Tuần 6", bench: 82.5, squat: 105, deadlift: 132.5 },
  { week: "Tuần 7", bench: 85, squat: 107.5, deadlift: 135 },
  { week: "Tuần 8", bench: 85, squat: 110, deadlift: 137.5 },
  { week: "Tuần 9", bench: 85, squat: 110, deadlift: 140 },
  { week: "Tuần 10", bench: 85, squat: 112.5, deadlift: 140 },
];

export const weeklyVolume = [
  { week: "Tuần 5", sessions: 3, volume: 18.2 },
  { week: "Tuần 6", sessions: 4, volume: 21.5 },
  { week: "Tuần 7", sessions: 3, volume: 19.8 },
  { week: "Tuần 8", sessions: 4, volume: 23.1 },
  { week: "Tuần 9", sessions: 3, volume: 20.4 },
  { week: "Tuần 10", sessions: 4, volume: 22.7 },
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
  { id: "n1", title: "Gói Tiêu chuẩn hàng tháng sắp hết hạn sau 6 ngày", body: "Gia hạn ngay để không bị gián đoạn quyền lợi.", detail: "Gói Tiêu chuẩn hàng tháng (cp_301) của bạn kết thúc vào ngày 30/09/2026. Gói Toàn quyền theo Quý sẽ kích hoạt từ 01/10 sau khi thanh toán được xác nhận. Nếu muốn tiếp tục dùng gói Tiêu chuẩn, hãy gia hạn ở mục Gói của tôi.", type: "package", date: "2026-09-24 09:00", read: false },
  { id: "n2", title: "Yêu cầu đổi lịch từ Maya Nguyễn", body: "Thứ Hai 18:00 → Thứ Ba 07:00", detail: "Maya đề nghị chuyển buổi 'Sức bền & cơ core' từ Thứ Hai 29/09 18:00 sang Thứ Ba 30/09 07:00 vì tham dự khóa chứng chỉ. Hãy xác nhận hoặc từ chối tại trang Đổi lịch.", type: "session", date: "2026-09-23 15:12", read: false },
  { id: "n3", title: "Đã nhận thanh toán — 2.390.000 VNĐ", body: "Gói Toàn quyền theo Quý qua VNPAY.", detail: "Chúng tôi đã nhận thanh toán VNPAY 2.390.000 VNĐ (mã VNP14829301) cho Gói Toàn quyền theo Quý. Gói đang chờ kích hoạt từ 01/10/2026.", type: "payment", date: "2026-09-21 20:41", read: true },
  { id: "n4", title: "Thanh toán thất bại", body: "Giao dịch PAYOS PO-7781230 bị từ chối.", detail: "Giao dịch PAYOS 2.390.000 VNĐ đã bị nhà cung cấp từ chối. Không có khoản tiền nào bị trừ. Bạn đã hoàn tất thanh toán bằng VNPAY sau đó.", type: "payment", date: "2026-09-21 20:35", read: true },
  { id: "n5", title: "Tin nhắn mới từ Maya", body: "Buổi tập hôm nay rất tốt — nhớ ghi lại RPE nhé!", detail: "Maya đã gửi tin nhắn cho bạn: 'Buổi tập hôm nay rất tốt — nhớ ghi lại RPE nhé! Tuần sau mình sẽ tăng đẩy ngực lên 87,5 kg.'", type: "chat", date: "2026-09-22 19:10", read: true },
  { id: "n6", title: "Phát hiện chững tiến bộ ở bài đẩy ngực", body: "Không tăng trong 4 tuần liên tiếp.", detail: "Mức tạ đẩy ngực cao nhất của bạn giữ nguyên 85 kg trong 4 tuần liên tiếp. Huấn luyện viên đã được thông báo và có thể điều chỉnh giáo án bằng một tuần giảm tải hoặc bài tập biến thể.", type: "system", date: "2026-09-20 08:00", read: true },
];

export const roadmap = [
  { phase: "Giai đoạn 1", title: "Nền tảng", weeks: "Tuần 1–4", status: "COMPLETED", goals: ["Học kỹ thuật squat, đẩy ngực, deadlift", "3 buổi tập mỗi tuần", "Đo chỉ số cơ thể ban đầu"], progress: 100 },
  { phase: "Giai đoạn 2", title: "Xây dựng sức mạnh", weeks: "Tuần 5–8", status: "COMPLETED", goals: ["Tăng tải tuyến tính các bài chính", "Đạt đẩy ngực 80 kg", "Tỷ lệ mỡ dưới 22%"], progress: 100 },
  { phase: "Giai đoạn 3", title: "Tăng cường độ", weeks: "Tuần 9–12", status: "IN_PROGRESS", goals: ["Đẩy ngực 90 kg × 3", "Squat 120 kg × 5", "Tỷ lệ mỡ 20%"], progress: 55 },
  { phase: "Giai đoạn 4", title: "Đỉnh cao & kiểm tra", weeks: "Tuần 13–14", status: "UPCOMING", goals: ["Kiểm tra 1RM đẩy ngực (mục tiêu 100 kg)", "Đo chỉ số cơ thể lần cuối", "Lên kế hoạch giai đoạn tiếp theo"], progress: 0 },
];

export const exerciseGuides = [
  { id: "e1", name: "Squat sau với tạ đòn", muscle: "Chân", level: "Trung cấp", duration: "4:12", equipment: "Tạ đòn, giá đỡ", cues: ["Siết cơ bụng trước khi hạ", "Đầu gối theo hướng mũi chân", "Hạ thấp qua song song"] },
  { id: "e2", name: "Đẩy ngực", muscle: "Ngực", level: "Trung cấp", duration: "5:03", equipment: "Tạ đòn, ghế tập", cues: ["Ép chặt hai bả vai", "Chạm ngực dưới", "Đạp chân xuống sàn"] },
  { id: "e3", name: "Deadlift kiểu truyền thống", muscle: "Lưng", level: "Trung cấp", duration: "4:47", equipment: "Tạ đòn", cues: ["Đòn tạ ở giữa bàn chân", "Đẩy sàn ra xa", "Khóa khớp bằng cơ mông"] },
  { id: "e4", name: "Hít xà", muscle: "Lưng", level: "Cơ bản", duration: "3:20", equipment: "Xà đơn", cues: ["Bắt đầu từ tư thế treo thẳng", "Dẫn động bằng ngực", "Kiểm soát khi hạ xuống"] },
  { id: "e5", name: "Deadlift Romania", muscle: "Chân", level: "Cơ bản", duration: "3:55", equipment: "Tạ đòn / tạ đơn", cues: ["Gối hơi chùng", "Đẩy hông ra sau", "Cảm nhận căng gân kheo"] },
  { id: "e6", name: "Đẩy vai", muscle: "Vai", level: "Trung cấp", duration: "4:01", equipment: "Tạ đòn", cues: ["Siết cơ mông", "Đường đẩy tạ thẳng lên", "Đưa đầu qua khi lên đỉnh"] },
  { id: "e7", name: "Đu tạ ấm (kettlebell swing)", muscle: "Toàn thân", level: "Cơ bản", duration: "2:48", equipment: "Tạ ấm (kettlebell)", cues: ["Gập hông chứ không squat", "Bật hông dứt khoát", "Để tạ bay tự nhiên"] },
  { id: "e8", name: "Các biến thể plank", muscle: "Cơ core", level: "Cơ bản", duration: "3:10", equipment: "Không cần dụng cụ", cues: ["Giữ cột sống trung tính", "Siết cơ mông", "Thở đều"] },
];

export const sampleWorkouts = [
  { id: "w1", name: "Toàn thân cho người mới A", duration: 45, level: "Cơ bản", goal: "Sức mạnh", exercises: ["Goblet squat 3×10", "Chống đẩy 3×8", "Kéo tạ đơn 3×10", "Plank 3×30s"] },
  { id: "w2", name: "Phì đại thân trên", duration: 60, level: "Trung cấp", goal: "Tăng cơ", exercises: ["Đẩy ngực 4×8", "Kéo xô 4×10", "Đẩy ngực nghiêng tạ đơn 3×12", "Kéo mặt 3×15", "Cuốn tay 3×12"] },
  { id: "w3", name: "Metcon 20 phút", duration: 20, level: "Mọi trình độ", goal: "Giảm mỡ", exercises: ["Đu tạ ấm ×15", "Burpee ×10", "Chèo thuyền 250 m", "AMRAP 20 phút"] },
  { id: "w4", name: "Sức mạnh thân dưới", duration: 55, level: "Trung cấp", goal: "Sức mạnh", exercises: ["Squat sau 5×5", "RDL 3×8", "Split squat Bulgaria 3×10", "Nhón bắp chân 3×15"] },
  { id: "w5", name: "Phục hồi linh hoạt", duration: 25, level: "Mọi trình độ", goal: "Phục hồi", exercises: ["Giãn cơ tư thế ghế 2×60s", "Giãn hông 90/90 2×60s", "Xỏ kim (thread the needle) 2×10", "Treo xà thư giãn 3×30s"] },
  { id: "w6", name: "Zone 2 & core", duration: 40, level: "Cơ bản", goal: "Sức bền", exercises: ["Đạp xe 30 phút zone 2", "Dead bug 3×10", "Plank nghiêng 3×30s"] },
];

export const chatMessages = [
  { id: "m1", from: "trainer", text: "Chào buổi sáng Minh Anh! Lưng dưới sau buổi deadlift thứ Hai thế nào rồi?", time: "08:12" },
  { id: "m2", from: "me", text: "Ổn rồi ạ — hơi căng nhưng đỡ hẳn sau bài giãn cơ.", time: "08:30" },
  { id: "m3", from: "trainer", text: "Tuyệt vời. Tối nay mình tập đẩy ngực 5×5 ở mức 85 kg. Nếu suôn sẻ tuần sau lên 87,5 kg.", time: "08:31" },
  { id: "m4", from: "me", text: "Được ạ. Em có thể dời buổi thứ Sáu sang buổi tối không?", time: "09:02" },
  { id: "m5", from: "trainer", text: "Gửi yêu cầu đổi lịch, mình sẽ xác nhận nhé 👍", time: "09:05" },
];

export const trainerSuggestions = [
  { trainerId: "maya-nguyen", match: 94, reasons: ["Chuyên về sức mạnh — phù hợp mục tiêu đẩy ngực của bạn", "Có lịch trống Thứ 2/4/6 buổi tối", "Cùng khung giờ tập với bạn"] },
  { trainerId: "marco-silva", match: 86, reasons: ["Chuyên phì đại cơ hỗ trợ tái cấu trúc vóc dáng", "Có chứng chỉ dinh dưỡng", "Có lịch trống cuối tuần"] },
  { trainerId: "daniel-okafor", match: 81, reasons: ["Chuyên giảm mỡ — phù hợp mục tiêu giảm 6 kg", "Bài tập sức bền giúp phá vỡ chững tiến bộ", "Luôn có mặt tại phòng gym"] },
];

export const weekDays = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];
export const timeSlots = ["06:00", "07:00", "08:00", "12:00", "17:00", "18:00", "19:00", "20:00"];
export const defaultAvailability: Record<string, boolean> = {
  "T2-18:00": true, "T2-19:00": true, "T4-18:00": true, "T4-19:00": true, "T6-07:00": true, "T6-18:00": true, "T7-08:00": true,
};

export const toStatus = (s: string) => s.toLowerCase();
