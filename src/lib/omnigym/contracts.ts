export type DemoRole = "guest" | "customer" | "trainer" | "staff" | "manager" | "admin";
export type Approval = "PENDING" | "APPROVED" | "REJECTED" | "UNSUBMITTED";
export const paymentStatuses = ["PENDING", "PAID", "REFUNDED"] as const;
export const facilityStatuses = ["AVAILABLE", "MAINT", "DECOMMISSIONED"] as const;
export const trainerTiers = ["ALL", "JUNIOR", "SENIOR", "MASTER"] as const;
export function safeRedirect(value: unknown): string | undefined {
  if (
    typeof value !== "string" ||
    !value.startsWith("/") ||
    value.startsWith("//") ||
    value.includes("\\") ||
    /[\u0000-\u001f]/.test(value)
  )
    return undefined;
  return value;
}
export function passwordStrength(value: string) {
  return value.length < 6 ? 25 : value.length < 10 ? 65 : 100;
}
export function validOtp(value: string) {
  return /^\d{6}$/.test(value);
}
export function validTrainerPhone(value: string) {
  return /^(0|\+84)[35789][0-9]{8}$/.test(value);
}
export function packageErrors(p: {
  name: string;
  price: number;
  durationDays: number;
  totalSessions: number;
  type: string;
}) {
  const errors: Record<string, string> = {};
  if (p.name.trim().length < 2 || p.name.trim().length > 100)
    errors["name"] = "Tên gói cần từ 2–100 ký tự";
  if (!(p.price > 0) || Math.abs(p.price * 100 - Math.round(p.price * 100)) > 0.000001)
    errors["price"] = "Giá phải lớn hơn 0, tối đa 2 chữ số thập phân";
  if (!Number.isInteger(p.durationDays) || p.durationDays < 1)
    errors["durationDays"] = "Thời hạn tối thiểu 1 ngày";
  if (!Number.isInteger(p.totalSessions) || p.totalSessions < (p.type === "PT" ? 1 : 0))
    errors["totalSessions"] =
      p.type === "PT" ? "Gói PT cần ít nhất 1 buổi" : "Số buổi không được âm";
  return errors;
}
export function trainerCanAccess(approval: Approval, path: string) {
  return approval === "APPROVED" || path === "/trainer/profile" || path === "/trainer/profile/edit";
}
export const operationsAccess: Record<string, DemoRole[]> = {
  dashboard: ["staff", "manager", "admin"],
  notifications: ["staff", "manager", "admin"],
  "check-in": ["staff", "manager", "admin"],
  customers: ["staff", "manager", "admin"],
  packages: ["staff", "manager", "admin"],
  payments: ["staff", "manager", "admin"],
  facilities: ["staff", "manager", "admin"],
  blogs: ["staff", "manager", "admin"],
  "blog-reviews": ["staff", "manager", "admin"],
  trainers: ["manager", "admin"],
  schedule: ["manager", "admin"],
  exercises: ["manager", "admin"],
  staff: ["manager", "admin"],
  managers: ["admin"],
  users: ["admin"],
  branches: ["admin"],
  "gym-info": ["admin"],
  profile: ["staff", "manager", "admin"],
  settings: ["admin"],
  billing: ["manager", "admin"],
};
export function operationsCanAccess(role: DemoRole, path: string) {
  const area = path.split("/")[2] || "dashboard";
  return operationsAccess[area]?.includes(role) ?? false;
}

export function canEditExercise(role: DemoRole, isCustom: boolean) {
  return role !== "trainer" || isCustom;
}
export function validPassword(value: string) {
  return value.length >= 6;
}
