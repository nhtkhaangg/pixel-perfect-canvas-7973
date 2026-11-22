import { packages, trainers, articles, gymInfo } from "@/lib/mock/public";
import { bodyMetrics, transactions, checkIns, customerPackages } from "@/lib/mock/customer";
import { clients, bookings, exercises, trainerReviews } from "@/lib/mock/trainer";
export type RecordRow = Record<string, string | number | boolean | string[]>;
export const demoCustomer = {
  id: "00000000-0000-4000-8000-000000000001",
  fullName: "Nguyễn Minh Anh",
  customerCode: "CUS-0001",
  gender: "FEMALE",
  email: "anh@example.com",
  phone: "0903123456",
  dob: "1994-03-12",
  address: "22 Nguyễn Huệ, TP. Hồ Chí Minh",
  health_notes: "",
};
export const canonicalPackages = packages.map((p) => ({
  id: p.id,
  name: p.id === "pt-transform-24" ? "Gói PT 1:1 Giảm Mỡ" : p.name,
  type: p.type,
  trainerTier: "ALL",
  price: p.price,
  durationDays: p.durationDays,
  totalSessions: p.totalSessions ?? 0,
  description: p.description,
  benefits: p.perks,
  facilityPrivileges: ["Khu tạ tự do", "Khu cardio"],
  isActive: true,
}));
export const canonicalTrainers = trainers.map((t, i) => ({
  id: t.id,
  fullName: t.name,
  email: `trainer${i + 1}@omnigym.vn`,
  phone: `090312345${i}`,
  specialization: t.specialization,
  trainerTier: i < 2 ? "MASTER" : "SENIOR",
  bio: t.bio,
  ratingAvg: t.ratingAvg,
  approval_status: i === 5 ? "PENDING" : "APPROVED",
}));
export const canonicalExercises = exercises.map((e, i) => ({
  id: e.id,
  name: i === 1 ? "Barbell Bench Press" : e.name,
  muscle_group: e.muscleGroup,
  equipment: e.equipment,
  level: i === 1 ? "Trung bình" : "Mới bắt đầu",
  videoUrl: "",
  instruction: e.description,
  isCustom: e.custom,
}));
export const canonicalCustomers = [
  demoCustomer,
  ...clients.map((c, i) => ({
    id: c.id,
    fullName: c.name,
    customerCode: `CUS-${String(i + 2).padStart(4, "0")}`,
    gender: i % 2 ? "FEMALE" : "MALE",
    email: `customer${i + 2}@example.com`,
    phone: `090455123${i}`,
    dob: `199${i}-05-12`,
    address: "TP. Hồ Chí Minh",
    health_notes: "",
  })),
];
export const canonicalMetrics = bodyMetrics.map((m, i) => ({
  id: `metric-${i}`,
  customerId: demoCustomer.id,
  recordedDate: `2026-${m.date.slice(3)}-${m.date.slice(0, 2)}`,
  weightKg: m.weight,
  heightCm: 172.5,
  body_fat_percentage: m.bodyFat,
  muscleMassKg: m.muscle,
  bmi: +(m.weight / 1.725 ** 2).toFixed(1),
}));
export const canonicalPayments = transactions.map((t) => ({
  id: t.id,
  pay_id: t.id,
  cpkg_id: t.customerPackageId,
  invoice_code: `INV-${t.id.slice(3)}`,
  amount: t.amount,
  payment_method: t.method,
  status: t.status === "FAILED" ? "PENDING" : t.status,
  transaction_ref: t.reference,
  refund_reason: t.status === "REFUNDED" ? "Hội viên yêu cầu hoàn tiền" : "",
  payment_time: t.date,
}));
export const canonicalCheckIns = checkIns.map((c) => ({
  id: c.id,
  chk_id: c.id,
  customerId: demoCustomer.id,
  customerPackageId: "cp_301",
  staffId: "staff-1",
  checkInTime: `${c.date} ${c.time}`,
  checkOutTime: "",
  method: c.method === "QR" ? "QR" : "MANUAL",
  status: c.status === "FAILED" ? "EXPIRED" : "SUCCESS",
}));
export const canonicalBookings = bookings.map((b) => ({
  id: b.id,
  sess_id: b.id,
  cpkg_id: "cp_298",
  trn_id: "maya-nguyen",
  cus_id: b.clientId,
  startTime: `${b.date} ${b.start}`,
  endTime: `${b.date} ${b.end}`,
  session_notes: b.focus,
  status:
    b.status === "COMPLETED" ? "COMPLETED" : b.status === "MISSED" ? "CANCELLED" : "SCHEDULED",
  reschedule_count: 0,
}));
export const canonicalBlogs = articles.map((a) => ({
  id: a.id,
  title: a.title,
  slug: a.id,
  category: (
    {
      Training: "WORKOUT",
      Nutrition: "NUTRITION",
      Recovery: "RECOVERY",
      Community: "MINDSET",
    } as const
  )[a.category],
  summary: a.excerpt,
  content: a.body.map((p) => `<p>${p}</p>`).join(""),
  thumbnailUrl: "",
  authorId: "admin-1",
  status: "PUBLISHED",
  createdAt: a.date,
  isDeleted: false,
}));
export const canonicalStaff = ["Trần Quốc Bảo", "Lê Thu Hà", "Võ Thành Nam", "Đặng Mỹ Linh"].map(
  (fullName, i) => ({
    id: `staff-${i + 1}`,
    fullName,
    email: `staff${i + 1}@omnigym.vn`,
    phone: `090311122${i}`,
    staffCode: `STF-${String(i + 1).padStart(4, "0")}`,
    gender: i % 2 ? "FEMALE" : "MALE",
    dob: "1995-04-20",
    hometown: "TP. Hồ Chí Minh",
    status: "ACTIVE",
  }),
);
export const canonicalManagers = [
  {
    id: "manager-1",
    fullName: "Trần Thanh Phong",
    email: "manager@omnigym.vn",
    phone: "0903222333",
    managerCode: "MGR-0001",
    gender: "MALE",
    dob: "1988-08-15",
    hometown: "Đà Nẵng",
    status: "ACTIVE",
  },
];
export const canonicalFacilities = [
  "Máy chạy bộ Life Fitness",
  "Xe đạp tập Keiser",
  "Giàn squat",
  "Ghế đẩy ngực",
  "Bộ tạ đơn 2–40 kg",
  "Máy kéo cáp",
  "Máy chèo thuyền",
  "Máy leg press",
].map((name, i) => ({
  id: `facility-${i + 1}`,
  name,
  description: "Thiết bị tập luyện tại OmniGym",
  imageUrl: "",
  status: i === 3 ? "MAINT" : i === 7 ? "DECOMMISSIONED" : "AVAILABLE",
  mgrId: "manager-1",
  category: i < 2 ? "CARDIO" : "STRENGTH",
  serialNumber: `OG-2026-${100 + i}`,
  manufacturer: i < 2 ? "Life Fitness" : "Technogym",
  purchaseDate: "2025-03-01",
  warrantyExpiration: "2027-03-01",
  maintenanceInterval: 90,
  lastMaintenanceDate: "2026-09-01",
  nextMaintenanceDate: "2026-12-01",
  maintenanceNotes: i === 3 ? "Kiểm tra bộ phận điều chỉnh ghế" : "",
  location: i < 2 ? "Khu cardio" : "Khu tạ tự do",
}));
export const canonicalReviews = trainerReviews.map((r) => ({
  id: r.id,
  trev_id: r.id,
  customerId: r.client,
  trainerId: "maya-nguyen",
  rating: r.rating,
  comment: r.body,
  reply_comment: r.reply ?? "",
  createdAt: r.date,
}));
export const canonicalPurchased = customerPackages.map((p) => ({
  id: p.id,
  cpkg_id: p.id,
  cus_id: demoCustomer.id,
  pkg_id: p.packageId,
  actual_price: p.price,
  start_date: p.startDate,
  end_date: p.endDate,
  total_sessions: p.totalSessions ?? 0,
  remaining_sessions: Math.max(0, (p.totalSessions ?? 0) - p.usedSessions),
  status: p.status,
}));
export const canonicalGym = {
  id: "gym-1",
  name: "OmniGym",
  slogan: gymInfo.tagline,
  description: "Không gian tập luyện, huấn luyện cá nhân và phục hồi.",
  address: gymInfo.address,
  hotline: gymInfo.phone,
  email: "hello@omnigym.vn",
  phone: gymInfo.phone,
  totalArea: "1.800 m²",
  capacity: 350,
  establishedYear: 2020,
};
