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
    name: "Guest",
    tagline: "Public marketing site",
    home: "/",
    items: [
      { label: "Home", to: "/", icon: Store, description: "Landing page" },
      { label: "Packages", to: "/packages", icon: Tags, description: "Memberships & PT" },
      { label: "Trainers", to: "/trainers", icon: Dumbbell, description: "Coach profiles" },
      { label: "Articles", to: "/articles", icon: CalendarDays, description: "Blog" },
      { label: "Reviews", to: "/reviews", icon: Users, description: "Member reviews" },
      { label: "Gym info", to: "/gym-info", icon: Store, description: "Branches & hours" },
      { label: "Calculator", to: "/tools/fitness-calculator", icon: BarChart3, description: "BMI / BMR / TDEE" },
    ],
  },
  {
    key: "customer",
    name: "Customer",
    tagline: "Member self-service area",
    home: "/customer",
    items: [
      { label: "Dashboard", to: "/customer", icon: LayoutDashboard, group: "Overview" },
      { label: "Notifications", to: "/customer/notifications", icon: Bell, group: "Overview" },
      { label: "Progress", to: "/customer/progress", icon: TrendingUp, group: "Overview" },
      { label: "Schedule", to: "/customer/schedule", icon: CalendarDays, group: "Training" },
      { label: "Reschedules", to: "/customer/reschedule", icon: CalendarClock, group: "Training" },
      { label: "Sessions", to: "/customer/sessions", icon: ClipboardCheck, group: "Training" },
      { label: "Roadmap", to: "/customer/roadmap", icon: Route, group: "Training" },
      { label: "Exercise guides", to: "/customer/exercises", icon: PlayCircle, group: "Training" },
      { label: "Sample workouts", to: "/customer/workouts", icon: Dumbbell, group: "Training" },
      { label: "Chat", to: "/customer/chat", icon: MessageSquare, group: "Training" },
      { label: "Find a trainer", to: "/customer/trainer-match", icon: Sparkles, group: "Training" },
      { label: "Assessment", to: "/customer/assessment", icon: ClipboardList, group: "Body" },
      { label: "Body metrics", to: "/customer/metrics", icon: Scale, group: "Body" },
      { label: "Availability", to: "/customer/availability", icon: Clock, group: "Body" },
      { label: "My packages", to: "/customer/packages", icon: CreditCard, group: "Packages" },
      { label: "Buy membership", to: "/customer/purchase", icon: ShoppingCart, group: "Packages" },
      { label: "Book PT", to: "/customer/book-pt", icon: UserPlus, group: "Packages" },
      { label: "Refund request", to: "/customer/refund", icon: Undo2, group: "Packages" },
      { label: "My QR code", to: "/customer/check-in", icon: QrCode, group: "Check-in" },
      { label: "Check-in screen", to: "/customer/check-in-screen", icon: ScanLine, group: "Check-in" },
      { label: "Profile", to: "/customer/profile", icon: User, group: "Account" },
      { label: "Change password", to: "/customer/change-password", icon: KeyRound, group: "Account" },
      { label: "Review gym", to: "/customer/review", icon: Star, group: "Account" },
    ],
  },
  {
    key: "trainer",
    name: "Trainer",
    tagline: "Coaching workspace",
    home: "/trainer",
    items: [
      { label: "Dashboard", to: "/trainer", icon: LayoutDashboard },
      { label: "Schedule", to: "/trainer/schedule", icon: CalendarDays },
      { label: "Clients", to: "/trainer/clients", icon: Users },
      { label: "Programs", to: "/trainer/programs", icon: Dumbbell },
    ],
  },
  {
    key: "staff",
    name: "Staff",
    tagline: "Front-desk operations",
    home: "/staff",
    items: [
      { label: "Dashboard", to: "/staff", icon: LayoutDashboard },
      { label: "Check-in", to: "/staff/check-in", icon: ClipboardCheck },
      { label: "Members", to: "/staff/members", icon: Users },
      { label: "Classes", to: "/staff/classes", icon: CalendarDays },
    ],
  },
  {
    key: "manager",
    name: "Manager",
    tagline: "Branch management",
    home: "/manager",
    items: [
      { label: "Dashboard", to: "/manager", icon: LayoutDashboard },
      { label: "Staff", to: "/manager/staff", icon: Users },
      { label: "Reports", to: "/manager/reports", icon: BarChart3 },
      { label: "Memberships", to: "/manager/memberships", icon: CreditCard },
    ],
  },
  {
    key: "admin",
    name: "Admin",
    tagline: "System administration",
    home: "/admin",
    items: [
      { label: "Dashboard", to: "/admin", icon: LayoutDashboard },
      { label: "Users", to: "/admin/users", icon: Users },
      { label: "Branches", to: "/admin/branches", icon: Store },
      { label: "Roles", to: "/admin/roles", icon: Shield },
      { label: "Settings", to: "/admin/settings", icon: Settings },
    ],
  },
];

export function getRoleArea(key: RoleKey): RoleArea {
  return roleAreas.find((area) => area.key === key)!;
}
