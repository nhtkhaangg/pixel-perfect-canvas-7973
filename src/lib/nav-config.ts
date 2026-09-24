import type { LinkProps } from "@tanstack/react-router";
import {
  LayoutDashboard,
  CalendarDays,
  CreditCard,
  User,
  Users,
  Dumbbell,
  ClipboardCheck,
  BarChart3,
  Settings,
  Shield,
  Store,
  Tags,
  Bell, TrendingUp, CalendarClock, Route, PlayCircle, MessageSquare, Sparkles, ClipboardList, Scale, Clock, ShoppingCart, UserPlus, Undo2, QrCode, ScanLine, KeyRound, Star,
  type LucideIcon,
} from "lucide-react";

export type RoleKey = "guest" | "customer" | "trainer" | "staff" | "manager" | "admin";

export type NavTo = NonNullable<LinkProps["to"]>;

export type NavItem = {
  label: string;
  to: NavTo;
  icon: LucideIcon;
  description?: string;
  group?: string;
};

export type RoleArea = {
  key: RoleKey;
  name: string;
  tagline: string;
  home: NavTo;
  items: NavItem[];
};

export const roleAreas: RoleArea[] = [
  {
    key: "guest",
    name: "Khách",
    tagline: "Trang giới thiệu công khai",
    home: "/",
    items: [
      { label: "Trang chủ", to: "/", icon: Store, description: "Trang giới thiệu" },
      { label: "Gói tập", to: "/packages", icon: Tags, description: "Gói hội viên & PT" },
      { label: "Huấn luyện viên", to: "/trainers", icon: Dumbbell, description: "Hồ sơ huấn luyện viên" },
      { label: "Bài viết", to: "/articles", icon: CalendarDays, description: "Blog" },
      { label: "Đánh giá", to: "/reviews", icon: Users, description: "Đánh giá của hội viên" },
      { label: "Thông tin phòng gym", to: "/gym-info", icon: Store, description: "Địa chỉ & giờ mở cửa" },
      { label: "Công cụ tính toán", to: "/tools/fitness-calculator", icon: BarChart3, description: "BMI / BMR / TDEE" },
    ],
  },
  {
    key: "customer",
    name: "Hội viên",
    tagline: "Khu vực tự phục vụ cho hội viên",
    home: "/customer",
    items: [
      { label: "Tổng quan", to: "/customer", icon: LayoutDashboard, group: "Tổng quan" },
      { label: "Thông báo", to: "/customer/notifications", icon: Bell, group: "Tổng quan" },
      { label: "Tiến độ", to: "/customer/progress", icon: TrendingUp, group: "Tổng quan" },
      { label: "Lịch tập", to: "/customer/schedule", icon: CalendarDays, group: "Tập luyện" },
      { label: "Đổi lịch", to: "/customer/reschedule", icon: CalendarClock, group: "Tập luyện" },
      { label: "Buổi tập", to: "/customer/sessions", icon: ClipboardCheck, group: "Tập luyện" },
      { label: "Lộ trình", to: "/customer/roadmap", icon: Route, group: "Tập luyện" },
      { label: "Hướng dẫn bài tập", to: "/customer/exercises", icon: PlayCircle, group: "Tập luyện" },
      { label: "Bài tập mẫu", to: "/customer/workouts", icon: Dumbbell, group: "Tập luyện" },
      { label: "Trò chuyện", to: "/customer/chat", icon: MessageSquare, group: "Tập luyện" },
      { label: "Tìm huấn luyện viên", to: "/customer/trainer-match", icon: Sparkles, group: "Tập luyện" },
      { label: "Đánh giá thể trạng", to: "/customer/assessment", icon: ClipboardList, group: "Cơ thể" },
      { label: "Chỉ số cơ thể", to: "/customer/metrics", icon: Scale, group: "Cơ thể" },
      { label: "Thời gian rảnh", to: "/customer/availability", icon: Clock, group: "Cơ thể" },
      { label: "Gói của tôi", to: "/customer/packages", icon: CreditCard, group: "Gói tập" },
      { label: "Mua gói hội viên", to: "/customer/purchase", icon: ShoppingCart, group: "Gói tập" },
      { label: "Đặt lịch PT", to: "/customer/book-pt", icon: UserPlus, group: "Gói tập" },
      { label: "Yêu cầu hoàn tiền", to: "/customer/refund", icon: Undo2, group: "Gói tập" },
      { label: "Mã QR của tôi", to: "/customer/check-in", icon: QrCode, group: "Check-in" },
      { label: "Màn hình check-in", to: "/customer/check-in-screen", icon: ScanLine, group: "Check-in" },
      { label: "Hồ sơ", to: "/customer/profile", icon: User, group: "Tài khoản" },
      { label: "Đổi mật khẩu", to: "/customer/change-password", icon: KeyRound, group: "Tài khoản" },
      { label: "Đánh giá phòng gym", to: "/customer/review", icon: Star, group: "Tài khoản" },
    ],
  },
  {
    key: "trainer",
    name: "Huấn luyện viên",
    tagline: "Không gian làm việc huấn luyện",
    home: "/trainer",
    items: [
      { label: "Tổng quan", to: "/trainer", icon: LayoutDashboard, group: "Tổng quan" },
      { label: "Thông báo", to: "/trainer/notifications", icon: Bell, group: "Tổng quan" },
      { label: "Trò chuyện", to: "/trainer/chat", icon: MessageSquare, group: "Tổng quan" },
      { label: "Lịch đặt hẹn", to: "/trainer/schedule", icon: CalendarDays, group: "Lịch trình" },
      { label: "Ngày nghỉ", to: "/trainer/days-off", icon: Clock, group: "Lịch trình" },
      { label: "Đổi lịch", to: "/trainer/reschedule", icon: CalendarClock, group: "Lịch trình" },
      { label: "Xác nhận buổi tập", to: "/trainer/verify", icon: ClipboardCheck, group: "Lịch trình" },
      { label: "Hội viên của tôi", to: "/trainer/customers", icon: Users, group: "Huấn luyện" },
      { label: "Buổi tập trực tiếp", to: "/trainer/live", icon: PlayCircle, group: "Huấn luyện" },
      { label: "Phản hồi buổi tập", to: "/trainer/feedback", icon: MessageSquare, group: "Huấn luyện" },
      { label: "Tiến độ & chỉ số", to: "/trainer/progress", icon: TrendingUp, group: "Huấn luyện" },
      { label: "Giáo án tập luyện", to: "/trainer/plans", icon: Route, group: "Giáo án" },
      { label: "Gợi ý giáo án AI", to: "/trainer/plans/ai", icon: Sparkles, group: "Giáo án" },
      { label: "Chế độ dinh dưỡng", to: "/trainer/nutrition", icon: ClipboardList, group: "Giáo án" },
      { label: "Kế hoạch buổi học", to: "/trainer/lessons", icon: CalendarDays, group: "Giáo án" },
      { label: "Bài tập", to: "/trainer/exercises", icon: Dumbbell, group: "Giáo án" },
      { label: "Hồ sơ", to: "/trainer/profile", icon: User, group: "Tài khoản" },
      { label: "Chứng chỉ", to: "/trainer/certificates", icon: Shield, group: "Tài khoản" },
      { label: "Đánh giá của tôi", to: "/trainer/reviews", icon: Star, group: "Tài khoản" },
    ],
  },
  {
    key: "staff",
    name: "Nhân viên",
    tagline: "Vận hành lễ tân",
    home: "/staff",
    items: [
      { label: "Tổng quan", to: "/staff", icon: LayoutDashboard },
      { label: "Check-in", to: "/staff/check-in", icon: ClipboardCheck },
      { label: "Hội viên", to: "/staff/members", icon: Users },
      { label: "Lớp học", to: "/staff/classes", icon: CalendarDays },
    ],
  },
  {
    key: "manager",
    name: "Quản lý",
    tagline: "Quản lý vận hành phòng gym",
    home: "/manager",
    items: [
      { label: "Tổng quan", to: "/manager", icon: LayoutDashboard },
      { label: "Nhân viên", to: "/manager/staff", icon: Users },
      { label: "Báo cáo", to: "/manager/reports", icon: BarChart3 },
      { label: "Gói hội viên", to: "/manager/memberships", icon: CreditCard },
    ],
  },
  {
    key: "admin",
    name: "Quản trị viên",
    tagline: "Quản trị hệ thống",
    home: "/admin",
    items: [
      { label: "Tổng quan", to: "/admin", icon: LayoutDashboard },
      { label: "Người dùng", to: "/admin/users", icon: Users },
      { label: "Cơ sở vật chất", to: "/admin/branches", icon: Store },
      { label: "Vai trò", to: "/admin/roles", icon: Shield },
      { label: "Cài đặt", to: "/admin/settings", icon: Settings },
    ],
  },
];

export function getRoleArea(key: RoleKey): RoleArea {
  return roleAreas.find((area) => area.key === key)!;
}
